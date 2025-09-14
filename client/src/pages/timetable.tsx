import { Timetable } from "@/components/timetable"

interface TimetableProps {
  userRole: "student" | "staff" | "admin"
  currentUser?: any
}

export default function TimetablePage({ userRole, currentUser }: TimetableProps) {
  // TODO: remove mock functionality - replace with real timetable data
  const mockTimetableEntries = [
    {
      id: "1",
      subject: "Data Structures",
      course: "CS 201",
      instructor: "Dr. Smith",
      time: "09:00 AM",
      duration: "1.5 hours",
      venue: "Room 101",
      type: "lecture" as const,
      day: "monday" as const
    },
    {
      id: "2",
      subject: "Data Structures Lab",
      course: "CS 201L",
      instructor: "Dr. Smith",
      time: "02:00 PM",
      duration: "2 hours",
      venue: "Lab 1",
      type: "lab" as const,
      day: "monday" as const
    },
    {
      id: "3",
      subject: "Mathematics",
      course: "MATH 201",
      instructor: "Prof. Johnson",
      time: "10:00 AM",
      duration: "1.5 hours",
      venue: "Room 205",
      type: "lecture" as const,
      day: "tuesday" as const
    },
    {
      id: "4",
      subject: "Computer Networks",
      course: "CS 301",
      instructor: "Dr. Brown",
      time: "11:00 AM",
      duration: "1.5 hours",
      venue: "Room 102",
      type: "lecture" as const,
      day: "wednesday" as const
    },
    {
      id: "5",
      subject: "Computer Networks Lab",
      course: "CS 301L",
      instructor: "Dr. Brown",
      time: "03:00 PM",
      duration: "2 hours",
      venue: "Lab 2",
      type: "lab" as const,
      day: "wednesday" as const
    },
    {
      id: "6",
      subject: "Database Systems",
      course: "CS 401",
      instructor: "Dr. Wilson",
      time: "09:00 AM",
      duration: "1.5 hours",
      venue: "Room 103",
      type: "lecture" as const,
      day: "thursday" as const
    },
    {
      id: "7",
      subject: "Database Systems Tutorial",
      course: "CS 401T",
      instructor: "Dr. Wilson",
      time: "02:00 PM",
      duration: "1 hour",
      venue: "Room 103",
      type: "tutorial" as const,
      day: "thursday" as const
    },
    {
      id: "8",
      subject: "Software Engineering",
      course: "CS 501",
      instructor: "Dr. Davis",
      time: "10:00 AM",
      duration: "1.5 hours",
      venue: "Room 104",
      type: "lecture" as const,
      day: "friday" as const
    },
    {
      id: "9",
      subject: "Software Engineering Seminar",
      course: "CS 501S",
      instructor: "Dr. Davis",
      time: "03:00 PM",
      duration: "1 hour",
      venue: "Room 104",
      type: "seminar" as const,
      day: "friday" as const
    }
  ]

  return (
    <Timetable 
      entries={mockTimetableEntries}
      currentUser={currentUser}
    />
  )
}
