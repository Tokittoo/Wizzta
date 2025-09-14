import { StaffAttendanceUpload } from "@/components/staff-attendance-upload"

interface StaffAttendancePageProps {
  currentUser: {
    id: string
    name: string
    role: string
  }
}

export default function StaffAttendancePage({ currentUser }: StaffAttendancePageProps) {
  return <StaffAttendanceUpload currentUser={currentUser} />
}
