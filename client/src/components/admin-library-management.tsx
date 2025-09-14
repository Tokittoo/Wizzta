import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  BookOpen, 
  User, 
  Calendar,
  Edit,
  Eye,
  Download,
  Plus,
  BookMarked,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  totalCopies: number
  availableCopies: number
  publishedYear: number
  status: "available" | "borrowed" | "maintenance"
}

interface BorrowedBook {
  id: string
  bookId: string
  bookTitle: string
  studentId: string
  studentName: string
  studentEmail: string
  borrowDate: string
  dueDate: string
  returnDate?: string
  status: "active" | "overdue" | "returned"
  fine?: number
}

interface AdminLibraryManagementProps {
  onDownloadReport: (type: string) => void
}

export function AdminLibraryManagement({ onDownloadReport }: AdminLibraryManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false)
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false)

  // Mock data for books
  const books: Book[] = [
    {
      id: "1",
      title: "Introduction to Computer Science",
      author: "John Smith",
      isbn: "978-0123456789",
      category: "Computer Science",
      totalCopies: 5,
      availableCopies: 3,
      publishedYear: 2023,
      status: "available"
    },
    {
      id: "2",
      title: "Advanced Mathematics",
      author: "Dr. Sarah Johnson",
      isbn: "978-0987654321",
      category: "Mathematics",
      totalCopies: 3,
      availableCopies: 1,
      publishedYear: 2022,
      status: "available"
    },
    {
      id: "3",
      title: "Data Structures and Algorithms",
      author: "Michael Brown",
      isbn: "978-1122334455",
      category: "Computer Science",
      totalCopies: 4,
      availableCopies: 0,
      publishedYear: 2023,
      status: "borrowed"
    },
    {
      id: "4",
      title: "Physics Fundamentals",
      author: "Dr. Emily Davis",
      isbn: "978-5566778899",
      category: "Physics",
      totalCopies: 6,
      availableCopies: 4,
      publishedYear: 2021,
      status: "available"
    },
    {
      id: "5",
      title: "English Literature",
      author: "Prof. Robert Wilson",
      isbn: "978-9988776655",
      category: "Literature",
      totalCopies: 2,
      availableCopies: 0,
      publishedYear: 2020,
      status: "maintenance"
    }
  ]

  // Mock data for borrowed books
  const borrowedBooks: BorrowedBook[] = [
    {
      id: "1",
      bookId: "3",
      bookTitle: "Data Structures and Algorithms",
      studentId: "STU001",
      studentName: "Alice Johnson",
      studentEmail: "alice.johnson@university.edu",
      borrowDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "active"
    },
    {
      id: "2",
      bookId: "5",
      bookTitle: "English Literature",
      studentId: "STU002",
      studentName: "Bob Smith",
      studentEmail: "bob.smith@university.edu",
      borrowDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "overdue",
      fine: 15.50
    },
    {
      id: "3",
      bookId: "2",
      bookTitle: "Advanced Mathematics",
      studentId: "STU003",
      studentName: "Carol Davis",
      studentEmail: "carol.davis@university.edu",
      borrowDate: "2024-01-20",
      dueDate: "2024-02-20",
      returnDate: "2024-02-18",
      status: "returned"
    }
  ]

  const categories = ["all", "Computer Science", "Mathematics", "Physics", "Literature", "Engineering", "Business"]

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm)
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800"
      case "borrowed": return "bg-yellow-100 text-yellow-800"
      case "maintenance": return "bg-red-100 text-red-800"
      case "active": return "bg-blue-100 text-blue-800"
      case "overdue": return "bg-red-100 text-red-800"
      case "returned": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <CheckCircle className="h-4 w-4" />
      case "borrowed": return <Clock className="h-4 w-4" />
      case "maintenance": return <XCircle className="h-4 w-4" />
      case "active": return <Clock className="h-4 w-4" />
      case "overdue": return <AlertCircle className="h-4 w-4" />
      case "returned": return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const totalBooks = books.length
  const totalBorrowed = borrowedBooks.filter(b => b.status === "active").length
  const overdueBooks = borrowedBooks.filter(b => b.status === "overdue").length
  const availableBooks = books.reduce((sum, book) => sum + book.availableCopies, 0)

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Library Management</h1>
          <p className="text-muted-foreground">
            Manage library books, track borrowings, and monitor student book usage
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onDownloadReport("library")}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isAddBookDialogOpen} onOpenChange={setIsAddBookDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Add a new book to the library collection
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Book Title</label>
                  <Input placeholder="Enter book title" />
                </div>
                <div>
                  <label className="text-sm font-medium">Author</label>
                  <Input placeholder="Enter author name" />
                </div>
                <div>
                  <label className="text-sm font-medium">ISBN</label>
                  <Input placeholder="Enter ISBN" />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Copies</label>
                  <Input type="number" placeholder="Enter number of copies" />
                </div>
                <Button className="w-full">Add Book</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Books</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{totalBooks}</p>
            <p className="text-sm text-gray-500">Books in collection</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{availableBooks}</p>
            <p className="text-sm text-gray-500">Books available</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Borrowed</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
                <BookMarked className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{totalBorrowed}</p>
            <p className="text-sm text-gray-500">Currently borrowed</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{overdueBooks}</p>
            <p className="text-sm text-gray-500">Overdue books</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="books" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="books">Book Collection</TabsTrigger>
            <TabsTrigger value="borrowings">Borrowing Records</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Book Collection</CardTitle>
                    <CardDescription className="text-gray-600">
                      Manage library books and track availability
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Details</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Copies</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{book.title}</p>
                            <p className="text-sm text-gray-600">by {book.author}</p>
                            <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="px-2 py-1 rounded-full">
                            {book.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{book.availableCopies}/{book.totalCopies}</p>
                            <p className="text-gray-500">available</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`px-2 py-1 rounded-full ${getStatusColor(book.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(book.status)}
                              {book.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="borrowings" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Borrowing Records</CardTitle>
                    <CardDescription className="text-gray-600">
                      Track book borrowings and returns
                    </CardDescription>
                  </div>
                  <Dialog open={isBorrowDialogOpen} onOpenChange={setIsBorrowDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Borrowing
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Record New Borrowing</DialogTitle>
                        <DialogDescription>
                          Record a new book borrowing transaction
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Student</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select student" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="STU001">Alice Johnson</SelectItem>
                              <SelectItem value="STU002">Bob Smith</SelectItem>
                              <SelectItem value="STU003">Carol Davis</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Book</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select book" />
                            </SelectTrigger>
                            <SelectContent>
                              {books.filter(book => book.availableCopies > 0).map(book => (
                                <SelectItem key={book.id} value={book.id}>{book.title}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Due Date</label>
                          <Input type="date" />
                        </div>
                        <Button className="w-full">Record Borrowing</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Book</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fine</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowedBooks.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{record.studentName}</p>
                            <p className="text-sm text-gray-600">{record.studentEmail}</p>
                            <p className="text-xs text-gray-500">ID: {record.studentId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-gray-900">{record.bookTitle}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{new Date(record.borrowDate).toLocaleDateString()}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-900">{new Date(record.dueDate).toLocaleDateString()}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={`px-2 py-1 rounded-full ${getStatusColor(record.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(record.status)}
                              {record.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {record.fine ? (
                            <p className="text-sm font-medium text-red-600">₹{record.fine}</p>
                          ) : (
                            <p className="text-sm text-gray-500">-</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {record.status === "active" && (
                              <Button variant="outline" size="sm">
                                Return
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
