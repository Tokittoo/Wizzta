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
import { 
  Search, 
  User, 
  GraduationCap, 
  CreditCard, 
  Building, 
  BookOpen,
  Edit,
  Eye,
  Download,
  FileText,
  Calendar,
  Award,
  Plus
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  course: string
  semester: number
  admissionDate: string
  status: "active" | "inactive" | "suspended" | "graduated"
  feeStatus: "paid" | "pending" | "overdue"
  hostelAllocation?: {
    room: string
    building: string
    floor: number
  }
  academicRecord: {
    cgpa: number
    attendance: number
    completedCredits: number
    totalCredits: number
  }
  examResults: Array<{
    subject: string
    marks: number
    totalMarks: number
    grade: string
    examDate: string
  }>
}

interface StaffStudentDetailsProps {
  students: Student[]
  onUpdateStudent: (studentId: string, updates: Partial<Student>) => void
  onViewStudentProfile: (studentId: string) => void
  onDownloadReport: (studentId: string, reportType: string) => void
  onCreateStudent: (student: Omit<Student, 'id'>) => void
  userRole: "student" | "staff" | "admin"
}

export function StaffStudentDetails({
  students,
  onUpdateStudent,
  onViewStudentProfile,
  onDownloadReport,
  onCreateStudent,
  userRole
}: StaffStudentDetailsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Partial<Student>>({})
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: "",
    email: "",
    phone: "",
    course: "",
    semester: 1,
    admissionDate: "",
    status: "active",
    feeStatus: "pending",
    academicRecord: {
      cgpa: 0,
      attendance: 0,
      completedCredits: 0,
      totalCredits: 120
    },
    examResults: []
  })

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "inactive": return "bg-gray-500/10 text-gray-600 border-gray-500/20"
      case "suspended": return "bg-red-500/10 text-red-600 border-red-500/20"
      case "graduated": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "overdue": return "bg-red-500/10 text-red-600 border-red-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setSelectedStudent(student)
    setIsEditDialogOpen(true)
  }

  const handleSaveStudent = () => {
    if (selectedStudent) {
      onUpdateStudent(selectedStudent.id, editingStudent)
      setIsEditDialogOpen(false)
      setEditingStudent({})
      setSelectedStudent(null)
    }
  }

  const handleCreateStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.course) {
      onCreateStudent(newStudent as Omit<Student, 'id'>)
      setNewStudent({
        name: "",
        email: "",
        phone: "",
        course: "",
        semester: 1,
        admissionDate: "",
        status: "active",
        feeStatus: "pending",
        academicRecord: {
          cgpa: 0,
          attendance: 0,
          completedCredits: 0,
          totalCredits: 120
        },
        examResults: []
      })
      setIsCreateDialogOpen(false)
    }
  }

  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === "active").length
  const pendingFees = students.filter(s => s.feeStatus === "pending" || s.feeStatus === "overdue").length
  const hostelAllocated = students.filter(s => s.hostelAllocation).length

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">
            View and manage student records and academic information
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          {userRole === "admin" && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Create a new student record
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      value={newStudent.name || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      placeholder="Enter full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={newStudent.email || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      placeholder="Enter email address"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={newStudent.phone || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      placeholder="Enter phone number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Course</label>
                    <Input
                      value={newStudent.course || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                      placeholder="Enter course"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Semester</label>
                    <Input
                      type="number"
                      value={newStudent.semester || 1}
                      onChange={(e) => setNewStudent({ ...newStudent, semester: parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Admission Date</label>
                    <Input
                      type="date"
                      value={newStudent.admissionDate || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, admissionDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={newStudent.status || "active"}
                      onValueChange={(value) => setNewStudent({ ...newStudent, status: value as any })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="graduated">Graduated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Fee Status</label>
                    <Select
                      value={newStudent.feeStatus || "pending"}
                      onValueChange={(value) => setNewStudent({ ...newStudent, feeStatus: value as any })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateStudent}>
                    Add Student
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          )}
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Fees</p>
                <p className="text-2xl font-bold">{pendingFees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Hostel Allocated</p>
                <p className="text-2xl font-bold">{hostelAllocated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students by name, ID, or course..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader>
            <CardTitle>Student Records</CardTitle>
            <CardDescription>
              {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee Status</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Hostel</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.id}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.course}</p>
                        <p className="text-sm text-muted-foreground">Semester {student.semester}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getFeeStatusColor(student.feeStatus)}>
                        {student.feeStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{student.academicRecord.cgpa.toFixed(2)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {student.hostelAllocation ? (
                        <div>
                          <p className="font-medium">{student.hostelAllocation.room}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.hostelAllocation.building}, Floor {student.hostelAllocation.floor}
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not allocated</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onViewStudentProfile(student.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditStudent(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDownloadReport(student.id, "academic")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Student Information</DialogTitle>
            <DialogDescription>
              Update student details and academic information
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editingStudent.name || selectedStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={editingStudent.email || selectedStudent.email}
                    onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={editingStudent.phone || selectedStudent.phone}
                    onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Course</label>
                  <Input
                    value={editingStudent.course || selectedStudent.course}
                    onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Semester</label>
                  <Input
                    type="number"
                    value={editingStudent.semester || selectedStudent.semester}
                    onChange={(e) => setEditingStudent({ ...editingStudent, semester: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={editingStudent.status || selectedStudent.status}
                    onValueChange={(value) => setEditingStudent({ ...editingStudent, status: value as any })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveStudent}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
