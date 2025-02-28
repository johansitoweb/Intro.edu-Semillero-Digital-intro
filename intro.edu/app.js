function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

function showSection(sectionId, element) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    // Eliminar clase active de todos los enlaces del menú
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    // Añadir la clase active al elemento que fue clickeado
    element.classList.add('active');

    // Ocultar todas las secciones adicionales
    document.getElementById('profile-section').classList.add('d-none');
    document.getElementById('privacy-section').classList.add('d-none');

    // Mostrar la sección seleccionada adicional
    document.getElementById(sectionId).classList.remove('d-none');

    // Remover "active" de todos los botones adicionales
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });

    // Agregar "active" solo al botón seleccionado adicional
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    // Mostrar la sección de perfil automáticamente si se selecciona configuración
    if (sectionId === 'configuracion') {
        document.getElementById('profile-section').classList.remove('d-none');
        document.querySelector(`[data-section="profile-section"]`).classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const graduatesContainer = document.querySelector(".graduates");
    const searchInput = document.getElementById("searchInput");
    const filterSpecialty = document.getElementById("filterSpecialty");
    const filterSkills = document.getElementById("filterSkills");

    // Datos de egresados (simulación)
    const graduates = [
        { name: "Luis Enyel Ivanol", username: "@LuisEnyel", specialty: "Web Development", skills: ["HTML", "CSS", "JavaScript"], img: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "Ana Pérez", username: "@AnaP", specialty: "Web Development", skills: ["JavaScript", "React"], img: "https://randomuser.me/api/portraits/women/2.jpg" },
        { name: "Carlos López", username: "@CarlosL", specialty: "Web Development", skills: ["HTML", "CSS"], img: "https://randomuser.me/api/portraits/men/3.jpg" },
        { name: "María Gómez", username: "@MariaG", specialty: "Graphic Design", skills: ["Photoshop", "UX/UI"], img: "https://randomuser.me/api/portraits/women/4.jpg" },
        { name: "Pedro Martínez", username: "@PedroM", specialty: "Web Development", skills: ["Node.js", "CSS"], img: "https://randomuser.me/api/portraits/men/5.jpg" },
        { name: "Lucía Fernández", username: "@LuciaF", specialty: "Graphic Design", skills: ["Illustrator", "Branding"], img: "https://randomuser.me/api/portraits/women/6.jpg" },
        { name: "Jorge Ramírez", username: "@JorgeR", specialty: "Mobile Development", skills: ["Flutter", "Dart"], img: "https://randomuser.me/api/portraits/men/7.jpg" },
        { name: "Sofía Herrera", username: "@SofiaH", specialty: "Web Development", skills: ["Vue.js", "CSS"], img: "https://randomuser.me/api/portraits/women/8.jpg" },
        { name: "Martín Castro", username: "@MartinC", specialty: "Data Science", skills: ["Python", "Machine Learning"], img: "https://randomuser.me/api/portraits/men/9.jpg" },
        { name: "Elena Rojas", username: "@ElenaR", specialty: "UI/UX Design", skills: ["Figma", "User Research"], img: "https://randomuser.me/api/portraits/women/10.jpg" },
        { name: "Fernando Díaz", username: "@FernandoD", specialty: "Cybersecurity", skills: ["Ethical Hacking", "Networking"], img: "https://randomuser.me/api/portraits/men/11.jpg" },
        { name: "Gabriela Suárez", username: "@GabrielaS", specialty: "Mobile Development", skills: ["Swift", "iOS Development"], img: "https://randomuser.me/api/portraits/women/12.jpg" },
        { name: "David Gómez", username: "@DavidG", specialty: "Backend Development", skills: ["Node.js", "Express"], img: "https://randomuser.me/api/portraits/men/13.jpg" },
        { name: "Camila Ortega", username: "@CamilaO", specialty: "Marketing Digital", skills: ["SEO", "Social Media"], img: "https://randomuser.me/api/portraits/women/14.jpg" },
        { name: "Rodrigo Méndez", username: "@RodrigoM", specialty: "Data Science", skills: ["SQL", "Power BI"], img: "https://randomuser.me/api/portraits/men/15.jpg" }
    ];

    // Función para llenar los filtros dinámicamente
    function populateFilters() {
        const specialties = [...new Set(graduates.map(g => g.specialty))];
        const skills = [...new Set(graduates.flatMap(g => g.skills))];

        // Llenar filtro de especialidades
        specialties.forEach(specialty => {
            const option = document.createElement("option");
            option.value = specialty;
            option.textContent = specialty;
            filterSpecialty.appendChild(option);
        });

        // Llenar filtro de habilidades
        skills.forEach(skill => {
            const option = document.createElement("option");
            option.value = skill;
            option.textContent = skill;
            filterSkills.appendChild(option);
        });
    }

    // Función para renderizar egresados
    function renderGraduates(data) {
        graduatesContainer.innerHTML = ""; 
        data.forEach(graduate => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${graduate.img}" class="rounded-circle mx-auto d-block mb-3" alt="Profile picture of ${graduate.name}" width="96" height="96">
                <h2 class="h5 fw-bold">${graduate.name}</h2>
                <p class="text-muted">${graduate.username}</p>
                <p class="text-primary">${graduate.specialty}</p>
                <p><strong>Habilidades:</strong> ${graduate.skills.join(", ")}</p>
                <span class="favorite"><i class="fa fa-heart"></i></span>
            `;

            card.querySelector(".favorite").addEventListener("click", function () {
                this.classList.toggle("active");
            });

            graduatesContainer.appendChild(card);
        });
    }

    // Función para filtrar egresados
    function filterGraduates() {
        const searchText = searchInput.value.toLowerCase();
        const selectedSpecialty = filterSpecialty.value;
        const selectedSkill = filterSkills.value;

        const filtered = graduates.filter(g => {
            return (
                (searchText === "" || g.name.toLowerCase().includes(searchText)) &&
                (selectedSpecialty === "" || g.specialty === selectedSpecialty) &&
                (selectedSkill === "" || g.skills.includes(selectedSkill))
            );
        });

        renderGraduates(filtered);
    }

    // Agregar eventos a los filtros
    searchInput.addEventListener("input", filterGraduates);
    filterSpecialty.addEventListener("change", filterGraduates);
    filterSkills.addEventListener("change", filterGraduates);

    // Inicializar
    populateFilters();
    renderGraduates(graduates);
});

document.getElementById("proyectos").addEventListener("click", function() {
    document.getElementById("projects-scroll").style.display = "flex";
    document.getElementById("aportes-scroll").style.display = "none";
});

document.getElementById("aportaciones").addEventListener("click", function() {
    document.getElementById("projects-scroll").style.display = "none";
    document.getElementById("aportes-scroll").style.display = "flex";
});

const trabajos = [
    {
        empresa: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
        titulo: "Web Developer",
        descripcion: "Creación de interfaces web creativas e innovadoras...",
        especialidad: "Front-end",
        horario: "Tiempo completo",
        detalles: `
            <h2>Web Developer <span>@Google</span></h2>
            <p><strong>Ubicación:</strong> Santo Domingo, Distrito Nacional</p>
            <p><strong>Horario:</strong> Tiempo completo - Lunes a Viernes</p>
            <p><strong>Requisitos:</strong> HTML, CSS, JavaScript, React, Node.js...</p>
            <button id="aplicar-btn">Aplicar ahora</button>
        `
    },
    {
        empresa: "PayPal",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
        titulo: "Back-end Developer",
        descripcion: "Desarrollo y mantenimiento de APIs escalables...",
        especialidad: "Back-end",
        horario: "Tiempo completo",
        detalles: `
            <h2>Back-end Developer <span>@PayPal</span></h2>
            <p><strong>Ubicación:</strong> Remoto</p>
            <p><strong>Horario:</strong> Tiempo completo</p>
            <p><strong>Requisitos:</strong> Node.js, Express, MongoDB...</p>
            <button id="aplicar-btn">Aplicar ahora</button>
        `
    },
    {
        empresa: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        titulo: "Cloud Engineer",
        descripcion: "Mantenimiento y optimización de servicios en la nube AWS...",
        especialidad: "Cloud Computing",
        horario: "Tiempo completo",
        detalles: `
            <h2>Cloud Engineer <span>@Amazon</span></h2>
            <p><strong>Ubicación:</strong> Seattle, WA</p>
            <p><strong>Horario:</strong> Tiempo completo</p>
            <p><strong>Requisitos:</strong> AWS, Kubernetes, Terraform...</p>
            <button id="aplicar-btn">Aplicar ahora</button>
        `
    },
    {
        empresa: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        titulo: "Software Engineer",
        descripcion: "Desarrollo de software empresarial con .NET y C#...",
        especialidad: "Full-stack",
        horario: "Tiempo completo",
        detalles: `
            <h2>Software Engineer <span>@Microsoft</span></h2>
            <p><strong>Ubicación:</strong> Redmond, WA</p>
            <p><strong>Horario:</strong> Tiempo completo</p>
            <p><strong>Requisitos:</strong> C#, .NET, Azure...</p>
            <button id="aplicar-btn">Aplicar ahora</button>
        `
    },
    {
        empresa: "Facebook",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        titulo: "Data Scientist",
        descripcion: "Análisis de datos y modelos de predicción con IA...",
        especialidad: "Data Science",
        horario: "Remoto",
        detalles: `
            <h2>Data Scientist <span>@Facebook</span></h2>
            <p><strong>Ubicación:</strong> Remoto</p>
            <p><strong>Horario:</strong> Flexible</p>
            <p><strong>Requisitos:</strong> Python, TensorFlow, SQL...</p>
            <button id="aplicar-btn">Aplicar ahora</button>
        `
    },
    {
        empresa: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
        titulo: "UX/UI Designer",
        descripcion: "Diseño de interfaces atractivas y amigables...",
        especialidad: "Diseño",
        horario: "Freelance",
        detalles: `
            <h2>UX/UI Designer <span>@Netflix</span></h2>
            <p><strong>Ubicación:</strong> Los Ángeles, CA</p>
            <p><strong>Horario:</strong> Freelance</p>
            <p><strong>Requisitos:</strong> Figma, Adobe XD, Sketch...</p>
            <button id="aplicar-btn">Aplicar ahora</button>
        `
    },
    {
        empresa: "Tesla",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
        titulo: "Embedded Systems Engineer",
        descripcion: "Desarrollo de software para sistemas embebidos...",
        especialidad: "Embedded Systems",
        horario: "Tiempo completo",
        detalles: `
            <h2>Embedded Systems Engineer <span>@Tesla</span></h2>
            <p><strong>Ubicación:</strong> Palo Alto, CA</p>
            <p><strong>Horario:</strong> Tiempo completo</p>
            <p><strong>Requisitos:</strong> C, C++, Linux, RTOS...</p>
            <button id="aplicar-btn">Aplicar ahora</button>
        `
    },  {
        empresa: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
        titulo: "Web Developer",
        descripcion: "Creación de interfaces web creativas e innovadoras...",
        especialidad: "Front-end",
        horario: "Tiempo completo",
        detalles: `
            <h2>Web Developer <span>@Google</span></h2>
            <p><strong>Ubicación:</strong> Santo Domingo, Distrito Nacional</p>
            <p><strong>Horario:</strong> Tiempo completo - Lunes a Viernes</p>
            <p><strong>Requisitos:</strong> HTML, CSS, JavaScript, React, Node.js...</p>
            <button id="aplicar-btn">Aplicar ahora</button>
        `
    }
];

// Se agregaron 15 trabajos en total. Puedes seguir añadiendo más si lo deseas.

const contenedorTrabajos = document.querySelector(".contenedor-trabajos");
const buscador = document.querySelector("#buscador-trabajos");
const filtros = {
    empresa: document.querySelector("#filtrar-empresa"),
    especialidad: document.querySelector("#filtrar-especialidad"),
    horario: document.querySelector("#filtrar-horario")
};

const detalleTrabajo = document.querySelector(".detalle-trabajo");
const contenidoDetalle = document.querySelector("#contenido-detalle");
const cerrarDetalle = document.querySelector("#cerrar-detalle");

function mostrarTrabajos() {
    contenedorTrabajos.innerHTML = "";
    const textoBusqueda = buscador.value.toLowerCase();
    const empresaFiltro = filtros.empresa.value;
    const especialidadFiltro = filtros.especialidad.value;
    const horarioFiltro = filtros.horario.value;

    const trabajosFiltrados = trabajos.filter(trabajo => {
        return (
            trabajo.titulo.toLowerCase().includes(textoBusqueda) &&
            (empresaFiltro === "" || trabajo.empresa === empresaFiltro) &&
            (especialidadFiltro === "" || trabajo.especialidad === especialidadFiltro) &&
            (horarioFiltro === "" || trabajo.horario === horarioFiltro)
        );
    });

    if (trabajosFiltrados.length === 0) {
        contenedorTrabajos.innerHTML = `<p style="color: red;">No se encontraron resultados</p>`;
        return;
    }

    trabajosFiltrados.forEach(trabajo => {
        const div = document.createElement("div");
        div.classList.add("tarjeta-trabajo");
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <img src="${trabajo.logo}" class="img-fluid" alt="${trabajo.empresa} logo" width="48" height="48">
                <i class="far fa-bookmark fs-4"></i>
            </div>
            <h2 class="h5 fw-bold mb-2">${trabajo.titulo}</h2>
            <p class="text-muted mb-3">
                ${trabajo.descripcion}
            </p>
           <div class="d-flex justify-content-between mt-auto" >
                <button class="btn btn-light text-primary ver-detalle">Detalles</button>
                <button class="btn btn-primary">Aplicar ahora</button>
            </div>
        `;
        
        div.querySelector(".ver-detalle").addEventListener("click", () => mostrarDetalles(trabajo));
        contenedorTrabajos.appendChild(div);
    });
}

function mostrarDetalles(trabajo) {
    contenidoDetalle.innerHTML = trabajo.detalles;
    detalleTrabajo.classList.remove("oculto"); // Mostrar el aside si está oculto
    detalleTrabajo.classList.add("visible");  // Aplicar la animación
}

// Evento para cerrar los detalles
cerrarDetalle.addEventListener("click", () => {
    detalleTrabajo.classList.remove("visible");
    setTimeout(() => detalleTrabajo.classList.add("oculto"), 300); // Ocultar después de la animación
});

// Eventos de búsqueda y filtro
buscador.addEventListener("input", mostrarTrabajos);
Object.values(filtros).forEach(filtro => filtro.addEventListener("change", mostrarTrabajos));

mostrarTrabajos();


document.addEventListener("DOMContentLoaded", function () {
    let foros = JSON.parse(localStorage.getItem("foros")) || [];

    const forosContainer = document.getElementById("foros");
    const nuevoForoBtn = document.createElement("button");
    const searchInput = document.getElementById("buscadorForos"); // Input de búsqueda

    nuevoForoBtn.innerHTML = "➕ Empezar nuevo foro";
    nuevoForoBtn.classList.add("crear-foro");
    nuevoForoBtn.addEventListener("click", () => {
        let titulo = prompt("Ingrese el título del nuevo foro:");
        if (titulo) {
            let nuevoForo = { id: Date.now(), titulo, categoria: "Nuevo", usuario: "@nuevo", comentarios: [] };
            foros.push(nuevoForo);
            guardarForos();
            cargarForos();
        }
    });

    function cargarForos(filtro = "") {
        if (!forosContainer) return;
        forosContainer.innerHTML = "";
        forosContainer.appendChild(nuevoForoBtn);

        let forosFiltrados = foros.filter(foro =>
            foro.titulo.toLowerCase().includes(filtro.toLowerCase())
        );

        forosFiltrados.forEach(foro => {
            let foroDiv = document.createElement("div");
            foroDiv.className = "foro";
            foroDiv.innerHTML = `
                <h4>${foro.categoria}</h4>
                <h3 onclick="abrirForo(${foro.id})">${foro.titulo}</h3>
                <p>por: ${foro.usuario}</p>
                <button onclick="abrirForo(${foro.id})">Ver</button>
                <button onclick="unirseAlForo(${foro.id})">Unirse al foro</button>
                <button onclick="eliminarForo(${foro.id})">Eliminar</button>
            `;
            forosContainer.appendChild(foroDiv);
        });
    }

    function guardarForos() {
        localStorage.setItem("foros", JSON.stringify(foros));
    }

    window.abrirForo = function (id) {
        const foro = foros.find(f => f.id === id);
        if (foro) {
            const forumDetailsContent = document.querySelector('.forum-details-content');
            forumDetailsContent.innerHTML = `
                <h3>${foro.titulo}</h3>
                <p>por: ${foro.usuario}</p>
                <div class="comentarios">
                    ${foro.comentarios.map(comentario => `<p>${comentario}</p>`).join('')}
                </div>
                <input type="text" id="nuevoComentario" placeholder="Escribe un comentario...">
                <input type="file" id="archivoComentario" accept="image/*, .pdf, .doc, .docx, .xls, .xlsx">
                <button onclick="agregarComentario(${foro.id})">Comentar</button>
            `;
            showSection('forum-details', null);
        }
    };

    window.agregarComentario = function (id) {
        const foro = foros.find(f => f.id === id);
        const nuevoComentario = document.getElementById('nuevoComentario').value;
        const archivoComentario = document.getElementById('archivoComentario').files[0];
        if (foro && nuevoComentario) {
            let comentario = nuevoComentario;
            if (archivoComentario) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    comentario += `<br><a href="${e.target.result}" download="${archivoComentario.name}">${archivoComentario.name}</a>`;
                    foro.comentarios.push(comentario);
                    guardarForos();
                    abrirForo(id);
                };
                reader.readAsDataURL(archivoComentario);
            } else {
                foro.comentarios.push(comentario);
                guardarForos();
                abrirForo(id);
            }
        }
    };

    window.unirseAlForo = function (id) {
        alert("Te has unido al foro ID: " + id);
    };

    window.eliminarForo = function (id) {
        // Filtrar el foro por ID y eliminarlo
        foros = foros.filter(foro => foro.id !== id);
        guardarForos();
        cargarForos(); // Actualizar la lista después de eliminar el foro
    };

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            cargarForos(this.value);
        });
    }

    cargarForos();
}); 

document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos los botones de la configuración
    const configButtons = document.querySelectorAll(".list-group-item");
    const sections = {
        "profile-section": document.getElementById("profile-section"),
        "privacy-section": document.getElementById("privacy-section")
    };

    // Agregamos el evento click a cada botón
    configButtons.forEach(button => {
        button.addEventListener("click", function () {
            const sectionId = this.getAttribute("data-section");

            // Ocultar todas las secciones
            Object.values(sections).forEach(section => section.classList.add("d-none"));

            // Mostrar la sección seleccionada
            sections[sectionId].classList.remove("d-none");

            // Remover "active" de todos los botones
            configButtons.forEach(btn => btn.classList.remove("active"));

            // Marcar el botón actual como activo
            this.classList.add("active");
        });
    });

    // Conectar la configuración con el perfil
    const profileImage = document.querySelector(".profile-card img");
    const profileName = document.getElementById("profile-name");
    const profileUsername = document.getElementById("profile-username");
    const profileLocation = document.getElementById("profile-location");
    const profileSpecialty = document.getElementById("profile-specialty");
    const profileGithub = document.getElementById("profile-github");
    const profileLinkedin = document.getElementById("profile-linkedin");
    const profileEmail = document.getElementById("profile-email");
    const profileWebsite = document.getElementById("profile-website");

    const configImageInput = document.querySelector("#profile-section .fa-camera");
    const configNameInput = document.getElementById("config-name");
    const configUsernameInput = document.getElementById("config-username");
    const configLocationInput = document.getElementById("config-location");
    const configSpecialtyInput = document.getElementById("config-specialty");
    const configGithubInput = document.getElementById("config-github");
    const configLinkedinInput = document.getElementById("config-linkedin");
    const configEmailInput = document.getElementById("config-email");
    const configWebsiteInput = document.getElementById("config-website");

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    configImageInput.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    configNameInput.addEventListener("input", () => {
        profileName.innerHTML = `<i class="bi bi-person-circle"></i> ${configNameInput.value}`;
    });

    configUsernameInput.addEventListener("input", () => {
        profileUsername.innerHTML = `<i class="bi bi-person-circle"></i> ${configUsernameInput.value}`;
    });

    configLocationInput.addEventListener("input", () => {
        profileLocation.innerHTML = `<i class="bi bi-geo-alt"></i> ${configLocationInput.value}`;
    });

    configSpecialtyInput.addEventListener("input", () => {
        profileSpecialty.innerHTML = `<i class="bi bi-mortarboard"></i> ${configSpecialtyInput.value}`;
    });

    configGithubInput.addEventListener("input", () => {
        profileGithub.innerHTML = `<i class="bi bi-github"></i> ${configGithubInput.value}`;
    });

    configLinkedinInput.addEventListener("input", () => {
        profileLinkedin.innerHTML = `<i class="bi bi-linkedin"></i> ${configLinkedinInput.value}`;
    });

    configEmailInput.addEventListener("input", () => {
        profileEmail.innerHTML = `<i class="bi bi-envelope"></i> ${configEmailInput.value}`;
    });

    configWebsiteInput.addEventListener("input", () => {
        profileWebsite.innerHTML = `<i class="bi bi-globe"></i> ${configWebsiteInput.value}`;
    });

    document.body.appendChild(fileInput);

    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        profileName.textContent = userData.name;
        profileUsername.textContent = userData.username;
        profileLocation.textContent = userData.location;
        profileSpecialty.textContent = userData.specialty;
        profileGithub.textContent = userData.github;
        profileLinkedin.textContent = userData.linkedin;
        profileEmail.textContent = userData.email;
        profileWebsite.textContent = userData.website;
    }

    // Change background functionality
    const changeBackgroundBtn = document.getElementById('change-background-btn');
    const portadaPerfil = document.querySelector('.portada-perfil');
    const coverInput = document.createElement('input');
    coverInput.type = 'file';
    coverInput.accept = 'image/*';
    coverInput.style.display = 'none';

    changeBackgroundBtn.addEventListener('click', () => {
        coverInput.click();
    });

    coverInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                portadaPerfil.style.backgroundImage = `url(${e.target.result})`;
                portadaPerfil.style.backgroundSize = 'cover';
                portadaPerfil.style.backgroundPosition = 'center';
            };
            reader.readAsDataURL(file);
        }
    });

    document.body.appendChild(coverInput);
});

// Dashboard functionality
document.addEventListener("DOMContentLoaded", function () {
    const dashboardForm = document.getElementById("dashboard-form");
    const internshipContainer = document.getElementById("internship-container");

    let internships = JSON.parse(localStorage.getItem("internships")) || [];

    function renderInternships() {
        internshipContainer.innerHTML = "";
        internships.forEach(internship => {
            const div = document.createElement("div");
            div.classList.add("internship-card");
            div.innerHTML = `
                <h3>${internship.title}</h3>
                <p><strong>Company:</strong> ${internship.company}</p>
                <p><strong>Description:</strong> ${internship.description}</p>
                <p><strong>Location:</strong> ${internship.location}</p>
                <p><strong>Duration:</strong> ${internship.duration}</p>
                <button class="delete-internship" data-id="${internship.id}">Delete</button>
            `;
            internshipContainer.appendChild(div);
        });
    }

    dashboardForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newInternship = {
            id: Date.now(),
            title: dashboardForm.title.value,
            company: dashboardForm.company.value,
            description: dashboardForm.description.value,
            location: dashboardForm.location.value,
            duration: dashboardForm.duration.value
        };
        internships.push(newInternship);
        localStorage.setItem("internships", JSON.stringify(internships));
        renderInternships();
        dashboardForm.reset();
    });

    internshipContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-internship")) {
            const id = e.target.getAttribute("data-id");
            internships = internships.filter(internship => internship.id !== parseInt(id));
            localStorage.setItem("internships", JSON.stringify(internships));
            renderInternships();
        }
    });

    renderInternships();
});