import { AppSidebar } from '../app-sidebar'
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AppSidebarExample() {
  // TODO: remove mock functionality - replace with real user data
  const mockUser = {
    name: "John Doe",
    role: "student" as const,
    studentId: "STU2024001",
    avatar: undefined
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar currentUser={mockUser} />
        <div className="flex-1 p-6">
          <h2>Main Content Area</h2>
          <p className="text-muted-foreground">Sidebar navigation example for student role</p>
        </div>
      </div>
    </SidebarProvider>
  )
}