import { symptoms } from './report'

export function calculateAverageHeartRate() {
  try {
    console.log('Using embedded CSV data instead of fetching a file.')

    // Simulated CSV data (copy from hypothyroid_low_heart_rate.csv)
    const csvData = `
      Date,Time,Heart Rate (BPM)
      2024-02-01,07:00,55
      2024-02-01,12:00,60
      2024-02-01,20:00,58
      2024-02-02,07:00,53
      2024-02-02,12:00,61
      2024-02-02,20:00,57
      2024-02-03,07:00,50
      2024-02-03,12:00,59
      2024-02-03,20:00,56
      `

    const rows = csvData.trim().split('\n').slice(1) // Remove the header row
    let dailyMinHeartRates = {}

    rows.forEach(row => {
      const values = row.split(',')
      if (values.length < 3) return

      const date = values[0].trim()
      const heartRate = parseInt(values[2].trim())

      if (!isNaN(heartRate)) {
        if (!dailyMinHeartRates[date] || heartRate < dailyMinHeartRates[date]) {
          dailyMinHeartRates[date] = heartRate
        }
      }
    })

    const averageRHR = Object.values(dailyMinHeartRates).reduce((sum, val) => sum + val, 0) / Object.keys(dailyMinHeartRates).length
    console.log(`Computed Average RHR: ${averageRHR}`)

    return averageRHR
  } catch (error) {
    console.error(' Error:', error)
  }
}

const symptomPoints = symptoms.reduce(
  (acc, symptom) => ({ ...acc, [symptom.name]: { presentWeight: symptom.presentWeight, absentWeight: symptom.absentWeight } }),
  {}
)

export function calculateScore(selectedSymptoms) {
  let totalScore = 0
  const allSymptoms = symptoms.map(symptom => symptom.name)
  const notSelectedSymptoms = new Set(allSymptoms).difference(new Set(selectedSymptoms))

  selectedSymptoms.forEach(symptom => {
    totalScore += symptomPoints[symptom].presentWeight
  })
  notSelectedSymptoms.forEach(symptom => {
    totalScore += symptomPoints[symptom].absentWeight
  })

  return totalScore
}
