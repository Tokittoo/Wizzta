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
import { 
  Plus, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Award,
  GraduationCap,
  User
} from "lucide-react"

interface ServiceRequest {
  id: string
  type: "bonafide" | "transfer" | "attendance"
  title: string
  description: string
  status: "pending" | "approved" | "rejected" | "completed"
  requestedDate: string
  processedDate?: string
  adminComments?: string
  downloadUrl?: string
}

interface StudentServiceDeskProps {
  requests: ServiceRequest[]
  onCreateRequest: (request: Omit<ServiceRequest, 'id' | 'requestedDate'>) => void
  onDownloadDocument: (requestId: string) => void
}

export function StudentServiceDesk({ requests, onCreateRequest, onDownloadDocument }: StudentServiceDeskProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newRequest, setNewRequest] = useState({
    type: "bonafide" as const,
    title: "",
    description: ""
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

  const getTypeDescription = (type: string) => {
    switch (type) {
      case "bonafide": return "Certificate for proof of enrollment and academic standing"
      case "transfer": return "Certificate for transfer to another institution"
      case "attendance": return "Certificate showing attendance percentage and records"
      default: return ""
    }
  }

  const handleCreateRequest = () => {
    if (newRequest.title && newRequest.description) {
      onCreateRequest(newRequest)
      setNewRequest({
        type: "bonafide",
        title: "",
        description: ""
      })
      setIsCreateDialogOpen(false)
    }
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
          <h1 className="text-3xl font-bold">Service Desk</h1>
          <p className="text-muted-foreground">
            Request certificates and documents for your academic needs
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Service Request</DialogTitle>
              <DialogDescription>
                Submit a request for certificates or documents
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Request Type</label>
                <Select
                  value={newRequest.type}
                  onValueChange={(value) => setNewRequest({ ...newRequest, type: value as any })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bonafide">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Bonafide Certificate
                      </div>
                    </SelectItem>
                    <SelectItem value="transfer">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Transfer Certificate
                      </div>
                    </SelectItem>
                    <SelectItem value="attendance">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Attendance Certificate
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  {getTypeDescription(newRequest.type)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="Enter a brief title for your request"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Provide additional details about your request"
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRequest}>
                  Submit Request
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
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
      </motion.div>

      {/* Service Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="backdrop-blur-md bg-card/80 hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-500" />
              Bonafide Certificate
            </CardTitle>
            <CardDescription>
              Proof of enrollment and academic standing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Required for various official purposes like opening bank accounts, 
              applying for scholarships, or other institutional requirements.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setNewRequest({ type: "bonafide", title: "Bonafide Certificate Request", description: "" })
                setIsCreateDialogOpen(true)
              }}
            >
              Request Now
            </Button>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80 hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-green-500" />
              Transfer Certificate
            </CardTitle>
            <CardDescription>
              Certificate for transfer to another institution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Required when transferring to another educational institution. 
              Contains your academic record and conduct details.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setNewRequest({ type: "transfer", title: "Transfer Certificate Request", description: "" })
                setIsCreateDialogOpen(true)
              }}
            >
              Request Now
            </Button>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80 hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-500" />
              Attendance Certificate
            </CardTitle>
            <CardDescription>
              Certificate showing attendance percentage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Official document showing your attendance percentage and records 
              for the current or previous semesters.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setNewRequest({ type: "attendance", title: "Attendance Certificate Request", description: "" })
                setIsCreateDialogOpen(true)
              }}
            >
              Request Now
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Request History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>
              Track the status of your service requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Requested Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status)
                  const TypeIcon = getTypeIcon(request.type)
                  
                  return (
                    <TableRow key={request.id}>
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
                            onClick={() => onDownloadDocument(request.id)}
                            disabled={request.status !== "completed"}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
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
    </div>
  )
}
