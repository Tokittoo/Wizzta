import { AssignmentSubmission } from "@/components/assignment-submission"

interface AssignmentsProps {
  userRole: "student" | "staff" | "admin"
  currentUser?: any
}

export default function AssignmentsPage({ userRole, currentUser }: AssignmentsProps) {
  // TODO: remove mock functionality - replace with real assignment data
  const mockAssignments = [
    {
      id: "1",
      title: "Data Structures Assignment 1",
      description: "Implement a binary search tree with insertion, deletion, and traversal operations. Include time complexity analysis.",
      course: "CS 201 - Data Structures",
      instructor: "Dr. Smith",
      dueDate: "2024-12-15",
      maxMarks: 100,
      status: "not_submitted" as const,
      attachments: ["assignment1.pdf", "rubric.pdf"]
    },
    {
      id: "2",
      title: "Mathematics Problem Set 3",
      description: "Solve the calculus problems from chapters 5-7. Show all work and provide detailed solutions.",
      course: "MATH 201 - Calculus",
      instructor: "Prof. Johnson",
      dueDate: "2024-12-10",
      maxMarks: 50,
      status: "submitted" as const,
      submissionDate: "2024-12-08",
      submissionFile: "math_assignment3.pdf"
    },
    {
      id: "3",
      title: "Computer Networks Lab Report",
      description: "Write a comprehensive report on the network simulation experiments conducted in the lab.",
      course: "CS 301 - Computer Networks",
      instructor: "Dr. Brown",
      dueDate: "2024-11-30",
      maxMarks: 75,
      status: "graded" as const,
      submissionDate: "2024-11-28",
      marks: 68,
      feedback: "Good analysis of the network protocols. Consider adding more details about the simulation parameters and results interpretation.",
      submissionFile: "network_lab_report.pdf"
    },
    {
      id: "4",
      title: "Database Design Project",
      description: "Design a normalized database schema for a library management system. Include ER diagrams and SQL scripts.",
      course: "CS 401 - Database Systems",
      instructor: "Dr. Wilson",
      dueDate: "2024-12-20",
      maxMarks: 150,
      status: "not_submitted" as const,
      attachments: ["project_requirements.pdf", "sample_data.xlsx"]
    },
    {
      id: "5",
      title: "Software Engineering Case Study",
      description: "Analyze the software development lifecycle of a real-world project. Compare different methodologies used.",
      course: "CS 501 - Software Engineering",
      instructor: "Dr. Davis",
      dueDate: "2024-11-25",
      maxMarks: 80,
      status: "late" as const,
      submissionDate: "2024-11-27",
      submissionFile: "se_case_study.pdf"
    }
  ]

  const handleUploadSubmission = (assignmentId: string, file: File, comments: string) => {
    console.log('Uploading submission for assignment:', assignmentId, file.name, comments)
    // TODO: remove mock functionality - implement real file upload
  }

  const handleDownloadSubmission = (assignmentId: string) => {
    console.log('Downloading submission for assignment:', assignmentId)
    // TODO: remove mock functionality - implement real file download
  }

  const handleViewFeedback = (assignmentId: string) => {
    console.log('Viewing feedback for assignment:', assignmentId)
    // TODO: remove mock functionality - implement real feedback viewing
  }

  return (
    <AssignmentSubmission
      assignments={mockAssignments}
      onUploadSubmission={handleUploadSubmission}
      onDownloadSubmission={handleDownloadSubmission}
      onViewFeedback={handleViewFeedback}
    />
  )
}
