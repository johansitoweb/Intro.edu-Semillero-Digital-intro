<?php
session_start();
$conn = new mysqli("localhost", "root", "", "plataforma_estudiantes");

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario']);
    $password = trim($_POST['contraseña']);

    // Validar que los campos no estén vacíos
    if (empty($usuario) || empty($password)) {
        die("Error: Debes completar todos los campos.");
    }

    // Buscar el usuario en la base de datos
    $sql = "SELECT id_usuario, usuario, contraseña, tipo_usuario FROM Usuarios WHERE usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->store_result();

    // Si el usuario existe
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id_usuario, $usuario_db, $hash_password, $tipo_usuario);
        $stmt->fetch();

        // Verificar la contraseña
        if (password_verify($password, $hash_password)) {
            // Guardar datos en sesión
            $_SESSION['id_usuario'] = $id_usuario;
            $_SESSION['usuario'] = $usuario_db;
            $_SESSION['tipo_usuario'] = $tipo_usuario;

            // Redirigir a `perfil.php`
            header("Location: perfil.php");
            exit();
        } else {
            echo "Error: Contraseña incorrecta.";
        }
    } else {
        echo "Error: Usuario no encontrado.";
    }

    $stmt->close();
}

$conn->close();
?>
