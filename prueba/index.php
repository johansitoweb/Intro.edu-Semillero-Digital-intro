<?php
// 1. Conexión a la base de datos
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

<?php include 'db_connect.php'; ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma Estudiantes</title>
    <link rel="stylesheet" href="style.css">  <!-- Enlace al archivo de estilos CSS -->
</head>
<body>
    <h1>Usuarios</h1>
    <?php
    // Consulta para obtener todos los usuarios
    $sql = "SELECT id_usuario, usuario, tipo_usuario FROM Usuarios";
    $result = $conn->query($sql);

    // Verifica si hay resultados
    if ($result->num_rows > 0) {
        // Mostrar datos en una tabla HTML
        echo "<table><tr><th>ID Usuario</th><th>Usuario</th><th>Tipo de Usuario</th></tr>";

        // Salida de cada fila de datos
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["id_usuario"]. "</td><td>" . $row["usuario"]. "</td><td>" . $row["tipo_usuario"]. "</td></tr>";
        }

        echo "</table>";
    } else {
        echo "0 resultados";
    }
    ?>

    <h1>Estudiantes</h1>
    <?php
    // Consulta para obtener todos los estudiantes
    $sql = "SELECT E.id_usuario, E.nombre, E.matricula, E.correo, E.ubicacion, E.especialidad 
            FROM Estudiantes E
            JOIN Usuarios U ON E.id_usuario = U.id_usuario";
    $result = $conn->query($sql);

    // Verifica si hay resultados
    if ($result->num_rows > 0) {
        // Mostrar datos en una tabla HTML
        echo "<table><tr><th>ID Usuario</th><th>Nombre</th><th>Matricula</th><th>Correo</th><th>Ubicación</th><th>Especialidad</th></tr>";

        // Salida de cada fila de datos
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["id_usuario"]. "</td><td>" . $row["nombre"]. "</td><td>" . $row["matricula"]. "</td><td>" . $row["correo"]. "</td><td>" . $row["ubicacion"]. "</td><td>" . $row["especialidad"]. "</td></tr>";
        }

        echo "</table>";
    } else {
        echo "0 resultados";
    }
    ?>

    <h1>Proyectos</h1>
    <?php
    // Consulta para obtener todos los proyectos
    $sql = "SELECT P.id_proyecto, P.nombre, P.descripcion, U.usuario 
            FROM Proyectos P
            JOIN Usuarios U ON P.id_usuario = U.id_usuario";
    $result = $conn->query($sql);

    // Verifica si hay resultados
    if ($result->num_rows > 0) {
        // Mostrar datos en una tabla HTML
        echo "<table><tr><th>ID Proyecto</th><th>Nombre</th><th>Descripción</th><th>Usuario Publicador</th></tr>";

        // Salida de cada fila de datos
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["id_proyecto"]. "</td><td>" . $row["nombre"]. "</td><td>" . $row["descripcion"]. "</td><td>" . $row["usuario"]. "</td></tr>";
        }

        echo "</table>";
    } else {
        echo "0 resultados";
    }
    ?>

    <h1>Trabajos</h1>
    <?php
    // Consulta para obtener todos los trabajos
    $sql = "SELECT T.id_trabajo, T.ubicacion, T.horario, T.requisitos, E.nombre AS empresa 
            FROM Trabajos T
            JOIN Empresas E ON T.id_empresa = E.id_usuario";
    $result = $conn->query($sql);

    // Verifica si hay resultados
    if ($result->num_rows > 0) {
        // Mostrar datos en una tabla HTML
        echo "<table><tr><th>ID Trabajo</th><th>Ubicación</th><th>Horario</th><th>Requisitos</th><th>Empresa</th></tr>";

        // Salida de cada fila de datos
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["id_trabajo"]. "</td><td>" . $row["ubicacion"]. "</td><td>" . $row["horario"]. "</td><td>" . $row["requisitos"]. "</td><td>" . $row["empresa"]. "</td></tr>";
        }

        echo "</table>";
    } else {
        echo "0 resultados";
    }
    ?>

    <?php
    // Cerrar conexión
    $conn->close();
    ?>
</body>
</html>