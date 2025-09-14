import { 
  GraduationCap, 
  Home, 
  Users, 
  DollarSign, 
  Building, 
  FileText, 
  Settings,
  BarChart3,
  UserCheck,
  CreditCard,
  BookOpen
} from "lucide-react"
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
    title: "Admissions",
    url: "/admissions",
    icon: UserCheck,
    roles: ["staff", "admin"]
  },
  {
    title: "My Application",
    url: "/my-application",
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
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    roles: ["admin"]
  },
  {
    title: "User Management",
    url: "/users",
    icon: Users,
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
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">ERP Portal</h2>
            <p className="text-xs text-muted-foreground">Student Management</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50">
          <Avatar className="w-8 h-8">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="text-xs">
              {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">
              {roleDisplayNames[currentUser.role]}
            </p>
            {currentUser.studentId && (
              <p className="text-xs text-muted-foreground font-mono">
                ID: {currentUser.studentId}
              </p>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}