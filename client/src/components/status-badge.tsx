import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, AlertCircle, Loader2 } from "lucide-react"

type StatusType = "pending" | "verified" | "enrolled" | "rejected" | "processing" | "paid" | "overdue" | "available" | "occupied"

interface StatusBadgeProps {
  status: StatusType
  showIcon?: boolean
  size?: "sm" | "default" | "lg"
}

export function StatusBadge({ status, showIcon = true, size = "default" }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      variant: "secondary" as const,
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    },
    processing: {
      label: "Processing",
      variant: "secondary" as const,
      icon: Loader2,
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20"
    },
    verified: {
      label: "Verified",
      variant: "default" as const,
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-600 border-green-500/20"
    },
    enrolled: {
      label: "Enrolled",
      variant: "default" as const,
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-600 border-green-500/20"
    },
    paid: {
      label: "Paid",
      variant: "default" as const,
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-600 border-green-500/20"
    },
    available: {
      label: "Available",
      variant: "default" as const,
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-600 border-green-500/20"
    },
    rejected: {
      label: "Rejected",
      variant: "destructive" as const,
      icon: XCircle,
      color: "bg-red-500/10 text-red-600 border-red-500/20"
    },
    overdue: {
      label: "Overdue",
      variant: "destructive" as const,
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-600 border-red-500/20"
    },
    occupied: {
      label: "Occupied",
      variant: "secondary" as const,
      icon: XCircle,
      color: "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge 
      variant={config.variant}
      className={`${config.color} ${size === 'sm' ? 'text-xs px-2 py-0.5' : size === 'lg' ? 'text-sm px-3 py-1' : ''} flex items-center gap-1`}
      data-testid={`status-${status}`}
    >
      {showIcon && (
        <Icon className={`${status === 'processing' ? 'animate-spin' : ''} ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />
      )}
      {config.label}
    </Badge>
  )
}