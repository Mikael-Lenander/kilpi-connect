import React from 'react'
import './Patient.css'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto' // This is needed for chart.js v3+
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(annotationPlugin)

export default function Patient() {
  return (
    <div className='patient-container'>
      <div className='profile-section'>
        <div className='profile-details'>
          <h2>Aisha Zahin Noor</h2>
          <p>aisha2022@gmail.com</p>
          <div className='profile-grid'>
            <div>
              <strong>Sex:</strong> Female
            </div>
            <div>
              <strong>Age:</strong> 28
            </div>
            <div>
              <strong>Patient ID:</strong> #40365
            </div>
          </div>
        </div>
      </div>

      <div className='section'>
        <h3>Patient Information</h3>
        <div className='vitals'>
          <div className='vital-card'>
            <p>TSH</p>
            <p>5.8 mU/L</p>
            <p style={{ color: 'red' }}>Above reference range</p>
          </div>
          <div className='vital-card'>
            <p>T4</p>
            <p>15 pmol/l</p>
            <p style={{ color: 'green' }}>In reference range</p>
          </div>
          <div className='vital-card'>
            <p>Previous lab test</p>
            <p>12 months ago</p>
            <p style={{ color: 'red' }}>Too infrequent</p>
          </div>
          <div className='vital-card'>
            <p>Current medication</p>
            <p>Thyroxine</p>
          </div>
          <div className='vital-card'>
            <p>Prescription valid until</p>
            <p>17.10.2025</p>
          </div>
        </div>
      </div>

      <div className='section'>
        <div className='charts'>
          <ThyroidCharts />
        </div>
      </div>

      <div className='section' style={{ marginTop: 55 }}>
        <h3>Symptom History Timeline</h3>
        <div className='symptoms-table'>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Symptoms Reported</th>
              </tr>
              <tr>
                <td>2025-04</td>
                <td>Fatigue, Cold intolerance</td>
              </tr>
              <tr>
                <td>2025-03</td>
                <td>Dry skin, Weight gain</td>
              </tr>
              <tr>
                <td>2025-02</td>
                <td>Fatigue, Constipation</td>
              </tr>
              <tr>
                <td>2025-01</td>
                <td>Cold intolerance</td>
              </tr>
              <tr>
                <td>2024-12</td>
                <td>Fatigue, Slow heart rate</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='actions'>
        <button className='btn btn-primary'>Message Patient & Book Appointment</button>
        <button className='btn btn-outline'>Renew Prescription</button>
      </div>
    </div>
  )
}

const ThyroidCharts = () => {
  const TSHData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'TSH (mU/l)',
        data: [5.2, 4.1, 5.0, 4.95, 3.9, 4.85, 5.8, 5.8],
        borderColor: '#f8946b',
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const t4Data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'T4 (pmol/l)',
        data: [11, 12, 17, 15, 14, 16, 16, 15],
        borderColor: '#f8946b',
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const dosageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Thyroxine dosage (µg)',
        data: [100, 100, 100, 125, 125, 125, 150, 150],
        borderColor: '#f8946b',
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const chartOptions = (refRange: { min: number; max: number } | false, scale: { min: number; max: number }) => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: scale.min,
        max: scale.max,
      },
    },
    plugins: refRange
      ? {
          legend: {
            position: 'top',
          },
          annotation: {
            annotations: {
              box1: {
                type: 'box',
                yMin: refRange.min,
                yMax: refRange.max,
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderColor: 'rgba(40, 167, 69, 0.7)',
                borderWidth: 1,
              },
            },
          },
        }
      : {},
  })

  const TSHOptions = chartOptions({ min: 0.5, max: 4 }, { min: 0, max: 7 })
  const t4Options = chartOptions({ min: 11, max: 23 }, { min: 0, max: 40 })
  const dosageOptions = chartOptions(false, { min: 0, max: 250 })

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: '20px', width: '100%' }}>
        <div style={{ height: '300px', width: '45%' }}>
          <h3>TSH</h3>
          <Line data={TSHData} options={TSHOptions} />
        </div>
        <div style={{ height: '300px', width: '45%' }}>
          <h3>T4</h3>
          <Line data={t4Data} options={t4Options} />
        </div>
      </div>
      <div style={{ marginTop: '60px', height: '300px', width: '45%' }}>
        <h3>Thyroxine dosage</h3>
        <Line data={dosageData} options={dosageOptions} />
      </div>
    </div>
  )
}
