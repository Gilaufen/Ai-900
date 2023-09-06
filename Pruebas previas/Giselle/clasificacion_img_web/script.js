document.addEventListener("DOMContentLoaded", function () {
    const analyzeButton = document.getElementById("analyzeButton");
    const imageUrlInput = document.getElementById("imageUrl");
    const resultDiv = document.getElementById("result");

    analyzeButton.addEventListener("click", analyzeImage);

    function analyzeImage() {
        const Url = "https://demoandre.cognitiveservices.azure.com/customvision/v3.0/Prediction/45bf4847-31d8-4697-89a7-e7c19eaa7b09/classify/iterations/final/url";
        const Key = "e9898a7d0ef74323894ae58b05ada05f";
        const imageUrl = imageUrlInput.value;

        if (!imageUrl) {
            resultDiv.innerHTML = "Please enter an image URL.";
            return;
        }

        const headers = new Headers();
        headers.append("Prediction-Key", Key);
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({ url: imageUrl });

        resultDiv.innerHTML = "Analizando...";

        fetch(Url, {
            method: "POST",
            headers: headers,
            body: body
        })
        .then(response => response.json())
        .then(prediction => {
            resultDiv.innerHTML = `<p>La Imagen corresponde a: ${prediction.predictions[0].tagName} <br> con una probabilidad de ${Math.trunc(prediction.predictions[0].probability*100)}%</p>`;
        })
    }
});
