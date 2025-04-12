import React from 'react'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const colors = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#bcf60c',
  '#fabebe',
  '#008080',
  '#e6beff',
  '#9a6324',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000075',
  '#808080',
]

function TSHCoverage() {
  const data = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Etelä-Karjala',
        data: [80, 70, 85, 70, 75, 80, 83, 85],
        borderColor: colors[0],
        fill: false,
      },
      {
        label: 'Keski-Uusimaa',
        data: [80, 80, 75, 55, 70, 76, 80, 84],
        borderColor: colors[1],
        fill: false,
      },
      {
        label: 'Kanta-Häme',
        data: [80, 80, 70, 78, 82, 85, 87, 88],
        borderColor: colors[2],
        fill: false,
      },
      {
        label: 'Kymenlaakso',
        data: [70, 65, 70, 65, 75, 80, 82, 84],
        borderColor: colors[3],
        fill: false,
      },
      {
        label: 'Helsinki',
        data: [80, 85, 79, 85, 80, 85, 86, 87],
        borderColor: colors[4],
        fill: false,
      },
      {
        label: 'Länsi-Uusimaa',
        data: [85, 90, 80, 88, 82, 85, 87, 89],
        borderColor: colors[6],
        fill: false,
      },
      {
        label: 'Etelä-Pohjanmaa',
        data: [80, 78, 76, 70, 72, 75, 80, 83],
        borderColor: colors[7],
        fill: false,
      },
      // Add more regions here similarly
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
        },
      },
      title: {
        display: true,
        text: 'Percentage of patients with TSH measured within 12 months',
        align: 'start',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Percentage (%)',
        },
        min: 0,
        max: 100,
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  }

  return (
    <div style={{ height: '500px', width: '600px' }}>
      <Line data={data} options={options} />
    </div>
  )
}

function SymptomsAfter1year() {
  const data = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Etelä-Karjala',
        data: [11, 13, 15, 16, 19, 20, 25, 23],
        borderColor: colors[0],
        fill: false,
      },
      {
        label: 'Keski-Uusimaa',
        data: [2, 6, 7, 9, 12, 16, 16, 18],
        borderColor: colors[1],
        fill: false,
      },
      {
        label: 'Kanta-Häme',
        data: [3, 4, 10, 12, 10, 14, 15, 16],
        borderColor: colors[2],
        fill: false,
      },
      {
        label: 'Kymenlaakso',
        data: [7, 8, 14, 15, 18, 19, 18, 20],
        borderColor: colors[3],
        fill: false,
      },
      {
        label: 'Helsinki',
        data: [8, 13, 15, 17, 17, 22, 21, 26],
        borderColor: colors[4],
        fill: false,
      },
      {
        label: 'Länsi-Uusimaa',
        data: [9, 11, 13, 18, 18, 19, 24, 23],
        borderColor: colors[6],
        fill: false,
      },
      {
        label: 'Etelä-Pohjanmaa',
        data: [7, 5, 10, 9, 12, 13, 16, 20],
        borderColor: colors[7],
        fill: false,
      },
      // Add more regions here similarly
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
        },
      },
      title: {
        display: true,
        text: 'Percentage of patients having reported symptoms after 1 year of starting treatment',
        align: 'start',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Percentage (%)',
        },
        min: 0,
        max: 100,
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  }

  return (
    <div style={{ height: '500px', width: '600px' }}>
      <Line data={data} options={options} />
    </div>
  )
}

function TSHPercentageAfter6Months() {
  const data = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Etelä-Karjala',
        data: [91, 91, 88, 89, 88, 87, 85, 84],
        borderColor: colors[0],
        fill: false,
      },
      {
        label: 'Keski-Uusimaa',
        data: [94, 90, 90, 90, 88, 86, 88, 87],
        borderColor: colors[1],
        fill: false,
      },
      {
        label: 'Kanta-Häme',
        data: [93, 89, 89, 90, 90, 87, 85, 86],
        borderColor: colors[2],
        fill: false,
      },
      {
        label: 'Kymenlaakso',
        data: [94, 89, 90, 88, 87, 88, 87, 85],
        borderColor: colors[3],
        fill: false,
      },
      {
        label: 'Helsinki',
        data: [92, 92, 91, 89, 89, 85, 84, 83],
        borderColor: colors[4],
        fill: false,
      },
      {
        label: 'Länsi-Uusimaa',
        data: [92, 91, 89, 89, 90, 85, 84, 84],
        borderColor: colors[6],
        fill: false,
      },
      {
        label: 'Etelä-Pohjanmaa',
        data: [90, 91, 89, 88, 89, 87, 87, 85],
        borderColor: colors[7],
        fill: false,
      },
      // Add more regions here similarly
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
        },
      },
      title: {
        display: true,
        text: 'Percentage of patients having TSH in the reference range after 6 months of starting treatment',
        align: 'start',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Percentage (%)',
        },
        min: 0,
        max: 100,
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  }

  return (
    <div style={{ height: '500px', width: '650px' }}>
      <Line data={data} options={options} />
    </div>
  )
}

export default function QualityRegister() {
  return (
    <div className='quality-container'>
      <h2 style={{ paddingBottom: '20px' }}>Quality Register for hypothyroidism</h2>
      <div className='chart-container'>
        <TSHCoverage />
        <SymptomsAfter1year />
        <TSHPercentageAfter6Months />
      </div>
    </div>
  )
}
