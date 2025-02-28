document.getElementById("search-button").addEventListener("click", function() {
    const username = document.getElementById("search-username").value.trim();

    if (username === "") {
        alert("Por favor, ingrese un nombre de usuario.");
        return;
    }

    fetch(`buscar_usuario.php?usuario=${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("user-info").innerHTML = `<p class="text-danger">${data.error}</p>`;
            } else {
                let userInfoHTML = `
                    <p><strong>Usuario:</strong> ${data.usuario}</p>
                    <p><strong>Tipo de Usuario:</strong> ${data.tipo_usuario}</p>
                `;

                if (data.datos) {
                    if (data.tipo_usuario === "estudiante") {
                        userInfoHTML += `
                            <p><strong>Nombre:</strong> ${data.datos.nombre || "N/A"}</p>
                            <p><strong>Matrícula:</strong> ${data.datos.matricula || "N/A"}</p>
                            <p><strong>Ubicación:</strong> ${data.datos.ubicacion || "N/A"}</p>
                            <p><strong>Especialidad:</strong> ${data.datos.especialidad || "N/A"}</p>
                            <p><strong>GitHub:</strong> <a href="${data.datos.github}" target="_blank">${data.datos.github || "N/A"}</a></p>
                            <p><strong>LinkedIn:</strong> <a href="${data.datos.linkedin}" target="_blank">${data.datos.linkedin || "N/A"}</a></p>
                            <p><strong>Correo:</strong> <a href="mailto:${data.datos.correo}">${data.datos.correo || "N/A"}</a></p>
                            <p><strong>Sitio Web:</strong> <a href="${data.datos.sitio_web}" target="_blank">${data.datos.sitio_web || "N/A"}</a></p>
                        `;
                    } else if (data.tipo_usuario === "maestro") {
                        userInfoHTML += `
                            <p><strong>Nombre:</strong> ${data.datos.nombre || "N/A"}</p>
                            <p><strong>Matrícula:</strong> ${data.datos.matricula || "N/A"}</p>
                            <p><strong>Especialidad:</strong> ${data.datos.especialidad || "N/A"}</p>
                        `;
                    } else if (data.tipo_usuario === "empresa") {
                        userInfoHTML += `<p><strong>Nombre de la Empresa:</strong> ${data.datos.nombre || "N/A"}</p>`;
                    }
                }

                document.getElementById("user-info").innerHTML = userInfoHTML;
            }
        })
        .catch(error => console.error("Error al buscar el usuario:", error));
});
