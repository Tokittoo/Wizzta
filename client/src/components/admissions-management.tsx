import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Upload,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  FileCheck,
  Send
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AdmissionApplication {
  id: string
  applicationId: string
  studentName: string
  email: string
  phone: string
  course: string
  semester: string
  academicYear: string
  applicationDate: string
  status: "Applied" | "Under Review" | "Documents Verified" | "Approved" | "Rejected"
  documentsStatus: "Pending" | "Verified" | "Rejected"
  admissionDate?: string
  remarks?: string
  documents: {
    id: string
    name: string
    status: "Uploaded" | "Verified" | "Rejected"
    uploadedDate: string
    verifiedDate?: string
  }[]
}

const mockApplications: AdmissionApplication[] = [
  {
    id: "1",
    applicationId: "APP2024001",
    studentName: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 98765 43210",
    course: "Computer Science Engineering",
    semester: "Semester 1",
    academicYear: "2024-25",
    applicationDate: "2024-01-15",
    status: "Under Review",
    documentsStatus: "Verified",
    documents: [
      { id: "1", name: "10th Mark Sheet", status: "Verified", uploadedDate: "2024-01-15", verifiedDate: "2024-01-16" },
      { id: "2", name: "12th Mark Sheet", status: "Verified", uploadedDate: "2024-01-15", verifiedDate: "2024-01-16" },
      { id: "3", name: "Transfer Certificate", status: "Verified", uploadedDate: "2024-01-15", verifiedDate: "2024-01-16" },
      { id: "4", name: "Passport Photo", status: "Verified", uploadedDate: "2024-01-15", verifiedDate: "2024-01-16" }
    ]
  },
  {
    id: "2",
    applicationId: "APP2024002",
    studentName: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+91 98765 43211",
    course: "Electronics Engineering",
    semester: "Semester 1",
    academicYear: "2024-25",
    applicationDate: "2024-01-16",
    status: "Documents Verified",
    documentsStatus: "Verified",
    documents: [
      { id: "1", name: "10th Mark Sheet", status: "Verified", uploadedDate: "2024-01-16", verifiedDate: "2024-01-17" },
      { id: "2", name: "12th Mark Sheet", status: "Verified", uploadedDate: "2024-01-16", verifiedDate: "2024-01-17" },
      { id: "3", name: "Transfer Certificate", status: "Verified", uploadedDate: "2024-01-16", verifiedDate: "2024-01-17" },
      { id: "4", name: "Passport Photo", status: "Verified", uploadedDate: "2024-01-16", verifiedDate: "2024-01-17" }
    ]
  },
  {
    id: "3",
    applicationId: "APP2024003",
    studentName: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+91 98765 43212",
    course: "Mechanical Engineering",
    semester: "Semester 1",
    academicYear: "2024-25",
    applicationDate: "2024-01-17",
    status: "Applied",
    documentsStatus: "Pending",
    documents: [
      { id: "1", name: "10th Mark Sheet", status: "Uploaded", uploadedDate: "2024-01-17" },
      { id: "2", name: "12th Mark Sheet", status: "Uploaded", uploadedDate: "2024-01-17" },
      { id: "3", name: "Transfer Certificate", status: "Uploaded", uploadedDate: "2024-01-17" },
      { id: "4", name: "Passport Photo", status: "Uploaded", uploadedDate: "2024-01-17" }
    ]
  },
  {
    id: "4",
    applicationId: "APP2024004",
    studentName: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+91 98765 43213",
    course: "Civil Engineering",
    semester: "Semester 1",
    academicYear: "2024-25",
    applicationDate: "2024-01-18",
    status: "Approved",
    documentsStatus: "Verified",
    admissionDate: "2024-01-20",
    documents: [
      { id: "1", name: "10th Mark Sheet", status: "Verified", uploadedDate: "2024-01-18", verifiedDate: "2024-01-19" },
      { id: "2", name: "12th Mark Sheet", status: "Verified", uploadedDate: "2024-01-18", verifiedDate: "2024-01-19" },
      { id: "3", name: "Transfer Certificate", status: "Verified", uploadedDate: "2024-01-18", verifiedDate: "2024-01-19" },
      { id: "4", name: "Passport Photo", status: "Verified", uploadedDate: "2024-01-18", verifiedDate: "2024-01-19" }
    ]
  }
]

export function AdmissionsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<AdmissionApplication | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [emailContent, setEmailContent] = useState("")

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus
    const matchesCourse = selectedCourse === "all" || app.course === selectedCourse

    return matchesSearch && matchesStatus && matchesCourse
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied": return "bg-blue-100 text-blue-800"
      case "Under Review": return "bg-yellow-100 text-yellow-800"
      case "Documents Verified": return "bg-purple-100 text-purple-800"
      case "Approved": return "bg-green-100 text-green-800"
      case "Rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Applied": return <FileText className="h-4 w-4" />
      case "Under Review": return <Clock className="h-4 w-4" />
      case "Documents Verified": return <FileCheck className="h-4 w-4" />
      case "Approved": return <CheckCircle className="h-4 w-4" />
      case "Rejected": return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "Uploaded": return "bg-blue-100 text-blue-800"
      case "Verified": return "bg-green-100 text-green-800"
      case "Rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const calculateStats = () => {
    const total = mockApplications.length
    const applied = mockApplications.filter(app => app.status === "Applied").length
    const underReview = mockApplications.filter(app => app.status === "Under Review").length
    const approved = mockApplications.filter(app => app.status === "Approved").length
    const rejected = mockApplications.filter(app => app.status === "Rejected").length

    return { total, applied, underReview, approved, rejected }
  }

  const stats = calculateStats()

  const handleViewDetails = (application: AdmissionApplication) => {
    setSelectedApplication(application)
    setIsDetailDialogOpen(true)
  }

  const handleSendEmail = (application: AdmissionApplication) => {
    setSelectedApplication(application)
    setEmailContent(`Dear ${application.studentName},\n\nYour application ${application.applicationId} status has been updated.\n\nBest regards,\nAdmissions Team`)
    setIsEmailDialogOpen(true)
  }

  const handleApproveApplication = (applicationId: string) => {
    console.log(`Approving application: ${applicationId}`)
    // Implement approval logic
  }

  const handleRejectApplication = (applicationId: string) => {
    console.log(`Rejecting application: ${applicationId}`)
    // Implement rejection logic
  }

  const handleSendEmailNotification = () => {
    console.log(`Sending email to ${selectedApplication?.email}:`, emailContent)
    setIsEmailDialogOpen(false)
  }

  const handleExportApplications = () => {
    console.log("Exporting applications to Excel/PDF...")
    // Implement export functionality
  }

  const handleBulkImport = () => {
    console.log("Bulk importing applications...")
    // Implement bulk import functionality
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Admissions Management</h1>
          <p className="text-muted-foreground">
            Manage student applications, document verification, and admission process
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleBulkImport} variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={handleExportApplications} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              This academic year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applied}</div>
            <p className="text-xs text-muted-foreground">
              Pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.underReview}</div>
            <p className="text-xs text-muted-foreground">
              Being processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">
              Ready for admission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">
              Not eligible
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
              placeholder="Search by name, application ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Documents Verified">Documents Verified</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="Computer Science Engineering">Computer Science Engineering</SelectItem>
            <SelectItem value="Electronics Engineering">Electronics Engineering</SelectItem>
            <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
            <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Applications Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Admission Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="font-mono text-sm">{application.applicationId}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.studentName}</div>
                          <div className="text-sm text-muted-foreground">{application.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.course}</div>
                          <div className="text-sm text-muted-foreground">{application.semester}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(application.applicationDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(application.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(application.status)}
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={getDocumentStatusColor(application.documentsStatus)}>
                            {application.documentsStatus}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {application.documents.filter(doc => doc.status === "Verified").length}/{application.documents.length}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(application)}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendEmail(application)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          {application.status === "Documents Verified" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApproveApplication(application.applicationId)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectApplication(application.applicationId)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredApplications.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No applications found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Application Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details - {selectedApplication?.applicationId}</DialogTitle>
            <DialogDescription>
              Complete information about the admission application
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              {/* Student Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm text-muted-foreground">{selectedApplication.studentName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm text-muted-foreground">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Course</Label>
                    <p className="text-sm text-muted-foreground">{selectedApplication.course}</p>
                  </div>
                </div>
              </div>

              {/* Documents Status */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Documents Status</h3>
                <div className="space-y-2">
                  {selectedApplication.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getDocumentStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Application Timeline</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Application Submitted</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedApplication.applicationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {selectedApplication.admissionDate && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Admission Confirmed</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedApplication.admissionDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email Notification</DialogTitle>
            <DialogDescription>
              Send email to {selectedApplication?.studentName} ({selectedApplication?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-content">Email Content</Label>
              <Textarea
                id="email-content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={6}
                placeholder="Enter email content..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmailNotification}>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
