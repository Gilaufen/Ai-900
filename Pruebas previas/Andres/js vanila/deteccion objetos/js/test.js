/**
 * libreria para hacer llamados a API's 
 * TODO: comentar en caso de pruebas con en el navegador
 */
const axios = require('axios');
// ruta para guardar las claves
const { endpoint, apiKey } = require('./config');

// claves para el servicio de prediccion
const PREDICTION_URL = endpoint;
const PREDICTION_KEY = apiKey;

/**
 * condicional para longitud de datos de entrada para pruebas por consola
 * TODO: comentar para pruebas en navegador
 */
if (
  process.argv.length > 2 &&
  parseInt(process.argv[2]) >= 1 &&
  parseInt(process.argv[2]) <= 2
) {
  imagen = parseInt(process.argv[2]);
}

// url de imagen para probar
const img = "https://th.bing.com/th/id/R.c4a5c9c87ecbb954d2ae2ecea3c86464?rik=YMfEKqV6Fm%2f9lg&pid=ImgRaw&r=0";

const headers = {
  "Prediction-Key": PREDICTION_KEY,
  "Content-Type": "application/json",
};

let body = JSON.stringify({ url: img });

console.log("Analizando imagen...");

axios.post(PREDICTION_URL, body, { headers })
  .then((response) => {
    const result = response.data;
    const items = result.predictions;

    items.forEach((element) => {
      if (element.probability > 0.9) {
        console.log(`${element.tagName} (${element.probability}%)`);
        console.log(element.boundingBox);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
