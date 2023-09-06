document.addEventListener("DOMContentLoaded", function() {
const analyzeButton = document.getElementById("analyzeButton");
const resultDiv = document.getElementById("result");
const descriptionDiv = document.getElementById("description");
const objectsDiv = document.getElementById("objects");
const tagsDiv = document.getElementById("tags");
const imgURL = document.getElementById("imageURL");

analyzeButton.addEventListener("click", analyzeImage);

function analyzeImage() {
    const key = 'a233e644597f451285edc81e2b2bbe99';
    const endpoint = 'https://demoandrea.cognitiveservices.azure.com/';
    const imageURL = imgURL.value;

    if (!imageUrl) {
        resultDiv.innerHTML = "Please enter an image URL.";
        return;
    }

    const headers = new Headers();
    headers.append("Ocp-Apim-Subscription-Key", key);
    headers.append("Content-Type", 'application/json');

    const body = JSON.stringify({ url: imageURL });

    resultDiv.innerHTML = 'Analizando...';

    if (!imageURL) {
        resultDiv.innerHTML = "Ingrese una URL válida.";
        return;
    }

    fetch(`${endpoint}/vision/v3.2/analyze?visualFeatures=Categories,Description,Objects`, {
        method: 'POST',
        headers: headers,
        body: body
    })
        .then(result => result.json())
        .then(result => {
            descriptionDiv.innerHTML = `<p>Descripción: ${result.description.captions.text}</p>`;
            objectsDiv.innerHTML += `<p>Objetos en la imagen: ${result.objects.object.join(', ')}</p>`;
            tagsDiv.innerHTML += `<p>Etiquetas relevantes para la imagen: ${result.description.tags.join(', ')}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error al analizar la imagen.';
        });
}});