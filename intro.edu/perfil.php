<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["error" => "No ha iniciado sesión"]);
    exit();
}

$conn = new mysqli("localhost", "root", "", "plataforma_estudiantes");

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión con la base de datos."]);
    exit();
}

$id_usuario = $_SESSION['id_usuario'];
$tipo_usuario = $_SESSION['tipo_usuario'];

// Obtener datos básicos del usuario
$sql = "SELECT usuario FROM Usuarios WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Error en la preparación de la consulta SQL."]);
    exit();
}

$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$stmt->bind_result($usuario);
$stmt->fetch();
$stmt->close();

// Obtener datos adicionales según el tipo de usuario
if ($tipo_usuario == "estudiante") {
    $sql = "SELECT nombre, matricula, ubicacion, especialidad, github, linkedin, correo, sitio_web FROM Estudiantes WHERE id_usuario = ?";
} elseif ($tipo_usuario == "maestro") {
    $sql = "SELECT nombre, matricula, especialidad FROM Maestros WHERE id_usuario = ?";
} elseif ($tipo_usuario == "empresa") {
    $sql = "SELECT nombre FROM Empresas WHERE id_usuario = ?";
}

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Error en la preparación de la consulta SQL para obtener datos adicionales."]);
    exit();
}

$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(["error" => "No se encontraron datos para este usuario."]);
    exit();
}

$userData = $result->fetch_assoc();
$stmt->close();
$conn->close();

// Enviar datos en formato JSON
header('Content-Type: application/json');
echo json_encode([
    "usuario" => $usuario,
    "tipo_usuario" => $tipo_usuario,
    "datos" => $userData
]);
?>
