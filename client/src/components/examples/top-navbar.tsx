import { TopNavbar } from '../top-navbar'
import { ThemeProvider } from '../theme-provider'

export default function TopNavbarExample() {
  // TODO: remove mock functionality - replace with real notifications data
  const mockNotifications = [
    { id: "1", title: "New exam results published for Mathematics", unread: true },
    { id: "2", title: "Fee payment reminder - Due in 3 days", unread: true },
    { id: "3", title: "Hostel room allocation updated", unread: false },
    { id: "4", title: "New admission application received", unread: false },
  ]

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // TODO: remove mock functionality - implement real search
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    // TODO: remove mock functionality - implement real logout
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background">
        <TopNavbar 
          onSearch={handleSearch}
          onLogout={handleLogout}
          notifications={mockNotifications}
        />
        <div className="p-6">
          <h2 className="text-lg font-semibold">Main Content Area</h2>
          <p className="text-muted-foreground">Top navbar with search, notifications, and theme toggle</p>
        </div>
      </div>
    </ThemeProvider>
  )
}