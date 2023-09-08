document.addEventListener("DOMContentLoaded", function () {
    const analyzeButton = document.getElementById("analyzeButton");
    const imageUrlImg = document.getElementById("imageUrl");
    const resultDiv = document.getElementById("result");
    const coordenadasDiv = document.getElementById("coordenadas");
    const tagDiv = document.getElementById("tag");
    const probabilityDiv = document.getElementById("probabilidad");


    analyzeButton.addEventListener("click", analyzeImage);
    analyzeButton.addEventListener("click", cargarImagen);

    function cargarImagen() {
        const imagen = document.getElementById('imagenObjeto');
        const link = document.getElementById("imageUrl").value;
        imagen.src = link;
    }

    function analyzeImage() {
        const Url = "https://sofrita.cognitiveservices.azure.com/customvision/v3.0/Prediction/fefcd660-ffc2-4356-9ef2-025d9aa90878/detect/iterations/document1/url";
        const Key = "1736472adebb4440a26cd51fb4c0db87";
        const imageUrl = imageUrlImg.value;

        if (!imageUrl) {
            resultDiv.innerHTML = "Por favor inrgese una url.";
            return;
        }

        const headers = new Headers();
        headers.append("prediction-key", Key);
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({ url: imageUrl });

        fetch(Url, {
            method: "POST",
            headers: headers,
            body: body
        })
            .then(result => result.json())
            .then(prediction => {
                console.log(prediction);
                tagDiv.innerHTML = `${prediction.predictions[0].tagName}: `;
                probabilityDiv.innerHTML = `${Math.trunc(prediction.predictions[0].probability * 100)} %`;

                coordenadasDiv.style.height = `${prediction.predictions[0].boundingBox.height * 500}px`;
                coordenadasDiv.style.width = `${prediction.predictions[0].boundingBox.width * 400}px`;
                coordenadasDiv.style.top = `${prediction.predictions[0].boundingBox.top * 500}px`;
                coordenadasDiv.style.left = `${prediction.predictions[0].boundingBox.left * 400}px`;
                })

    }
});

// https://pbs.twimg.com/media/FzDlxZAWIAEr0Z2.jpg