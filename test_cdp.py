import subprocess
import json
import base64
import time
import os
import urllib.request

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "http://localhost:3000/#pages-stack-section"
])

time.sleep(3)

try:
    with urllib.request.urlopen("http://localhost:9222/json") as response:
        tabs = json.loads(response.read().decode())
    
    ws_url = tabs[0]["webSocketDebuggerUrl"]
    print("Connecting to ws:", ws_url)
    
    # We can use simple socket or python's built-in or basic screenshot
except Exception as e:
    print("Error:", e)
finally:
    proc.terminate()
