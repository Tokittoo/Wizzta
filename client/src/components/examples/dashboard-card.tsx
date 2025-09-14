import { DashboardCard } from '../dashboard-card'
import { Users, GraduationCap, DollarSign, Building } from 'lucide-react'

export default function DashboardCardExample() {
  const handleCardClick = (title: string) => {
    console.log(`Clicked on ${title} card`)
    // TODO: remove mock functionality - implement real navigation
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <h2 className="text-2xl font-bold">Dashboard Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Students"
          value={1234}
          change="+12%"
          changeType="positive"
          icon={GraduationCap}
          description="from last month"
          gradient
          onClick={() => handleCardClick("Total Students")}
        />
        <DashboardCard
          title="Active Staff"
          value={89}
          change="+2"
          changeType="positive"
          icon={Users}
          description="new this month"
          onClick={() => handleCardClick("Active Staff")}
        />
        <DashboardCard
          title="Revenue"
          value="₹45,231"
          change="+8%"
          changeType="positive"
          icon={DollarSign}
          description="this quarter"
          gradient
          onClick={() => handleCardClick("Revenue")}
        />
        <DashboardCard
          title="Hostel Occupancy"
          value="87%"
          change="-3%"
          changeType="negative"
          icon={Building}
          description="of total capacity"
          onClick={() => handleCardClick("Hostel Occupancy")}
        />
      </div>
    </div>
  )
}