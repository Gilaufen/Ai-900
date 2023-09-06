document.addEventListener("DOMContentLoaded", function () {
    const analyzeButton = document.getElementById("analyzeButton");
    const imageUrlInput = document.getElementById("imageUrl");
    const resultDiv = document.getElementById("result");

    analyzeButton.addEventListener("click", analyzeImage);

    function analyzeImage() {
        const predictionUrl = "https://demoandrea.cognitiveservices.azure.com/customvision/v3.0/Prediction/26693232-c2e9-4faf-aab4-71003b4bd759/classify/iterations/Iteration1/url";
        const predictionKey = "e1da8fdd622a4356a3c465e3af6cc499";
        const imageUrl = imageUrlInput.value;

        if (!imageUrl) {
            resultDiv.innerHTML = "Please enter an image URL.";
            return;
        }

        const headers = new Headers();
        headers.append("Prediction-Key", predictionKey);
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({ url: imageUrl });

        resultDiv.innerHTML = "Analizando...";

        fetch(predictionUrl, {
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
