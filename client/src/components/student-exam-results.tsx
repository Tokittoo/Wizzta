import { useState } from "react"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Download, 
  Filter,
  Search,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

interface ExamResult {
  id: string
  subject: string
  subjectCode: string
  examType: "Midterm" | "Final" | "Quiz" | "Assignment"
  semester: string
  academicYear: string
  examDate: string
  resultDate: string
  marksObtained: number
  totalMarks: number
  grade: string
  gpa: number
  status: "Passed" | "Failed" | "Pending"
  remarks?: string
}

const mockExamResults: ExamResult[] = [
  {
    id: "1",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS201",
    examType: "Final",
    semester: "Semester 4",
    academicYear: "2023-24",
    examDate: "2024-04-15",
    resultDate: "2024-04-25",
    marksObtained: 85,
    totalMarks: 100,
    grade: "A",
    gpa: 4.0,
    status: "Passed",
    remarks: "Excellent performance"
  },
  {
    id: "2",
    subject: "Database Management Systems",
    subjectCode: "CS202",
    examType: "Final",
    semester: "Semester 4",
    academicYear: "2023-24",
    examDate: "2024-04-18",
    resultDate: "2024-04-28",
    marksObtained: 78,
    totalMarks: 100,
    grade: "B+",
    gpa: 3.5,
    status: "Passed",
    remarks: "Good understanding of concepts"
  },
  {
    id: "3",
    subject: "Computer Networks",
    subjectCode: "CS203",
    examType: "Midterm",
    semester: "Semester 4",
    academicYear: "2023-24",
    examDate: "2024-03-20",
    resultDate: "2024-03-30",
    marksObtained: 92,
    totalMarks: 100,
    grade: "A+",
    gpa: 4.0,
    status: "Passed",
    remarks: "Outstanding work"
  },
  {
    id: "4",
    subject: "Software Engineering",
    subjectCode: "CS204",
    examType: "Final",
    semester: "Semester 4",
    academicYear: "2023-24",
    examDate: "2024-04-22",
    resultDate: "2024-05-02",
    marksObtained: 65,
    totalMarks: 100,
    grade: "C+",
    gpa: 2.5,
    status: "Passed",
    remarks: "Satisfactory performance"
  },
  {
    id: "5",
    subject: "Operating Systems",
    subjectCode: "CS205",
    examType: "Quiz",
    semester: "Semester 4",
    academicYear: "2023-24",
    examDate: "2024-03-15",
    resultDate: "2024-03-18",
    marksObtained: 88,
    totalMarks: 100,
    grade: "A",
    gpa: 4.0,
    status: "Passed"
  },
  {
    id: "6",
    subject: "Machine Learning",
    subjectCode: "CS206",
    examType: "Assignment",
    semester: "Semester 4",
    academicYear: "2023-24",
    examDate: "2024-04-10",
    resultDate: "2024-04-20",
    marksObtained: 95,
    totalMarks: 100,
    grade: "A+",
    gpa: 4.0,
    status: "Passed",
    remarks: "Exceptional work"
  }
]

export function StudentExamResults() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedExamType, setSelectedExamType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredResults = mockExamResults.filter(result => {
    const matchesSearch = result.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = selectedSemester === "all" || result.semester === selectedSemester
    const matchesExamType = selectedExamType === "all" || result.examType === selectedExamType
    const matchesStatus = selectedStatus === "all" || result.status === selectedStatus

    return matchesSearch && matchesSemester && matchesExamType && matchesStatus
  })

  const getGradeColor = (grade: string) => {
    if (grade === "A+" || grade === "A") return "bg-green-100 text-green-800"
    if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-800"
    if (grade === "C+" || grade === "C") return "bg-yellow-100 text-yellow-800"
    if (grade === "D" || grade === "F") return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Passed": return "bg-green-100 text-green-800"
      case "Failed": return "bg-red-100 text-red-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Passed": return <CheckCircle className="h-4 w-4" />
      case "Failed": return <AlertCircle className="h-4 w-4" />
      case "Pending": return <Clock className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const calculateOverallGPA = () => {
    const totalGPA = mockExamResults.reduce((sum, result) => sum + result.gpa, 0)
    return (totalGPA / mockExamResults.length).toFixed(2)
  }

  const calculatePassRate = () => {
    const passedResults = mockExamResults.filter(result => result.status === "Passed")
    return ((passedResults.length / mockExamResults.length) * 100).toFixed(1)
  }

  const handleDownloadResults = () => {
    console.log("Downloading exam results...")
    // Implement download functionality
  }

  const handlePrintResults = () => {
    console.log("Printing exam results...")
    // Implement print functionality
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Exam Results</h1>
          <p className="text-muted-foreground">
            View your examination results and academic performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleDownloadResults} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={handlePrintResults} variant="outline" size="sm">
            <Award className="h-4 w-4 mr-2" />
            Print
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateOverallGPA()}</div>
            <p className="text-xs text-muted-foreground">
              Out of 4.0 scale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculatePassRate()}%</div>
            <p className="text-xs text-muted-foreground">
              {mockExamResults.filter(r => r.status === "Passed").length} of {mockExamResults.length} exams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockExamResults.length}</div>
            <p className="text-xs text-muted-foreground">
              Completed examinations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockExamResults.reduce((sum, result) => sum + result.marksObtained, 0) / mockExamResults.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all subjects
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by subject or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            <SelectItem value="Semester 4">Semester 4</SelectItem>
            <SelectItem value="Semester 3">Semester 3</SelectItem>
            <SelectItem value="Semester 2">Semester 2</SelectItem>
            <SelectItem value="Semester 1">Semester 1</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedExamType} onValueChange={setSelectedExamType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select Exam Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Final">Final</SelectItem>
            <SelectItem value="Midterm">Midterm</SelectItem>
            <SelectItem value="Quiz">Quiz</SelectItem>
            <SelectItem value="Assignment">Assignment</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Passed">Passed</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Results Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Examination Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Exam Date</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{result.subject}</div>
                          <div className="text-sm text-muted-foreground">{result.subjectCode}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{result.examType}</Badge>
                      </TableCell>
                      <TableCell>{result.semester}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(result.examDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium">{result.marksObtained}/{result.totalMarks}</div>
                            <Progress 
                              value={(result.marksObtained / result.totalMarks) * 100} 
                              className="w-16 h-2"
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(result.grade)}>
                          {result.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{result.gpa}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(result.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(result.status)}
                          {result.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {result.remarks && (
                          <div className="text-sm text-muted-foreground max-w-32 truncate">
                            {result.remarks}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredResults.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No exam results found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
