import { ExamsModule } from "@/components/exams-module"

interface ExamsProps {
  userRole: "student" | "staff" | "admin"
}

export default function Exams({ userRole }: ExamsProps) {
  // TODO: remove mock functionality - replace with real exam data
  const mockExamResults = [
    {
      id: "1",
      studentId: "STU001",
      studentName: "John Doe",
      subject: "Mathematics",
      marks: 85,
      totalMarks: 100,
      grade: "A",
      examDate: "2024-11-15",
      examType: "midterm" as const
    },
    {
      id: "2",
      studentId: "STU001",
      studentName: "John Doe", 
      subject: "Physics",
      marks: 78,
      totalMarks: 100,
      grade: "B+",
      examDate: "2024-11-20",
      examType: "midterm" as const
    },
    {
      id: "3",
      studentId: "STU002",
      studentName: "Jane Smith",
      subject: "Mathematics",
      marks: 92,
      totalMarks: 100,
      grade: "A+",
      examDate: "2024-11-15",
      examType: "midterm" as const
    }
  ]

  const mockExamSchedule = [
    {
      id: "1",
      subject: "Computer Science",
      date: "2024-12-15",
      time: "09:00 AM",
      duration: "3 hours",
      venue: "Hall A",
      examType: "final" as const,
      status: "upcoming" as const
    },
    {
      id: "2",
      subject: "Mathematics",
      date: "2024-12-18",
      time: "02:00 PM",
      duration: "2.5 hours",
      venue: "Hall B",
      examType: "final" as const,
      status: "upcoming" as const
    },
    {
      id: "3",
      subject: "Physics",
      date: "2024-11-20",
      time: "10:00 AM",
      duration: "2 hours",
      venue: "Lab 1",
      examType: "midterm" as const,
      status: "completed" as const
    }
  ]

  const handleUploadMarks = (examId: string, marks: any[]) => {
    console.log('Uploading marks for exam:', examId, marks)
    // TODO: remove mock functionality - implement real marks upload
  }

  return (
    <ExamsModule
      userRole={userRole}
      examResults={mockExamResults}
      examSchedule={mockExamSchedule}
      onUploadMarks={handleUploadMarks}
    />
  )
}