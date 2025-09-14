import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  FileText, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Eye,
  Edit,
  Trash2,
  Upload
} from "lucide-react"

interface Assignment {
  id: string
  title: string
  description: string
  course: string
  dueDate: string
  maxMarks: number
  status: "draft" | "published" | "closed"
  createdAt: string
  submissions: AssignmentSubmission[]
}

interface AssignmentSubmission {
  id: string
  studentId: string
  studentName: string
  submissionDate: string
  file: string
  status: "submitted" | "graded" | "late"
  marks?: number
  feedback?: string
  comments?: string
}

interface StaffAssignmentManagementProps {
  assignments: Assignment[]
  onCreateAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt' | 'submissions'>) => void
  onUpdateAssignment: (assignmentId: string, updates: Partial<Assignment>) => void
  onDeleteAssignment: (assignmentId: string) => void
  onGradeSubmission: (submissionId: string, marks: number, feedback: string) => void
  onDownloadSubmission: (submissionId: string) => void
}

export function StaffAssignmentManagement({
  assignments,
  onCreateAssignment,
  onUpdateAssignment,
  onDeleteAssignment,
  onGradeSubmission,
  onDownloadSubmission
}: StaffAssignmentManagementProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    course: "",
    dueDate: "",
    maxMarks: 100,
    status: "draft" as const
  })
  const [gradingData, setGradingData] = useState({
    marks: 0,
    feedback: ""
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-500/10 text-gray-600 border-gray-500/20"
      case "published": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "closed": return "bg-red-500/10 text-red-600 border-red-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "graded": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "late": return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const handleCreateAssignment = () => {
    onCreateAssignment(newAssignment)
    setNewAssignment({
      title: "",
      description: "",
      course: "",
      dueDate: "",
      maxMarks: 100,
      status: "draft"
    })
    setIsCreateDialogOpen(false)
  }

  const handleGradeSubmission = () => {
    if (selectedSubmission) {
      onGradeSubmission(selectedSubmission.id, gradingData.marks, gradingData.feedback)
      setGradingData({ marks: 0, feedback: "" })
      setSelectedSubmission(null)
      setIsGradeDialogOpen(false)
    }
  }

  const totalAssignments = assignments.length
  const publishedAssignments = assignments.filter(a => a.status === "published").length
  const totalSubmissions = assignments.reduce((sum, a) => sum + a.submissions.length, 0)
  const pendingGrading = assignments.reduce((sum, a) => sum + a.submissions.filter(s => s.status === "submitted").length, 0)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Assignment Management</h1>
          <p className="text-muted-foreground">
            Create and manage assignments for your courses
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Create a new assignment for your students
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Assignment Title</label>
                <Input
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  placeholder="Enter assignment title"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Course</label>
                <Input
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                  placeholder="e.g., CS 201 - Data Structures"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  placeholder="Enter assignment description and requirements"
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="datetime-local"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Maximum Marks</label>
                  <Input
                    type="number"
                    value={newAssignment.maxMarks}
                    onChange={(e) => setNewAssignment({ ...newAssignment, maxMarks: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAssignment}>
                  Create Assignment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Assignments</p>
                <p className="text-2xl font-bold">{totalAssignments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{publishedAssignments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold">{totalSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Grading</p>
                <p className="text-2xl font-bold">{pendingGrading}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Assignments and Submissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="assignments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="space-y-4">
            {assignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-card/80">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{assignment.title}</h3>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground">{assignment.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>{assignment.course}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Max Marks: {assignment.maxMarks}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{assignment.submissions.length} submissions</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onDeleteAssignment(assignment.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4">
            <Card className="backdrop-blur-md bg-card/80">
              <CardHeader>
                <CardTitle>All Submissions</CardTitle>
                <CardDescription>Review and grade student submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.flatMap(assignment =>
                      assignment.submissions.map(submission => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{submission.studentName}</p>
                              <p className="text-sm text-muted-foreground">{submission.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{assignment.title}</TableCell>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>
                            {new Date(submission.submissionDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={getSubmissionStatusColor(submission.status)}>
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {submission.marks !== undefined ? (
                              <span className="font-medium">{submission.marks}/{assignment.maxMarks}</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onDownloadSubmission(submission.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              {submission.status === "submitted" && (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedSubmission(submission)
                                    setIsGradeDialogOpen(true)
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Grade
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Grading Dialog */}
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              Grade the submission for {selectedSubmission?.studentName}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Marks</label>
                <Input
                  type="number"
                  value={gradingData.marks}
                  onChange={(e) => setGradingData({ ...gradingData, marks: parseInt(e.target.value) })}
                  placeholder="Enter marks"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Feedback</label>
                <Textarea
                  value={gradingData.feedback}
                  onChange={(e) => setGradingData({ ...gradingData, feedback: e.target.value })}
                  placeholder="Enter feedback for the student"
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGradeSubmission}>
                  Submit Grade
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
