document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("inputImg");
    const resultDiv = document.getElementById("result");
    const button = document.getElementById("buttonImg");
    const container = document.getElementById("container");

    button.addEventListener("click", analizarImg);

    async function getResult(resultUrl, resultHeaders) {
        
        let analysis = null;
        do {
            const resultResponse = await fetch(resultUrl, {
                method: "GET",
                headers: resultHeaders
            });

            const resultData = await resultResponse.json();
            analysis = resultData;
        } while (analysis && analysis.status !== "succeeded");

        if (analysis && analysis.analyzeResult && analysis.analyzeResult.readResults) {
            const analysisFields = analysis.analyzeResult.readResults[0].lines;
            console.log(analysisFields);

            analysisFields.forEach(resultados => {
                const text = document.createElement('div');
                text.textContent = `${resultados.text}`;
                resultDiv.appendChild(text);
            });
        }
        const nuevoBoton = document.createElement("button");

        nuevoBoton.textContent = "Descargar PDF";
        nuevoBoton.id = "buttonPDF";

        nuevoBoton.addEventListener("click", function () {
            const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const resultText = resultDiv.innerText;
        doc.text(resultText, 10, 10);
        doc.save('resultados.pdf');
        });

        container.appendChild(nuevoBoton);  
    }

    
    
    
    async function analizarImg() {
        const urlImg = input.value;
        const Url = "https://ocrandrea.cognitiveservices.azure.com/";
        const key = "8d3687ad77b240fe887580adb63717b1";

        if (!urlImg) {
            resultDiv.innerHTML = "Ingrese una URL válida..";
            return;
        }

        const header = new Headers();
        header.append("Ocp-Apim-Subscription-Key", key);
        header.append("Content-Type", "application/json");

        const body = JSON.stringify({ url: urlImg });

        try {
            const resultados = await fetch(`${Url}/vision/v3.2/read/analyze?language=en`, {
                method: "POST",
                body: body,
                headers: header,
            });
            const resultUrl = resultados.headers.get('Operation-Location');
            const resultHeaders = new Headers();
            resultHeaders.append("Ocp-Apim-Subscription-Key", key);

            await getResult(resultUrl, resultHeaders);
        } catch (error) {
            console.error(error);
        }
        
    }       
});

