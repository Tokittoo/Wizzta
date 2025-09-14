import { AdminHistoryLogs } from "@/components/admin-history-logs"

interface AdminLogsProps {
  userRole: "student" | "staff" | "admin"
  currentUser?: any
}

export default function AdminLogsPage({ userRole, currentUser }: AdminLogsProps) {
  // TODO: remove mock functionality - replace with real log data
  const mockLogs = [
    {
      id: "LOG001",
      timestamp: "2024-12-01T10:30:00Z",
      action: "Student Admission",
      category: "admission" as const,
      description: "New student John Doe admitted to Computer Science program",
      userId: "ADM001",
      userName: "Dr. Administrator",
      userRole: "admin" as const,
      targetId: "STU001",
      targetName: "John Doe",
      details: {
        course: "Computer Science",
        semester: "Fall 2024",
        admissionType: "Regular"
      },
      status: "success" as const
    },
    {
      id: "LOG002",
      timestamp: "2024-12-01T11:15:00Z",
      action: "Fee Payment",
      category: "fees" as const,
      description: "Student Jane Smith paid tuition fees for semester 3",
      userId: "STU002",
      userName: "Jane Smith",
      userRole: "student" as const,
      targetId: "FEE001",
      targetName: "Tuition Fee - Semester 3",
      details: {
        amount: 5000,
        paymentMethod: "Credit Card",
        transactionId: "TXN123456"
      },
      status: "success" as const
    },
    {
      id: "LOG003",
      timestamp: "2024-12-01T14:20:00Z",
      action: "Assignment Submission",
      category: "assignment" as const,
      description: "Student Mike Johnson submitted Data Structures Assignment 1",
      userId: "STU003",
      userName: "Mike Johnson",
      userRole: "student" as const,
      targetId: "ASS001",
      targetName: "Data Structures Assignment 1",
      details: {
        course: "CS 201",
        submissionFile: "mike_johnson_assignment1.pdf",
        submissionTime: "2024-12-01T14:20:00Z"
      },
      status: "success" as const
    },
    {
      id: "LOG004",
      timestamp: "2024-12-01T16:45:00Z",
      action: "Assignment Grading",
      category: "assignment" as const,
      description: "Dr. Sarah Johnson graded assignment submission",
      userId: "STF001",
      userName: "Dr. Sarah Johnson",
      userRole: "staff" as const,
      targetId: "SUB001",
      targetName: "John Doe - Data Structures Assignment 1",
      details: {
        marks: 85,
        maxMarks: 100,
        feedback: "Good implementation with clear comments"
      },
      status: "success" as const
    },
    {
      id: "LOG005",
      timestamp: "2024-12-01T09:00:00Z",
      action: "Exam Results Published",
      category: "exam" as const,
      description: "Mathematics midterm exam results published",
      userId: "STF002",
      userName: "Prof. Michael Brown",
      userRole: "staff" as const,
      targetId: "EXAM001",
      targetName: "Mathematics Midterm Exam",
      details: {
        examDate: "2024-11-20",
        totalStudents: 45,
        averageScore: 78.5
      },
      status: "success" as const
    },
    {
      id: "LOG006",
      timestamp: "2024-12-01T08:30:00Z",
      action: "Hostel Allocation",
      category: "hostel" as const,
      description: "New hostel room allocated to student",
      userId: "ADM001",
      userName: "Dr. Administrator",
      userRole: "admin" as const,
      targetId: "STU004",
      targetName: "Sarah Wilson",
      details: {
        room: "312",
        building: "Building C",
        floor: 3
      },
      status: "success" as const
    },
    {
      id: "LOG007",
      timestamp: "2024-12-01T13:10:00Z",
      action: "Staff Profile Update",
      category: "staff" as const,
      description: "Staff member profile information updated",
      userId: "STF003",
      userName: "Dr. Emily Davis",
      userRole: "staff" as const,
      targetId: "STF003",
      targetName: "Dr. Emily Davis",
      details: {
        updatedFields: ["phone", "qualifications"],
        previousPhone: "+1 (555) 345-6788"
      },
      status: "success" as const
    },
    {
      id: "LOG008",
      timestamp: "2024-12-01T15:30:00Z",
      action: "System Backup",
      category: "system" as const,
      description: "Daily system backup completed successfully",
      userId: "SYS001",
      userName: "System",
      userRole: "admin" as const,
      details: {
        backupSize: "2.5 GB",
        duration: "15 minutes",
        backupLocation: "Cloud Storage"
      },
      status: "success" as const
    },
    {
      id: "LOG009",
      timestamp: "2024-12-01T12:00:00Z",
      action: "Login Attempt Failed",
      category: "system" as const,
      description: "Failed login attempt detected",
      userId: "UNKNOWN",
      userName: "Unknown User",
      userRole: "student" as const,
      details: {
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0...",
        attemptCount: 3
      },
      status: "warning" as const
    },
    {
      id: "LOG010",
      timestamp: "2024-12-01T17:20:00Z",
      action: "Database Error",
      category: "system" as const,
      description: "Database connection timeout occurred",
      userId: "SYS001",
      userName: "System",
      userRole: "admin" as const,
      details: {
        errorCode: "DB_TIMEOUT",
        affectedTable: "student_records",
        duration: "30 seconds"
      },
      status: "error" as const
    }
  ]

  const handleExportLogs = (filters: any) => {
    console.log('Exporting logs with filters:', filters)
    // TODO: remove mock functionality - implement real log export
  }

  return (
    <AdminHistoryLogs
      logs={mockLogs}
      onExportLogs={handleExportLogs}
    />
  )
}
