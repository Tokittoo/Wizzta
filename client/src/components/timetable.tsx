import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, BookOpen, Users } from "lucide-react"

interface TimetableEntry {
  id: string
  subject: string
  course: string
  instructor: string
  time: string
  duration: string
  venue: string
  type: "lecture" | "lab" | "tutorial" | "seminar"
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
}

interface TimetableProps {
  entries: TimetableEntry[]
  currentUser?: any
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
]

// Helper function to convert time to 24-hour format for comparison
const convertTo24Hour = (timeStr: string) => {
  const [time, period] = timeStr.split(' ')
  const [hours, minutes] = time.split(':')
  let hour24 = parseInt(hours)
  
  if (period === 'PM' && hour24 !== 12) {
    hour24 += 12
  } else if (period === 'AM' && hour24 === 12) {
    hour24 = 0
  }
  
  return `${hour24.toString().padStart(2, '0')}:${minutes}`
}

export function Timetable({ entries, currentUser }: TimetableProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "lab": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "tutorial": return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "seminar": return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lecture": return BookOpen
      case "lab": return Users
      case "tutorial": return Users
      case "seminar": return BookOpen
      default: return BookOpen
    }
  }

  const getCurrentDay = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    return today as typeof days[number]
  }

  const todayEntries = entries.filter(entry => entry.day === getCurrentDay())

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Semester Timetable</h1>
              <p className="text-gray-600">
                Your course schedule for the current semester
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg">
                <Calendar className="w-4 h-4 mr-2" />
                Export Calendar
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg">
                Print Schedule
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Today's Schedule */}
        {todayEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Today's Schedule
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid gap-3">
                  {todayEntries.map((entry, index) => {
                    const Icon = getTypeIcon(entry.type)
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{entry.subject}</h4>
                            <p className="text-sm text-gray-600">{entry.course}</p>
                            <p className="text-sm text-gray-500">Prof. {entry.instructor}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-gray-900">{entry.time}</span>
                            <span className="text-sm text-gray-500">({entry.duration})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{entry.venue}</span>
                          </div>
                          <Badge className={`text-xs px-2 py-1 rounded-full ${getTypeColor(entry.type)}`}>
                            {entry.type}
                          </Badge>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{entries.length}</p>
                    <p className="text-sm text-gray-600">Total Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{Array.from(new Set(entries.map(e => e.subject))).length}</p>
                    <p className="text-sm text-gray-600">Subjects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{entries.length * 1.5}h</p>
                    <p className="text-sm text-gray-600">Weekly Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{todayEntries.length}</p>
                    <p className="text-sm text-gray-600">Today's Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Class Types Legend</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500/10 border border-blue-500/20 rounded"></div>
                  <span className="text-sm text-gray-600">Lecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500/10 border border-green-500/20 rounded"></div>
                  <span className="text-sm text-gray-600">Lab</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500/10 border border-purple-500/20 rounded"></div>
                  <span className="text-sm text-gray-600">Tutorial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500/10 border border-orange-500/20 rounded"></div>
                  <span className="text-sm text-gray-600">Seminar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Timetable Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Weekly Schedule</CardTitle>
              <CardDescription className="text-sm text-gray-600">Complete timetable for all days</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                  {/* Header */}
                  <div className="grid grid-cols-8 gap-1 mb-3">
                    <div className="p-3 font-semibold text-center text-gray-700 bg-gray-50 rounded-lg">Time</div>
                    {days.map(day => (
                      <div key={day} className="p-3 font-semibold text-center text-gray-700 bg-gray-50 rounded-lg capitalize">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Time slots */}
                  {timeSlots.map(time => (
                    <div key={time} className="grid grid-cols-8 gap-1 mb-1">
                      <div className="p-3 text-sm text-gray-600 text-center bg-gray-50 rounded-lg border-r-2 border-gray-200">
                        {time}
                      </div>
                      {days.map(day => {
                        const entry = entries.find(e => {
                          if (e.day !== day) return false
                          const entryTime24 = convertTo24Hour(e.time)
                          return entryTime24.startsWith(time)
                        })
                        if (!entry) {
                          return <div key={day} className="p-3 min-h-[80px] border border-gray-200 rounded-lg bg-gray-50/30"></div>
                        }
                        
                        const Icon = getTypeIcon(entry.type)
                        return (
                          <motion.div
                            key={day}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 min-h-[80px] border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all duration-200 cursor-pointer group"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center">
                                  <Icon className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-gray-900 truncate">{entry.subject}</span>
                              </div>
                              <p className="text-xs text-gray-600 truncate">{entry.venue}</p>
                              <p className="text-xs text-gray-500 truncate">Prof. {entry.instructor}</p>
                              <Badge className={`text-xs px-2 py-1 rounded-full ${getTypeColor(entry.type)}`}>
                                {entry.type}
                              </Badge>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Course Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Course Summary</CardTitle>
              <CardDescription className="text-sm text-gray-600">Overview of your enrolled courses</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from(new Set(entries.map(e => e.subject))).map(subject => {
                  const subjectEntries = entries.filter(e => e.subject === subject)
                  const totalHours = subjectEntries.length * 1.5 // Assuming 1.5 hours per session
                  const types = Array.from(new Set(subjectEntries.map(e => e.type)))
                  
                  return (
                    <motion.div
                      key={subject}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 bg-white"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900">{subject}</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Prof. {subjectEntries[0].instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{totalHours} hours/week</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {types.map(type => (
                            <Badge key={type} className={`text-xs px-2 py-1 rounded-full ${getTypeColor(type)}`}>
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
