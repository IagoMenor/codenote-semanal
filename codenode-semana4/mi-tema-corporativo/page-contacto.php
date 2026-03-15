<?php
/*
Template Name: Plantilla de Contacto
*/
get_header(); ?>

<section class="container" style="margin-top: 50px;">
    <div style="text-align: center; margin-bottom: 40px;">
        <h1>Contacta con Nosotros</h1>
        <p>Rellena el formulario y te responderemos lo antes posible.</p>
    </div>

    <div class="contacto-wrapper" style="max-width: 600px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        
        <?php 
            // 1. Recuperamos el email de destino de ACF
            $email_destino = get_field('email_recepcion'); 
            $mensaje_salida = "";

            // 2. Lógica de procesamiento
            if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['enviar_registro'])) {
                
                $nombre = sanitize_text_field($_POST['nombre']);
                $edad   = intval($_POST['edad']);
                $sexo   = sanitize_text_field($_POST['sexo']);
                
                $mensaje_salida = "¡Hola, $nombre! Tienes $edad años y tu sexo es $sexo. Gracias por enviar el formulario.";

                if ($email_destino) {
                    $asunto = "Nuevo registro desde la web";
                    $cuerpo = "Detalles del registro:\nNombre: $nombre\nEdad: $edad\nSexo: $sexo";
                    wp_mail($email_destino, $asunto, $cuerpo);
                }
            } // <--- Aquí estaba el error, faltaba cerrar esta llave
        ?>

        <form method="post" action="">
            <div style="margin-bottom: 20px;">
                <label for="nombre" style="display:block; font-weight:bold; margin-bottom:5px;">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
            </div>

            <div style="margin-bottom: 20px;">
                <label for="edad" style="display:block; font-weight:bold; margin-bottom:5px;">Edad:</label>
                <input type="number" id="edad" name="edad" min="1" max="120" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
            </div>

            <div style="margin-bottom: 20px;">
                <label for="sexo" style="display:block; font-weight:bold; margin-bottom:5px;">Sexo:</label>
                <select id="sexo" name="sexo" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                    <option value="">Selecciona una opción</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <button type="submit" name="enviar_registro" style="background:var(--primary); color:white; border:none; padding:15px 30px; border-radius:8px; width:100%; font-weight:600; cursor:pointer;">
                Enviar Registro
            </button>
        </form>

        <?php if ($mensaje_salida !== "") : ?>
            <div style="margin-top:25px; padding:15px; background:#d4edda; color:#155724; border-radius:8px; text-align:center; font-weight:bold;">
                <?php echo $mensaje_salida; ?>
            </div>
        <?php endif; ?>

    </div>
</section>

<?php get_footer(); ?>