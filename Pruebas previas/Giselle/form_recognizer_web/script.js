document.addEventListener("DOMContentLoaded", async function () {
    const key = "0586cb28ee0f48ee968cf040cd997a8c";
    const endpoint = "https://formandrea.cognitiveservices.azure.com/";
    const imgUrl = "https://designblog.uniandes.edu.co/blogs/dise2619/files/2018/09/Alejandro-Calderon-e1537885168665.jpg";
    const resultDiv = document.getElementById("result");
    const resultDiv3 = document.getElementById("result3");
    const resultados = document.getElementById("resultados");


    const headers = new Headers();
    headers.append("Ocp-Apim-Subscription-Key", key);
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({ source: imgUrl });

    try {
        const response = await fetch(`${endpoint}/formrecognizer/v2.1/prebuilt/receipt/analyze`, {
            method: "POST",
            headers: headers,
            body: body
        });

        const resultUrl = response.headers.get('Operation-Location');

        let analysis = null;
        do {
            const resultResponse = await fetch(resultUrl, {
                method: "GET",
                headers: { "Ocp-Apim-Subscription-Key": key }
            });

            const resultData = await resultResponse.json();
            analysis = resultData;
        } while (analysis && analysis.status !== "succeeded");

        const analysisFields = analysis.analyzeResult.documentResults[0].fields;

        console.log(analysisFields);

        resultDiv.innerHTML= (`<p> Tipo de recibo: </p> ${analysisFields.ReceiptType.valueString} <br> <p> Nombre Lugar: </p> ${analysisFields.MerchantName.text}
        <br> <p> Número celular: </p> ${analysisFields.MerchantPhoneNumber.text} <br> <p> Total: </p> ${analysisFields.Total.text}`);
        resultDiv3.innerHTML= (`<p> Receipt Items: </p>`);

        const receiptItems = analysisFields.Items.valueArray;

        receiptItems.forEach((item, idx) => {
            const nuevoDiv= document.createElement("div");

            nuevoDiv.innerHTML=(`<p> Item #${idx + 1} </p> <br> - Name: ${item.valueObject.Name.valueString} <br> - Price: ${item.valueObject.TotalPrice.valueNumber}`);

            resultados.appendChild(nuevoDiv);
        });

        

    } catch (error) {
        console.error(error);
    }
});
