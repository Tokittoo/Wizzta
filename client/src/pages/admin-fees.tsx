import { AdminFeesManagement } from "@/components/admin-fees-management"

export default function AdminFeesPage() {
  const handleDownloadReport = (type: string) => {
    console.log(`Downloading ${type} report...`)
    // Implement download functionality
  }

  return <AdminFeesManagement onDownloadReport={handleDownloadReport} />
}
