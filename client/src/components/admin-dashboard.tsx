import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { DashboardCard } from "./dashboard-card"
import { Users, GraduationCap, DollarSign, Building, TrendingUp, UserCheck } from "lucide-react"

interface AdminDashboardProps {
  data: {
    totalStudents: number
    totalStaff: number
    totalRevenue: number
    hostelOccupancy: number
    recentAdmissions: number
    pendingApplications: number
  }
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  // TODO: remove mock functionality - replace with real analytics data
  const admissionsData = [
    { month: "Jan", admissions: 45, applications: 120 },
    { month: "Feb", admissions: 52, applications: 135 },
    { month: "Mar", admissions: 48, applications: 110 },
    { month: "Apr", admissions: 61, applications: 145 },
    { month: "May", admissions: 55, applications: 125 },
    { month: "Jun", admissions: 67, applications: 160 },
  ]

  const revenueData = [
    { month: "Jan", tuition: 45000, hostel: 25000, other: 8000 },
    { month: "Feb", tuition: 48000, hostel: 27000, other: 9000 },
    { month: "Mar", tuition: 52000, hostel: 28000, other: 7500 },
    { month: "Apr", tuition: 49000, hostel: 26000, other: 8500 },
    { month: "May", tuition: 54000, hostel: 29000, other: 9500 },
    { month: "Jun", tuition: 58000, hostel: 31000, other: 10000 },
  ]

  const courseDistribution = [
    { course: "Computer Science", students: 320, color: "hsl(var(--chart-1))" },
    { course: "Engineering", students: 280, color: "hsl(var(--chart-2))" },
    { course: "Business", students: 185, color: "hsl(var(--chart-3))" },
    { course: "Mathematics", students: 145, color: "hsl(var(--chart-4))" },
    { course: "Others", students: 120, color: "hsl(var(--chart-5))" },
  ]

  const examPerformance = [
    { subject: "Math", passRate: 85, averageScore: 78 },
    { subject: "Physics", passRate: 78, averageScore: 72 },
    { subject: "Chemistry", passRate: 82, averageScore: 75 },
    { subject: "CS", passRate: 91, averageScore: 84 },
    { subject: "English", passRate: 88, averageScore: 80 },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">
                Comprehensive overview of institutional metrics and analytics
              </p>
            </div>
          </motion.div>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3"
        >
        <DashboardCard
          title="Total Students"
          value={data.totalStudents}
          change="+12%"
          changeType="positive"
          icon={GraduationCap}
          description="Active enrollment"
          gradient
        />
        <DashboardCard
          title="Total Staff"
          value={data.totalStaff}
          change="+3"
          changeType="positive"
          icon={Users}
          description="Faculty & admin"
        />
        <DashboardCard
          title="Monthly Revenue"
          value={`₹${(data.totalRevenue / 1000).toFixed(0)}K`}
          change="+18%"
          changeType="positive"
          icon={DollarSign}
          description="This month"
          gradient
        />
        <DashboardCard
          title="Hostel Occupancy"
          value={`${data.hostelOccupancy}%`}
          change="-2%"
          changeType="negative"
          icon={Building}
          description="Current capacity"
        />
        <DashboardCard
          title="New Admissions"
          value={data.recentAdmissions}
          change="+8"
          changeType="positive"
          icon={UserCheck}
          description="This month"
        />
        <DashboardCard
          title="Pending Apps"
          value={data.pendingApplications}
          change="+5"
          changeType="neutral"
          icon={TrendingUp}
          description="Under review"
        />
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl" data-testid="chart-admissions">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Admissions Trend</CardTitle>
              <CardDescription className="text-sm text-gray-600">Monthly admissions vs applications received</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={admissionsData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                  <Bar dataKey="admissions" fill="hsl(var(--chart-1))" name="Admissions" />
                  <Bar dataKey="applications" fill="hsl(var(--chart-2))" name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl" data-testid="chart-revenue">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Revenue Breakdown</CardTitle>
              <CardDescription className="text-sm text-gray-600">Monthly revenue by category</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                  <Line type="monotone" dataKey="tuition" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Tuition" />
                  <Line type="monotone" dataKey="hostel" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Hostel" />
                  <Line type="monotone" dataKey="other" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Other" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl" data-testid="chart-course-distribution">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Course Distribution</CardTitle>
              <CardDescription className="text-sm text-gray-600">Student enrollment by course</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="students"
                    label={({ course, students }) => `${course}: ${students}`}
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl" data-testid="chart-exam-performance">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Exam Performance</CardTitle>
              <CardDescription className="text-sm text-gray-600">Pass rates and average scores by subject</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={examPerformance}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                  <Bar dataKey="passRate" fill="hsl(var(--chart-1))" name="Pass Rate %" />
                  <Bar dataKey="averageScore" fill="hsl(var(--chart-2))" name="Average Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  )
}