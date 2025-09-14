
import { StaffStudentDetails } from "@/components/staff-student-details"

interface AdminStudentsProps {
  userRole: "student" | "staff" | "admin"
  currentUser?: any
}

export default function AdminStudentsPage({ userRole, currentUser }: AdminStudentsProps) {
  // TODO: remove mock functionality - replace with real student data
  const mockStudents = [
    {
      id: "STU001",
      name: "John Doe",
      email: "john.doe@university.edu",
      phone: "+1 (555) 123-4567",
      course: "Computer Science",
      semester: 3,
      admissionDate: "2023-09-01",
      status: "active" as const,
      feeStatus: "paid" as const,
      hostelAllocation: {
        room: "101",
        building: "Building A",
        floor: 1
      },
      academicRecord: {
        cgpa: 8.2,
        attendance: 87,
        completedCredits: 45,
        totalCredits: 120
      },
      examResults: [
        {
          subject: "Data Structures",
          marks: 85,
          totalMarks: 100,
          grade: "A",
          examDate: "2024-11-15"
        },
        {
          subject: "Mathematics",
          marks: 78,
          totalMarks: 100,
          grade: "B+",
          examDate: "2024-11-20"
        }
      ]
    },
    {
      id: "STU002",
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      phone: "+1 (555) 234-5678",
      course: "Computer Science",
      semester: 3,
      admissionDate: "2023-09-01",
      status: "active" as const,
      feeStatus: "pending" as const,
      hostelAllocation: {
        room: "205",
        building: "Building B",
        floor: 2
      },
      academicRecord: {
        cgpa: 9.1,
        attendance: 95,
        completedCredits: 45,
        totalCredits: 120
      },
      examResults: [
        {
          subject: "Data Structures",
          marks: 92,
          totalMarks: 100,
          grade: "A+",
          examDate: "2024-11-15"
        },
        {
          subject: "Mathematics",
          marks: 88,
          totalMarks: 100,
          grade: "A",
          examDate: "2024-11-20"
        }
      ]
    },
    {
      id: "STU003",
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      phone: "+1 (555) 345-6789",
      course: "Engineering",
      semester: 2,
      admissionDate: "2024-01-15",
      status: "active" as const,
      feeStatus: "overdue" as const,
      academicRecord: {
        cgpa: 7.5,
        attendance: 78,
        completedCredits: 30,
        totalCredits: 120
      },
      examResults: [
        {
          subject: "Physics",
          marks: 72,
          totalMarks: 100,
          grade: "B",
          examDate: "2024-11-18"
        },
        {
          subject: "Chemistry",
          marks: 68,
          totalMarks: 100,
          grade: "B-",
          examDate: "2024-11-22"
        }
      ]
    },
    {
      id: "STU004",
      name: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      phone: "+1 (555) 456-7890",
      course: "Business Administration",
      semester: 4,
      admissionDate: "2022-09-01",
      status: "active" as const,
      feeStatus: "paid" as const,
      hostelAllocation: {
        room: "312",
        building: "Building C",
        floor: 3
      },
      academicRecord: {
        cgpa: 8.8,
        attendance: 92,
        completedCredits: 60,
        totalCredits: 120
      },
      examResults: [
        {
          subject: "Business Management",
          marks: 89,
          totalMarks: 100,
          grade: "A",
          examDate: "2024-11-12"
        },
        {
          subject: "Economics",
          marks: 85,
          totalMarks: 100,
          grade: "A",
          examDate: "2024-11-16"
        }
      ]
    },
    {
      id: "STU005",
      name: "David Brown",
      email: "david.brown@university.edu",
      phone: "+1 (555) 567-8901",
      course: "Mathematics",
      semester: 5,
      admissionDate: "2022-01-15",
      status: "graduated" as const,
      feeStatus: "paid" as const,
      academicRecord: {
        cgpa: 9.5,
        attendance: 98,
        completedCredits: 120,
        totalCredits: 120
      },
      examResults: [
        {
          subject: "Advanced Calculus",
          marks: 95,
          totalMarks: 100,
          grade: "A+",
          examDate: "2024-05-20"
        },
        {
          subject: "Linear Algebra",
          marks: 92,
          totalMarks: 100,
          grade: "A+",
          examDate: "2024-05-25"
        }
      ]
    }
  ]

  const handleUpdateStudent = (studentId: string, updates: any) => {
    console.log('Updating student:', studentId, updates)
    // TODO: remove mock functionality - implement real student update
  }

  const handleViewStudentProfile = (studentId: string) => {
    console.log('Viewing student profile:', studentId)
    // TODO: remove mock functionality - implement real profile viewing
  }

  const handleDownloadReport = (studentId: string, reportType: string) => {
    console.log('Downloading report for student:', studentId, reportType)
    // TODO: remove mock functionality - implement real report download
  }

  const handleCreateStudent = (student: any) => {
    console.log('Creating new student:', student)
    // TODO: remove mock functionality - implement real student creation
  }

  return (
    <StaffStudentDetails
      students={mockStudents}
      onUpdateStudent={handleUpdateStudent}
      onViewStudentProfile={handleViewStudentProfile}
      onDownloadReport={handleDownloadReport}
      onCreateStudent={handleCreateStudent}
      userRole={userRole}
    />
  )
}