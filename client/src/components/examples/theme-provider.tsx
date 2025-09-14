import { ThemeProvider } from '../theme-provider'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme-provider'

function ThemeToggleExample() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Theme Toggle Example</h3>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setTheme("light")}
          className="gap-2"
        >
          <Sun className="h-4 w-4" />
          Light
        </Button>
        <Button
          variant="outline"
          onClick={() => setTheme("dark")}
          className="gap-2"
        >
          <Moon className="h-4 w-4" />
          Dark
        </Button>
        <Button
          variant="outline"
          onClick={() => setTheme("system")}
        >
          System
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Current theme: {theme}
      </p>
    </div>
  )
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ThemeToggleExample />
    </ThemeProvider>
  )
}