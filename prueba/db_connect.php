<?php
$servername = "localhost";  // o la dirección de tu servidor de base de datos
$username = "root";         // tu nombre de usuario de base de datos
$password = "";             // tu contraseña de base de datos
$dbname = "plataforma_estudiantes";  // nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
