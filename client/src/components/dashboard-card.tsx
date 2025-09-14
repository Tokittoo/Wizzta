import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DashboardCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  description?: string
  gradient?: boolean
  className?: string
  onClick?: () => void
}

export function DashboardCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  gradient = false,
  className = "",
  onClick
}: DashboardCardProps) {
  const changeColors = {
    positive: "bg-green-500/10 text-green-500 border-green-500/20",
    negative: "bg-red-500/10 text-red-500 border-red-500/20",
    neutral: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Card className={`relative overflow-hidden bg-card border border-card-border shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl ${className}`}>
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50" />
        )}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
          <CardTitle className="text-sm font-medium text-card-foreground">
            {title}
          </CardTitle>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-card-foreground">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <div className="flex items-center gap-2">
              {change && (
                <Badge 
                  variant="outline" 
                  className={`text-xs px-3 py-1 rounded-full font-medium ${changeColors[changeType]}`}
                >
                  {change}
                </Badge>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}