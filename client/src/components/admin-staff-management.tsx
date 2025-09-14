import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  User, 
  GraduationCap, 
  Plus,
  Edit,
  Eye,
  Download,
  Mail,
  Phone,
  Calendar,
  Award,
  BookOpen,
  Users
} from "lucide-react"

interface StaffMember {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  hireDate: string
  status: "active" | "inactive" | "on_leave"
  qualifications: string[]
  courses: Array<{
    courseCode: string
    courseName: string
    semester: string
  }>
  responsibilities: string[]
  salary: number
  salaryStatus: "paid" | "pending" | "overdue" | "partial"
  lastPaidDate?: string
  nextPayDate: string
  performance: {
    rating: number
    lastReview: string
  }
}

interface AdminStaffManagementProps {
  staff: StaffMember[]
  onCreateStaff: (staff: Omit<StaffMember, 'id'>) => void
  onUpdateStaff: (staffId: string, updates: Partial<StaffMember>) => void
  onViewStaffProfile: (staffId: string) => void
  onDownloadReport: (reportType: string) => void
}

export function AdminStaffManagement({
  staff,
  onCreateStaff,
  onUpdateStaff,
  onViewStaffProfile,
  onDownloadReport
}: AdminStaffManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Partial<StaffMember>>({})
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    hireDate: "",
    status: "active",
    qualifications: [],
    courses: [],
    responsibilities: [],
    salary: 0,
    salaryStatus: "pending",
    nextPayDate: "",
    performance: {
      rating: 0,
      lastReview: ""
    }
  })

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "inactive": return "bg-gray-500/10 text-gray-600 border-gray-500/20"
      case "on_leave": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getSalaryStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "overdue": return "bg-red-500/10 text-red-600 border-red-500/20"
      case "partial": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const handleCreateStaff = () => {
    if (newStaff.name && newStaff.email && newStaff.department && newStaff.position) {
      onCreateStaff(newStaff as Omit<StaffMember, 'id'>)
      setNewStaff({
        name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        hireDate: "",
        status: "active",
        qualifications: [],
        courses: [],
        responsibilities: [],
        salary: 0,
        salaryStatus: "pending",
        nextPayDate: "",
        performance: {
          rating: 0,
          lastReview: ""
        }
      })
      setIsCreateDialogOpen(false)
    }
  }

  const handleEditStaff = (member: StaffMember) => {
    setEditingStaff(member)
    setSelectedStaff(member)
    setIsEditDialogOpen(true)
  }

  const handleSaveStaff = () => {
    if (selectedStaff) {
      onUpdateStaff(selectedStaff.id, editingStaff)
      setIsEditDialogOpen(false)
      setEditingStaff({})
      setSelectedStaff(null)
    }
  }

  const totalStaff = staff.length
  const activeStaff = staff.filter(s => s.status === "active").length
  const onLeaveStaff = staff.filter(s => s.status === "on_leave").length
  const departments = Array.from(new Set(staff.map(s => s.department))).length

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage faculty and administrative staff members
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onDownloadReport("staff")}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>
                  Create a new staff member record
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      value={newStaff.name || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                      placeholder="Enter full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={newStaff.email || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                      placeholder="Enter email address"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={newStaff.phone || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      placeholder="Enter phone number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Input
                      value={newStaff.department || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                      placeholder="Enter department"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Position</label>
                    <Input
                      value={newStaff.position || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                      placeholder="Enter position"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hire Date</label>
                    <Input
                      type="date"
                      value={newStaff.hireDate || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, hireDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateStaff}>
                    Add Staff Member
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{totalStaff}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Staff</p>
                <p className="text-2xl font-bold">{activeStaff}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold">{onLeaveStaff}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{departments}</p>
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
                    placeholder="Search staff by name, ID, department, or position..."
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
                  <SelectItem value="all">All Staff</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Staff Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>
              {filteredStaff.length} staff member{filteredStaff.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salary Status</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.id}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{member.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{member.department}</p>
                        <p className="text-sm text-muted-foreground">
                          Since {new Date(member.hireDate).getFullYear()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{member.position}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getSalaryStatusColor(member.salaryStatus)}>
                          {member.salaryStatus}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          ₹{member.salary.toLocaleString()}
                        </p>
                        {member.lastPaidDate && (
                          <p className="text-xs text-muted-foreground">
                            Last paid: {new Date(member.lastPaidDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {member.courses.slice(0, 2).map((course, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{course.courseCode}</span>
                            <span className="text-muted-foreground ml-1">({course.semester})</span>
                          </div>
                        ))}
                        {member.courses.length > 2 && (
                          <p className="text-sm text-muted-foreground">
                            +{member.courses.length - 2} more
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{member.performance.rating}/5</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(member.performance.lastReview).toLocaleDateString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onViewStaffProfile(member.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditStaff(member)}
                        >
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
      </motion.div>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Staff Information</DialogTitle>
            <DialogDescription>
              Update staff member details and responsibilities
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editingStaff.name || selectedStaff.name}
                    onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={editingStaff.email || selectedStaff.email}
                    onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={editingStaff.phone || selectedStaff.phone}
                    onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Input
                    value={editingStaff.department || selectedStaff.department}
                    onChange={(e) => setEditingStaff({ ...editingStaff, department: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Position</label>
                  <Input
                    value={editingStaff.position || selectedStaff.position}
                    onChange={(e) => setEditingStaff({ ...editingStaff, position: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={editingStaff.status || selectedStaff.status}
                    onValueChange={(value) => setEditingStaff({ ...editingStaff, status: value as any })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveStaff}>
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
