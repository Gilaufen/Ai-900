document.addEventListener("DOMContentLoaded", function() {
  const translateBtn = document.getElementById("translateBtn");
  const inputText = document.getElementById("inputText");
  const outputDiv = document.getElementById("output");
  
  translateBtn.addEventListener("click", function() {
      const textToTranslate = inputText.value;
      if (textToTranslate.trim() === "") {
          outputDiv.innerHTML = "Por favor, ingresa un texto para traducir.";
          return;
      }
      
      // Conecta con el endpoint de traducción (reemplaza con tu endpoint real)
      const endpoint = "URL_DEL_ENDPOINT_DE_TRADUCCION";
      fetch(endpoint, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              text: textToTranslate
          })
      })
      .then(response => response.json())
      .then(data => {
          const translatedText = data.translatedText;
          outputDiv.innerHTML = `<strong>Texto traducido:</strong><br>${translatedText}`;
      })
      .catch(error => {
          outputDiv.innerHTML = "Ocurrió un error al traducir el texto.";
      });
  });
});
