import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardCard } from "./dashboard-card"
import { StatusBadge } from "./status-badge"
import { 
  GraduationCap, 
  CreditCard, 
  Building, 
  Calendar, 
  FileText, 
  Award,
  Clock,
  BookOpen,
  User
} from "lucide-react"

interface StudentDashboardProps {
  student: {
    id: string
    name: string
    course: string
    semester: number
    avatar?: string
  }
  data: {
    applicationStatus: "pending" | "verified" | "enrolled" | "rejected"
    feesPending: number
    feesTotal: number
    roomAssignment?: string
    upcomingExams: number
    recentGrades: Array<{
      subject: string
      grade: string
      marks: number
      totalMarks: number
    }>
    announcements: Array<{
      id: string
      title: string
      date: string
      type: "academic" | "hostel" | "fees" | "general"
    }>
  }
}

export function StudentDashboard({ student, data }: StudentDashboardProps) {
  const attendancePercentage = 87 // TODO: remove mock functionality
  const cgpa = 8.2 // TODO: remove mock functionality
  
  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "academic": return BookOpen
      case "hostel": return Building
      case "fees": return CreditCard
      default: return FileText
    }
  }

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "hostel": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "fees": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {student.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">
            {student.course} • Semester {student.semester}
          </p>
        </div>
        <div className="text-right">
          <StatusBadge status={data.applicationStatus} />
          <p className="text-sm text-muted-foreground mt-1">
            Student ID: {student.id}
          </p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <DashboardCard
          title="CGPA"
          value={cgpa.toFixed(1)}
          icon={Award}
          description="Current semester"
          gradient
        />
        <DashboardCard
          title="Attendance"
          value={`${attendancePercentage}%`}
          icon={User}
          description="This semester"
          changeType={attendancePercentage >= 75 ? "positive" : "negative"}
          change={attendancePercentage >= 75 ? "Good" : "Low"}
        />
        <DashboardCard
          title="Pending Fees"
          value={`$${data.feesPending.toLocaleString()}`}
          icon={CreditCard}
          description={`of $${data.feesTotal.toLocaleString()} total`}
          changeType={data.feesPending > 0 ? "negative" : "positive"}
        />
        <DashboardCard
          title="Upcoming Exams"
          value={data.upcomingExams}
          icon={Calendar}
          description="This month"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Grades */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="backdrop-blur-md bg-card/80" data-testid="card-recent-grades">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Grades
              </CardTitle>
              <CardDescription>Your latest exam results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentGrades.map((grade, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 border rounded-lg hover-elevate"
                    data-testid={`grade-${grade.subject.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{grade.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        {grade.marks}/{grade.totalMarks} marks
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={
                        grade.grade === "A+" || grade.grade === "A" ? "bg-green-500/10 text-green-600" :
                        grade.grade === "B+" || grade.grade === "B" ? "bg-blue-500/10 text-blue-600" :
                        grade.grade === "C+" || grade.grade === "C" ? "bg-yellow-500/10 text-yellow-600" :
                        "bg-red-500/10 text-red-600"
                      }>
                        {grade.grade}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((grade.marks / grade.totalMarks) * 100)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full" data-testid="button-view-all-grades">
                  View All Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions & Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Room Assignment */}
          {data.roomAssignment && (
            <Card className="backdrop-blur-md bg-card/80" data-testid="card-room-assignment">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Room Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">{data.roomAssignment}</div>
                  <p className="text-sm text-muted-foreground">Building A, Floor 2</p>
                  <Button size="sm" variant="outline" className="w-full" data-testid="button-view-room-details">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fee Payment Progress */}
          <Card className="backdrop-blur-md bg-card/80" data-testid="card-fee-progress">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Fee Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Paid</span>
                  <span>${(data.feesTotal - data.feesPending).toLocaleString()}</span>
                </div>
                <Progress 
                  value={((data.feesTotal - data.feesPending) / data.feesTotal) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Total: ${data.feesTotal.toLocaleString()}</span>
                  <span>Pending: ${data.feesPending.toLocaleString()}</span>
                </div>
              </div>
              {data.feesPending > 0 && (
                <Button size="sm" className="w-full" data-testid="button-pay-fees">
                  Pay Pending Fees
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Attendance Overview */}
          <Card className="backdrop-blur-md bg-card/80" data-testid="card-attendance">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{attendancePercentage}%</div>
                <p className="text-sm text-muted-foreground">Current semester</p>
              </div>
              <Progress value={attendancePercentage} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                {attendancePercentage >= 75 ? "Meeting minimum requirement" : "Below minimum requirement"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Announcements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="backdrop-blur-md bg-card/80" data-testid="card-announcements">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Announcements
            </CardTitle>
            <CardDescription>Important updates and notices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.announcements.slice(0, 5).map((announcement, index) => {
                const Icon = getAnnouncementIcon(announcement.type)
                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="flex items-start gap-3 p-3 border rounded-lg hover-elevate cursor-pointer"
                    data-testid={`announcement-${announcement.id}`}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm">{announcement.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getAnnouncementColor(announcement.type)}`}>
                          {announcement.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
              <Button variant="outline" className="w-full" data-testid="button-view-all-announcements">
                View All Announcements
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}