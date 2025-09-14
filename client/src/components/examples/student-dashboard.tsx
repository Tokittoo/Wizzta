import { StudentDashboard } from '../student-dashboard'

export default function StudentDashboardExample() {
  // TODO: remove mock functionality - replace with real student data
  const mockStudent = {
    id: "STU2024001",
    name: "John Doe",
    course: "Computer Science",
    semester: 5
  }

  const mockData = {
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

  return (
    <div className="min-h-screen bg-background">
      <StudentDashboard student={mockStudent} data={mockData} />
    </div>
  )
}