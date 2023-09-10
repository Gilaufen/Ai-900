document.addEventListener("DOMContentLoaded", function() {
  const detectButton = document.getElementById("detectButton");
  const resultDiv = document.getElementById("result");
  
  detectButton.addEventListener("click", function() {
    const imageInput = document.getElementById("imageInput");
    const file = imageInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      // Reemplaza 'URL_DEL_ENDPOINT' con la URL real de tu endpoint de API
      fetch("URL_DEL_ENDPOINT", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Actualiza el contenido de 'resultDiv' con los resultados de detección
        resultDiv.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  });
});
