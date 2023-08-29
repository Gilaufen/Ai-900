document.getElementById('regression-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const inputValue = parseFloat(document.getElementById('input_x').value);

  const apiUrl = 'URL_DEL_ENDPOINT_DE_LA_API'; // Reemplaza esto con la URL real de tu API

  fetch(apiUrl, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputValue })
  })
  .then(response => response.json())
  .then(data => {
      const resultDiv = document.getElementById('prediction-result');
      resultDiv.innerHTML = `El resultado de la predicción es: ${data.prediction}`;
  })
  .catch(error => {
      console.error('Error al obtener el resultado de la API:', error);
  });
});
