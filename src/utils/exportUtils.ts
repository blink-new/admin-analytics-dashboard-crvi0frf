import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export const exportToPDF = (data: any[], filename: string, title: string) => {
  if (data.length === 0) return

  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(20)
  doc.text(title, 20, 20)
  
  // Add date
  doc.setFontSize(12)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)
  
  // Prepare table data
  const headers = Object.keys(data[0])
  const rows = data.map(row => headers.map(header => row[header]))
  
  // Add table
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 50,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [37, 99, 235], // Blue color
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  })
  
  doc.save(`${filename}.pdf`)
}

export const generateSampleAnalyticsData = () => {
  const currentDate = new Date()
  const data = []
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(currentDate)
    date.setDate(date.getDate() - i)
    
    data.push({
      Date: date.toLocaleDateString(),
      'Page Views': Math.floor(Math.random() * 1000) + 500,
      'Unique Visitors': Math.floor(Math.random() * 500) + 200,
      'Bounce Rate': `${(Math.random() * 30 + 20).toFixed(1)}%`,
      'Avg Session Duration': `${Math.floor(Math.random() * 5 + 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      'Conversion Rate': `${(Math.random() * 5 + 1).toFixed(2)}%`,
      Revenue: `$${(Math.random() * 1000 + 100).toFixed(2)}`
    })
  }
  
  return data
}

export const generateSampleOrdersData = () => {
  const orders = []
  const customers = ['John Doe', 'Sarah Wilson', 'Mike Johnson', 'Emily Davis', 'Alex Brown']
  const products = ['Premium Dashboard', 'Analytics Plugin', 'UI Components', 'Admin Template', 'React Library']
  const statuses = ['completed', 'pending', 'processing', 'cancelled']
  
  for (let i = 0; i < 50; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    
    orders.push({
      'Order ID': `#${12345 + i}`,
      Customer: customers[Math.floor(Math.random() * customers.length)],
      Product: products[Math.floor(Math.random() * products.length)],
      Amount: `$${(Math.random() * 500 + 50).toFixed(2)}`,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      Date: date.toLocaleDateString()
    })
  }
  
  return orders
}