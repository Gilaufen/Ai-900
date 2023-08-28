$predictionUrl = "url"
$predictionKey = "key"

# Code to call Custom Vision service for image classification

$img_num = 1
if ($args.count -gt 0 -And $args[0] -in (1..84))
{
    $img_num = $args[0]
}

$img = "https://raw.githubusercontent.com/Gilaufen/Sesion1/main/custom/foto-$($img_num).jpg"

$headers = @{}
$headers.Add("Prediction-Key", $predictionKey)
$headers.Add("Content-Type", "application/json")

$body = "{'url' : '$img'}"

Write-Host "Analyzing image..."
$result = Invoke-RestMethod -Method Post `
        -Uri $predictionUrl `
        -Headers $headers `
        -Body $body | ConvertTo-Json -Depth 5

if ($result -ne $null) {
    $prediction = $result | ConvertFrom-Json
    if ($prediction.predictions.Count -gt 0) {
        $tagName = $prediction.predictions[0].tagName
        #Write-Host ("`n",$tagName, "`n")
    } else {
        Write-Host "No predictions found."
    }
} else {
    Write-Host "No response from the service."
}

if($tagName -match "banana|apple|orange"){
    $fruiName = $tagName
    Write-Host("Es una fruta: $fruiName")
}else{
    $animalName = $tagName
    Write-Host("Es un animal: $animalName")
}
