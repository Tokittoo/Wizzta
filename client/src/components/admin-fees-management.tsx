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
  CreditCard, 
  User, 
  Calendar,
  Edit,
  Eye,
  Download,
  Plus,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  TrendingUp,
  Receipt
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  course: string
  semester: number
  totalFees: number
  paidFees: number
  pendingFees: number
  lastPaymentDate?: string
  nextDueDate: string
  status: "paid" | "partial" | "overdue" | "pending"
}

interface PaymentRecord {
  id: string
  studentId: string
  studentName: string
  amount: number
  paymentDate: string
  paymentMethod: "cash" | "card" | "bank_transfer" | "online"
  transactionId: string
  semester: number
  academicYear: string
  status: "completed" | "pending" | "failed"
  receiptNumber: string
}

interface FeeStructure {
  id: string
  course: string
  semester: number
  tuitionFee: number
  libraryFee: number
  labFee: number
  examFee: number
  hostelFee: number
  totalFee: number
  academicYear: string
}

interface AdminFeesManagementProps {
  onDownloadReport: (type: string) => void
}

export function AdminFeesManagement({ onDownloadReport }: AdminFeesManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isFeeStructureDialogOpen, setIsFeeStructureDialogOpen] = useState(false)

  // Mock data for students
  const students: Student[] = [
    {
      id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      course: "Computer Science",
      semester: 3,
      totalFees: 50000,
      paidFees: 50000,
      pendingFees: 0,
      lastPaymentDate: "2024-01-15",
      nextDueDate: "2024-07-15",
      status: "paid"
    },
    {
      id: "STU002",
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      course: "Engineering",
      semester: 2,
      totalFees: 55000,
      paidFees: 30000,
      pendingFees: 25000,
      lastPaymentDate: "2024-01-10",
      nextDueDate: "2024-02-15",
      status: "partial"
    },
    {
      id: "STU003",
      name: "Carol Davis",
      email: "carol.davis@university.edu",
      course: "Business Administration",
      semester: 4,
      totalFees: 45000,
      paidFees: 0,
      pendingFees: 45000,
      lastPaymentDate: undefined,
      nextDueDate: "2024-01-30",
      status: "overdue"
    },
    {
      id: "STU004",
      name: "David Wilson",
      email: "david.wilson@university.edu",
      course: "Computer Science",
      semester: 1,
      totalFees: 50000,
      paidFees: 0,
      pendingFees: 50000,
      lastPaymentDate: undefined,
      nextDueDate: "2024-02-28",
      status: "pending"
    }
  ]

  // Mock data for payment records
  const paymentRecords: PaymentRecord[] = [
    {
      id: "PAY001",
      studentId: "STU001",
      studentName: "Alice Johnson",
      amount: 50000,
      paymentDate: "2024-01-15",
      paymentMethod: "bank_transfer",
      transactionId: "TXN123456789",
      semester: 3,
      academicYear: "2023-24",
      status: "completed",
      receiptNumber: "RCP001"
    },
    {
      id: "PAY002",
      studentId: "STU002",
      studentName: "Bob Smith",
      amount: 30000,
      paymentDate: "2024-01-10",
      paymentMethod: "online",
      transactionId: "TXN987654321",
      semester: 2,
      academicYear: "2023-24",
      status: "completed",
      receiptNumber: "RCP002"
    },
    {
      id: "PAY003",
      studentId: "STU005",
      studentName: "Emma Brown",
      amount: 25000,
      paymentDate: "2024-01-20",
      paymentMethod: "card",
      transactionId: "TXN456789123",
      semester: 1,
      academicYear: "2023-24",
      status: "pending",
      receiptNumber: "RCP003"
    }
  ]

  // Mock data for fee structure
  const feeStructures: FeeStructure[] = [
    {
      id: "FEE001",
      course: "Computer Science",
      semester: 1,
      tuitionFee: 40000,
      libraryFee: 2000,
      labFee: 5000,
      examFee: 2000,
      hostelFee: 1000,
      totalFee: 50000,
      academicYear: "2023-24"
    },
    {
      id: "FEE002",
      course: "Engineering",
      semester: 1,
      tuitionFee: 45000,
      libraryFee: 2000,
      labFee: 6000,
      examFee: 2000,
      hostelFee: 1000,
      totalFee: 55000,
      academicYear: "2023-24"
    },
    {
      id: "FEE003",
      course: "Business Administration",
      semester: 1,
      tuitionFee: 35000,
      libraryFee: 2000,
      labFee: 3000,
      examFee: 2000,
      hostelFee: 3000,
      totalFee: 45000,
      academicYear: "2023-24"
    }
  ]

  const courses = ["all", "Computer Science", "Engineering", "Business Administration", "Mathematics", "Physics"]
  const statuses = ["all", "paid", "partial", "overdue", "pending"]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse
    return matchesSearch && matchesStatus && matchesCourse
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800"
      case "partial": return "bg-yellow-100 text-yellow-800"
      case "overdue": return "bg-red-100 text-red-800"
      case "pending": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "failed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="h-4 w-4" />
      case "partial": return <Clock className="h-4 w-4" />
      case "overdue": return <AlertCircle className="h-4 w-4" />
      case "pending": return <Clock className="h-4 w-4" />
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "failed": return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "cash": return <DollarSign className="h-4 w-4" />
      case "card": return <CreditCard className="h-4 w-4" />
      case "bank_transfer": return <Receipt className="h-4 w-4" />
      case "online": return <TrendingUp className="h-4 w-4" />
      default: return <CreditCard className="h-4 w-4" />
    }
  }

  const totalRevenue = students.reduce((sum, student) => sum + student.paidFees, 0)
  const pendingRevenue = students.reduce((sum, student) => sum + student.pendingFees, 0)
  const paidStudents = students.filter(s => s.status === "paid").length
  const overdueStudents = students.filter(s => s.status === "overdue").length

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Fees Payment Management</h1>
          <p className="text-muted-foreground">
            Manage student fee payments, track revenue, and monitor payment status
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onDownloadReport("fees")}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
                <DialogDescription>
                  Record a new fee payment from a student
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Student</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Payment Amount</label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <div>
                  <label className="text-sm font-medium">Payment Method</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Transaction ID</label>
                  <Input placeholder="Enter transaction ID" />
                </div>
                <Button className="w-full">Record Payment</Button>
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
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Collected fees</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Revenue</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">₹{pendingRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Outstanding fees</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Paid Students</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{paidStudents}</p>
            <p className="text-sm text-gray-500">Fully paid</p>
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
            <p className="text-2xl font-bold text-gray-900">{overdueStudents}</p>
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
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Student Payments</TabsTrigger>
            <TabsTrigger value="records">Payment Records</TabsTrigger>
            <TabsTrigger value="structure">Fee Structure</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Student Fee Status</CardTitle>
                    <CardDescription className="text-gray-600">
                      Track individual student payment status and outstanding amounts
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search students..."
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
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course} value={course}>
                            {course === "all" ? "All Courses" : course}
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
                      <TableHead>Student Details</TableHead>
                      <TableHead>Course & Semester</TableHead>
                      <TableHead>Fee Status</TableHead>
                      <TableHead>Payment Progress</TableHead>
                      <TableHead>Next Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <p className="text-xs text-gray-500">ID: {student.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{student.course}</p>
                            <p className="text-sm text-gray-600">Semester {student.semester}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={`px-2 py-1 rounded-full ${getStatusColor(student.status)}`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(student.status)}
                                {student.status}
                              </div>
                            </Badge>
                            <p className="text-sm text-gray-600">
                              ₹{student.paidFees.toLocaleString()} / ₹{student.totalFees.toLocaleString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <Progress 
                              value={(student.paidFees / student.totalFees) * 100} 
                              className="w-24"
                            />
                            <p className="text-sm text-gray-600">
                              {Math.round((student.paidFees / student.totalFees) * 100)}%
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{new Date(student.nextDueDate).toLocaleDateString()}</p>
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
                    <CardTitle className="text-lg font-semibold text-gray-900">Payment Records</CardTitle>
                    <CardDescription className="text-gray-600">
                      View all payment transactions and receipts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{record.studentName}</p>
                            <p className="text-sm text-gray-600">ID: {record.studentId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-gray-900">₹{record.amount.toLocaleString()}</p>
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
                          <p className="text-sm text-gray-600 font-mono">{record.transactionId}</p>
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
                            {record.receiptNumber}
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
                    <CardTitle className="text-lg font-semibold text-gray-900">Fee Structure</CardTitle>
                    <CardDescription className="text-gray-600">
                      Manage fee structure for different courses and semesters
                    </CardDescription>
                  </div>
                  <Dialog open={isFeeStructureDialogOpen} onOpenChange={setIsFeeStructureDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Fee Structure
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Fee Structure</DialogTitle>
                        <DialogDescription>
                          Create a new fee structure for a course and semester
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Course</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.slice(1).map(course => (
                                <SelectItem key={course} value={course}>{course}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Semester</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Semester 1</SelectItem>
                              <SelectItem value="2">Semester 2</SelectItem>
                              <SelectItem value="3">Semester 3</SelectItem>
                              <SelectItem value="4">Semester 4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Tuition Fee</label>
                          <Input type="number" placeholder="Enter tuition fee" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Library Fee</label>
                          <Input type="number" placeholder="Enter library fee" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Lab Fee</label>
                          <Input type="number" placeholder="Enter lab fee" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Exam Fee</label>
                          <Input type="number" placeholder="Enter exam fee" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Hostel Fee</label>
                          <Input type="number" placeholder="Enter hostel fee" />
                        </div>
                        <Button className="w-full">Add Fee Structure</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course & Semester</TableHead>
                      <TableHead>Tuition Fee</TableHead>
                      <TableHead>Library Fee</TableHead>
                      <TableHead>Lab Fee</TableHead>
                      <TableHead>Exam Fee</TableHead>
                      <TableHead>Hostel Fee</TableHead>
                      <TableHead>Total Fee</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeStructures.map((structure) => (
                      <TableRow key={structure.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{structure.course}</p>
                            <p className="text-sm text-gray-600">Semester {structure.semester}</p>
                            <p className="text-xs text-gray-500">{structure.academicYear}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">₹{structure.tuitionFee.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">₹{structure.libraryFee.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">₹{structure.labFee.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">₹{structure.examFee.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">₹{structure.hostelFee.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-gray-900">₹{structure.totalFee.toLocaleString()}</p>
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
