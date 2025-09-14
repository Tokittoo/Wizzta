import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, Users, Bed, MapPin, Filter } from "lucide-react"
import { StatusBadge } from "./status-badge"

interface Room {
  id: string
  number: string
  building: string
  floor: number
  capacity: number
  occupied: number
  status: "available" | "occupied"
  residents?: string[]
  amenities: string[]
}

interface HostelManagementProps {
  rooms: Room[]
  userRole: "student" | "staff" | "admin"
  currentUser?: {
    id: string
    roomAssignment?: string
  }
  onAllocateRoom?: (roomId: string, studentId: string) => void
  onDeallocateRoom?: (roomId: string, studentId: string) => void
}

export function HostelManagement({ 
  rooms, 
  userRole, 
  currentUser, 
  onAllocateRoom, 
  onDeallocateRoom 
}: HostelManagementProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<string>("all")
  const [selectedFloor, setSelectedFloor] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const buildings = Array.from(new Set(rooms.map(room => room.building)))
  const floors = Array.from(new Set(rooms.map(room => room.floor.toString())))
  
  const totalRooms = rooms.length
  const occupiedRooms = rooms.filter(room => room.status === "occupied").length
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0)
  const totalOccupied = rooms.reduce((sum, room) => sum + room.occupied, 0)
  const occupancyRate = Math.round((totalOccupied / totalCapacity) * 100)

  const filteredRooms = rooms.filter(room => {
    const matchesBuilding = selectedBuilding === "all" || room.building === selectedBuilding
    const matchesFloor = selectedFloor === "all" || room.floor.toString() === selectedFloor
    const matchesSearch = searchQuery === "" || 
      room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesBuilding && matchesFloor && matchesSearch
  })

  const handleAllocateRoom = (roomId: string) => {
    if (onAllocateRoom && currentUser) {
      onAllocateRoom(roomId, currentUser.id)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
            <p className="text-xs text-muted-foreground">
              {occupiedRooms} occupied
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity}</div>
            <p className="text-xs text-muted-foreground">
              {totalOccupied} students
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              Current utilization
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity - totalOccupied}</div>
            <p className="text-xs text-muted-foreground">
              Ready for allocation
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current User's Room Assignment (for students) */}
      {userRole === "student" && currentUser?.roomAssignment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="backdrop-blur-md bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-primary" />
                Your Room Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Room {currentUser.roomAssignment}</p>
                  <p className="text-sm text-muted-foreground">Building A, Floor 2</p>
                </div>
                <StatusBadge status="occupied" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-4 items-center p-4 bg-card/50 rounded-lg backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Label>Filters:</Label>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
            <SelectTrigger className="w-40" data-testid="select-building">
              <SelectValue placeholder="All Buildings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Buildings</SelectItem>
              {buildings.map(building => (
                <SelectItem key={building} value={building}>{building}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFloor} onValueChange={setSelectedFloor}>
            <SelectTrigger className="w-32" data-testid="select-floor">
              <SelectValue placeholder="All Floors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              {floors.map(floor => (
                <SelectItem key={floor} value={floor}>Floor {floor}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48"
            data-testid="input-search-rooms"
          />
        </div>
      </motion.div>

      {/* Room Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="backdrop-blur-md bg-card/80 hover-elevate cursor-pointer" data-testid={`room-card-${room.id}`}>
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Room {room.number}</CardTitle>
                  <StatusBadge status={room.status} size="sm" />
                </div>
                <CardDescription>
                  {room.building} • Floor {room.floor}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Occupancy:</span>
                  <span className="font-medium">
                    {room.occupied}/{room.capacity}
                  </span>
                </div>
                
                {room.residents && room.residents.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Residents:</p>
                    <div className="space-y-1">
                      {room.residents.map((resident, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {resident}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-1">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {userRole === "staff" && room.status === "available" && (
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleAllocateRoom(room.id)}
                    data-testid={`button-allocate-${room.id}`}
                  >
                    Allocate Room
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No rooms found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}