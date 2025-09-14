import { StatusBadge } from '../status-badge'

export default function StatusBadgeExample() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <h2 className="text-2xl font-bold">Status Badges</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Admission Status</h3>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="pending" />
            <StatusBadge status="processing" />
            <StatusBadge status="verified" />
            <StatusBadge status="enrolled" />
            <StatusBadge status="rejected" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Status</h3>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="paid" />
            <StatusBadge status="pending" />
            <StatusBadge status="overdue" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Hostel Status</h3>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="available" />
            <StatusBadge status="occupied" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Different Sizes</h3>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status="verified" size="sm" />
            <StatusBadge status="verified" size="default" />
            <StatusBadge status="verified" size="lg" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Without Icons</h3>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="paid" showIcon={false} />
            <StatusBadge status="pending" showIcon={false} />
            <StatusBadge status="overdue" showIcon={false} />
          </div>
        </div>
      </div>
    </div>
  )
}