<?php
session_start();
$conn = new mysqli("localhost", "root", "", "plataforma_estudiantes");

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario']);
    $password = password_hash($_POST['contraseña'], PASSWORD_BCRYPT);
    $tipo_usuario = $_POST['tipo_usuario'];

    // Validar que el usuario no exista previamente
    $sql_check = "SELECT id_usuario FROM Usuarios WHERE usuario = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $usuario);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        echo "<script>alert('Error: El usuario ya existe. Intente con otro nombre de usuario.'); window.location.href = 'registro.html';</script>";
        exit();
    }
    $stmt_check->close();

    // Insertar usuario en la tabla Usuarios
    $sql = "INSERT INTO Usuarios (usuario, contraseña, tipo_usuario) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $usuario, $password, $tipo_usuario);

    if ($stmt->execute()) {
        $id_usuario = $stmt->insert_id; // Obtener el ID del usuario recién creado

        // Validar matrícula y evitar duplicados
        if ($tipo_usuario == 'estudiante' || $tipo_usuario == 'maestro') {
            $matricula = trim($_POST['matricula']);
            if (empty($matricula)) {
                echo "<script>alert('Error: La matrícula no puede estar vacía.'); window.location.href = 'registro.html';</script>";
                exit();
            }

            // Validar que la matricula no exista previamente
            if ($tipo_usuario == 'estudiante') {
                $sql_check_matricula = "SELECT id_usuario FROM Estudiantes WHERE matricula = ?";
                $stmt_check_matricula = $conn->prepare($sql_check_matricula);
                $stmt_check_matricula->bind_param("s", $matricula);
                $stmt_check_matricula->execute();
                $stmt_check_matricula->store_result();

                if ($stmt_check_matricula->num_rows > 0) {
                    echo "<script>alert('Error: La matrícula de estudiante ya existe. Intente con otro número de matrícula.'); window.location.href = 'registro.html';</script>";
                    exit();
                }
                $stmt_check_matricula->close();
            } elseif ($tipo_usuario == 'maestro') {
                $sql_check_matricula = "SELECT id_usuario FROM Maestros WHERE matricula = ?";
                $stmt_check_matricula = $conn->prepare($sql_check_matricula);
                $stmt_check_matricula->bind_param("s", $matricula);
                $stmt_check_matricula->execute();
                $stmt_check_matricula->store_result();

                if ($stmt_check_matricula->num_rows > 0) {
                    echo "<script>alert('Error: La matrícula de maestro ya existe. Intente con otro número de matrícula.'); window.location.href = 'registro.html';</script>";
                    exit();
                }
                $stmt_check_matricula->close();
            }
        }

        // Insertar en la tabla correspondiente
        if ($tipo_usuario == 'estudiante') {
            $sql = "INSERT INTO Estudiantes (id_usuario, nombre, matricula, ubicacion, especialidad, github, linkedin, correo, sitio_web) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("issssssss", $id_usuario, $_POST['nombre'], $matricula, $_POST['ubicacion'], $_POST['especialidad'], $_POST['github'], $_POST['linkedin'], $_POST['correo'], $_POST['sitio_web']);
        } elseif ($tipo_usuario == 'maestro') {
            $sql = "INSERT INTO Maestros (id_usuario, nombre, matricula, especialidad) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("isss", $id_usuario, $_POST['nombre'], $matricula, $_POST['especialidad']);
        } elseif ($tipo_usuario == 'empresa') {
            $sql = "INSERT INTO Empresas (id_usuario, nombre) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("is", $id_usuario, $_POST['nombre_empresa']);
        }

        if ($stmt->execute()) {
            // Iniciar sesión
            $_SESSION['id_usuario'] = $id_usuario;
            $_SESSION['usuario'] = $usuario;
            $_SESSION['tipo_usuario'] = $tipo_usuario;

            echo "<script>alert('Registro exitoso.'); window.location.href = '../intro.edu/index.html';</script>";
        } else {
            echo "<script>alert('Error al registrar en la tabla correspondiente.');</script>";
        }
    } else {
        echo "<script>alert('Error al registrar usuario.');</script>";
    }

    $stmt->close();
}

$conn->close();
?>
