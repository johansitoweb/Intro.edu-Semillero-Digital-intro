<?php
session_start(); // Iniciar sesión para mantener la sesión del usuario

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "plataforma_estudiantes");

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// Comprobar si se enviaron datos desde el formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST['usuario'] ?? '';
    $password = $_POST['contraseña'] ?? '';

    // Validar que no estén vacíos
    if (empty($usuario) || empty($password)) {
        die(json_encode(["error" => "Error: Debes completar todos los campos."]));
    }

    // Consultar si el usuario existe en la base de datos
    $sql = "SELECT id_usuario, usuario, contraseña, tipo_usuario FROM Usuarios WHERE usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->store_result();

    // Si el usuario existe
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id_usuario, $usuario_db, $hash_password, $tipo_usuario);
        $stmt->fetch();

        // Verificar la contraseña encriptada
        if (password_verify($password, $hash_password)) {
            // Iniciar sesión
            $_SESSION['id_usuario'] = $id_usuario;
            $_SESSION['usuario'] = $usuario_db;
            $_SESSION['tipo_usuario'] = $tipo_usuario;

            // Redirigir al perfil después del inicio de sesión exitoso
            echo json_encode(["redirect" => "../intro.edu/index.html"]);
            exit();
        } else {
            echo json_encode(["error" => "Contraseña incorrecta."]);
        }
    } else {
        echo json_encode(["error" => "Usuario no encontrado."]);
    }

    $stmt->close();
}

$conn->close();
?>
