// Función para mostrar la imagen en tiempo real al cambiar la URL
document.getElementById('urlImagen').addEventListener('input', function() {
    const urlImagen = this.value;
    const imagenContainer = document.getElementById('imagenContainer');
    
    // Crear un elemento de imagen y establecer la fuente (URL) en función de la entrada del usuario
    const imagen = document.createElement('img');
    imagen.src = urlImagen;
    imagen.className = 'img-fluid'; // Clase para hacer que la imagen sea responsiva

    // Limpiar el contenido anterior y agregar la nueva imagen
    imagenContainer.innerHTML = '';
    imagenContainer.appendChild(imagen);
});
