import { AdminStaffManagement } from "@/components/admin-staff-management"

interface AdminStaffProps {
  userRole: "student" | "staff" | "admin"
  currentUser?: any
}

export default function AdminStaffPage({ userRole, currentUser }: AdminStaffProps) {
  // TODO: remove mock functionality - replace with real staff data
  const mockStaff = [
    {
      id: "STF001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      position: "Professor",
      hireDate: "2020-09-01",
      status: "active" as const,
      qualifications: ["PhD in Computer Science", "MSc in Software Engineering"],
      courses: [
        { courseCode: "CS 201", courseName: "Data Structures", semester: "Fall 2024" },
        { courseCode: "CS 301", courseName: "Computer Networks", semester: "Fall 2024" }
      ],
      responsibilities: ["Course Development", "Research Supervision", "Department Head"],
      salary: 95000,
      performance: {
        rating: 4.8,
        lastReview: "2024-06-15"
      }
    },
    {
      id: "STF002",
      name: "Prof. Michael Brown",
      email: "michael.brown@university.edu",
      phone: "+1 (555) 234-5678",
      department: "Mathematics",
      position: "Associate Professor",
      hireDate: "2018-01-15",
      status: "active" as const,
      qualifications: ["PhD in Mathematics", "MSc in Applied Mathematics"],
      courses: [
        { courseCode: "MATH 201", courseName: "Calculus", semester: "Fall 2024" },
        { courseCode: "MATH 301", courseName: "Linear Algebra", semester: "Fall 2024" }
      ],
      responsibilities: ["Course Teaching", "Student Advising", "Research"],
      salary: 82000,
      performance: {
        rating: 4.5,
        lastReview: "2024-05-20"
      }
    },
    {
      id: "STF003",
      name: "Dr. Emily Davis",
      email: "emily.davis@university.edu",
      phone: "+1 (555) 345-6789",
      department: "Business Administration",
      position: "Assistant Professor",
      hireDate: "2021-09-01",
      status: "active" as const,
      qualifications: ["PhD in Business Administration", "MBA"],
      courses: [
        { courseCode: "BUS 201", courseName: "Business Management", semester: "Fall 2024" },
        { courseCode: "BUS 301", courseName: "Strategic Management", semester: "Fall 2024" }
      ],
      responsibilities: ["Course Teaching", "Research", "Industry Collaboration"],
      salary: 75000,
      performance: {
        rating: 4.3,
        lastReview: "2024-04-10"
      }
    },
    {
      id: "STF004",
      name: "Prof. Robert Wilson",
      email: "robert.wilson@university.edu",
      phone: "+1 (555) 456-7890",
      department: "Computer Science",
      position: "Professor",
      hireDate: "2015-08-15",
      status: "on_leave" as const,
      qualifications: ["PhD in Computer Science", "MSc in Database Systems"],
      courses: [
        { courseCode: "CS 401", courseName: "Database Systems", semester: "Spring 2025" }
      ],
      responsibilities: ["Research", "PhD Supervision", "Industry Partnerships"],
      salary: 98000,
      performance: {
        rating: 4.9,
        lastReview: "2024-03-15"
      }
    },
    {
      id: "STF005",
      name: "Dr. Lisa Anderson",
      email: "lisa.anderson@university.edu",
      phone: "+1 (555) 567-8901",
      department: "Administration",
      position: "Registrar",
      hireDate: "2019-03-01",
      status: "active" as const,
      qualifications: ["MSc in Educational Administration", "BSc in Management"],
      courses: [],
      responsibilities: ["Student Records", "Academic Planning", "Policy Implementation"],
      salary: 68000,
      performance: {
        rating: 4.6,
        lastReview: "2024-07-01"
      }
    }
  ]

  const handleCreateStaff = (staff: any) => {
    console.log('Creating new staff member:', staff)
    // TODO: remove mock functionality - implement real staff creation
  }

  const handleUpdateStaff = (staffId: string, updates: any) => {
    console.log('Updating staff member:', staffId, updates)
    // TODO: remove mock functionality - implement real staff update
  }

  const handleViewStaffProfile = (staffId: string) => {
    console.log('Viewing staff profile:', staffId)
    // TODO: remove mock functionality - implement real profile viewing
  }

  const handleDownloadReport = (reportType: string) => {
    console.log('Downloading report:', reportType)
    // TODO: remove mock functionality - implement real report download
  }

  return (
    <AdminStaffManagement
      staff={mockStaff}
      onCreateStaff={handleCreateStaff}
      onUpdateStaff={handleUpdateStaff}
      onViewStaffProfile={handleViewStaffProfile}
      onDownloadReport={handleDownloadReport}
    />
  )
}
