import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Search, Filter, Download, CreditCard, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

const PaymentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const payments = [
    { id: 'PAY-001', orderId: 'ORD-001', customer: 'John Doe', amount: '$250.00', method: 'Credit Card', status: 'Completed', date: '2024-01-15', fee: '$7.50' },
    { id: 'PAY-002', orderId: 'ORD-002', customer: 'Jane Smith', amount: '$150.00', method: 'PayPal', status: 'Pending', date: '2024-01-15', fee: '$4.50' },
    { id: 'PAY-003', orderId: 'ORD-003', customer: 'Bob Johnson', amount: '$350.00', method: 'Credit Card', status: 'Completed', date: '2024-01-14', fee: '$10.50' },
    { id: 'PAY-004', orderId: 'ORD-004', customer: 'Alice Brown', amount: '$75.00', method: 'Bank Transfer', status: 'Processing', date: '2024-01-14', fee: '$2.25' },
    { id: 'PAY-005', orderId: 'ORD-005', customer: 'Charlie Wilson', amount: '$500.00', method: 'Credit Card', status: 'Completed', date: '2024-01-13', fee: '$15.00' },
    { id: 'PAY-006', orderId: 'ORD-006', customer: 'Diana Prince', amount: '$200.00', method: 'PayPal', status: 'Failed', date: '2024-01-13', fee: '$0.00' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'Processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case 'Failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard className="h-4 w-4" />
      case 'PayPal':
        return <div className="h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>
      case 'Bank Transfer':
        return <DollarSign className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const filteredPayments = payments.filter(payment =>
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payments</h1>
          <p className="text-gray-600">Track and manage all payment transactions</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Successful Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600">98.5% success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-yellow-600">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-red-600 flex items-center">
              <AlertCircle className="mr-1 h-3 w-3" />
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>All payment transactions and their details</CardDescription>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell className="text-blue-600 hover:underline cursor-pointer">
                    {payment.orderId}
                  </TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(payment.method)}
                      <span>{payment.method}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{payment.amount}</TableCell>
                  <TableCell className="text-gray-600">{payment.fee}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-gray-600">{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentsPage