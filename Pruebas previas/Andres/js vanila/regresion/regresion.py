import urllib.request
import json
import os
import ssl

def allowSelfSignedHttps(allowed):
    # bypass the server certificate verification on client side
    if allowed and not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None):
        ssl._create_default_https_context = ssl._create_unverified_context

allowSelfSignedHttps(True) # this line is needed if you use self-signed certificate in your scoring service.

# Request data goes here
# The example below assumes JSON formatting which may be updated
# depending on the format your endpoint expects.
# More information can be found here:
# https://docs.microsoft.com/azure/machine-learning/how-to-deploy-advanced-entry-script
data =  {
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
}

body = str.encode(json.dumps(data))

url = 'http://47b33efb-7145-40fc-8790-2bca1e348825.eastus2.azurecontainer.io/score'
# Replace this with the primary/secondary key or AMLToken for the endpoint
api_key = 'aggpReclyBz9gO75RcEEsgR4Haeg5uqZ'
if not api_key:
    raise Exception("A key should be provided to invoke the endpoint")


headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}

req = urllib.request.Request(url, body, headers)

try:
    response = urllib.request.urlopen(req)

    result = response.read()
    print(result)
except urllib.error.HTTPError as error:
    print("The request failed with status code: " + str(error.code))

    # Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
    print(error.info())
    print(error.read().decode("utf8", 'ignore'))
