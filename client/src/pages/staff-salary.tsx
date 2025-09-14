import { StaffSalaryView } from "@/components/staff-salary-view"

interface StaffSalaryPageProps {
  currentUser: {
    id: string
    name: string
    role: string
  }
}

export default function StaffSalaryPage({ currentUser }: StaffSalaryPageProps) {
  return <StaffSalaryView currentUser={currentUser} />
}
