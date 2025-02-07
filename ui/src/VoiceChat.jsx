import { useState, useRef } from 'react'

const VoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      mediaRecorderRef.current.ondataavailable = event => {
        audioChunksRef.current.push(event.data)
      }
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setAudioBlob(audioBlob)
        audioChunksRef.current = []
      }
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // Download recording
  const downloadRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'recording.wav'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div>
      <h1>Voice Recorder</h1>
      <div>
        {!isRecording ? (
          <button onClick={startRecording} disabled={isRecording}>
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} disabled={!isRecording}>
            Stop Recording
          </button>
        )}
        {audioBlob && (
          <button onClick={downloadRecording} disabled={!audioBlob}>
            Download Recording
          </button>
        )}
      </div>
      {audioBlob && (
        <div>
          <h2>Playback:</h2>
          <audio controls src={URL.createObjectURL(audioBlob)} />
        </div>
      )}
    </div>
  )
}

export default VoiceChat
