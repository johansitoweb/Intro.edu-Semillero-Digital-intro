<?php
session_start();
$conn = new mysqli("localhost", "root", "", "plataforma_estudiantes");

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión con la base de datos."]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario']);
    $password = trim($_POST['contraseña']);

    // Validar campos vacíos
    if (empty($usuario) || empty($password)) {
        echo json_encode(["error" => "Por favor, complete todos los campos."]);
        exit();
    }

    // Buscar el usuario en la base de datos
    $sql = "SELECT id_usuario, usuario, contraseña, tipo_usuario FROM Usuarios WHERE usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id_usuario, $usuario_db, $hash_password, $tipo_usuario);
        $stmt->fetch();

        // Verificar la contraseña
        if (password_verify($password, $hash_password)) {
            // Guardar en sesión
            $_SESSION['id_usuario'] = $id_usuario;
            $_SESSION['usuario'] = $usuario_db;
            $_SESSION['tipo_usuario'] = $tipo_usuario;

            // Redirigir a la página principal donde está `profile-card`
            echo json_encode(["redirect" => "index.html"]);
            exit();
        } else {
            echo json_encode(["error" => "Contraseña incorrecta."]);
            exit();
        }
    } else {
        echo json_encode(["error" => "Usuario no encontrado."]);
        exit();
    }

    $stmt->close();
}

$conn->close();
?>
