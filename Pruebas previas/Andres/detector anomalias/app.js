document.getElementById('anomaly-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const data = document.getElementById('dataInput').value;
  
  // Conectar al endpoint de detección de anomalías
  const endpointURL = 'URL_DEL_ENDPOINT'; // Reemplazar con la URL real del endpoint
  const response = await fetch(endpointURL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: data })
  });

  if (response.ok) {
      const result = await response.json();
      displayResult(result);
  } else {
      displayError('Error al conectar con el servidor.');
  }
});

function displayResult(result) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
      <div class="alert alert-${result.isAnomaly ? 'danger' : 'success'}" role="alert">
          ${result.isAnomaly ? 'Se ha detectado una anomalía.' : 'No se ha detectado ninguna anomalía.'}
      </div>
  `;
}

function displayError(message) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
          ${message}
      </div>
  `;
}
