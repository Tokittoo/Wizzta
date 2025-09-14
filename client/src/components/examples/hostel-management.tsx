import { HostelManagement } from '../hostel-management'

export default function HostelManagementExample() {
  // TODO: remove mock functionality - replace with real room data
  const mockRooms = [
    {
      id: "1",
      number: "101",
      building: "Building A",
      floor: 1,
      capacity: 2,
      occupied: 2,
      status: "occupied" as const,
      residents: ["John Doe", "Jane Smith"],
      amenities: ["WiFi", "AC", "Study Table", "Wardrobe"]
    },
    {
      id: "2",
      number: "102", 
      building: "Building A",
      floor: 1,
      capacity: 3,
      occupied: 1,
      status: "available" as const,
      residents: ["Mike Johnson"],
      amenities: ["WiFi", "Fan", "Study Table", "Wardrobe"]
    },
    {
      id: "3",
      number: "201",
      building: "Building A", 
      floor: 2,
      capacity: 2,
      occupied: 0,
      status: "available" as const,
      residents: [],
      amenities: ["WiFi", "AC", "Study Table", "Wardrobe", "Balcony"]
    },
    {
      id: "4",
      number: "301",
      building: "Building B",
      floor: 3,
      capacity: 4,
      occupied: 4,
      status: "occupied" as const,
      residents: ["Alice Brown", "Bob Wilson", "Carol Davis", "David Lee"],
      amenities: ["WiFi", "AC", "Study Table", "Wardrobe", "Common Area"]
    },
    {
      id: "5",
      number: "302",
      building: "Building B",
      floor: 3,
      capacity: 2,
      occupied: 0,
      status: "available" as const,
      residents: [],
      amenities: ["WiFi", "Fan", "Study Table", "Wardrobe"]
    }
  ]

  const handleAllocateRoom = (roomId: string, studentId: string) => {
    console.log('Allocating room:', roomId, 'to student:', studentId)
    // TODO: remove mock functionality - implement real room allocation
  }

  const handleDeallocateRoom = (roomId: string, studentId: string) => {
    console.log('Deallocating room:', roomId, 'from student:', studentId)
    // TODO: remove mock functionality - implement real room deallocation
  }

  return (
    <div className="min-h-screen bg-background">
      <HostelManagement
        rooms={mockRooms}
        userRole="staff"
        currentUser={{ id: "user123" }}
        onAllocateRoom={handleAllocateRoom}
        onDeallocateRoom={handleDeallocateRoom}
      />
    </div>
  )
}