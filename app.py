from flask import Flask
from flask import request, render_template, send_file
import subprocess

import os
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
@app.route('/concate-video', methods = ['GET'])
def concateVideo():
    command = "ffmpeg -r 1/5 -y -stream_loop -1 -i demo/avatar_%d.png -i Anh-Nha-O-Dau-The-AMEE-B-Ray.mp3 -c:v libx264 -c:a aac -pix_fmt yuv420p -crf 23 -r 24 -shortest -y video-from-frames.mp4"
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
    process.wait()
    return send_file('video-from-frames.mp4',as_attachment=True)
def main():
    app.run(host='0.0.0.0', port=8003, debug=True)

if __name__ == "__main__":
    main()