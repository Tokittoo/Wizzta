import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Printer, Calendar, MapPin, Clock, User, BookOpen } from "lucide-react"
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
  status: 'available' | 'downloaded' | 'printed'
  downloadDate?: string
  instructions: string[]
}

const StudentHallTicket: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string>('')

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
      status: 'available',
      instructions: [
        'Report to the exam hall 30 minutes before the exam time',
        'Bring valid ID card and this hall ticket',
        'No electronic devices allowed in the exam hall',
        'Follow all COVID-19 safety protocols'
      ]
    },
    {
      id: 'HT002',
      studentName: 'John Doe',
      studentId: 'STU2024001',
      examName: 'Semester 1 - Final Examinations',
      subject: 'Physics',
      examDate: '2024-03-17',
      examTime: '02:00 PM - 05:00 PM',
      venue: 'Main Campus - Block B',
      room: 'B-205',
      seatNumber: 'B-205-08',
      status: 'downloaded',
      downloadDate: '2024-03-10',
      instructions: [
        'Report to the exam hall 30 minutes before the exam time',
        'Bring valid ID card and this hall ticket',
        'No electronic devices allowed in the exam hall',
        'Follow all COVID-19 safety protocols'
      ]
    },
    {
      id: 'HT003',
      studentName: 'John Doe',
      studentId: 'STU2024001',
      examName: 'Semester 1 - Final Examinations',
      subject: 'Chemistry',
      examDate: '2024-03-19',
      examTime: '09:00 AM - 12:00 PM',
      venue: 'Main Campus - Block C',
      room: 'C-301',
      seatNumber: 'C-301-22',
      status: 'printed',
      downloadDate: '2024-03-11',
      instructions: [
        'Report to the exam hall 30 minutes before the exam time',
        'Bring valid ID card and this hall ticket',
        'No electronic devices allowed in the exam hall',
        'Follow all COVID-19 safety protocols'
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'downloaded': return 'bg-blue-100 text-blue-800'
      case 'printed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownload = (ticket: HallTicket) => {
    // Simulate download
    console.log('Downloading hall ticket:', ticket.id)
    // In real implementation, this would generate and download PDF
  }

  const handlePrint = (ticket: HallTicket) => {
    // Simulate print
    console.log('Printing hall ticket:', ticket.id)
    // In real implementation, this would open print dialog
  }

  const filteredTickets = selectedExam 
    ? hallTickets.filter(ticket => ticket.examName === selectedExam)
    : hallTickets

  const uniqueExams = [...new Set(hallTickets.map(ticket => ticket.examName))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hall Ticket Collection</h1>
          <p className="text-gray-600">Download and manage your examination hall tickets</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Exams</p>
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
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold">{hallTickets.filter(t => t.status === 'available').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Download className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Downloaded</p>
                <p className="text-2xl font-bold">{hallTickets.filter(t => t.status === 'downloaded').length}</p>
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
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Filter by Exam:</label>
            <select 
              value={selectedExam} 
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Exams</option>
              {uniqueExams.map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Hall Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                    <CardDescription>{ticket.examName}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Student Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{ticket.studentName}</p>
                    <p className="text-sm text-gray-600">ID: {ticket.studentId}</p>
                  </div>
                </div>

                {/* Exam Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{ticket.examDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{ticket.examTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{ticket.venue} - {ticket.room}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Seat: {ticket.seatNumber}</span>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Important Instructions:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {ticket.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    onClick={() => handleDownload(ticket)}
                    className="flex-1"
                    disabled={ticket.status === 'printed'}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    onClick={() => handlePrint(ticket)}
                    variant="outline"
                    className="flex-1"
                    disabled={ticket.status === 'available'}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>

                {ticket.downloadDate && (
                  <p className="text-xs text-gray-500 text-center">
                    Downloaded on: {ticket.downloadDate}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Hall Tickets Found</h3>
            <p className="text-gray-600">No hall tickets are available for the selected exam.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default StudentHallTicket
