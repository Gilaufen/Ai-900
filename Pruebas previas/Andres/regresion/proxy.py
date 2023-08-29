from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.request

class ProxyHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Leer los datos de la solicitud
        content_length = int(self.headers['Content-Length'])
        data = self.rfile.read(content_length)

        # Hacer la solicitud al servicio de puntuación
        url = 'http://47b33efb-7145-40fc-8790-2bca1e348825.eastus2.azurecontainer.io/score'
        api_key = 'AHuSckcacGPI37leTfMqiLFLdwT7M0EZ'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_key
        }

        req = urllib.request.Request(url, data, headers)

        try:
            response = urllib.request.urlopen(req)
            result = response.read()

            # Enviar la respuesta al navegador
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(result)
        except Exception as e:
            # Manejar errores aquí
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode())

def run():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, ProxyHandler)
    print('Servidor proxy en el puerto 8000...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
