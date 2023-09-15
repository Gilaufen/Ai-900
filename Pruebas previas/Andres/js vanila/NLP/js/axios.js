// const axios = require("axios").default;

const URL_ENDPOINT_TRADUCCION = "https://api.cognitive.microsofttranslator.com";
const KEY_ENPOINT__TRADUCCION = "65c5f3d11b5d4dfdab331ddda5936ac2";
const LOCATION = "eastus";

axios({
  baseURL: URL_ENDPOINT_TRADUCCION,
  // usar 'detect', para solo detectar el idioma
  // usar '/dictionary/lookup', para traducciones alternativas
  url: "/dictionary/lookup",
  method: "post",
  headers: {
    "Ocp-Apim-Subscription-Key": KEY_ENPOINT__TRADUCCION,
    "Ocp-Apim-Subscription-Region": LOCATION,
    "Content-type": "application/json",
  },
  params: {
    "api-version": "3.0",
    from: "en", // no incluir para detectar idioma - entre mas cerca a 1 es su seguridad 
    to: 'es', // quitar solo para la deteccion
    // 'toScript': 'latn', // para la transliteracion fonectica
    // 'includeSentenceLength': true
  },
  data: [
    {
      text: "sunlight",
    },
  ],
  responseType: "json",
}).then(function (response) {
  console.log(JSON.stringify(response.data, null, 4));
});

