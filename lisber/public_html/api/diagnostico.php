<?php
/**
 * LISBER · api/diagnostico.php
 * Comprueba que el servidor puede ejecutar el formulario. No muestra ninguna clave.
 * Ábrelo en el navegador: https://lisber.eu/api/diagnostico.php
 * Cuando todo esté en verde, puedes borrar este archivo.
 *
 * Escrito en sintaxis antigua a propósito, para que funcione aunque el dominio
 * esté en una versión de PHP anterior a la 8 y así poder avisarlo.
 */
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');

$filas = array();
function fila($nombre, $ok, $detalle) {
    global $filas;
    $filas[] = array($nombre, $ok, $detalle);
}

// 1. Versión de PHP
$php = PHP_VERSION;
fila('Versión de PHP', version_compare($php, '8.0.0', '>='), $php . (version_compare($php, '8.0.0', '>=') ? '' : ' → hace falta 8.x. En el panel del hosting: «Seleccionar versión de PHP» para lisber.eu'));

// 2. Extensiones
fila('Extensión curl', function_exists('curl_init'), function_exists('curl_init') ? 'activa' : 'no activa → actívala en «Seleccionar versión de PHP → Extensiones»');
fila('Extensión mbstring', function_exists('mb_substr'), function_exists('mb_substr') ? 'activa' : 'no activa → actívala en «Seleccionar versión de PHP → Extensiones»');
fila('Extensión json', function_exists('json_encode'), function_exists('json_encode') ? 'activa' : 'no activa');

// 3. config.php
$rutas = array(
    dirname(dirname(dirname(__FILE__))) . '/config.php',
    dirname(dirname(__FILE__)) . '/config.php',
);
$config = null; $ruta_ok = '';
foreach ($rutas as $r) {
    if (is_readable($r)) { $config = include $r; $ruta_ok = $r; break; }
}
if (!is_array($config)) {
    fila('config.php', false, 'no se encuentra. Debe estar en: ' . $rutas[0] . ' (un nivel por encima de public_html)');
} else {
    fila('config.php', true, 'encontrado en ' . $ruta_ok);
    $clave = isset($config['BREVO_API_KEY']) ? (string) $config['BREVO_API_KEY'] : '';
    $clave_ok = $clave !== '' && strpos($clave, 'xkeysib-') === 0 && strlen($clave) > 20 && strpos($clave, '…') === false;
    fila('Clave de API de Brevo', $clave_ok, $clave_ok ? 'rellena (no se muestra)' : 'vacía o con el valor de ejemplo → pega la clave real de Brevo entre comillas');
    foreach (array('BREVO_LISTA_LANZAMIENTO' => 'ID lista de lanzamiento', 'BREVO_LISTA_COMPRADORES' => 'ID lista de compradores', 'BREVO_PLANTILLA_DOI' => 'ID plantilla doble confirmación') as $k => $n) {
        $v = isset($config[$k]) ? (int) $config[$k] : 0;
        fila($n, $v > 0, $v > 0 ? 'ID ' . $v : 'sin rellenar (0) → pon el número de Brevo');
    }
    $dom = isset($config['DOMINIO']) ? $config['DOMINIO'] : '';
    $host = isset($_SERVER['HTTP_HOST']) ? preg_replace('/^www\./', '', strtolower($_SERVER['HTTP_HOST'])) : '';
    fila('Dominio configurado', $dom !== '' && preg_replace('/^www\./', '', strtolower($dom)) === $host, 'config: «' . $dom . '» · esta web: «' . $host . '»' . ($dom !== $host ? ' → deben coincidir' : ''));
}

// 4. Conexión saliente con Brevo (sin clave: solo comprobamos que el servidor llega)
if (function_exists('curl_init')) {
    $ch = curl_init('https://api.brevo.com/v3/');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_exec($ch);
    $codigo = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    fila('Conexión con api.brevo.com', $codigo > 0, $codigo > 0 ? 'el servidor llega a Brevo (HTTP ' . $codigo . ')' : 'sin conexión: ' . $err . ' → pregunta al hosting si bloquea conexiones salientes');
}

// 5. Carpeta temporal para el límite por IP
$tmp = sys_get_temp_dir();
fila('Carpeta temporal escribible', is_writable($tmp), $tmp);

// 6. Archivo del formulario
fila('api/suscribir.php presente', is_file(dirname(__FILE__) . '/suscribir.php'), dirname(__FILE__) . '/suscribir.php');

$todo_ok = true;
foreach ($filas as $f) { if (!$f[1]) { $todo_ok = false; } }
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Diagnóstico del formulario · Lisber</title>
<style>
body{font-family:system-ui,sans-serif;background:#F6F1E9;color:#2B2B2B;margin:0;padding:1.5rem;line-height:1.5}
main{max-width:720px;margin:0 auto;background:#fff;border-radius:16px;padding:1.5rem;box-shadow:0 10px 30px rgba(36,64,107,.1)}
h1{color:#24406B;font-size:1.5rem;margin:0 0 .5rem}
table{width:100%;border-collapse:collapse;font-size:.95rem}
td{padding:.6rem .4rem;border-top:1px solid #ECE4D7;vertical-align:top}
.ok{color:#1B7A3D;font-weight:700}.no{color:#B42318;font-weight:700}
.res{padding:.8rem 1rem;border-radius:10px;margin:1rem 0;font-weight:700}
.res.ok{background:#E3F4E8}.res.no{background:#FDE8E6}
small{color:#6B6B6B}
</style>
</head>
<body>
<main>
<h1>Diagnóstico del formulario</h1>
<p><small>Esta página no muestra ninguna clave. Cuando todo esté en verde, borra <code>api/diagnostico.php</code>.</small></p>
<div class="res <?php echo $todo_ok ? 'ok' : 'no'; ?>"><?php echo $todo_ok ? 'Todo correcto: el formulario debería funcionar.' : 'Hay algo que corregir (marcado en rojo).'; ?></div>
<table>
<?php foreach ($filas as $f): ?>
<tr><td class="<?php echo $f[1] ? 'ok' : 'no'; ?>"><?php echo $f[1] ? '✔' : '✖'; ?></td><td><strong><?php echo htmlspecialchars($f[0]); ?></strong></td><td><?php echo htmlspecialchars($f[2]); ?></td></tr>
<?php endforeach; ?>
</table>
</main>
</body>
</html>
