<?php
session_start();
$conn = new mysqli("localhost", "root", "", "plataforma_estudiantes");

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión a la base de datos"]));
}

// Verificar si se envió el nombre de usuario
if (!isset($_GET['usuario'])) {
    die(json_encode(["error" => "Falta el parámetro 'usuario'"]));
}

$usuario = $_GET['usuario'];

// Buscar el usuario en la base de datos
$sql = "SELECT id_usuario, usuario, tipo_usuario FROM Usuarios WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();
$userData = $result->fetch_assoc();
$stmt->close();

if (!$userData) {
    die(json_encode(["error" => "Usuario no encontrado"]));
}

// Obtener datos adicionales según el tipo de usuario
$id_usuario = $userData['id_usuario'];
$tipo_usuario = $userData['tipo_usuario'];

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
$extraData = $result->fetch_assoc();
$stmt->close();
$conn->close();

// Devolver los datos en formato JSON
echo json_encode([
    "usuario" => $userData["usuario"],
    "tipo_usuario" => $userData["tipo_usuario"],
    "datos" => $extraData
]);
?>
