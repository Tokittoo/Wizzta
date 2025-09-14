import { useState } from "react"
import { Switch, Route } from "wouter"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/queryClient"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { LoginForm } from "@/components/login-form"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import Dashboard from "@/pages/dashboard"
import Admissions from "@/pages/admissions"
import Fees from "@/pages/fees"
import Hostel from "@/pages/hostel"
import Exams from "@/pages/exams"
import Timetable from "@/pages/timetable"
import Assignments from "@/pages/assignments"
import StaffAssignments from "@/pages/staff-assignments"
import StaffStudents from "@/pages/staff-students"
import AdminStaff from "@/pages/admin-staff"
import AdminStudents from "@/pages/admin-students"
import AdminAdmissions from "@/pages/admin-admissions"
import AdminServiceDesk from "@/pages/admin-service-desk"
import AdminLogs from "@/pages/admin-logs"
import AdminLibrary from "@/pages/admin-library"
import AdminFees from "@/pages/admin-fees"
import AdminSalary from "@/pages/admin-salary"
import StaffSalary from "@/pages/staff-salary"
import AdminExaminations from "@/pages/admin-examinations"
import StaffAttendance from "@/pages/staff-attendance"
import ServiceDesk from "@/pages/service-desk"
import ExamResults from "@/pages/exam-results"
import StudentHallTicket from "@/pages/student-hall-ticket"
import AdminHallTicket from "@/pages/admin-hall-ticket"
import StaffQuestionPattern from "@/pages/staff-question-pattern"
import StaffQuestionBank from "@/pages/staff-question-bank"
import AdminQuestionGenerator from "@/pages/admin-question-generator"
import AdminPatternUpload from "@/pages/admin-pattern-upload"
import NotFound from "@/pages/not-found"

type UserRole = "student" | "staff" | "admin"

interface User {
  id: string
  name: string
  role: UserRole
  avatar?: string
  studentId?: string
  staffId?: string
}

function AuthenticatedApp({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  
  // TODO: remove mock functionality - replace with real notifications
  const mockNotifications = [
    { id: "1", title: "New exam results published for Mathematics", unread: true },
    { id: "2", title: "Fee payment reminder - Due in 3 days", unread: true },
    { id: "3", title: "Hostel room allocation updated", unread: false },
    { id: "4", title: "New admission application received", unread: false },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    console.log('Search query:', query)
    // TODO: remove mock functionality - implement real search
  }

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  }

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar currentUser={user} />
        <div className="flex flex-col flex-1">
          <TopNavbar 
            onSearch={handleSearch}
            onLogout={onLogout}
            notifications={mockNotifications}
          />
          <main className="flex-1 overflow-auto">
            <Switch>
              <Route path="/" component={() => <Dashboard userRole={user.role} currentUser={user} />} />
              <Route path="/dashboard" component={() => <Dashboard userRole={user.role} currentUser={user} />} />
              <Route path="/service-desk" component={() => <ServiceDesk userRole={user.role} currentUser={user} />} />
              <Route path="/fees" component={Fees} />
              <Route path="/hostel" component={() => <Hostel userRole={user.role} currentUser={user} />} />
              <Route path="/exams" component={() => <Exams userRole={user.role} />} />
              <Route path="/exam-results" component={() => <ExamResults />} />
              <Route path="/student-hall-ticket" component={() => <StudentHallTicket />} />
              <Route path="/timetable" component={() => <Timetable userRole={user.role} currentUser={user} />} />
              <Route path="/assignments" component={() => <Assignments userRole={user.role} currentUser={user} />} />
              <Route path="/staff-assignments" component={() => <StaffAssignments userRole={user.role} currentUser={user} />} />
              <Route path="/staff-students" component={() => <StaffStudents userRole={user.role} currentUser={user} />} />
              <Route path="/staff-salary" component={() => <StaffSalary currentUser={user} />} />
              <Route path="/staff-attendance" component={() => <StaffAttendance currentUser={user} />} />
              <Route path="/staff-question-pattern" component={() => <StaffQuestionPattern />} />
              <Route path="/staff-question-bank" component={() => <StaffQuestionBank />} />
              <Route path="/admin-students" component={() => <AdminStudents userRole={user.role} currentUser={user} />} />
              <Route path="/admin-staff" component={() => <AdminStaff userRole={user.role} currentUser={user} />} />
              <Route path="/admin-admissions" component={() => <AdminAdmissions />} />
              <Route path="/admin-service-desk" component={() => <AdminServiceDesk userRole={user.role} currentUser={user} />} />
              <Route path="/admin-logs" component={() => <AdminLogs userRole={user.role} currentUser={user} />} />
              <Route path="/admin-library" component={() => <AdminLibrary />} />
              <Route path="/admin-fees" component={() => <AdminFees />} />
              <Route path="/admin-salary" component={() => <AdminSalary />} />
              <Route path="/admin-examinations" component={() => <AdminExaminations />} />
              <Route path="/admin-hall-ticket" component={() => <AdminHallTicket />} />
              <Route path="/admin-question-generator" component={() => <AdminQuestionGenerator />} />
              <Route path="/admin-pattern-upload" component={() => <AdminPatternUpload />} />
              <Route path="/settings" component={() => <Dashboard userRole={user.role} currentUser={user} />} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (credentials: { username: string; password: string; role: UserRole }) => {
    // TODO: remove mock functionality - implement real authentication
    const mockUser: User = {
      id: credentials.role === "student" ? "STU2024001" : credentials.role === "staff" ? "STF001" : "ADM001",
      name: credentials.username === "admin" ? "Dr. Administrator" : 
            credentials.username === "staff" ? "Prof. Johnson" : 
            "John Doe",
      role: credentials.role,
      studentId: credentials.role === "student" ? "STU2024001" : undefined,
      staffId: credentials.role === "staff" ? "STF001" : undefined,
    }
    setUser(mockUser)
    console.log('User logged in:', mockUser)
  }

  const handleLogout = () => {
    setUser(null)
    console.log('User logged out')
    // TODO: remove mock functionality - implement real logout
  }

  if (!user) {
    return (
      <ThemeProvider defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <LoginForm onLogin={handleLogin} />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthenticatedApp user={user} onLogout={handleLogout} />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App