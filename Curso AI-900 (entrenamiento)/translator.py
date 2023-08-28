import requests

# Add your key here
key = "136973d95a004532bd14ca7302fd0335"

# You need to add your resource location if you use a Cognitive Services resource
location = "southcentralus"

# The endpoint is global for the Translator service, DO NOT change it 
endpoint = "https://api.cognitive.microsofttranslator.com/"

# Text to be translated 
text = "EXIT"

# Code to call Translator service to translate text
headers = {
    "Ocp-Apim-Subscription-Key": key,
    "Ocp-Apim-Subscription-Region": location,
    "Content-Type": "application/json"
}

body = [{"text": text}] 

print("Translating text...")
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
