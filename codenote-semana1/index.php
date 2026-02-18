<?php
// Procesamiento del formulario
$mensaje = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $mensaje = "¡Hola, $nombre! Gracias por enviar el formulario.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Práctica Semana 1</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js" defer></script>
</head>
<body>
    <header>
        <h1>Bienvenido a la práctica de PHP</h1>
    </header>

    <main>
        <section>
            <h2>Formulario de entrada</h2>
            <form method="post" action="">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                <button type="submit">Enviar</button>
            </form>

            <?php
            if ($mensaje !== "") {
                echo "<p class='mensaje'>$mensaje</p>";
            }
            ?>
        </section>
    </main>

    <footer>
        <p>Práctica de PHP - Semana 1</p>
    </footer>
</body>
</html>