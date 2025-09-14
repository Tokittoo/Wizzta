import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  DollarSign, 
  User, 
  Calendar,
  Edit,
  Eye,
  Download,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  TrendingUp,
  Receipt,
  Banknote,
  CreditCard,
  FileText
} from "lucide-react"

interface Staff {
  id: string
  name: string
  email: string
  department: string
  position: string
  employeeId: string
  joinDate: string
  basicSalary: number
  allowances: number
  deductions: number
  netSalary: number
  lastPaidDate?: string
  nextPayDate: string
  status: "paid" | "pending" | "overdue" | "partial"
  bankDetails: {
    accountNumber: string
    bankName: string
    ifscCode: string
  }
}

interface SalaryRecord {
  id: string
  staffId: string
  staffName: string
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
  remarks?: string
}

interface SalaryStructure {
  id: string
  position: string
  department: string
  basicSalary: number
  hra: number
  da: number
  medicalAllowance: number
  transportAllowance: number
  pf: number
  esi: number
  tax: number
  totalSalary: number
  effectiveDate: string
}

interface AdminSalaryManagementProps {
  onDownloadReport: (type: string) => void
}

export function AdminSalaryManagement({ onDownloadReport }: AdminSalaryManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isSalaryDialogOpen, setIsSalaryDialogOpen] = useState(false)
  const [isStructureDialogOpen, setIsStructureDialogOpen] = useState(false)

  // Mock data for staff
  const staff: Staff[] = [
    {
      id: "STF001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      department: "Computer Science",
      position: "Professor",
      employeeId: "EMP001",
      joinDate: "2020-01-15",
      basicSalary: 80000,
      allowances: 15000,
      deductions: 8000,
      netSalary: 87000,
      lastPaidDate: "2024-01-31",
      nextPayDate: "2024-02-28",
      status: "paid",
      bankDetails: {
        accountNumber: "1234567890",
        bankName: "State Bank of India",
        ifscCode: "SBIN0001234"
      }
    },
    {
      id: "STF002",
      name: "Prof. Michael Brown",
      email: "michael.brown@university.edu",
      department: "Mathematics",
      position: "Associate Professor",
      employeeId: "EMP002",
      joinDate: "2021-03-01",
      basicSalary: 60000,
      allowances: 12000,
      deductions: 6000,
      netSalary: 66000,
      lastPaidDate: "2024-01-31",
      nextPayDate: "2024-02-28",
      status: "paid",
      bankDetails: {
        accountNumber: "2345678901",
        bankName: "HDFC Bank",
        ifscCode: "HDFC0001234"
      }
    },
    {
      id: "STF003",
      name: "Dr. Emily Davis",
      email: "emily.davis@university.edu",
      department: "Physics",
      position: "Assistant Professor",
      employeeId: "EMP003",
      joinDate: "2022-06-15",
      basicSalary: 45000,
      allowances: 8000,
      deductions: 4500,
      netSalary: 48500,
      lastPaidDate: undefined,
      nextPayDate: "2024-02-28",
      status: "pending",
      bankDetails: {
        accountNumber: "3456789012",
        bankName: "ICICI Bank",
        ifscCode: "ICIC0001234"
      }
    },
    {
      id: "STF004",
      name: "Mr. Robert Wilson",
      email: "robert.wilson@university.edu",
      department: "Administration",
      position: "Administrative Officer",
      employeeId: "EMP004",
      joinDate: "2019-08-20",
      basicSalary: 35000,
      allowances: 5000,
      deductions: 3500,
      netSalary: 36500,
      lastPaidDate: "2024-01-15",
      nextPayDate: "2024-01-31",
      status: "overdue",
      bankDetails: {
        accountNumber: "4567890123",
        bankName: "Axis Bank",
        ifscCode: "AXIS0001234"
      }
    }
  ]

  // Mock data for salary records
  const salaryRecords: SalaryRecord[] = [
    {
      id: "SAL001",
      staffId: "STF001",
      staffName: "Dr. Sarah Johnson",
      month: "January",
      year: 2024,
      basicSalary: 80000,
      allowances: 15000,
      deductions: 8000,
      netSalary: 87000,
      paymentDate: "2024-01-31",
      paymentMethod: "bank_transfer",
      status: "completed",
      payslipNumber: "PSL001"
    },
    {
      id: "SAL002",
      staffId: "STF002",
      staffName: "Prof. Michael Brown",
      month: "January",
      year: 2024,
      basicSalary: 60000,
      allowances: 12000,
      deductions: 6000,
      netSalary: 66000,
      paymentDate: "2024-01-31",
      paymentMethod: "bank_transfer",
      status: "completed",
      payslipNumber: "PSL002"
    },
    {
      id: "SAL003",
      staffId: "STF003",
      staffName: "Dr. Emily Davis",
      month: "January",
      year: 2024,
      basicSalary: 45000,
      allowances: 8000,
      deductions: 4500,
      netSalary: 48500,
      paymentDate: "2024-02-01",
      paymentMethod: "bank_transfer",
      status: "pending",
      payslipNumber: "PSL003"
    }
  ]

  // Mock data for salary structure
  const salaryStructures: SalaryStructure[] = [
    {
      id: "STR001",
      position: "Professor",
      department: "Computer Science",
      basicSalary: 80000,
      hra: 12000,
      da: 8000,
      medicalAllowance: 3000,
      transportAllowance: 2000,
      pf: 8000,
      esi: 0,
      tax: 0,
      totalSalary: 87000,
      effectiveDate: "2024-01-01"
    },
    {
      id: "STR002",
      position: "Associate Professor",
      department: "Mathematics",
      basicSalary: 60000,
      hra: 9000,
      da: 6000,
      medicalAllowance: 2000,
      transportAllowance: 1000,
      pf: 6000,
      esi: 0,
      tax: 0,
      totalSalary: 66000,
      effectiveDate: "2024-01-01"
    },
    {
      id: "STR003",
      position: "Assistant Professor",
      department: "Physics",
      basicSalary: 45000,
      hra: 6750,
      da: 4500,
      medicalAllowance: 1500,
      transportAllowance: 750,
      pf: 4500,
      esi: 0,
      tax: 0,
      totalSalary: 48500,
      effectiveDate: "2024-01-01"
    }
  ]

  const departments = ["all", "Computer Science", "Mathematics", "Physics", "Administration", "Engineering", "Business"]
  const statuses = ["all", "paid", "pending", "overdue", "partial"]

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || member.status === selectedStatus
    const matchesDepartment = selectedDepartment === "all" || member.department === selectedDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

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
      case "failed": return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "bank_transfer": return <Banknote className="h-4 w-4" />
      case "cheque": return <FileText className="h-4 w-4" />
      case "cash": return <DollarSign className="h-4 w-4" />
      default: return <CreditCard className="h-4 w-4" />
    }
  }

  const totalSalaryPaid = staff.reduce((sum, member) => sum + (member.status === "paid" ? member.netSalary : 0), 0)
  const pendingSalary = staff.reduce((sum, member) => sum + (member.status !== "paid" ? member.netSalary : 0), 0)
  const paidStaff = staff.filter(s => s.status === "paid").length
  const overdueStaff = staff.filter(s => s.status === "overdue").length

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Staff Salary Management</h1>
          <p className="text-muted-foreground">
            Manage staff salaries, track payments, and monitor salary structures
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onDownloadReport("salary")}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isSalaryDialogOpen} onOpenChange={setIsSalaryDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Process Salary
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Process Staff Salary</DialogTitle>
                <DialogDescription>
                  Process salary payment for staff members
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Staff Member</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {staff.map(member => (
                        <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Month</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Payment Method</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Payment Date</label>
                  <Input type="date" />
                </div>
                <Button className="w-full">Process Salary</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Paid</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">₹{totalSalaryPaid.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Salary paid this month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">₹{pendingSalary.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Pending salary</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Paid Staff</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{paidStaff}</p>
            <p className="text-sm text-gray-500">Staff paid</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{overdueStaff}</p>
            <p className="text-sm text-gray-500">Overdue payments</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="staff" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="staff">Staff Salaries</TabsTrigger>
            <TabsTrigger value="records">Salary Records</TabsTrigger>
            <TabsTrigger value="structure">Salary Structure</TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Staff Salary Status</CardTitle>
                    <CardDescription className="text-gray-600">
                      Track individual staff salary status and payment details
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search staff..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>
                            {status === "all" ? "All Status" : status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>
                            {dept === "all" ? "All Departments" : dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Details</TableHead>
                      <TableHead>Position & Department</TableHead>
                      <TableHead>Salary Breakdown</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Next Pay Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <p className="text-xs text-gray-500">ID: {member.employeeId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{member.position}</p>
                            <p className="text-sm text-gray-600">{member.department}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-900">
                              Basic: ₹{member.basicSalary.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              Allowances: ₹{member.allowances.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              Deductions: ₹{member.deductions.toLocaleString()}
                            </p>
                            <p className="font-medium text-gray-900">
                              Net: ₹{member.netSalary.toLocaleString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={`px-2 py-1 rounded-full ${getStatusColor(member.status)}`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(member.status)}
                                {member.status}
                              </div>
                            </Badge>
                            {member.lastPaidDate && (
                              <p className="text-xs text-gray-500">
                                Last paid: {new Date(member.lastPaidDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{new Date(member.nextPayDate).toLocaleDateString()}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Salary Records</CardTitle>
                    <CardDescription className="text-gray-600">
                      View all salary payment transactions and payslips
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payslip</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{record.staffName}</p>
                            <p className="text-sm text-gray-600">ID: {record.staffId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{record.month} {record.year}</p>
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
                          <Button variant="outline" size="sm">
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

          <TabsContent value="structure" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Salary Structure</CardTitle>
                    <CardDescription className="text-gray-600">
                      Manage salary structures for different positions and departments
                    </CardDescription>
                  </div>
                  <Dialog open={isStructureDialogOpen} onOpenChange={setIsStructureDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Structure
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Salary Structure</DialogTitle>
                        <DialogDescription>
                          Create a new salary structure for a position
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Position</label>
                          <Input placeholder="Enter position" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Department</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.slice(1).map(dept => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Basic Salary</label>
                          <Input type="number" placeholder="Enter basic salary" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">HRA</label>
                          <Input type="number" placeholder="Enter HRA" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">DA</label>
                          <Input type="number" placeholder="Enter DA" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Medical Allowance</label>
                          <Input type="number" placeholder="Enter medical allowance" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Transport Allowance</label>
                          <Input type="number" placeholder="Enter transport allowance" />
                        </div>
                        <Button className="w-full">Add Structure</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position & Department</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>HRA</TableHead>
                      <TableHead>DA</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Total Salary</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryStructures.map((structure) => (
                      <TableRow key={structure.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{structure.position}</p>
                            <p className="text-sm text-gray-600">{structure.department}</p>
                            <p className="text-xs text-gray-500">Effective: {new Date(structure.effectiveDate).toLocaleDateString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">₹{structure.basicSalary.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">₹{structure.hra.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">₹{structure.da.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="text-gray-900">Medical: ₹{structure.medicalAllowance.toLocaleString()}</p>
                            <p className="text-gray-600">Transport: ₹{structure.transportAllowance.toLocaleString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="text-gray-900">PF: ₹{structure.pf.toLocaleString()}</p>
                            <p className="text-gray-600">ESI: ₹{structure.esi.toLocaleString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-gray-900">₹{structure.totalSalary.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
