import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Printer, Search, Plus, Edit, Trash2, Users, BookOpen, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface HallTicket {
  id: string
  studentName: string
  studentId: string
  examName: string
  subject: string
  examDate: string
  examTime: string
  venue: string
  room: string
  seatNumber: string
  status: 'generated' | 'downloaded' | 'printed'
  downloadDate?: string
  printDate?: string
}

interface Exam {
  id: string
  name: string
  date: string
  time: string
  venue: string
  totalStudents: number
  status: 'scheduled' | 'ongoing' | 'completed'
}

const AdminHallTicketManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExam, setSelectedExam] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')

  // Mock data for hall tickets
  const hallTickets: HallTicket[] = [
    {
      id: 'HT001',
      studentName: 'John Doe',
      studentId: 'STU2024001',
      examName: 'Semester 1 - Final Examinations',
      subject: 'Mathematics',
      examDate: '2024-03-15',
      examTime: '09:00 AM - 12:00 PM',
      venue: 'Main Campus - Block A',
      room: 'A-101',
      seatNumber: 'A-101-15',
      status: 'downloaded',
      downloadDate: '2024-03-10'
    },
    {
      id: 'HT002',
      studentName: 'Jane Smith',
      studentId: 'STU2024002',
      examName: 'Semester 1 - Final Examinations',
      subject: 'Mathematics',
      examDate: '2024-03-15',
      examTime: '09:00 AM - 12:00 PM',
      venue: 'Main Campus - Block A',
      room: 'A-101',
      seatNumber: 'A-101-16',
      status: 'printed',
      downloadDate: '2024-03-10',
      printDate: '2024-03-11'
    },
    {
      id: 'HT003',
      studentName: 'Mike Johnson',
      studentId: 'STU2024003',
      examName: 'Semester 1 - Final Examinations',
      subject: 'Physics',
      examDate: '2024-03-17',
      examTime: '02:00 PM - 05:00 PM',
      venue: 'Main Campus - Block B',
      room: 'B-205',
      seatNumber: 'B-205-08',
      status: 'generated'
    }
  ]

  // Mock data for exams
  const exams: Exam[] = [
    {
      id: 'EXAM001',
      name: 'Semester 1 - Final Examinations',
      date: '2024-03-15',
      time: '09:00 AM - 12:00 PM',
      venue: 'Main Campus',
      totalStudents: 150,
      status: 'scheduled'
    },
    {
      id: 'EXAM002',
      name: 'Semester 1 - Midterm Examinations',
      date: '2024-02-20',
      time: '10:00 AM - 01:00 PM',
      venue: 'Main Campus',
      totalStudents: 120,
      status: 'completed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'bg-blue-100 text-blue-800'
      case 'downloaded': return 'bg-green-100 text-green-800'
      case 'printed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getExamStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTickets = hallTickets.filter(ticket => {
    const matchesSearch = ticket.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesExam = !selectedExam || selectedExam === "all" || ticket.examName === selectedExam
    const matchesStatus = !selectedStatus || selectedStatus === "all" || ticket.status === selectedStatus
    return matchesSearch && matchesExam && matchesStatus
  })

  const uniqueExams = [...new Set(hallTickets.map(ticket => ticket.examName))]

  const handleGenerateTickets = (examId: string) => {
    console.log('Generating hall tickets for exam:', examId)
    // In real implementation, this would generate hall tickets for all students
  }

  const handleBulkDownload = (examId: string) => {
    console.log('Bulk downloading hall tickets for exam:', examId)
    // In real implementation, this would download all tickets for the exam
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hall Ticket Management</h1>
          <p className="text-gray-600">Manage examination hall tickets and seating arrangements</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold">{hallTickets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Downloaded</p>
                <p className="text-2xl font-bold">{hallTickets.filter(t => t.status === 'downloaded' || t.status === 'printed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Printer className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Printed</p>
                <p className="text-2xl font-bold">{hallTickets.filter(t => t.status === 'printed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{hallTickets.filter(t => t.status === 'generated').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Hall Tickets</TabsTrigger>
          <TabsTrigger value="exams">Exam Management</TabsTrigger>
          <TabsTrigger value="seating">Seating Arrangement</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by student name, ID, or subject..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exams</SelectItem>
                    {uniqueExams.map(exam => (
                      <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="generated">Generated</SelectItem>
                    <SelectItem value="downloaded">Downloaded</SelectItem>
                    <SelectItem value="printed">Printed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Hall Tickets Table */}
          <Card>
            <CardHeader>
              <CardTitle>Hall Tickets</CardTitle>
              <CardDescription>Manage and track hall ticket status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Seat</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.studentName}</p>
                          <p className="text-sm text-gray-600">{ticket.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{ticket.examName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{ticket.subject}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{ticket.examDate}</p>
                          <p className="text-sm text-gray-600">{ticket.examTime}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{ticket.venue}</p>
                          <p className="text-sm text-gray-600">{ticket.room}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{ticket.seatNumber}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
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

        <TabsContent value="exams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exam Management</CardTitle>
              <CardDescription>Manage examinations and generate hall tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exams.map((exam) => (
                  <Card key={exam.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{exam.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {exam.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exam.venue}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {exam.totalStudents} students
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getExamStatusColor(exam.status)}>
                            {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                          </Badge>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleGenerateTickets(exam.id)}
                              disabled={exam.status === 'completed'}
                            >
                              Generate Tickets
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleBulkDownload(exam.id)}
                              disabled={exam.status === 'scheduled'}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Bulk Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seating" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seating Arrangement</CardTitle>
              <CardDescription>Manage seating arrangements for examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Seating Arrangement</h3>
                <p className="text-gray-600 mb-4">Visual seating arrangement will be displayed here</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Seating Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminHallTicketManagement
