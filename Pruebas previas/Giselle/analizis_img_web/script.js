document.addEventListener("DOMContentLoaded", function () {
    const analyzeButton = document.getElementById("analyzeButton");
    const resultDiv = document.getElementById("result");
    const descriptionDiv = document.getElementById("description");
    const objectsDiv = document.getElementById("objects");
    const tagsDiv = document.getElementById("tags");
    const imgURL = document.getElementById("imageUrl");

    analyzeButton.addEventListener("click", analyzeImage);

    function analyzeImage() {
        const key = 'b368427fc6f74a6389ce104e2a20e6c2';
        const endpoint = 'https://demoandreas.cognitiveservices.azure.com/';

        const imageURL = imgURL.value;

        if (!imageUrl) {
            resultDiv.innerHTML = "Please enter an image URL.";
            return;
        }

        const headers = new Headers();
        headers.append("Prediction-key", key);
        headers.append("Content-Type", 'application/json');

        const body = JSON.stringify({ url: imageURL });

        descriptionDiv.innerHTML = 'Analizando...';

        if (!imageURL) {
            resultDiv.innerHTML = "Ingrese una URL válida.";
            return;
        }

        fetch(`${endpoint}/vision/v3.2/analyze?visualFeatures=Categories,Description,Objects`, {
            method: 'POST',
            headers: headers,
            body: body
        })
            .then(response => response.json() )
            .then(result => {
                descriptionDiv.innerHTML = `<p>Descripción: ${result.description.captions[0].text}</p>`;
                objectsDiv.innerHTML += `<p>Objetos en la imagen: ${result.objects.map(obj => obj.object)}</p>`;
                tagsDiv.innerHTML += `<p>Etiquetas imagen: ${result.description.tags}</p>`;
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = 'Error al analizar la imagen.';
            });
    }
});