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
  BookOpen, 
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
  FileText,
  Award,
  GraduationCap,
  BarChart3
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  course: string
  semester: number
  rollNumber: string
  admissionDate: string
  status: "active" | "inactive" | "graduated"
}

interface ExamResult {
  id: string
  studentId: string
  studentName: string
  subject: string
  subjectCode: string
  examType: "midterm" | "final" | "assignment" | "quiz"
  marksObtained: number
  totalMarks: number
  grade: string
  examDate: string
  semester: number
  academicYear: string
  status: "passed" | "failed" | "supplementary"
}

interface ExamSchedule {
  id: string
  subject: string
  subjectCode: string
  examType: "midterm" | "final" | "assignment" | "quiz"
  examDate: string
  startTime: string
  endTime: string
  venue: string
  semester: number
  academicYear: string
  status: "scheduled" | "completed" | "cancelled"
  totalStudents: number
  presentStudents: number
}

interface AdminExaminationDetailsProps {
  onDownloadReport: (type: string) => void
}

export function AdminExaminationDetails({ onDownloadReport }: AdminExaminationDetailsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedExamType, setSelectedExamType] = useState("all")
  const [isAddExamDialogOpen, setIsAddExamDialogOpen] = useState(false)

  // Mock data for students
  const students: Student[] = [
    {
      id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      course: "Computer Science",
      semester: 3,
      rollNumber: "CS2024001",
      admissionDate: "2022-08-15",
      status: "active"
    },
    {
      id: "STU002",
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      course: "Engineering",
      semester: 2,
      rollNumber: "EN2024002",
      admissionDate: "2023-08-15",
      status: "active"
    },
    {
      id: "STU003",
      name: "Carol Davis",
      email: "carol.davis@university.edu",
      course: "Business Administration",
      semester: 4,
      rollNumber: "BA2024003",
      admissionDate: "2021-08-15",
      status: "active"
    },
    {
      id: "STU004",
      name: "David Wilson",
      email: "david.wilson@university.edu",
      course: "Computer Science",
      semester: 1,
      rollNumber: "CS2024004",
      admissionDate: "2024-08-15",
      status: "active"
    }
  ]

  // Mock data for exam results
  const examResults: ExamResult[] = [
    {
      id: "EXM001",
      studentId: "STU001",
      studentName: "Alice Johnson",
      subject: "Data Structures",
      subjectCode: "CS301",
      examType: "final",
      marksObtained: 85,
      totalMarks: 100,
      grade: "A",
      examDate: "2024-01-15",
      semester: 3,
      academicYear: "2023-24",
      status: "passed"
    },
    {
      id: "EXM002",
      studentId: "STU001",
      studentName: "Alice Johnson",
      subject: "Algorithms",
      subjectCode: "CS302",
      examType: "final",
      marksObtained: 78,
      totalMarks: 100,
      grade: "B+",
      examDate: "2024-01-18",
      semester: 3,
      academicYear: "2023-24",
      status: "passed"
    },
    {
      id: "EXM003",
      studentId: "STU002",
      studentName: "Bob Smith",
      subject: "Mathematics",
      subjectCode: "EN201",
      examType: "final",
      marksObtained: 92,
      totalMarks: 100,
      grade: "A+",
      examDate: "2024-01-20",
      semester: 2,
      academicYear: "2023-24",
      status: "passed"
    },
    {
      id: "EXM004",
      studentId: "STU003",
      studentName: "Carol Davis",
      subject: "Business Management",
      subjectCode: "BA401",
      examType: "final",
      marksObtained: 45,
      totalMarks: 100,
      grade: "F",
      examDate: "2024-01-22",
      semester: 4,
      academicYear: "2023-24",
      status: "failed"
    },
    {
      id: "EXM005",
      studentId: "STU004",
      studentName: "David Wilson",
      subject: "Programming Fundamentals",
      subjectCode: "CS101",
      examType: "midterm",
      marksObtained: 88,
      totalMarks: 100,
      grade: "A",
      examDate: "2024-01-25",
      semester: 1,
      academicYear: "2023-24",
      status: "passed"
    }
  ]

  // Mock data for exam schedules
  const examSchedules: ExamSchedule[] = [
    {
      id: "SCH001",
      subject: "Data Structures",
      subjectCode: "CS301",
      examType: "final",
      examDate: "2024-02-15",
      startTime: "09:00",
      endTime: "12:00",
      venue: "Hall A",
      semester: 3,
      academicYear: "2023-24",
      status: "scheduled",
      totalStudents: 45,
      presentStudents: 0
    },
    {
      id: "SCH002",
      subject: "Algorithms",
      subjectCode: "CS302",
      examType: "final",
      examDate: "2024-02-18",
      startTime: "09:00",
      endTime: "12:00",
      venue: "Hall B",
      semester: 3,
      academicYear: "2023-24",
      status: "scheduled",
      totalStudents: 45,
      presentStudents: 0
    },
    {
      id: "SCH003",
      subject: "Mathematics",
      subjectCode: "EN201",
      examType: "final",
      examDate: "2024-01-20",
      startTime: "14:00",
      endTime: "17:00",
      venue: "Hall C",
      semester: 2,
      academicYear: "2023-24",
      status: "completed",
      totalStudents: 60,
      presentStudents: 58
    }
  ]

  const courses = ["all", "Computer Science", "Engineering", "Business Administration", "Mathematics", "Physics"]
  const semesters = ["all", "1", "2", "3", "4", "5", "6", "7", "8"]
  const examTypes = ["all", "midterm", "final", "assignment", "quiz"]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse
    const matchesSemester = selectedSemester === "all" || student.semester.toString() === selectedSemester
    return matchesSearch && matchesCourse && matchesSemester
  })

  const filteredResults = examResults.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesExamType = selectedExamType === "all" || result.examType === selectedExamType
    return matchesSearch && matchesExamType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      case "graduated": return "bg-blue-100 text-blue-800"
      case "passed": return "bg-green-100 text-green-800"
      case "failed": return "bg-red-100 text-red-800"
      case "supplementary": return "bg-yellow-100 text-yellow-800"
      case "scheduled": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />
      case "inactive": return <XCircle className="h-4 w-4" />
      case "graduated": return <GraduationCap className="h-4 w-4" />
      case "passed": return <CheckCircle className="h-4 w-4" />
      case "failed": return <XCircle className="h-4 w-4" />
      case "supplementary": return <AlertCircle className="h-4 w-4" />
      case "scheduled": return <Clock className="h-4 w-4" />
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "cancelled": return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800"
      case "A": return "bg-green-100 text-green-800"
      case "B+": return "bg-blue-100 text-blue-800"
      case "B": return "bg-blue-100 text-blue-800"
      case "C+": return "bg-yellow-100 text-yellow-800"
      case "C": return "bg-yellow-100 text-yellow-800"
      case "D": return "bg-orange-100 text-orange-800"
      case "F": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === "active").length
  const totalExams = examResults.length
  const passedExams = examResults.filter(e => e.status === "passed").length

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Examination Details</h1>
          <p className="text-muted-foreground">
            Manage student examination details, results, and schedules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onDownloadReport("examinations")}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isAddExamDialogOpen} onOpenChange={setIsAddExamDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Exam
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Examination</DialogTitle>
                <DialogDescription>
                  Schedule a new examination for students
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Enter subject name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Subject Code</label>
                  <Input placeholder="Enter subject code" />
                </div>
                <div>
                  <label className="text-sm font-medium">Exam Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Exam Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium">Start Time</label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="text-sm font-medium">End Time</label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="text-sm font-medium">Venue</label>
                  <Input placeholder="Enter venue" />
                </div>
                <Button className="w-full">Add Examination</Button>
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
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
            <p className="text-sm text-gray-500">Registered students</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Active Students</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{activeStudents}</p>
            <p className="text-sm text-gray-500">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Exams</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{totalExams}</p>
            <p className="text-sm text-gray-500">Examinations conducted</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Pass Rate</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{Math.round((passedExams / totalExams) * 100)}%</p>
            <p className="text-sm text-gray-500">Exams passed</p>
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
            <TabsTrigger value="students">Student Details</TabsTrigger>
            <TabsTrigger value="results">Exam Results</TabsTrigger>
            <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Student Examination Details</CardTitle>
                    <CardDescription className="text-gray-600">
                      View and manage student examination information
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
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map(semester => (
                          <SelectItem key={semester} value={semester}>
                            {semester === "all" ? "All" : `Sem ${semester}`}
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
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Admission Date</TableHead>
                      <TableHead>Status</TableHead>
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
                          <p className="font-medium text-gray-900">{student.rollNumber}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{new Date(student.admissionDate).toLocaleDateString()}</p>
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

          <TabsContent value="results" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Examination Results</CardTitle>
                    <CardDescription className="text-gray-600">
                      View and manage student examination results
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search results..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Exam Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {examTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type === "all" ? "All Types" : type}
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
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Exam Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{result.studentName}</p>
                            <p className="text-sm text-gray-600">ID: {result.studentId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{result.subject}</p>
                            <p className="text-sm text-gray-600">{result.subjectCode}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="px-2 py-1 rounded-full">
                            {result.examType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{result.marksObtained}/{result.totalMarks}</p>
                            <Progress value={(result.marksObtained / result.totalMarks) * 100} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`px-2 py-1 rounded-full ${getGradeColor(result.grade)}`}>
                            {result.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`px-2 py-1 rounded-full ${getStatusColor(result.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(result.status)}
                              {result.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{new Date(result.examDate).toLocaleDateString()}</p>
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

          <TabsContent value="schedule" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Examination Schedule</CardTitle>
                    <CardDescription className="text-gray-600">
                      View and manage upcoming and completed examinations
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{schedule.subject}</p>
                            <p className="text-sm text-gray-600">{schedule.subjectCode}</p>
                            <p className="text-xs text-gray-500">Sem {schedule.semester}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="px-2 py-1 rounded-full">
                            {schedule.examType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{new Date(schedule.examDate).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">{schedule.startTime} - {schedule.endTime}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{schedule.venue}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{schedule.presentStudents}/{schedule.totalStudents}</p>
                            <Progress value={(schedule.presentStudents / schedule.totalStudents) * 100} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`px-2 py-1 rounded-full ${getStatusColor(schedule.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(schedule.status)}
                              {schedule.status}
                            </div>
                          </Badge>
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
        </Tabs>
      </motion.div>
    </div>
  )
}
