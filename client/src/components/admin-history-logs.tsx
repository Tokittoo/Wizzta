import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Calendar, 
  User, 
  CreditCard, 
  BookOpen,
  Building,
  FileText,
  Download,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"

interface HistoryLog {
  id: string
  timestamp: string
  action: string
  category: "admission" | "fees" | "assignment" | "exam" | "hostel" | "staff" | "system"
  description: string
  userId: string
  userName: string
  userRole: "student" | "staff" | "admin"
  targetId?: string
  targetName?: string
  details: Record<string, any>
  status: "success" | "error" | "warning" | "info"
}

interface AdminHistoryLogsProps {
  logs: HistoryLog[]
  onExportLogs: (filters: any) => void
}

export function AdminHistoryLogs({ logs, onExportLogs }: AdminHistoryLogsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("all")

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.targetName && log.targetName.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus
    
    const logDate = new Date(log.timestamp)
    const now = new Date()
    let matchesDate = true
    
    if (dateRange === "today") {
      matchesDate = logDate.toDateString() === now.toDateString()
    } else if (dateRange === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      matchesDate = logDate >= weekAgo
    } else if (dateRange === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      matchesDate = logDate >= monthAgo
    }
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDate
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "admission": return User
      case "fees": return CreditCard
      case "assignment": return BookOpen
      case "exam": return FileText
      case "hostel": return Building
      case "staff": return User
      case "system": return Info
      default: return FileText
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "admission": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "fees": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "assignment": return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "exam": return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      case "hostel": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "staff": return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20"
      case "system": return "bg-gray-500/10 text-gray-600 border-gray-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return CheckCircle
      case "error": return AlertCircle
      case "warning": return AlertCircle
      case "info": return Info
      default: return Info
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600"
      case "error": return "text-red-600"
      case "warning": return "text-yellow-600"
      case "info": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-500/10 text-red-600 border-red-500/20"
      case "staff": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "student": return "bg-green-500/10 text-green-600 border-green-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const categoryStats = logs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const statusStats = logs.reduce((acc, log) => {
    acc[log.status] = (acc[log.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const handleExport = () => {
    onExportLogs({
      search: searchQuery,
      category: selectedCategory,
      status: selectedStatus,
      dateRange
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">System History Logs</h1>
          <p className="text-muted-foreground">
            Track all system activities and transactions
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
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
                <p className="text-sm text-muted-foreground">Total Logs</p>
                <p className="text-2xl font-bold">{logs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold">{statusStats.success || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold">{statusStats.error || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">
                  {logs.filter(log => new Date(log.timestamp).toDateString() === new Date().toDateString()).length}
                </p>
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
                    placeholder="Search logs by action, description, or user..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="admission">Admissions</SelectItem>
                  <SelectItem value="fees">Fees</SelectItem>
                  <SelectItem value="assignment">Assignments</SelectItem>
                  <SelectItem value="exam">Exams</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>
              {filteredLogs.length} log{filteredLogs.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const CategoryIcon = getCategoryIcon(log.category)
                  const StatusIcon = getStatusIcon(log.status)
                  
                  return (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">{log.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(log.category)}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {log.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{log.userName}</p>
                          <p className="text-sm text-muted-foreground">{log.userId}</p>
                          <Badge className={`text-xs ${getRoleColor(log.userRole)}`}>
                            {log.userRole}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.targetName ? (
                          <div>
                            <p className="font-medium">{log.targetName}</p>
                            <p className="text-sm text-muted-foreground">{log.targetId}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <StatusIcon className={`h-4 w-4 ${getStatusColor(log.status)}`} />
                          <span className={`text-sm font-medium ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {Object.entries(log.details).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="text-xs text-muted-foreground">
                              <span className="font-medium">{key}:</span> {String(value)}
                            </div>
                          ))}
                          {Object.keys(log.details).length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{Object.keys(log.details).length - 2} more
                            </p>
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
    </div>
  )
}
