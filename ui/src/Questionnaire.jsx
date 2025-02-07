import { useState, useEffect } from 'react'
import { calculateAverageHeartRate, calculateScore } from './calculations'
import { generateReport, symptoms } from './report'

function Questionnaire() {
  const [checkedSymptoms, setCheckedSymptoms] = useState(symptoms.reduce((acc, symptom) => ({ ...acc, [symptom.name]: false }), {}))
  const selectedSymptoms = Object.entries(checkedSymptoms)
    .filter(symptom => symptom[1])
    .map(symptom => symptom[0])
  const [score, setScore] = useState(null)

  const checkPulseRate = () => {
    const averageRHR = calculateAverageHeartRate()
    if (averageRHR < 75) {
      setCheckedSymptoms({
        ...checkedSymptoms,
        'Pulse rate <75/min ( Read from Smart Watch)': true,
      })
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    setScore(calculateScore(selectedSymptoms))
  }

  useEffect(() => {
    checkPulseRate()
  }, [])

  return (
    <div className='container'>
      <h2>Hypothyroidism Symptom Questionnaire</h2>
      <form id='diagnostic-form' onSubmit={onSubmit}>
        <div className='symptom-list'>
          {symptoms.map(symptom => (
            <div className='symptom form-check' key={symptom.name}>
              <input
                type='checkbox'
                className='form-check-input'
                id={`symptom-${symptom.name}`}
                data-present-weight={symptom.presentWeight}
                data-absent-weight={symptom.absentWeight}
                disabled={symptom.disabled}
                checked={checkedSymptoms[symptom.name]}
                onChange={e => {
                  setCheckedSymptoms({
                    ...checkedSymptoms,
                    [symptom.name]: e.target.checked,
                  })
                }}
              />
              <label className='form-check-label' htmlFor={`symptom-${symptom.name}`}>
                {symptom.name}
              </label>
            </div>
          ))}
        </div>
        <button type='submit'>Submit</button>
      </form>
      <div id='result'>
        {score != null && (
          <>
            <p>Your reponses are submitted. Thanks!</p>
            <button className='btn' onClick={() => generateReport(score, selectedSymptoms)}>
              Download report
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Questionnaire
