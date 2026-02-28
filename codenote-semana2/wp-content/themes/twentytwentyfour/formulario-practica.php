<?php
// Procesamiento del formulario
$mensaje = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recogemos y saneamos los datos
    $nombre = htmlspecialchars($_POST['nombre']);
    $edad = htmlspecialchars($_POST['edad']);
    $sexo = htmlspecialchars($_POST['sexo']);
    
    // Personalizamos el mensaje de salida
    $mensaje = "¡Hola, $nombre! Tienes $edad años y tu sexo es $sexo. Gracias por enviar el formulario.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Práctica Semana 1 - Mejorada</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js" defer></script>
</head>
<body>
    <header>
        <h1>Registro de Usuario</h1>
    </header>

    <main>
        <section>
            <h2>Formulario de entrada</h2>
            <form method="post" action="">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>

                <label for="edad">Edad:</label>
                <input type="number" id="edad" name="edad" min="1" max="120" required>

                <label for="sexo">Sexo:</label>
                <select id="sexo" name="sexo" required>
                    <option value="">Selecciona una opción</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Otro">Otro</option>
                </select>

                <button type="submit">Enviar</button>
            </form>

            <?php
            if ($mensaje !== "") {
                echo "<div class='mensaje'>$mensaje</div>";
            }
            ?>
        </section>
    </main>

    <footer>
        <p>Práctica de PHP</p>
    </footer>
</body>
</html>