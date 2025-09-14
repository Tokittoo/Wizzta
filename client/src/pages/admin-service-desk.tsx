import { AdminServiceDesk } from "@/components/admin-service-desk"

interface AdminServiceDeskProps {
  userRole: "student" | "staff" | "admin"
  currentUser?: any
}

export default function AdminServiceDeskPage({ userRole, currentUser }: AdminServiceDeskProps) {
  // TODO: remove mock functionality - replace with real service request data
  const mockRequests = [
    {
      id: "REQ001",
      studentId: "STU001",
      studentName: "John Doe",
      studentEmail: "john.doe@university.edu",
      type: "bonafide" as const,
      title: "Bonafide Certificate Request",
      description: "Required for bank account opening",
      status: "completed" as const,
      requestedDate: "2024-11-15T10:30:00Z",
      processedDate: "2024-11-16T14:20:00Z",
      adminComments: "Certificate generated and ready for download",
      downloadUrl: "/documents/bonafide_STU001.pdf"
    },
    {
      id: "REQ002",
      studentId: "STU002",
      studentName: "Jane Smith",
      studentEmail: "jane.smith@university.edu",
      type: "attendance" as const,
      title: "Attendance Certificate Request",
      description: "Need attendance certificate for scholarship application",
      status: "pending" as const,
      requestedDate: "2024-12-01T09:15:00Z"
    },
    {
      id: "REQ003",
      studentId: "STU003",
      studentName: "Mike Johnson",
      studentEmail: "mike.johnson@university.edu",
      type: "transfer" as const,
      title: "Transfer Certificate Request",
      description: "Transferring to another university",
      status: "approved" as const,
      requestedDate: "2024-11-28T16:45:00Z",
      processedDate: "2024-11-29T11:30:00Z",
      adminComments: "Approved. Certificate will be ready in 2-3 business days."
    },
    {
      id: "REQ004",
      studentId: "STU004",
      studentName: "Sarah Wilson",
      studentEmail: "sarah.wilson@university.edu",
      type: "bonafide" as const,
      title: "Bonafide Certificate Request",
      description: "Required for internship application",
      status: "rejected" as const,
      requestedDate: "2024-11-25T13:20:00Z",
      processedDate: "2024-11-26T09:15:00Z",
      adminComments: "Rejected due to incomplete academic records. Please contact academic office."
    },
    {
      id: "REQ005",
      studentId: "STU001",
      studentName: "John Doe",
      studentEmail: "john.doe@university.edu",
      type: "attendance" as const,
      title: "Attendance Certificate Request",
      description: "Need for visa application",
      status: "pending" as const,
      requestedDate: "2024-12-02T14:30:00Z"
    }
  ]

  const handleUpdateRequest = (requestId: string, updates: any) => {
    console.log('Updating service request:', requestId, updates)
    // TODO: remove mock functionality - implement real request update
  }

  const handleDownloadDocument = (requestId: string) => {
    console.log('Downloading document for request:', requestId)
    // TODO: remove mock functionality - implement real document download
  }

  return (
    <AdminServiceDesk
      requests={mockRequests}
      onUpdateRequest={handleUpdateRequest}
      onDownloadDocument={handleDownloadDocument}
    />
  )
}
