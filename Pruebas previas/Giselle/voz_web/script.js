document.addEventListener("DOMContentLoaded", function(){
    const buttonAn = document.getElementById("buttonAnalize");
    const urlFile = document.getElementById("inputUrl");
    const resultDiv = document.getElementById("result");

    buttonAn.addEventListener("click", analizeAudio);

    function analizeAudio(){
        const region= "eastus";
        const key = "a3d8de919cce4fec93ba0dbd700f74a3"; 
        const audiofile = urlFile.files[0]; // Obtén el archivo desde el input

        const header = new Headers();
        header.append("Ocp-Apim-Subscription-Key", key);
        header.append("Content-Type", "audio/wav");

        fetch(`https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=es-MX`, {
            method :'POST',
            headers : header,
            body : audiofile
        })  
            .then(resultados => resultados.json())
            .then(resultados => {
                resultDiv.innerHTML = (`<h2> El audio dice: </h2> <br> <h3>${resultados.DisplayText} </h3>`);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

})

//https://www.textfromtospeech.com/es/voice-recorder/#:~:text=%C2%BFQu%C3%A9%20caracter%C3%ADsticas%20ofrece%20este%20software%20de%20grabaci%C3%B3n%20de,pausa%20o%20detenga%20la%20grabaci%C3%B3n%20cuando%20lo%20necesita