import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, FileText, Award, TrendingUp, Upload } from "lucide-react"
import { StatusBadge } from "./status-badge"

interface ExamResult {
  id: string
  studentId: string
  studentName: string
  subject: string
  marks: number
  totalMarks: number
  grade: string
  examDate: string
  examType: "midterm" | "final" | "quiz"
}

interface ExamSchedule {
  id: string
  subject: string
  date: string
  time: string
  duration: string
  venue: string
  examType: "midterm" | "final" | "quiz"
  status: "upcoming" | "ongoing" | "completed"
}

interface ExamsModuleProps {
  userRole: "student" | "staff" | "admin"
  examResults: ExamResult[]
  examSchedule: ExamSchedule[]
  onUploadMarks?: (examId: string, marks: ExamResult[]) => void
}

export function ExamsModule({ userRole, examResults, examSchedule, onUploadMarks }: ExamsModuleProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [uploadingMarks, setUploadingMarks] = useState(false)

  const subjects = Array.from(new Set(examSchedule.map(exam => exam.subject)))

  // Calculate statistics for admin view
  const courseStats = subjects.map(subject => {
    const subjectResults = examResults.filter(result => result.subject === subject)
    const totalStudents = subjectResults.length
    const passedStudents = subjectResults.filter(result => 
      (result.marks / result.totalMarks) * 100 >= 40
    ).length
    const passPercentage = totalStudents > 0 ? Math.round((passedStudents / totalStudents) * 100) : 0
    const averageMarks = totalStudents > 0 
      ? Math.round(subjectResults.reduce((sum, result) => sum + result.marks, 0) / totalStudents)
      : 0

    return {
      subject,
      totalStudents,
      passedStudents,
      passPercentage,
      averageMarks
    }
  })

  const handleMarksUpload = () => {
    setUploadingMarks(true)
    // Simulate file upload
    setTimeout(() => {
      setUploadingMarks(false)
      console.log('Marks uploaded successfully')
    }, 2000)
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': case 'A': return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'B+': case 'B': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'C+': case 'C': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'D': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'F': return 'bg-red-500/10 text-red-600 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Exams Management</h1>
            <p className="text-muted-foreground">
              {userRole === "student" ? "View your exam schedule and results" :
               userRole === "staff" ? "Manage exams and upload marks" :
               "Overview of all exam activities and analytics"}
            </p>
          </div>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule" data-testid="tab-schedule">Schedule</TabsTrigger>
            <TabsTrigger value="results" data-testid="tab-results">Results</TabsTrigger>
            {userRole === "staff" && (
              <TabsTrigger value="upload" data-testid="tab-upload">Upload Marks</TabsTrigger>
            )}
            {userRole === "admin" && (
              <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
            )}
          </TabsList>

          {/* Exam Schedule */}
          <TabsContent value="schedule" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {examSchedule.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="backdrop-blur-md bg-card/80 hover-elevate" data-testid={`exam-schedule-${exam.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{exam.subject}</CardTitle>
                        <StatusBadge status={exam.status === "upcoming" ? "pending" : 
                                            exam.status === "ongoing" ? "processing" : "verified"} size="sm" />
                      </div>
                      <CardDescription>
                        <Badge variant="outline" className="text-xs">
                          {exam.examType.toUpperCase()}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(exam.date).toLocaleDateString()}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p><strong>Time:</strong> {exam.time}</p>
                        <p><strong>Duration:</strong> {exam.duration}</p>
                        <p><strong>Venue:</strong> {exam.venue}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Results */}
          <TabsContent value="results" className="space-y-4">
            <div className="flex gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48" data-testid="select-subject-filter">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {examResults
                .filter(result => selectedSubject === "all" || result.subject === selectedSubject)
                .map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="backdrop-blur-md bg-card/80" data-testid={`exam-result-${result.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{result.subject}</h3>
                          {userRole !== "student" && (
                            <p className="text-sm text-muted-foreground">
                              Student: {result.studentName}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            Exam Date: {new Date(result.examDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-2xl font-bold">
                            {result.marks}/{result.totalMarks}
                          </div>
                          <Badge className={getGradeColor(result.grade)}>
                            Grade: {result.grade}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            {Math.round((result.marks / result.totalMarks) * 100)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Upload Marks (Staff only) */}
          {userRole === "staff" && (
            <TabsContent value="upload" className="space-y-4">
              <Card className="backdrop-blur-md bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Exam Marks
                  </CardTitle>
                  <CardDescription>
                    Upload marks for completed exams
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger data-testid="select-exam-upload">
                        <SelectValue placeholder="Select Exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {examSchedule
                          .filter(exam => exam.status === "completed")
                          .map(exam => (
                          <SelectItem key={exam.id} value={exam.id}>
                            {exam.subject} - {exam.examType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex gap-2">
                      <Input type="file" accept=".csv,.xlsx" data-testid="input-marks-file" />
                      <Button 
                        onClick={handleMarksUpload}
                        disabled={uploadingMarks}
                        data-testid="button-upload-marks"
                      >
                        {uploadingMarks ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Format:</strong> Upload CSV or Excel file with columns: Student ID, Student Name, Marks
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Analytics (Admin only) */}
          {userRole === "admin" && (
            <TabsContent value="analytics" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <Card className="backdrop-blur-md bg-card/80">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{examSchedule.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {examSchedule.filter(e => e.status === "completed").length} completed
                    </p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-card/80">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Pass Rate</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {courseStats.length > 0 
                        ? Math.round(courseStats.reduce((sum, stat) => sum + stat.passPercentage, 0) / courseStats.length)
                        : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across all subjects
                    </p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-card/80">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {examResults.length > 0
                        ? Math.round(examResults.reduce((sum, result) => 
                            sum + (result.marks / result.totalMarks) * 100, 0) / examResults.length)
                        : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Institution average
                    </p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-card/80">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {new Set(examResults.map(r => r.studentId)).size}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Taking exams
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <Card className="backdrop-blur-md bg-card/80">
                <CardHeader>
                  <CardTitle>Course-wise Performance</CardTitle>
                  <CardDescription>Pass percentage and average marks by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseStats.map((stat, index) => (
                      <motion.div
                        key={stat.subject}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                        data-testid={`course-stat-${stat.subject.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <div>
                          <h4 className="font-medium">{stat.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            {stat.totalStudents} students
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge className={stat.passPercentage >= 70 ? 'bg-green-500/10 text-green-600' : 
                                          stat.passPercentage >= 50 ? 'bg-yellow-500/10 text-yellow-600' :
                                          'bg-red-500/10 text-red-600'}>
                            {stat.passPercentage}% Pass Rate
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Avg: {stat.averageMarks}%
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </motion.div>
    </div>
  )
}