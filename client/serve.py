import os
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer

# Define the directory to serve (the current directory in this case)
directory = os.path.dirname(os.path.abspath(__file__))

# Change the directory to the one containing the HTML file
os.chdir(directory)

# Define the port for the server
PORT = 8000

# Create and start the server
with TCPServer(("", PORT), SimpleHTTPRequestHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
