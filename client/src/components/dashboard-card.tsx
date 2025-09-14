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
      <Card className={`relative overflow-hidden hover-elevate ${className}`}>
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        )}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <div className="flex items-center gap-2">
              {change && (
                <Badge 
                  variant="outline" 
                  className={`text-xs ${changeColors[changeType]}`}
                >
                  {change}
                </Badge>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}