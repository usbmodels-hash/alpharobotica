<?php
/**
 * LISBER · config.ejemplo.php
 *
 * 1. Copia este archivo con el nombre  config.php
 * 2. Rellena los valores.
 * 3. Súbelo UN NIVEL POR ENCIMA de public_html (es decir, junto a la carpeta
 *    public_html, NO dentro de ella). Así nunca es accesible desde Internet.
 *
 * NUNCA pegues la clave de API en ningún archivo HTML, JavaScript ni en el chat.
 */

return [
    // Clave de API v3 de Brevo (Brevo → Perfil → SMTP y API → Claves de API)
    'BREVO_API_KEY'            => 'xkeysib-…',

    // IDs de las listas (Brevo → Contactos → Listas; el número aparece junto al nombre)
    'BREVO_LISTA_LANZAMIENTO'  => 0,   // «Lisber · Lista de lanzamiento»
    'BREVO_LISTA_COMPRADORES'  => 0,   // «Lisber · Compradores»

    // ID de la plantilla de doble confirmación (Brevo → Campañas → Plantillas)
    'BREVO_PLANTILLA_DOI'      => 0,

    // Página a la que llega la persona tras pulsar el enlace de confirmación
    'URL_CONFIRMADO'           => 'https://lisber.eu/confirmado/',

    // Dominio propio: solo se aceptan envíos de formularios desde aquí
    'DOMINIO'                  => 'lisber.eu',

    // Envíos máximos por hora desde una misma dirección IP
    'LIMITE_POR_HORA'          => 5,

    // No tocar salvo que Brevo cambie su API (solo se usa en pruebas)
    'BREVO_API_URL'            => 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation',
];
