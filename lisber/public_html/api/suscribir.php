<?php
/**
 * LISBER · api/suscribir.php
 * Único archivo que conoce al CRM (Brevo). Recibe los formularios por POST,
 * valida y da de alta el contacto con doble confirmación.
 *
 * Para cambiar de CRM (por ejemplo a un webhook de GoHighLevel) basta con
 * sustituir la función enviar_a_crm() del final.
 *
 * Responde SIEMPRE en JSON: {"estado": "ok" | "invalido" | "error", ...}
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

// ---------- 1. Configuración (fuera de la carpeta pública) ----------
$rutas_config = [
    dirname(__DIR__, 2) . '/config.php',   // un nivel por encima de public_html (recomendado)
    dirname(__DIR__) . '/config.php',      // alternativa: dentro de public_html (bloqueado por .htaccess)
];
$config = null;
foreach ($rutas_config as $ruta) {
    if (is_readable($ruta)) {
        $config = require $ruta;
        break;
    }
}
if (!is_array($config) || empty($config['BREVO_API_KEY'])) {
    responder(503, ['estado' => 'error', 'mensaje' => 'Servicio no disponible.']);
}

// ---------- 2. Solo POST y solo desde el propio dominio ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, ['estado' => 'error', 'mensaje' => 'Método no permitido.']);
}
$dominio_propio = $config['DOMINIO'] ?? 'lisber.eu';
$origen_cabecera = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$host_origen = strtolower((string) parse_url($origen_cabecera, PHP_URL_HOST));
$host_origen = preg_replace('/^www\./', '', $host_origen);
$dominio_propio = preg_replace('/^www\./', '', strtolower($dominio_propio));
if ($host_origen !== $dominio_propio) {
    responder(403, ['estado' => 'error', 'mensaje' => 'Origen no permitido.']);
}

// ---------- 3. Campo trampa: los robots lo rellenan ----------
if (trim((string) ($_POST['sitio_web'] ?? '')) !== '') {
    // Se descarta en silencio con una respuesta idéntica a la correcta.
    responder(200, ['estado' => 'ok']);
}

// ---------- 4. Límite de envíos por IP (5 por hora, sin base de datos) ----------
$limite_por_hora = (int) ($config['LIMITE_POR_HORA'] ?? 5);
if (!comprobar_limite($limite_por_hora)) {
    responder(429, ['estado' => 'error', 'mensaje' => 'Demasiados envíos. Inténtalo más tarde.']);
}

// ---------- 5. Validación ----------
$email = strtolower(trim((string) ($_POST['email'] ?? '')));
if ($email === '' || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(422, ['estado' => 'invalido', 'campo' => 'email', 'mensaje' => 'Revisa el correo: parece que falta algo.']);
}
if (($_POST['consentimiento'] ?? '') !== '1') {
    responder(422, ['estado' => 'invalido', 'campo' => 'consentimiento', 'mensaje' => 'Necesitamos tu permiso para escribirte.']);
}

$origen = ($_POST['origen'] ?? 'landing') === 'caja' ? 'caja' : 'landing';

$tienda = '';
if ($origen === 'caja') {
    $tiendas_validas = ['amazon_es', 'amazon_de', 'amazon_fr', 'amazon_it', 'otro'];
    $tienda = (string) ($_POST['tienda'] ?? '');
    if (!in_array($tienda, $tiendas_validas, true)) {
        responder(422, ['estado' => 'invalido', 'campo' => 'tienda', 'mensaje' => 'Dinos dónde la compraste.']);
    }
}

$atributos = [
    'NOMBRE'       => limpiar($_POST['nombre'] ?? '', 80),
    'POSTURA'      => limpiar($_POST['postura'] ?? '', 40),
    'HOMBROS'      => limpiar($_POST['hombros'] ?? '', 40),
    'COLCHON'      => limpiar($_POST['colchon'] ?? '', 40),
    'ALTURA'       => limpiar($_POST['altura'] ?? '', 10),
    'ORIGEN'       => $origen === 'caja' && $tienda !== '' ? 'caja:' . $tienda : $origen,
    'UTM_SOURCE'   => limpiar($_POST['utm_source'] ?? '', 100),
    'UTM_MEDIUM'   => limpiar($_POST['utm_medium'] ?? '', 100),
    'UTM_CAMPAIGN' => limpiar($_POST['utm_campaign'] ?? '', 100),
];
// No se envían atributos vacíos.
$atributos = array_filter($atributos, static fn($v) => $v !== '');

$id_lista = $origen === 'caja'
    ? (int) ($config['BREVO_LISTA_COMPRADORES'] ?? 0)
    : (int) ($config['BREVO_LISTA_LANZAMIENTO'] ?? 0);
$id_plantilla = (int) ($config['BREVO_PLANTILLA_DOI'] ?? 0);
if ($id_lista <= 0 || $id_plantilla <= 0) {
    responder(503, ['estado' => 'error', 'mensaje' => 'Servicio no disponible.']);
}

// ---------- 6. Envío al CRM ----------
$resultado = enviar_a_crm($config, $email, $atributos, $id_lista, $id_plantilla);

if ($resultado === true) {
    responder(200, ['estado' => 'ok']);
}
responder(502, ['estado' => 'error', 'mensaje' => 'No hemos podido guardar tu correo.']);


// =====================================================================
// Funciones auxiliares
// =====================================================================

function responder(int $codigo, array $datos): void
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function limpiar($valor, int $max): string
{
    $valor = trim((string) $valor);
    $valor = preg_replace('/[\x00-\x1F\x7F]/u', '', $valor) ?? '';
    return mb_substr($valor, 0, $max);
}

/**
 * Limita los envíos por IP usando un archivo temporal por hora.
 * No guarda la IP en claro: usa un hash con sal del servidor.
 */
function comprobar_limite(int $maximo): bool
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $sal = (string) ($_SERVER['SERVER_NAME'] ?? 'lisber');
    $clave = hash('sha256', $sal . '|' . $ip . '|' . date('YmdH'));
    $carpeta = sys_get_temp_dir() . '/lisber_limite';
    if (!is_dir($carpeta) && !@mkdir($carpeta, 0700, true) && !is_dir($carpeta)) {
        return true; // si no se puede escribir, no se bloquea al visitante
    }
    // Limpieza ocasional de archivos de horas anteriores.
    if (random_int(1, 20) === 1) {
        foreach (glob($carpeta . '/*.cnt') ?: [] as $f) {
            if (filemtime($f) < time() - 7200) { @unlink($f); }
        }
    }
    $archivo = $carpeta . '/' . $clave . '.cnt';
    $fp = @fopen($archivo, 'c+');
    if ($fp === false) { return true; }
    flock($fp, LOCK_EX);
    $n = (int) stream_get_contents($fp);
    $n++;
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, (string) $n);
    flock($fp, LOCK_UN);
    fclose($fp);
    return $n <= $maximo;
}

/**
 * CONEXIÓN CON EL CRM. Esta es la única función que hay que sustituir
 * para cambiar Brevo por otro servicio (por ejemplo, un webhook de GoHighLevel).
 *
 * Brevo API v3 · Crear contacto con doble confirmación (DOI):
 *   POST https://api.brevo.com/v3/contacts/doubleOptinConfirmation
 *   Cabeceras: api-key, Content-Type: application/json
 *   Cuerpo: { email, includeListIds[], templateId, redirectionUrl, attributes{} }
 *   Respuesta: 201 (contacto creado y correo DOI enviado) o 204 (ya existente / sin contenido).
 *
 * Devuelve true si el CRM ha aceptado el envío; false en caso contrario.
 * Si el contacto ya existe, también devuelve true: el visitante recibe la misma respuesta.
 */
function enviar_a_crm(array $config, string $email, array $atributos, int $id_lista, int $id_plantilla): bool
{
    $cuerpo = [
        'email'          => $email,
        'includeListIds' => [$id_lista],
        'templateId'     => $id_plantilla,
        'redirectionUrl' => $config['URL_CONFIRMADO'] ?? 'https://lisber.eu/confirmado/',
    ];
    if (!empty($atributos)) {
        $cuerpo['attributes'] = $atributos;
    }

    $url = $config['BREVO_API_URL'] ?? 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation';
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($cuerpo, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER     => [
            'accept: application/json',
            'content-type: application/json',
            'api-key: ' . $config['BREVO_API_KEY'],
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $respuesta = curl_exec($ch);
    $codigo = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($respuesta === false) {
        return false;
    }
    if ($codigo === 201 || $codigo === 204) {
        return true;
    }
    // Brevo devuelve 400 con code "duplicate_parameter" si el contacto ya existe
    // en la lista. Para el visitante, el resultado es el mismo.
    if ($codigo === 400) {
        $json = json_decode((string) $respuesta, true);
        if (is_array($json) && isset($json['code']) && $json['code'] === 'duplicate_parameter') {
            return true;
        }
    }
    return false;
}
