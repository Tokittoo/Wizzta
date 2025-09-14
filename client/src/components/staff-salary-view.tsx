import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  Calendar,
  Download,
  Receipt,
  Banknote,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  User,
  Building
} from "lucide-react"

interface StaffSalaryData {
  id: string
  name: string
  employeeId: string
  department: string
  position: string
  joinDate: string
  currentSalary: {
    basicSalary: number
    hra: number
    da: number
    medicalAllowance: number
    transportAllowance: number
    totalAllowances: number
    pf: number
    esi: number
    tax: number
    totalDeductions: number
    netSalary: number
  }
  bankDetails: {
    accountNumber: string
    bankName: string
    ifscCode: string
    accountHolderName: string
  }
  salaryStatus: "paid" | "pending" | "overdue" | "partial"
  lastPaidDate?: string
  nextPayDate: string
}

interface SalaryHistory {
  id: string
  month: string
  year: number
  basicSalary: number
  allowances: number
  deductions: number
  netSalary: number
  paymentDate: string
  paymentMethod: "bank_transfer" | "cheque" | "cash"
  status: "completed" | "pending" | "failed"
  payslipNumber: string
}

interface StaffSalaryViewProps {
  currentUser: {
    id: string
    name: string
    role: string
  }
}

export function StaffSalaryView({ currentUser }: StaffSalaryViewProps) {
  // Mock data for current staff member
  const staffSalaryData: StaffSalaryData = {
    id: currentUser.id,
    name: currentUser.name,
    employeeId: "EMP001",
    department: "Computer Science",
    position: "Professor",
    joinDate: "2020-01-15",
    currentSalary: {
      basicSalary: 80000,
      hra: 12000,
      da: 8000,
      medicalAllowance: 3000,
      transportAllowance: 2000,
      totalAllowances: 25000,
      pf: 8000,
      esi: 0,
      tax: 0,
      totalDeductions: 8000,
      netSalary: 97000
    },
    bankDetails: {
      accountNumber: "1234567890",
      bankName: "State Bank of India",
      ifscCode: "SBIN0001234",
      accountHolderName: currentUser.name
    },
    salaryStatus: "paid",
    lastPaidDate: "2024-01-31",
    nextPayDate: "2024-02-28"
  }

  // Mock salary history data
  const salaryHistory: SalaryHistory[] = [
    {
      id: "SAL001",
      month: "January",
      year: 2024,
      basicSalary: 80000,
      allowances: 25000,
      deductions: 8000,
      netSalary: 97000,
      paymentDate: "2024-01-31",
      paymentMethod: "bank_transfer",
      status: "completed",
      payslipNumber: "PSL001"
    },
    {
      id: "SAL002",
      month: "December",
      year: 2023,
      basicSalary: 80000,
      allowances: 25000,
      deductions: 8000,
      netSalary: 97000,
      paymentDate: "2023-12-31",
      paymentMethod: "bank_transfer",
      status: "completed",
      payslipNumber: "PSL002"
    },
    {
      id: "SAL003",
      month: "November",
      year: 2023,
      basicSalary: 80000,
      allowances: 25000,
      deductions: 8000,
      netSalary: 97000,
      paymentDate: "2023-11-30",
      paymentMethod: "bank_transfer",
      status: "completed",
      payslipNumber: "PSL003"
    },
    {
      id: "SAL004",
      month: "October",
      year: 2023,
      basicSalary: 80000,
      allowances: 25000,
      deductions: 8000,
      netSalary: 97000,
      paymentDate: "2023-10-31",
      paymentMethod: "bank_transfer",
      status: "completed",
      payslipNumber: "PSL004"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "overdue": return "bg-red-100 text-red-800"
      case "partial": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "failed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="h-4 w-4" />
      case "pending": return <Clock className="h-4 w-4" />
      case "overdue": return <AlertCircle className="h-4 w-4" />
      case "partial": return <Clock className="h-4 w-4" />
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "failed": return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "bank_transfer": return <Banknote className="h-4 w-4" />
      case "cheque": return <FileText className="h-4 w-4" />
      case "cash": return <DollarSign className="h-4 w-4" />
      default: return <Banknote className="h-4 w-4" />
    }
  }

  const handleDownloadPayslip = (payslipNumber: string) => {
    console.log(`Downloading payslip: ${payslipNumber}`)
    // Implement payslip download functionality
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">My Salary</h1>
          <p className="text-muted-foreground">
            View your salary details, payment history, and download payslips
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleDownloadPayslip("current")}>
            <Download className="h-4 w-4 mr-2" />
            Download Current Payslip
          </Button>
        </div>
      </motion.div>

      {/* Staff Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Employee Info</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{staffSalaryData.name}</p>
              <p className="text-sm text-gray-600">ID: {staffSalaryData.employeeId}</p>
              <p className="text-sm text-gray-600">{staffSalaryData.position}</p>
              <p className="text-sm text-gray-600">{staffSalaryData.department}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Current Status</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              <Badge className={`px-2 py-1 rounded-full ${getStatusColor(staffSalaryData.salaryStatus)}`}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(staffSalaryData.salaryStatus)}
                  {staffSalaryData.salaryStatus}
                </div>
              </Badge>
              {staffSalaryData.lastPaidDate && (
                <p className="text-sm text-gray-600">
                  Last paid: {new Date(staffSalaryData.lastPaidDate).toLocaleDateString()}
                </p>
              )}
              <p className="text-sm text-gray-600">
                Next pay: {new Date(staffSalaryData.nextPayDate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Net Salary</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">₹{staffSalaryData.currentSalary.netSalary.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Monthly salary</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current Salary</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="bank">Bank Details</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Salary Breakdown */}
              <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                <CardHeader className="px-4 pt-4 pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">Salary Breakdown</CardTitle>
                  <CardDescription className="text-gray-600">
                    Detailed breakdown of your current salary
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Earnings</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Basic Salary</span>
                          <span className="text-sm font-medium">₹{staffSalaryData.currentSalary.basicSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">HRA</span>
                          <span className="text-sm font-medium">₹{staffSalaryData.currentSalary.hra.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">DA</span>
                          <span className="text-sm font-medium">₹{staffSalaryData.currentSalary.da.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Medical Allowance</span>
                          <span className="text-sm font-medium">₹{staffSalaryData.currentSalary.medicalAllowance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Transport Allowance</span>
                          <span className="text-sm font-medium">₹{staffSalaryData.currentSalary.transportAllowance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-gray-900">Total Allowances</span>
                          <span className="font-medium text-gray-900">₹{staffSalaryData.currentSalary.totalAllowances.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Deductions</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Provident Fund (PF)</span>
                          <span className="text-sm font-medium">₹{staffSalaryData.currentSalary.pf.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">ESI</span>
                          <span className="text-sm font-medium">₹{staffSalaryData.currentSalary.esi.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tax</span>
                          <span className="text-sm font-medium">₹{staffSalaryData.currentSalary.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-gray-900">Total Deductions</span>
                          <span className="font-medium text-gray-900">₹{staffSalaryData.currentSalary.totalDeductions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-900">Net Salary</span>
                        <span className="text-lg font-bold text-gray-900">₹{staffSalaryData.currentSalary.netSalary.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Status */}
              <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                <CardHeader className="px-4 pt-4 pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">Payment Status</CardTitle>
                  <CardDescription className="text-gray-600">
                    Current payment status and timeline
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge className={`px-4 py-2 rounded-full text-lg ${getStatusColor(staffSalaryData.salaryStatus)}`}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(staffSalaryData.salaryStatus)}
                          {staffSalaryData.salaryStatus.toUpperCase()}
                        </div>
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Last Payment</span>
                        </div>
                        <span className="text-sm font-medium">
                          {staffSalaryData.lastPaidDate ? new Date(staffSalaryData.lastPaidDate).toLocaleDateString() : "Not available"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Next Payment</span>
                        </div>
                        <span className="text-sm font-medium">
                          {new Date(staffSalaryData.nextPayDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Join Date</span>
                        </div>
                        <span className="text-sm font-medium">
                          {new Date(staffSalaryData.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full" onClick={() => handleDownloadPayslip("current")}>
                        <Receipt className="h-4 w-4 mr-2" />
                        Download Current Payslip
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">Payment History</CardTitle>
                <CardDescription className="text-gray-600">
                  Your salary payment history for the last 12 months
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payslip</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <p className="font-medium text-gray-900">{record.month} {record.year}</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-gray-900">₹{record.netSalary.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(record.paymentMethod)}
                            <span className="text-sm text-gray-900 capitalize">
                              {record.paymentMethod.replace('_', ' ')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{new Date(record.paymentDate).toLocaleDateString()}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={`px-2 py-1 rounded-full ${getStatusColor(record.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(record.status)}
                              {record.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadPayslip(record.payslipNumber)}
                          >
                            <Receipt className="h-4 w-4 mr-1" />
                            {record.payslipNumber}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">Bank Details</CardTitle>
                <CardDescription className="text-gray-600">
                  Your registered bank account information for salary payments
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Account Holder Name</label>
                      <p className="text-sm text-gray-900">{staffSalaryData.bankDetails.accountHolderName}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Account Number</label>
                      <p className="text-sm text-gray-900 font-mono">{staffSalaryData.bankDetails.accountNumber}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Bank Name</label>
                      <p className="text-sm text-gray-900">{staffSalaryData.bankDetails.bankName}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">IFSC Code</label>
                      <p className="text-sm text-gray-900 font-mono">{staffSalaryData.bankDetails.ifscCode}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> If you need to update your bank details, please contact the HR department.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
