<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.html");
    exit();
}

$conn = new mysqli("localhost", "root", "", "plataforma_estudiantes");

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión"]));
}

$id_usuario = $_SESSION['id_usuario'];
$tipo_usuario = $_SESSION['tipo_usuario'];

// Obtener datos del usuario
$sql = "SELECT usuario FROM Usuarios WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$stmt->bind_result($usuario);
$stmt->fetch();
$stmt->close();

// Obtener datos específicos según el tipo de usuario
if ($tipo_usuario == "estudiante") {
    $sql = "SELECT nombre, matricula, ubicacion, especialidad, github, linkedin, correo, sitio_web FROM Estudiantes WHERE id_usuario = ?";
} elseif ($tipo_usuario == "maestro") {
    $sql = "SELECT nombre, matricula, especialidad FROM Maestros WHERE id_usuario = ?";
} elseif ($tipo_usuario == "empresa") {
    $sql = "SELECT nombre FROM Empresas WHERE id_usuario = ?";
}

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();
$userData = $result->fetch_assoc();
$stmt->close();
$conn->close();

// Convertir datos a JSON
header('Content-Type: application/json');
echo json_encode([
    "usuario" => $usuario,
    "tipo_usuario" => $tipo_usuario,
    "datos" => $userData
]);
?>
