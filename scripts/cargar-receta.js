let recetasData = [];

// Cargar todas las recetas de una sola vez
fetch("../recetas.json")
    .then(res => res.json())
    .then(data => {
        recetasData = data;
        renderLista();
        renderRecetas();
    });

    // Renderiza la lista de botones
    function renderLista() {
    const lista = document.getElementById("lista-recetas");
    lista.innerHTML = "";

    recetasData.forEach(r => {
        const li = document.createElement("li");
        const boton = document.createElement("button");
        boton.textContent = r.titulo;

        boton.addEventListener("click", () => {
        mostrarReceta(r.id);
        });

        li.appendChild(boton);
        lista.appendChild(li);
    });
    }

    // Renderiza todas las recetas pero ocultas
    function renderRecetas() {
    const contenedor = document.getElementById("contenedor-recetas");
    contenedor.innerHTML = "";

    recetasData.forEach(r => {
        const section = document.createElement("div");
        section.id = r.id;
        section.classList.add("receta");
        section.style.display = "none";

        section.innerHTML = `
        <h2>${r.titulo}</h2>
        <p>${r.descripcion}</p>
        <h3>Ingredientes</h3>
        <ul>${r.ingredientes.map(i => `<li>${i}</li>`).join("")}</ul>
        <h3>Pasos</h3>
        <ol>${r.pasos.map(p => `<li>${p}</li>`).join("")}</ol>
        `;

        contenedor.appendChild(section);
    });
    }

    // Mostrar solo la receta seleccionada
    function mostrarReceta(id) {
    document.querySelectorAll(".receta").forEach(sec => {
        sec.style.display = sec.id === id ? "block" : "none";
    });
}
