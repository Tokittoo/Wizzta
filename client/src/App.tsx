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
              <Route path="/admissions" component={Admissions} />
              <Route path="/my-application" component={Admissions} />
              <Route path="/fees" component={Fees} />
              <Route path="/hostel" component={() => <Hostel userRole={user.role} currentUser={user} />} />
              <Route path="/exams" component={() => <Exams userRole={user.role} />} />
              <Route path="/analytics" component={() => <Dashboard userRole={user.role} currentUser={user} />} />
              <Route path="/users" component={() => <Dashboard userRole={user.role} currentUser={user} />} />
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
      <ThemeProvider defaultTheme="dark">
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
    <ThemeProvider defaultTheme="dark">
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