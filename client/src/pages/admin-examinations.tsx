import { AdminExaminationDetails } from "@/components/admin-examination-details"

export default function AdminExaminationsPage() {
  const handleDownloadReport = (type: string) => {
    console.log(`Downloading ${type} report...`)
    // Implement download functionality
  }

  return <AdminExaminationDetails onDownloadReport={handleDownloadReport} />
}
