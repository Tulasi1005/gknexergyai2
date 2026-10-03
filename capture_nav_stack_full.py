import subprocess
import os
import time

browser_bin = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_path = r"C:\Users\ravir\.gemini\antigravity-ide\brain\3279cfc3-0ae6-40ee-8317-20207a3ea428\nav_stack_section_view.png"

# Edge headless supports window-size, let's make it 1440,3600 or use url with hash
cmd = f'"{browser_bin}" --headless --disable-gpu --window-size=1440,4000 --screenshot="{out_path}" "http://localhost:3000/#pages-stack-section"'
print("Executing command...")
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
print("STDOUT:", res.stdout)
print("STDERR:", res.stderr)
time.sleep(1)

if os.path.exists(out_path):
    print(f"SUCCESS! Captured screenshot: {out_path} ({os.path.getsize(out_path)} bytes)")
else:
    print("Not found at destination")
