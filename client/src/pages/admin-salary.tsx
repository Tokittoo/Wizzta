import { AdminSalaryManagement } from "@/components/admin-salary-management"

export default function AdminSalaryPage() {
  const handleDownloadReport = (type: string) => {
    console.log(`Downloading ${type} report...`)
    // Implement download functionality
  }

  return <AdminSalaryManagement onDownloadReport={handleDownloadReport} />
}
