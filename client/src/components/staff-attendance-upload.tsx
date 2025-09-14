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
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Upload, 
  User, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  Plus,
  Eye,
  Edit,
  Users,
  BookOpen,
  AlertCircle
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string
  course: string
  semester: number
  status: "present" | "absent" | "late" | "excused"
}

interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  subject: string
  subjectCode: string
  date: string
  status: "present" | "absent" | "late" | "excused"
  remarks?: string
  uploadedBy: string
  uploadedAt: string
}

interface Subject {
  id: string
  name: string
  code: string
  semester: number
  course: string
  totalClasses: number
  conductedClasses: number
}

interface StaffAttendanceUploadProps {
  currentUser: {
    id: string
    name: string
    role: string
  }
}

export function StaffAttendanceUpload({ currentUser }: StaffAttendanceUploadProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false)

  // Mock data for subjects taught by current staff
  const subjects: Subject[] = [
    {
      id: "SUB001",
      name: "Data Structures",
      code: "CS301",
      semester: 3,
      course: "Computer Science",
      totalClasses: 30,
      conductedClasses: 25
    },
    {
      id: "SUB002",
      name: "Algorithms",
      code: "CS302",
      semester: 3,
      course: "Computer Science",
      totalClasses: 30,
      conductedClasses: 22
    },
    {
      id: "SUB003",
      name: "Programming Fundamentals",
      code: "CS101",
      semester: 1,
      course: "Computer Science",
      totalClasses: 30,
      conductedClasses: 28
    }
  ]

  // Mock data for students in selected subject
  const students: Student[] = [
    {
      id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      rollNumber: "CS2024001",
      course: "Computer Science",
      semester: 3,
      status: "present"
    },
    {
      id: "STU002",
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      rollNumber: "CS2024002",
      course: "Computer Science",
      semester: 3,
      status: "absent"
    },
    {
      id: "STU003",
      name: "Carol Davis",
      email: "carol.davis@university.edu",
      rollNumber: "CS2024003",
      course: "Computer Science",
      semester: 3,
      status: "late"
    },
    {
      id: "STU004",
      name: "David Wilson",
      email: "david.wilson@university.edu",
      rollNumber: "CS2024004",
      course: "Computer Science",
      semester: 3,
      status: "present"
    },
    {
      id: "STU005",
      name: "Emma Brown",
      email: "emma.brown@university.edu",
      rollNumber: "CS2024005",
      course: "Computer Science",
      semester: 3,
      status: "excused"
    }
  ]

  // Mock data for attendance records
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: "ATT001",
      studentId: "STU001",
      studentName: "Alice Johnson",
      subject: "Data Structures",
      subjectCode: "CS301",
      date: "2024-01-15",
      status: "present",
      uploadedBy: currentUser.name,
      uploadedAt: "2024-01-15T10:30:00"
    },
    {
      id: "ATT002",
      studentId: "STU002",
      studentName: "Bob Smith",
      subject: "Data Structures",
      subjectCode: "CS301",
      date: "2024-01-15",
      status: "absent",
      remarks: "Medical leave",
      uploadedBy: currentUser.name,
      uploadedAt: "2024-01-15T10:30:00"
    },
    {
      id: "ATT003",
      studentId: "STU003",
      studentName: "Carol Davis",
      subject: "Algorithms",
      subjectCode: "CS302",
      date: "2024-01-16",
      status: "late",
      remarks: "Traffic delay",
      uploadedBy: currentUser.name,
      uploadedAt: "2024-01-16T09:45:00"
    }
  ]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || record.subjectCode === selectedSubject
    return matchesSearch && matchesSubject
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800"
      case "absent": return "bg-red-100 text-red-800"
      case "late": return "bg-yellow-100 text-yellow-800"
      case "excused": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle className="h-4 w-4" />
      case "absent": return <XCircle className="h-4 w-4" />
      case "late": return <Clock className="h-4 w-4" />
      case "excused": return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const handleStatusChange = (studentId: string, newStatus: "present" | "absent" | "late" | "excused") => {
    console.log(`Changing status for student ${studentId} to ${newStatus}`)
    // Implement status change logic
  }

  const handleBulkUpload = () => {
    console.log("Bulk upload attendance")
    // Implement bulk upload logic
  }

  const handleSubmitAttendance = () => {
    console.log("Submitting attendance for", selectedSubject, "on", selectedDate)
    // Implement attendance submission logic
  }

  const totalStudents = students.length
  const presentStudents = students.filter(s => s.status === "present").length
  const absentStudents = students.filter(s => s.status === "absent").length
  const attendancePercentage = Math.round((presentStudents / totalStudents) * 100)

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Attendance Upload</h1>
          <p className="text-muted-foreground">
            Upload and manage student attendance for your subjects
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsBulkUploadDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
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
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
            <p className="text-sm text-gray-500">In selected class</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Present</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{presentStudents}</p>
            <p className="text-sm text-gray-500">Students present</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Absent</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                <XCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{absentStudents}</p>
            <p className="text-sm text-gray-500">Students absent</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Attendance</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{attendancePercentage}%</p>
            <p className="text-sm text-gray-500">Attendance rate</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="mark" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
            <TabsTrigger value="records">Attendance Records</TabsTrigger>
            <TabsTrigger value="subjects">My Subjects</TabsTrigger>
          </TabsList>

          <TabsContent value="mark" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Mark Student Attendance</CardTitle>
                    <CardDescription className="text-gray-600">
                      Select subject, date, and mark attendance for students
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject.id} value={subject.code}>
                            {subject.name} ({subject.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-40"
                    />
                    <Button onClick={handleSubmitAttendance} disabled={!selectedSubject || !selectedDate}>
                      Submit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                {selectedSubject && selectedDate ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => students.forEach(s => handleStatusChange(s.id, "present"))}
                        >
                          Mark All Present
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => students.forEach(s => handleStatusChange(s.id, "absent"))}
                        >
                          Mark All Absent
                        </Button>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Select</TableHead>
                          <TableHead>Student Details</TableHead>
                          <TableHead>Roll Number</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <Checkbox
                                checked={student.status === "present"}
                                onCheckedChange={(checked) => 
                                  handleStatusChange(student.id, checked ? "present" : "absent")
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{student.name}</p>
                                <p className="text-sm text-gray-600">{student.email}</p>
                                <p className="text-xs text-gray-500">ID: {student.id}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium text-gray-900">{student.rollNumber}</p>
                            </TableCell>
                            <TableCell>
                              <Badge className={`px-2 py-1 rounded-full ${getStatusColor(student.status)}`}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(student.status)}
                                  {student.status}
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStatusChange(student.id, "present")}
                                >
                                  P
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStatusChange(student.id, "absent")}
                                >
                                  A
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStatusChange(student.id, "late")}
                                >
                                  L
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStatusChange(student.id, "excused")}
                                >
                                  E
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Please select a subject and date to mark attendance</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Attendance Records</CardTitle>
                    <CardDescription className="text-gray-600">
                      View and manage uploaded attendance records
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map(subject => (
                          <SelectItem key={subject.id} value={subject.code}>
                            {subject.name} ({subject.code})
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
                      <TableHead>Student</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{record.studentName}</p>
                            <p className="text-sm text-gray-600">ID: {record.studentId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{record.subject}</p>
                            <p className="text-sm text-gray-600">{record.subjectCode}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
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
                          <p className="text-sm text-gray-600">{record.remarks || "-"}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm text-gray-900">{new Date(record.uploadedAt).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">by {record.uploadedBy}</p>
                          </div>
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

          <TabsContent value="subjects" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">My Subjects</CardTitle>
                    <CardDescription className="text-gray-600">
                      Subjects you are teaching and their attendance statistics
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <Card key={subject.id} className="border border-gray-200">
                      <CardHeader className="px-4 pt-4 pb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm font-medium text-gray-900">{subject.name}</CardTitle>
                            <CardDescription className="text-gray-600">{subject.code}</CardDescription>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 pb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Course:</span>
                            <span className="font-medium">{subject.course}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Semester:</span>
                            <span className="font-medium">{subject.semester}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Classes:</span>
                            <span className="font-medium">{subject.conductedClasses}/{subject.totalClasses}</span>
                          </div>
                          <div className="pt-2">
                            <Progress value={(subject.conductedClasses / subject.totalClasses) * 100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>
              Select subject and date to mark attendance for students
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.code}>
                      {subject.name} ({subject.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input type="date" />
            </div>
            <Button className="w-full">Mark Attendance</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={isBulkUploadDialogOpen} onOpenChange={setIsBulkUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Upload Attendance</DialogTitle>
            <DialogDescription>
              Upload attendance data from CSV or Excel file
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select File</label>
              <Input type="file" accept=".csv,.xlsx,.xls" />
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.code}>
                      {subject.name} ({subject.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input type="date" />
            </div>
            <Button className="w-full" onClick={handleBulkUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Attendance
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
