import requests
import sys

# Declaración de variables
prediction_url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/4b6ed4e0-4cf3-4438-8867-2aa19a6fbde2/classify/iterations/Animals%20and%20fruits/url"
prediction_key = "136973d95a004532bd14ca7302fd0335"

# Código para llamar al servicio Custom Vision para la clasificación de imágenes
img_num = 1
if len(sys.argv) > 1 and int(sys.argv[1]) in range(1, 7):
    img_num = int(sys.argv[1])

img = f"https://raw.githubusercontent.com/AND3SIL4/AI-900/main/images/Picture{img_num}.jpg"

headers = {
    "Prediction-Key": prediction_key,
    "Content-Type": "application/json"
}

body = {
    "url": img
}

print("Analyzing image...")
response = requests.post(prediction_url, headers=headers, json=body)
prediction = response.json()

predicted_tag = prediction['predictions'][0]['tagName']
is_animal = any(animal in predicted_tag for animal in ["lion", "giraffe", "elephant"])
prediction_type = "Animal" if is_animal else "Fruta"

print(f"Type: {prediction_type}")
print(f"Element: {predicted_tag}\n")

# Integracion de servicio de translate

# You need to add your resource location if you use a Cognitive Services resource
location = "southcentralus"

# The endpoint is global for the Translator service, DO NOT change it 
endpoint = "https://api.cognitive.microsofttranslator.com/"

# Text to be translated 
text = predicted_tag 

headers = {
    "Ocp-Apim-Subscription-Key": prediction_key,
    "Ocp-Apim-Subscription-Region": location,
    "Content-Type": "application/json"
}

body = [{"text": text}] 

print("Translating image selected...")
response = requests.post(
    f"{endpoint}/translate?api-version=3.0&from=en&to=fr&to=it&to=zh-Hans",
    headers=headers,
    json=body
)

analysis = response.json()
french = analysis[0]["translations"][0] 
italian = analysis[0]["translations"][1] 
chinese = analysis[0]["translations"][2] 
print(f"Original Text: {text}\nFrench Translation: {french['text']}\nItalian Translation: {italian['text']}\nChinese Translation: {chinese['text']}")
