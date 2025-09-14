import { AdminDashboard } from '../admin-dashboard'

export default function AdminDashboardExample() {
  // TODO: remove mock functionality - replace with real dashboard data
  const mockData = {
    totalStudents: 1234,
    totalStaff: 89,
    totalRevenue: 145000,
    hostelOccupancy: 87,
    recentAdmissions: 23,
    pendingApplications: 45
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminDashboard data={mockData} />
    </div>
  )
}