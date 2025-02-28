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
    die("Error de conexión: " . $conn->connect_error);
}

$id_usuario = $_SESSION['id_usuario'];
$tipo_usuario = $_SESSION['tipo_usuario'];

// Obtener los datos básicos del usuario
$sql = "SELECT usuario FROM Usuarios WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
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
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();
$userData = $result->fetch_assoc();
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4 w-50">
        <h2 class="text-center">Perfil de Usuario</h2>
        <p><strong>Usuario:</strong> <?php echo htmlspecialchars($usuario); ?></p>
        <p><strong>Tipo de Usuario:</strong> <?php echo ucfirst($tipo_usuario); ?></p>

        <?php if ($tipo_usuario == "estudiante"): ?>
            <p><strong>Nombre:</strong> <?php echo htmlspecialchars($userData['nombre']); ?></p>
            <p><strong>Matrícula:</strong> <?php echo htmlspecialchars($userData['matricula']); ?></p>
            <p><strong>Ubicación:</strong> <?php echo htmlspecialchars($userData['ubicacion']); ?></p>
            <p><strong>Especialidad:</strong> <?php echo htmlspecialchars($userData['especialidad']); ?></p>
            <p><strong>GitHub:</strong> <a href="<?php echo htmlspecialchars($userData['github']); ?>" target="_blank"><?php echo htmlspecialchars($userData['github']); ?></a></p>
            <p><strong>LinkedIn:</strong> <a href="<?php echo htmlspecialchars($userData['linkedin']); ?>" target="_blank"><?php echo htmlspecialchars($userData['linkedin']); ?></a></p>
            <p><strong>Correo:</strong> <?php echo htmlspecialchars($userData['correo']); ?></p>
            <p><strong>Sitio Web:</strong> <a href="<?php echo htmlspecialchars($userData['sitio_web']); ?>" target="_blank"><?php echo htmlspecialchars($userData['sitio_web']); ?></a></p>
        
        <?php elseif ($tipo_usuario == "maestro"): ?>
            <p><strong>Nombre:</strong> <?php echo htmlspecialchars($userData['nombre']); ?></p>
            <p><strong>Matrícula:</strong> <?php echo htmlspecialchars($userData['matricula']); ?></p>
            <p><strong>Especialidad:</strong> <?php echo htmlspecialchars($userData['especialidad']); ?></p>

        <?php elseif ($tipo_usuario == "empresa"): ?>
            <p><strong>Nombre de la Empresa:</strong> <?php echo htmlspecialchars($userData['nombre']); ?></p>
        <?php endif; ?>

        <a href="logout.php" class="btn btn-danger w-100">Cerrar Sesión</a>
    </div>
</body>
</html>
