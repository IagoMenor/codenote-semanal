<?php
/**
 * Funciones y configuraciones del tema Mi Tema Corporativo
 */

function mi_tema_setup() {
    // Soporte para títulos de página dinámicos
    add_theme_support('title-tag');
    
    // Habilitar imágenes destacadas
    add_theme_support('post-thumbnails');
    
    // Registrar el lugar donde irá el menú
    register_nav_menus(array(
        'main-menu' => 'Menú Principal Superior'
    ));
}
add_action('after_setup_theme', 'mi_tema_setup');

/**
 * Carga de estilos CSS y scripts JS
 */
function mi_tema_scripts() {
    // Carga la hoja de estilos style.css principal
    wp_enqueue_style('estilos-principales', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'mi_tema_scripts');

/**
 * Scripts personalizados en el footer (JavaScript del formulario)
 */
add_action('wp_footer', function() {
    ?>
    <script>
        console.log("Formulario de contacto listo para usar");
    </script>
    <?php
});