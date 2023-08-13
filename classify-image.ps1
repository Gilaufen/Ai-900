$predictionUrl="https://csandreacustom.cognitiveservices.azure.com/customvision/v3.0/Prediction/441eace9-0db4-4b51-b15d-ef65e8b82fff/classify/iterations/Iteration1/url"
$predictionKey = "299096d5acf840d6b4306a100018b32c"


# Code to call Custom Vision service for image classification

$img_num = 1
if ($args.count -gt 0 -And $args[0] -in (1..84))
{
    $img_num = $args[0]
}

$img = "https://raw.githubusercontent.com/Gilaufen/Sesion1/main/custom/foto-$($img_num).jpg"

$headers = @{}
$headers.Add( "Prediction-Key", $predictionKey )
$headers.Add( "Content-Type","application/json" )

$body = "{'url' : '$img'}"

write-host "Analyzing image..."
$result = Invoke-RestMethod -Method Post `
          -Uri $predictionUrl `
          -Headers $headers `
          -Body $body | ConvertTo-Json -Depth 5

$prediction = $result | ConvertFrom-Json

Write-Host ("`n",$prediction.predictions[0].tagName, "`n")