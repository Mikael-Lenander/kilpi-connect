import requests
import whisper

print(requests.get('https://google.com'))

model = whisper.load_model("small")