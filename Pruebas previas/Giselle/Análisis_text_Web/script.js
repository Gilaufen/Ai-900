document.addEventListener("DOMContentLoaded", function () {
    const buttonAn = document.getElementById("buttonAnalize");
    const urlText = document.getElementById("inputUrl");
    const languageDiv = document.getElementById("language");
    const phraseDiv = document.getElementById("phrase");
    const sentimentDiv = document.getElementById("sentiment");

    buttonAn.addEventListener("click", analizeDoc);



    function analizeDoc() {



        const url = "https://antextandrea.cognitiveservices.azure.com/";
        const key = "87a1a48fa45f4ab29315085f8620e6bc";

        const header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Ocp-Apim-Subscription-Key", key);

        if (!urlText) {
            languageDiv.innerHTML = "Ingrese una URL válida.";
            return;
        }

        const urlT = urlText.value;

        fetch(urlT)
            .then(response => response.text())
            .then(texto => {
                const data = JSON.stringify({
                    "documents": [{
                        "id": "1",
                        "text": texto
                    }]

                });

                fetch(`${url}/text/analytics/v3.1/languages`, {
                    method: "POST",
                    headers: header,
                    body: data
                })
                    .then(response => response.json())
                    .then(resultado => {
                        console.log(resultado);
                        languageDiv.innerHTML = `<p>  Idioma del documento: <strong>${resultado.documents[0].detectedLanguage.name} </strong> <br> Código ISO: <strong>${resultado.documents[0].detectedLanguage.iso6391Name} </strong> 
                        <br> Confiablididad: <strong>${resultado.documents[0].detectedLanguage.confidenceScore}</strong> </p> `;
                    })

                fetch(`${url}/text/analytics/v3.1/keyPhrases`, {
                    method: "POST",
                    headers: header,
                    body: data
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        const keyPhra = response.documents[0].keyPhrases;

                        keyPhra.forEach((item, num) => {
                            const phrase = document.createElement("div");
                            phrase.innerHTML = (`Frase ${num} = ${item} `);
                            phraseDiv.appendChild(phrase);
                        });
                    })

                fetch(`${url}/text/analytics/v3.1/sentiment`, {
                    method: "POST",
                    headers: header,
                    body: data
                })
                    .then(response => response.json())
                    .then(resultados => {
                        console.log(resultados);
                        const mayor = resultados.documents[0].sentiment;
                    
                        sentimentDiv.innerHTML = (`Este documento es : <strong>${mayor} </strong>   `);
                    })
            })

    }


})

// https://raw.githubusercontent.com/MicrosoftLearning/AI-900-AIFundamentals/main/data/text/reviews/review1.txt