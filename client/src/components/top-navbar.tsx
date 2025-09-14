import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Bell, LogOut } from "lucide-react"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface TopNavbarProps {
  onSearch: (query: string) => void
  onLogout: () => void
  notifications: { id: string; title: string; unread: boolean }[]
}

export function TopNavbar({ onSearch, onLogout, notifications }: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const unreadCount = notifications.filter(n => n.unread).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-14 items-center px-4 gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" className="hover:bg-muted rounded-lg" />
        
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.form 
              onSubmit={handleSearch}
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                data-testid="input-search"
              />
            </motion.form>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100" data-testid="button-notifications">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge variant="destructive" className="h-5 w-5 p-0 text-xs rounded-full flex items-center justify-center">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length === 0 ? (
                    <DropdownMenuItem disabled>
                      No notifications
                    </DropdownMenuItem>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <DropdownMenuItem key={notification.id} className="py-3">
                        <div className="flex items-start gap-2 w-full">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{notification.title}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                  {notifications.length > 5 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-center text-primary">
                        View all notifications
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="rounded-full hover:bg-gray-100"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}