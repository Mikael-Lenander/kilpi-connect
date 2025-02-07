from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import whisper
import tempfile
import os
from extractor import extract_symptoms


app = FastAPI()

# Allow CORS (adjust for security in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model (adjust model size as needed: "tiny", "base", "small", "medium", "large")
model = whisper.load_model("small")


@app.post("/api/voice-chat")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Save the uploaded file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
            temp_audio.write(await file.read())
            temp_audio_path = temp_audio.name

        # Transcribe the audio
        result = model.transcribe(temp_audio_path, language="en")
        transcription = result["text"]
        symptoms = extract_symptoms(transcription)

        os.remove(temp_audio_path)

        return {"transcript": transcription, "symptoms": symptoms}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")
