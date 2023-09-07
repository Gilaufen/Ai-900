document.addEventListener("DOMContentLoaded", function () {
    const analyzeButton = document.getElementById("analyzeButton");
    const imageUrlInput = document.getElementById("imageUrl");
    const resultDiv = document.getElementById("result");

    analyzeButton.addEventListener("click", analyzeImage);
    // analyzeButton.addEventListener("click", cargarImagen);
    // function cargarImagen() {
    //     const url = imageUrlInput.value;
    //     const imagen = document.getElementById('imagenObjeto');
    //     imagen.src = url;
    // }

    function analyzeImage() {
        const Url = "https://demoandreobj.cognitiveservices.azure.com/customvision/v3.0/Prediction/bae44f5d-2df0-4296-b573-48ea5bc56ccd/detect/iterations/Iteration1/url";
        const Key = "5854c1655135424f80c5ba19cd4c94e5";
        const imageUrl = imageUrlInput.value;

        if (!imageUrl) {
            resultDiv.innerHTML = "Please enter an image URL.";
            return;
        }

        const headers = new Headers();
        headers.append("Ocp-Apim-Subscription-Key", Url);
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({ url: imageUrl });

        resultDiv.innerHTML = "Analizando...";

        const imagen = document.getElementById('imagenObjeto');

        fetch(`${Key}/vision/v3.2/analyze?visualFeatures=Categories,Description,Objects`, {
            method: "POST",
            headers: headers,
            body: body
        })
            .then(result => result.json())
            .then(result => {
                resultDiv.innerHTML = `<p>La Imagen corresponde a: ${result.objects.map(obj => obj.object)} <br> 
            con una probabilidad de ${Math.trunc(result.objects.confidence * 100)}% <br> 
            coordenadas : ${result.predictions.boundingBox}</p>`;
            })

    }
});
