document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginFormElement").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch("login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error); // Muestra el error en un alert
            } else if (data.redirect) {
                window.location.href = data.redirect; // Redirige al perfil
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
