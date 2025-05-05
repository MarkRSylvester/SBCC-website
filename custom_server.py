from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse
import sys

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Decode URL path
        self.path = urllib.parse.unquote(self.path)
        return SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        SimpleHTTPRequestHandler.end_headers(self)

port = 8088
print(f"Starting server on port {port}...")
print(f"Server will be available at http://localhost:{port}")
httpd = HTTPServer(('localhost', port), CustomHandler)
httpd.serve_forever() 