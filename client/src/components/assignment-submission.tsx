import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Upload, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Eye,
  Edit
} from "lucide-react"

interface Assignment {
  id: string
  title: string
  description: string
  course: string
  instructor: string
  dueDate: string
  maxMarks: number
  status: "not_submitted" | "submitted" | "graded" | "late"
  submissionDate?: string
  marks?: number
  feedback?: string
  attachments?: string[]
  submissionFile?: string
}

interface AssignmentSubmissionProps {
  assignments: Assignment[]
  onUploadSubmission: (assignmentId: string, file: File, comments: string) => void
  onDownloadSubmission: (assignmentId: string) => void
  onViewFeedback: (assignmentId: string) => void
}

export function AssignmentSubmission({ 
  assignments, 
  onUploadSubmission, 
  onDownloadSubmission, 
  onViewFeedback 
}: AssignmentSubmissionProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [comments, setComments] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_submitted": return "bg-red-500/10 text-red-600 border-red-500/20"
      case "submitted": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "graded": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "late": return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "not_submitted": return XCircle
      case "submitted": return Clock
      case "graded": return CheckCircle
      case "late": return AlertCircle
      default: return FileText
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadFile(file)
    }
  }

  const handleSubmit = () => {
    if (selectedAssignment && uploadFile) {
      onUploadSubmission(selectedAssignment.id, uploadFile, comments)
      setIsUploadDialogOpen(false)
      setUploadFile(null)
      setComments("")
      setSelectedAssignment(null)
    }
  }

  const pendingAssignments = assignments.filter(a => a.status === "not_submitted")
  const submittedAssignments = assignments.filter(a => a.status === "submitted" || a.status === "graded")
  const overdueAssignments = assignments.filter(a => isOverdue(a.dueDate) && a.status === "not_submitted")

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Assignment Submission</h1>
          <p className="text-muted-foreground">
            Submit your assignments and track their status
          </p>
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
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Assignments</p>
                <p className="text-2xl font-bold">{assignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingAssignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-2xl font-bold">{submittedAssignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{overdueAssignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Overdue Assignments Alert */}
      {overdueAssignments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Alert className="border-red-500/20 bg-red-500/5">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-600">
              You have {overdueAssignments.length} overdue assignment{overdueAssignments.length > 1 ? 's' : ''}. 
              Please submit them as soon as possible.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Assignments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {assignments.map((assignment, index) => {
          const StatusIcon = getStatusIcon(assignment.status)
          const daysRemaining = getDaysRemaining(assignment.dueDate)
          const isOverdueAssignment = isOverdue(assignment.dueDate)
          
          return (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="backdrop-blur-md bg-card/80 hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <StatusIcon className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status.replace('_', ' ')}
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
                        {assignment.marks !== undefined && (
                          <div className="flex items-center gap-1">
                            <span>Marks: {assignment.marks}/{assignment.maxMarks}</span>
                          </div>
                        )}
                      </div>

                      {/* Progress bar for time remaining */}
                      {assignment.status === "not_submitted" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Time Remaining</span>
                            <span className={isOverdueAssignment ? "text-red-500" : "text-muted-foreground"}>
                              {isOverdueAssignment ? "Overdue" : `${daysRemaining} days`}
                            </span>
                          </div>
                          <Progress 
                            value={Math.max(0, Math.min(100, (daysRemaining / 7) * 100))} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      {assignment.status === "not_submitted" && (
                        <Dialog open={isUploadDialogOpen && selectedAssignment?.id === assignment.id} onOpenChange={setIsUploadDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              onClick={() => setSelectedAssignment(assignment)}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Submit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Submit Assignment</DialogTitle>
                              <DialogDescription>
                                Upload your submission for "{assignment.title}"
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Upload File</label>
                                <Input
                                  type="file"
                                  accept=".pdf,.doc,.docx,.txt"
                                  onChange={handleFileUpload}
                                  className="mt-1"
                                />
                                {uploadFile && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Selected: {uploadFile.name}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="text-sm font-medium">Comments (Optional)</label>
                                <Textarea
                                  placeholder="Add any comments or notes..."
                                  value={comments}
                                  onChange={(e) => setComments(e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleSubmit} disabled={!uploadFile}>
                                  Submit Assignment
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {assignment.submissionFile && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onDownloadSubmission(assignment.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      
                      {assignment.feedback && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onViewFeedback(assignment.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Feedback
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Submission History */}
      {submittedAssignments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="backdrop-blur-md bg-card/80">
            <CardHeader>
              <CardTitle>Submission History</CardTitle>
              <CardDescription>Your submitted assignments and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submittedAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Submitted: {assignment.submissionDate ? new Date(assignment.submissionDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                      {assignment.marks !== undefined && (
                        <span className="text-sm font-medium">
                          {assignment.marks}/{assignment.maxMarks}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
