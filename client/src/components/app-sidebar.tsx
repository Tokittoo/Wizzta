import { 
  GraduationCap, 
  Home, 
  Users, 
  DollarSign, 
  Building, 
  FileText, 
  Settings,
  UserCheck,
  CreditCard,
  BookOpen,
  Calendar,
  Upload,
  Award,
  ClipboardList,
  Database,
  Zap,
  FileCheck
} from "lucide-react"
import { Logo } from "./logo"
import { Link, useLocation } from "wouter"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserRole = "student" | "staff" | "admin"

interface MenuItem {
  title: string
  url: string
  icon: any
  roles: UserRole[]
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    roles: ["student", "staff", "admin"]
  },
  {
    title: "Service Desk",
    url: "/service-desk",
    icon: FileText,
    roles: ["student"]
  },
  {
    title: "Fees",
    url: "/fees",
    icon: CreditCard,
    roles: ["student", "staff", "admin"]
  },
  {
    title: "Hostel",
    url: "/hostel",
    icon: Building,
    roles: ["student", "staff", "admin"]
  },
  {
    title: "Exams",
    url: "/exams",
    icon: BookOpen,
    roles: ["student", "staff", "admin"]
  },
  {
    title: "Exam Results",
    url: "/exam-results",
    icon: Award,
    roles: ["student"]
  },
  {
    title: "Hall Ticket",
    url: "/student-hall-ticket",
    icon: FileCheck,
    roles: ["student"]
  },
  {
    title: "Timetable",
    url: "/timetable",
    icon: Calendar,
    roles: ["student", "staff", "admin"]
  },
  {
    title: "Assignments",
    url: "/assignments",
    icon: Upload,
    roles: ["student"]
  },
  {
    title: "Assignment Management",
    url: "/staff-assignments",
    icon: Upload,
    roles: ["staff", "admin"]
  },
  {
    title: "Student Management",
    url: "/staff-students",
    icon: Users,
    roles: ["staff"]
  },
  {
    title: "My Salary",
    url: "/staff-salary",
    icon: DollarSign,
    roles: ["staff"]
  },
  {
    title: "Attendance Upload",
    url: "/staff-attendance",
    icon: Upload,
    roles: ["staff"]
  },
  {
    title: "Question Pattern",
    url: "/staff-question-pattern",
    icon: ClipboardList,
    roles: ["staff"]
  },
  {
    title: "Question Bank",
    url: "/staff-question-bank",
    icon: Database,
    roles: ["staff"]
  },
  {
    title: "Student Management",
    url: "/admin-students",
    icon: Users,
    roles: ["admin"]
  },
  {
    title: "Staff Management",
    url: "/admin-staff",
    icon: Users,
    roles: ["admin"]
  },
  {
    title: "Admissions Management",
    url: "/admin-admissions",
    icon: UserCheck,
    roles: ["admin"]
  },
  {
    title: "Service Desk",
    url: "/admin-service-desk",
    icon: FileText,
    roles: ["admin"]
  },
  {
    title: "System Logs",
    url: "/admin-logs",
    icon: FileText,
    roles: ["admin"]
  },
  {
    title: "Library Management",
    url: "/admin-library",
    icon: BookOpen,
    roles: ["admin"]
  },
  {
    title: "Fees Management",
    url: "/admin-fees",
    icon: CreditCard,
    roles: ["admin"]
  },
  {
    title: "Salary Management",
    url: "/admin-salary",
    icon: DollarSign,
    roles: ["admin"]
  },
  {
    title: "Examination Details",
    url: "/admin-examinations",
    icon: BookOpen,
    roles: ["admin"]
  },
  {
    title: "Hall Ticket Management",
    url: "/admin-hall-ticket",
    icon: FileCheck,
    roles: ["admin"]
  },
  {
    title: "Question Generator",
    url: "/admin-question-generator",
    icon: Zap,
    roles: ["admin"]
  },
  {
    title: "Pattern Upload",
    url: "/admin-pattern-upload",
    icon: ClipboardList,
    roles: ["admin"]
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    roles: ["student", "staff", "admin"]
  }
]

interface AppSidebarProps {
  currentUser: {
    name: string
    role: UserRole
    avatar?: string
    studentId?: string
    staffId?: string
  }
}

export function AppSidebar({ currentUser }: AppSidebarProps) {
  const [location] = useLocation()

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(currentUser.role)
  )

  const roleDisplayNames = {
    student: "Student",
    staff: "Staff Member", 
    admin: "Administrator"
  }

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Logo size="md" showText={false} />
          <div>
            <h2 className="font-bold text-lg text-gray-900">Wizzta</h2>
            <p className="text-sm text-gray-600">Student Management System</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    className={`h-10 px-3 rounded-lg transition-all duration-200 ${
                      location === item.url 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
          <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="text-sm font-semibold bg-blue-100 text-blue-600">
              {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{currentUser.name}</p>
            <p className="text-sm text-gray-600">
              {roleDisplayNames[currentUser.role]}
            </p>
            {currentUser.studentId && (
              <p className="text-xs text-gray-500 font-mono">
                ID: {currentUser.studentId}
              </p>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}