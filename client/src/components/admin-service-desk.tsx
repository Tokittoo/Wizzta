import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Award,
  GraduationCap,
  User,
  Filter
} from "lucide-react"

interface ServiceRequest {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  type: "bonafide" | "transfer" | "attendance"
  title: string
  description: string
  status: "pending" | "approved" | "rejected" | "completed"
  requestedDate: string
  processedDate?: string
  adminComments?: string
  downloadUrl?: string
}

interface AdminServiceDeskProps {
  requests: ServiceRequest[]
  onUpdateRequest: (requestId: string, updates: Partial<ServiceRequest>) => void
  onDownloadDocument: (requestId: string) => void
}

export function AdminServiceDesk({ requests, onUpdateRequest, onDownloadDocument }: AdminServiceDeskProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null)
  const [isProcessingDialogOpen, setIsProcessingDialogOpen] = useState(false)
  const [processingData, setProcessingData] = useState({
    status: "pending" as const,
    comments: ""
  })

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.type.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesType = typeFilter === "all" || request.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "approved": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "rejected": return "bg-red-500/10 text-red-600 border-red-500/20"
      case "completed": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return Clock
      case "approved": return CheckCircle
      case "rejected": return AlertCircle
      case "completed": return Download
      default: return FileText
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bonafide": return Award
      case "transfer": return GraduationCap
      case "attendance": return User
      default: return FileText
    }
  }

  const handleProcessRequest = () => {
    if (selectedRequest) {
      onUpdateRequest(selectedRequest.id, {
        status: processingData.status,
        adminComments: processingData.comments,
        processedDate: new Date().toISOString()
      })
      setProcessingData({ status: "pending", comments: "" })
      setSelectedRequest(null)
      setIsProcessingDialogOpen(false)
    }
  }

  const handleProcessClick = (request: ServiceRequest) => {
    setSelectedRequest(request)
    setProcessingData({
      status: request.status,
      comments: request.adminComments || ""
    })
    setIsProcessingDialogOpen(true)
  }

  const pendingRequests = requests.filter(r => r.status === "pending").length
  const completedRequests = requests.filter(r => r.status === "completed").length
  const totalRequests = requests.length

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Service Desk Management</h1>
          <p className="text-muted-foreground">
            Manage student service requests and certificate generation
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
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{totalRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">{requests.filter(r => r.status === "rejected").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
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
                    placeholder="Search requests by student name, title, or type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="bonafide">Bonafide</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader>
            <CardTitle>Service Requests</CardTitle>
            <CardDescription>
              {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Requested Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status)
                  const TypeIcon = getTypeIcon(request.type)
                  
                  return (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.studentName}</p>
                          <p className="text-sm text-muted-foreground">{request.studentEmail}</p>
                          <p className="text-sm text-muted-foreground">{request.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{request.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {request.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(request.requestedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProcessClick(request)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Process
                          </Button>
                          {request.status === "completed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onDownloadDocument(request.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Processing Dialog */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full mx-4">
            <CardHeader>
              <CardTitle>Process Service Request</CardTitle>
              <CardDescription>
                Review and process the request from {selectedRequest.studentName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Request Details</h4>
                <div className="p-3 bg-muted/50 rounded-lg space-y-1">
                  <p><strong>Type:</strong> {selectedRequest.type}</p>
                  <p><strong>Title:</strong> {selectedRequest.title}</p>
                  <p><strong>Description:</strong> {selectedRequest.description}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={processingData.status}
                  onValueChange={(value) => setProcessingData({ ...processingData, status: value as any })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Admin Comments</label>
                <Textarea
                  value={processingData.comments}
                  onChange={(e) => setProcessingData({ ...processingData, comments: e.target.value })}
                  placeholder="Add comments or instructions for the student"
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsProcessingDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleProcessRequest}>
                  Update Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
