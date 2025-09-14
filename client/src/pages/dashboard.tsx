import { StudentDashboard } from "@/components/student-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"

interface DashboardProps {
  userRole: "student" | "staff" | "admin"
  currentUser: any
}

export default function Dashboard({ userRole, currentUser }: DashboardProps) {
  // TODO: remove mock functionality - replace with real data
  const mockStudentData = {
    applicationStatus: "enrolled" as const,
    feesPending: 2500,
    feesTotal: 15000,
    roomAssignment: "101",
    upcomingExams: 3,
    recentGrades: [
      {
        subject: "Data Structures",
        grade: "A",
        marks: 85,
        totalMarks: 100
      },
      {
        subject: "Computer Networks", 
        grade: "B+",
        marks: 78,
        totalMarks: 100
      },
      {
        subject: "Database Systems",
        grade: "A+",
        marks: 92,
        totalMarks: 100
      }
    ],
    announcements: [
      {
        id: "1",
        title: "Mid-semester exam schedule released",
        date: "2024-11-25",
        type: "academic" as const
      },
      {
        id: "2",
        title: "Hostel fee payment due December 15th", 
        date: "2024-11-20",
        type: "fees" as const
      },
      {
        id: "3",
        title: "New library timings for exam period",
        date: "2024-11-18",
        type: "general" as const
      }
    ]
  }

  const mockAdminData = {
    totalStudents: 1234,
    totalStaff: 89,
    totalRevenue: 145000,
    hostelOccupancy: 87,
    recentAdmissions: 23,
    pendingApplications: 45
  }

  if (userRole === "student") {
    return <StudentDashboard student={currentUser} data={mockStudentData} />
  }

  if (userRole === "admin") {
    return <AdminDashboard data={mockAdminData} />
  }

  // Staff dashboard - similar to admin but with limited access
  return <AdminDashboard data={mockAdminData} />
}