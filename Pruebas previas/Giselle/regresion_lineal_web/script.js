const predictButton = document.getElementById("predictButton");
const predictionResult = document.getElementById("predictionResult");
const areadata =document.getElementById("area");
const habidata =document.getElementById("habi");

predictButton.addEventListener("click", async () => {
    const endpoint = "YOUR_ENDPOINT";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Prediction-Key": "predictionKey"
            },
            body: JSON.stringify({
                area : areadata,
                habitaciones : habidata
            })
        });

        const data = await response.json();

        predictionResult.innerHTML = `El resultado de la predicción es: ${data.Scored_Labels}`;
    } catch (error) {
        console.error("Error al realizar la predicción:", error);
    }
});