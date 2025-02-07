import { useState, useRef } from 'react'
import { calculateScore } from './calculations'
import { generateReport, symptoms } from './report'

const VoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
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

  const sendRecording = async () => {
    if (!audioBlob) {
      alert('No recording to send.')
      return
    }

    const formData = new FormData()
    formData.append('file', audioBlob, 'recording.wav')

    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/api/voice-chat', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      setResponse(result)
      console.log('Server response:', result)
    } catch (error) {
      console.error('Error sending recording:', error)
      alert('Failed to send recording.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <h2>Hello! How are you feeling today?</h2>
      <div className='voice-button-container'>
        {!isRecording ? (
          <button onClick={startRecording} disabled={isRecording} className='btn'>
            Start Recording
          </button>
        ) : (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={stopRecording} disabled={!isRecording} className='btn'>
              Stop Recording
            </button>
            <img src='/voice.png' alt='Record Icon' width='30' height='30' style={{ marginRight: 10 }} />
          </span>
        )}
        {audioBlob && !isRecording && (
          <>
            <audio controls src={URL.createObjectURL(audioBlob)} />
            <button className='btn' onClick={sendRecording} disabled={!audioBlob}>
              Send
            </button>
          </>
        )}
        {loading && <div className='loader' />}
      </div>
      {response && (
        <div>
          <p>
            <b>You:</b> {response.transcript}
          </p>
          <p>
            <b>Response</b>: {response.symptoms.length > 0
              ? `I'm sorry to hear that you are experiencing these symptoms (${response.symptoms.join(
                  ', '
                )}). I hope you get better soon. But thanks for sharing!`
              : "Seems like you don't have any symptoms. Good to hear!"}
          </p>
          <button
            className='btn'
            onClick={() => generateReport(calculateScore(response.symptoms.concat(symptoms[11].name)), response.symptoms.concat(symptoms[11].name))}
          >
            Download Report
          </button>
        </div>
      )}
    </div>
  )
}

export default VoiceChat
