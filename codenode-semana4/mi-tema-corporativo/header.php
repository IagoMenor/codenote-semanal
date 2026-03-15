<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

    <header>
        <div class="logo">
            <a href="<?php echo home_url(); ?>" style="text-decoration: none;">
                <h2 style="margin:0; color:var(--primary); font-size: 1.5rem; font-weight: 800; letter-spacing: -1px;">
                    MI<span style="color:var(--dark);">EMPRESA</span>
                </h2>
            </a>
        </div>

        <nav>
            <?php 
                wp_nav_menu(array(
                    'theme_location' => 'main-menu',
                    'container'      => false, // Quitamos el div extra para que el CSS sea más limpio
                    'menu_class'     => 'menu-principal' // Clase para el <ul>
                )); 
            ?>
        </nav>
    </header>