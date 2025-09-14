import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Plus, Edit, Trash2, Eye, FileText, Search, Filter, Download, BookOpen, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"

interface Question {
  id: string
  question: string
  subject: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  marks: number
  questionType: 'mcq' | 'short' | 'long' | 'practical'
  options?: string[]
  correctAnswer?: string
  explanation?: string
  createdAt: string
  status: 'draft' | 'approved' | 'rejected'
}

interface QuestionBank {
  id: string
  name: string
  subject: string
  totalQuestions: number
  topics: string[]
  createdAt: string
  updatedAt: string
  status: 'active' | 'archived'
}

const StaffQuestionBank: React.FC = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedType, setSelectedType] = useState('')

  // Mock data for questions
  const questions: Question[] = [
    {
      id: 'Q001',
      question: 'What is the derivative of x²?',
      subject: 'Mathematics',
      topic: 'Calculus',
      difficulty: 'easy',
      marks: 2,
      questionType: 'mcq',
      options: ['2x', 'x', '2', 'x²'],
      correctAnswer: '2x',
      explanation: 'The derivative of x² is 2x using the power rule.',
      createdAt: '2024-01-15',
      status: 'approved'
    },
    {
      id: 'Q002',
      question: 'Explain the concept of Newton\'s first law of motion.',
      subject: 'Physics',
      topic: 'Mechanics',
      difficulty: 'medium',
      marks: 5,
      questionType: 'short',
      explanation: 'Newton\'s first law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.',
      createdAt: '2024-01-16',
      status: 'approved'
    },
    {
      id: 'Q003',
      question: 'Solve the differential equation dy/dx = 2x + 3',
      subject: 'Mathematics',
      topic: 'Differential Equations',
      difficulty: 'hard',
      marks: 10,
      questionType: 'long',
      explanation: 'Integrate both sides: ∫dy = ∫(2x + 3)dx, which gives y = x² + 3x + C',
      createdAt: '2024-01-17',
      status: 'draft'
    }
  ]

  // Mock data for question banks
  const questionBanks: QuestionBank[] = [
    {
      id: 'QB001',
      name: 'Mathematics - Calculus Bank',
      subject: 'Mathematics',
      totalQuestions: 150,
      topics: ['Derivatives', 'Integrals', 'Limits', 'Differential Equations'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-20',
      status: 'active'
    },
    {
      id: 'QB002',
      name: 'Physics - Mechanics Bank',
      subject: 'Physics',
      totalQuestions: 200,
      topics: ['Newton\'s Laws', 'Kinematics', 'Dynamics', 'Work and Energy'],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18',
      status: 'active'
    }
  ]

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English']
  const topics = ['Calculus', 'Algebra', 'Mechanics', 'Thermodynamics', 'Organic Chemistry', 'Cell Biology']
  const difficulties = ['easy', 'medium', 'hard']
  const questionTypes = ['mcq', 'short', 'long', 'practical']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mcq': return 'bg-blue-100 text-blue-800'
      case 'short': return 'bg-green-100 text-green-800'
      case 'long': return 'bg-purple-100 text-purple-800'
      case 'practical': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = !selectedSubject || selectedSubject === "all" || question.subject === selectedSubject
    const matchesDifficulty = !selectedDifficulty || selectedDifficulty === "all" || question.difficulty === selectedDifficulty
    const matchesType = !selectedType || selectedType === "all" || question.questionType === selectedType
    return matchesSearch && matchesSubject && matchesDifficulty && matchesType
  })

  const handleUploadQuestions = () => {
    setIsUploadDialogOpen(true)
  }

  const handleCreateQuestion = () => {
    setIsCreateDialogOpen(true)
  }

  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question)
  }

  const handleEditQuestion = (question: Question) => {
    console.log('Editing question:', question.id)
  }

  const handleDeleteQuestion = (questionId: string) => {
    console.log('Deleting question:', questionId)
  }

  const handleBulkUpload = () => {
    console.log('Bulk uploading questions')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Bank Management</h1>
          <p className="text-gray-600">Upload and manage questions for examinations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUploadQuestions}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button onClick={handleCreateQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold">{questions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{questions.filter(q => q.status === 'approved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Draft</p>
                <p className="text-2xl font-bold">{questions.filter(q => q.status === 'draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Question Banks</p>
                <p className="text-2xl font-bold">{questionBanks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="banks">Question Banks</TabsTrigger>
          <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {questionTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Questions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>Manage your question bank</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{question.question}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{question.subject}</Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{question.topic}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(question.questionType)}>
                          {question.questionType.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{question.marks}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(question.status)}>
                          {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewQuestion(question)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditQuestion(question)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteQuestion(question.id)}>
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="banks" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {questionBanks.map((bank, index) => (
              <motion.div
                key={bank.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{bank.name}</CardTitle>
                        <CardDescription>{bank.subject}</CardDescription>
                      </div>
                      <Badge className={bank.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {bank.status.charAt(0).toUpperCase() + bank.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span>{bank.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span>{bank.topics.length} topics</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Topics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {bank.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500">
                      Updated: {bank.updatedAt}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload Questions</CardTitle>
              <CardDescription>Upload multiple questions from Excel or CSV files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Questions</h3>
                <p className="text-gray-600 mb-4">Drag and drop your file here, or click to browse</p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Template Download</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Download the template to see the required format</p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upload Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Use the provided template format</li>
                      <li>• Maximum 1000 questions per upload</li>
                      <li>• Supported formats: Excel (.xlsx), CSV</li>
                      <li>• All required fields must be filled</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Question Dialog */}
      {selectedQuestion && (
        <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Question Details</DialogTitle>
              <DialogDescription>
                View and manage question information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Question:</h4>
                <p className="text-sm bg-gray-50 p-3 rounded">{selectedQuestion.question}</p>
              </div>

              {selectedQuestion.options && (
                <div>
                  <h4 className="font-medium mb-2">Options:</h4>
                  <div className="space-y-2">
                    {selectedQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-sm">{option}</span>
                        {option === selectedQuestion.correctAnswer && (
                          <Badge className="bg-green-100 text-green-800">Correct</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedQuestion.explanation && (
                <div>
                  <h4 className="font-medium mb-2">Explanation:</h4>
                  <p className="text-sm bg-blue-50 p-3 rounded">{selectedQuestion.explanation}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Details:</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Subject:</strong> {selectedQuestion.subject}</p>
                    <p><strong>Topic:</strong> {selectedQuestion.topic}</p>
                    <p><strong>Type:</strong> {selectedQuestion.questionType.toUpperCase()}</p>
                    <p><strong>Difficulty:</strong> {selectedQuestion.difficulty}</p>
                    <p><strong>Marks:</strong> {selectedQuestion.marks}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Status:</h4>
                  <Badge className={getStatusColor(selectedQuestion.status)}>
                    {selectedQuestion.status.charAt(0).toUpperCase() + selectedQuestion.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default StaffQuestionBank
