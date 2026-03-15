<?php
/*
Plugin Name: Mis Proyectos CPT
Description: Registra el CPT Proyectos para la práctica.
Version: 1.0
Author: Tu Nombre
*/

function lc_registrar_proyectos_cpt() {
    $labels = array(
        'name'               => 'Proyectos',
        'singular_name'      => 'Proyecto',
        'add_new'            => 'Añadir Nuevo',
        'add_new_item'       => 'Añadir Nuevo Proyecto',
        'edit_item'          => 'Editar Proyecto',
        'all_items'          => 'Todos los Proyectos',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'show_in_rest'       => true, // ¡CRUCIAL para la REST API!
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => array('title', 'editor', 'thumbnail'),
        'rewrite'            => array('slug' => 'proyectos'),
    );

    register_post_type('proyecto', $args);
}
add_action('init', 'lc_registrar_proyectos_cpt');

/** * AQUÍ EMPIEZA EL RETO OPCIONAL 
 * Registramos una ruta personalizada que solo devuelve los títulos
 */

add_action('rest_api_init', function () {
    register_rest_route('practica/v1', '/titulos-proyectos', array(
        'methods'  => 'GET',
        'callback' => 'obtener_solo_titulos_proyectos',
        'permission_callback' => '__return_true',
    ));
});

function obtener_solo_titulos_proyectos() {
    $args = array(
        'post_type'      => 'proyecto',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    );

    $proyectos = get_posts($args);
    $titulos = array();

    foreach ($proyectos as $proyecto) {
        $titulos[] = $proyecto->post_title;
    }

    return $titulos;
}