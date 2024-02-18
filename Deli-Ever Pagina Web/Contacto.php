<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "formulario_contacto";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir datos del formulario
$nombre = $_POST['introducir_nombre'];
$email = $_POST['introducir_email'];
$telefono = $_POST['introducir_telefono'];
$asunto = $_POST['introducir_asunto'];
$mensaje = $_POST['introducir_mensaje'];

// Insertar datos en la base de datos
$sql = "INSERT INTO contacto (nombre, email, telefono, asunto, mensaje) VALUES ('$nombre', '$email', '$telefono', '$asunto', '$mensaje')";

if ($conn->query($sql) === TRUE) {
    echo "Formulario enviado con éxito";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>