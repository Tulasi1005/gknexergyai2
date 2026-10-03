import subprocess
import os
import time

browser_bin = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_path = r"C:\Users\ravir\.gemini\antigravity-ide\brain\3279cfc3-0ae6-40ee-8317-20207a3ea428\nav_stack_section.png"

# We set a large window height to capture down to the new section
cmd = f'"{browser_bin}" --headless --disable-gpu --window-size=1440,2400 --screenshot="{out_path}" http://localhost:3000/'
print("Executing command...")
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
print("STDOUT:", res.stdout)
print("STDERR:", res.stderr)
time.sleep(1)

if os.path.exists(out_path):
    print(f"SUCCESS! Captured screenshot: {out_path} ({os.path.getsize(out_path)} bytes)")
else:
    print("Not found at destination")
