import { StudentServiceDesk } from "@/components/student-service-desk"

interface ServiceDeskProps {
  userRole: "student" | "staff" | "admin"
  currentUser?: any
}

export default function ServiceDeskPage({ userRole, currentUser }: ServiceDeskProps) {
  // TODO: remove mock functionality - replace with real service request data
  const mockRequests = [
    {
      id: "REQ001",
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
      type: "attendance" as const,
      title: "Attendance Certificate Request",
      description: "Need attendance certificate for scholarship application",
      status: "pending" as const,
      requestedDate: "2024-12-01T09:15:00Z"
    },
    {
      id: "REQ003",
      type: "transfer" as const,
      title: "Transfer Certificate Request",
      description: "Transferring to another university",
      status: "approved" as const,
      requestedDate: "2024-11-28T16:45:00Z",
      processedDate: "2024-11-29T11:30:00Z",
      adminComments: "Approved. Certificate will be ready in 2-3 business days."
    }
  ]

  const handleCreateRequest = (request: any) => {
    console.log('Creating new service request:', request)
    // TODO: remove mock functionality - implement real request creation
  }

  const handleDownloadDocument = (requestId: string) => {
    console.log('Downloading document for request:', requestId)
    // TODO: remove mock functionality - implement real document download
  }

  return (
    <StudentServiceDesk
      requests={mockRequests}
      onCreateRequest={handleCreateRequest}
      onDownloadDocument={handleDownloadDocument}
    />
  )
}
