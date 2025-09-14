import { AdminLibraryManagement } from "@/components/admin-library-management"

export default function AdminLibraryPage() {
  const handleDownloadReport = (type: string) => {
    console.log(`Downloading ${type} report...`)
    // Implement download functionality
  }

  return <AdminLibraryManagement onDownloadReport={handleDownloadReport} />
}
