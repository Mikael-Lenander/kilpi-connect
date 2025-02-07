import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const symptoms = [
  { name: 'Diminished sweating', presentWeight: 6, absentWeight: -2, disabled: false },
  { name: 'Dry skin', presentWeight: 3, absentWeight: -6, disabled: false },
  { name: 'Cold intolerance', presentWeight: 4, absentWeight: -5, disabled: false },
  { name: 'Weight increase', presentWeight: 1, absentWeight: -1, disabled: false },
  { name: 'Constipation', presentWeight: 2, absentWeight: -1, disabled: false },
  { name: 'Hoarseness', presentWeight: 5, absentWeight: -4, disabled: false },
  { name: 'Deafness', presentWeight: 2, absentWeight: 0, disabled: false },
  { name: 'Slow movements', presentWeight: 11, absentWeight: -3, disabled: false },
  { name: 'Coarse skin', presentWeight: 7, absentWeight: -7, disabled: false },
  { name: 'Cold skin', presentWeight: 3, absentWeight: -2, disabled: false },
  { name: 'Periorbital puffiness', presentWeight: 4, absentWeight: -6, disabled: false },
  { name: 'Pulse rate <75/min ( Read from Smart Watch)', presentWeight: 4, absentWeight: -4, disabled: true }, // Auto-set
  { name: 'Ankle jerk delayed', presentWeight: 15, absentWeight: -6, disabled: false },
]

export function getDiagnosis(score) {
  if (score == null) {
    return ''
  } else if (score >= 25) {
    return 'Hypothyroidism likely.'
  } else if (score <= -30) {
    return 'Hypothyroidism unlikely.'
  } else {
    return 'Borderline or inconclusive. Further testing recommended.'
  }
}

export function getScoreText(score) {
  if (score == null) {
    return ''
  } else {
    return `Total Score: ${score}`
  }
}

export function generateReport(totalScore, selectedSymptoms) {
  // Generate PDF
  const doc = new jsPDF()

  // Add Header with Blue Background
  doc.setFillColor(108, 99, 255)
  doc.rect(0, 0, 210, 20, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.text('Hypothyroidism Diagnostic Report', 105, 12, null, null, 'center')

  // Reset text color and add Score & Diagnosis
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.text(getScoreText(totalScore), 10, 30)
  doc.text(`Diagnosis: ${getDiagnosis(totalScore)}`, 10, 40)

  // Add Selected Symptoms as a comma-separated list
  doc.text('Selected Symptoms:', 10, 50)
  doc.text(selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : 'None', 10, 60, { maxWidth: 180 })

  // Add Table using autoTable
  doc.autoTable({
    startY: 70,
    head: [['Symptom', 'Present Weight', 'Absent Weight']],
    body: symptoms.map(s => [s.name, `+${s.presentWeight}`, `${s.absentWeight}`]),
    theme: 'striped',
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [108, 99, 255], textColor: 255 },
  })

  // Add Copyright Notice
  doc.setFontSize(10)
  doc.text('© 2025 Hypothyroidism Diagnostic Tool. All rights reserved.', 10, 280)

  // Save the PDF
  doc.save('Diagnostic_Report.pdf')
}
