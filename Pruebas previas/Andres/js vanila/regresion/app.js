
document.getElementById('sendButton').addEventListener('click', function () {
// Datos para la solicitud 
const data = {
    "Inputs": {
        "data": [
            {
                "dia": 0,
                "mes": 0,
                "año": 0,
                "temporada": 0.0,
                "festivo": 0,
                "finsemana": 0,
                "diatrabajo": 0,
                "meteorologico": 0,
                "temperatura": 0.0,
                "atemp": 0.0,
                "humedad": 0.0,
                "velocidadviento": 0.0
            }
        ]
    },
    "GlobalParameters": 0.0
};

const body = JSON.stringify(data);

const url = 'http://47b33efb-7145-40fc-8790-2bca1e348825.eastus2.azurecontainer.io/score';
const api_key = 'AHuSckcacGPI37leTfMqiLFLdwT7M0EZ';
if (!api_key) {
    throw new Error("La llave de autenticacion esta incorrecta");
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + api_key
};

// Petición POST a la API web y esperamos una respuesta del servidor.
fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
})
.then(response => response.json())
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error("Error: " + error.message);
});
});

