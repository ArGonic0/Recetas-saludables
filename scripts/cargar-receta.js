// Función para obtener el valor de un parámetro en la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtenemos el nombre de la receta desde el parámetro "receta"
const recetaNombre = getQueryParam("receta");

if (recetaNombre) {
    // Ruta al JSON correspondiente
    const rutaReceta = `../recetas/${recetaNombre}.json`;

    fetch(rutaReceta)
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar la receta");
            return response.json();
        })
        .then(receta => {
            // Mostrar título y descripción
            document.getElementById("titulo").textContent = receta.titulo;
            document.getElementById("descripcion").textContent = receta.descripcion;

            // Mostrar ingredientes
            const ulIngredientes = document.getElementById("ingredientes");
            ulIngredientes.innerHTML = ""; // limpiar
            receta.ingredientes.forEach(i => {
                const li = document.createElement("li");
                li.textContent = i;
                ulIngredientes.appendChild(li);
            });

            // Mostrar pasos
            const olPasos = document.getElementById("pasos");
            olPasos.innerHTML = ""; // limpiar
            receta.pasos.forEach(p => {
                const li = document.createElement("li");
                li.textContent = p;
                olPasos.appendChild(li);
            });
        })
        .catch(err => console.error(err));
} else {
    // Si no hay parámetro, se puede mostrar un mensaje
    document.getElementById("titulo").textContent = "Seleccione una receta de la lista";
}
