document.addEventListener("DOMContentLoaded", function () {
    fetch("perfil.php") // Llamamos a `perfil.php` para obtener los datos del usuario
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            // Obtener elementos del perfil
            document.getElementById("profile-name").textContent = data.datos.nombre || "Usuario Desconocido";
            document.getElementById("profile-username").textContent = "@" + data.usuario;
            document.getElementById("profile-location").textContent = data.datos.ubicacion || "Ubicación no registrada";
            document.getElementById("profile-specialty").textContent = data.datos.especialidad || "Especialidad no registrada";
            document.getElementById("profile-github").textContent = data.datos.github || "No disponible";
            document.getElementById("profile-github").href = data.datos.github ? data.datos.github : "#";
            document.getElementById("profile-linkedin").textContent = data.datos.linkedin || "No disponible";
            document.getElementById("profile-linkedin").href = data.datos.linkedin ? data.datos.linkedin : "#";
            document.getElementById("profile-email").textContent = data.datos.correo || "Correo no registrado";
            document.getElementById("profile-email").href = "mailto:" + data.datos.correo;
            document.getElementById("profile-website").textContent = data.datos.sitio_web || "No disponible";
            document.getElementById("profile-website").href = data.datos.sitio_web ? data.datos.sitio_web : "#";
        })
        .catch(error => console.error("Error al cargar el perfil:", error));
});
