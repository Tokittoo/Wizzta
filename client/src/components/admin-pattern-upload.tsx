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
import { Upload, Plus, Edit, Trash2, Eye, FileText, Download, Settings, BookOpen, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"

interface QuestionPattern {
  id: string
  name: string
  subject: string
  examType: string
  totalMarks: number
  duration: number
  sections: PatternSection[]
  status: 'draft' | 'active' | 'archived'
  createdAt: string
  updatedAt: string
  createdBy: string
}

interface PatternSection {
  id: string
  name: string
  description: string
  marks: number
  questions: number
  questionType: 'mcq' | 'short' | 'long' | 'practical'
  difficulty: 'easy' | 'medium' | 'hard'
  instructions: string
  topics: string[]
}

const AdminPatternUpload: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPattern, setSelectedPattern] = useState<QuestionPattern | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Mock data for question patterns
  const questionPatterns: QuestionPattern[] = [
    {
      id: 'PAT001',
      name: 'Mathematics - Final Exam Pattern 2024',
      subject: 'Mathematics',
      examType: 'Final Examination',
      totalMarks: 100,
      duration: 180,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      createdBy: 'Dr. Smith',
      sections: [
        {
          id: 'SEC001',
          name: 'Section A - Multiple Choice Questions',
          description: 'Choose the correct answer from given options',
          marks: 20,
          questions: 10,
          questionType: 'mcq',
          difficulty: 'easy',
          instructions: 'Each question carries 2 marks. Choose the correct answer from the given options. No negative marking.',
          topics: ['Algebra', 'Calculus', 'Geometry']
        },
        {
          id: 'SEC002',
          name: 'Section B - Short Answer Questions',
          description: 'Answer in brief with proper explanation',
          marks: 30,
          questions: 6,
          questionType: 'short',
          difficulty: 'medium',
          instructions: 'Each question carries 5 marks. Answer in 2-3 sentences with proper explanation.',
          topics: ['Trigonometry', 'Statistics', 'Probability']
        },
        {
          id: 'SEC003',
          name: 'Section C - Long Answer Questions',
          description: 'Detailed solutions required',
          marks: 50,
          questions: 5,
          questionType: 'long',
          difficulty: 'hard',
          instructions: 'Each question carries 10 marks. Provide detailed solutions with all steps clearly shown.',
          topics: ['Calculus', 'Differential Equations', 'Linear Algebra']
        }
      ]
    },
    {
      id: 'PAT002',
      name: 'Physics - Midterm Pattern 2024',
      subject: 'Physics',
      examType: 'Midterm Examination',
      totalMarks: 80,
      duration: 120,
      status: 'active',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-22',
      createdBy: 'Dr. Johnson',
      sections: [
        {
          id: 'SEC004',
          name: 'Section A - Theory Questions',
          description: 'Theoretical concepts and principles',
          marks: 40,
          questions: 8,
          questionType: 'short',
          difficulty: 'medium',
          instructions: 'Answer any 8 questions. Each question carries 5 marks. Explain the concepts clearly.',
          topics: ['Mechanics', 'Thermodynamics', 'Waves']
        },
        {
          id: 'SEC005',
          name: 'Section B - Numerical Problems',
          description: 'Problem solving with calculations',
          marks: 40,
          questions: 4,
          questionType: 'long',
          difficulty: 'hard',
          instructions: 'Answer any 4 questions. Each question carries 10 marks. Show all calculations and formulas used.',
          topics: ['Electromagnetism', 'Optics', 'Modern Physics']
        }
      ]
    },
    {
      id: 'PAT003',
      name: 'Chemistry - Quiz Pattern',
      subject: 'Chemistry',
      examType: 'Quiz',
      totalMarks: 50,
      duration: 60,
      status: 'draft',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25',
      createdBy: 'Dr. Brown',
      sections: [
        {
          id: 'SEC006',
          name: 'Section A - Multiple Choice',
          description: 'Quick assessment questions',
          marks: 30,
          questions: 15,
          questionType: 'mcq',
          difficulty: 'easy',
          instructions: 'Each question carries 2 marks. Choose the correct answer.',
          topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry']
        },
        {
          id: 'SEC007',
          name: 'Section B - Short Answers',
          description: 'Brief explanations required',
          marks: 20,
          questions: 4,
          questionType: 'short',
          difficulty: 'medium',
          instructions: 'Each question carries 5 marks. Provide brief explanations.',
          topics: ['Chemical Reactions', 'Atomic Structure', 'Bonding']
        }
      ]
    }
  ]

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English']
  const examTypes = ['Final Examination', 'Midterm Examination', 'Quiz', 'Assignment', 'Practice Test']
  const questionTypes = ['mcq', 'short', 'long', 'practical']
  const difficulties = ['easy', 'medium', 'hard']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPatterns = questionPatterns.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pattern.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = !selectedSubject || selectedSubject === "all" || pattern.subject === selectedSubject
    const matchesStatus = !selectedStatus || selectedStatus === "all" || pattern.status === selectedStatus
    return matchesSearch && matchesSubject && matchesStatus
  })

  const handleCreatePattern = () => {
    setIsCreateDialogOpen(true)
  }

  const handleEditPattern = (pattern: QuestionPattern) => {
    setSelectedPattern(pattern)
    setIsEditDialogOpen(true)
  }

  const handleViewPattern = (pattern: QuestionPattern) => {
    setSelectedPattern(pattern)
  }

  const handleDeletePattern = (patternId: string) => {
    console.log('Deleting pattern:', patternId)
  }

  const handleActivatePattern = (patternId: string) => {
    console.log('Activating pattern:', patternId)
  }

  const handleArchivePattern = (patternId: string) => {
    console.log('Archiving pattern:', patternId)
  }

  const handleDownloadPattern = (patternId: string) => {
    console.log('Downloading pattern:', patternId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Paper Pattern Management</h1>
          <p className="text-gray-600">Upload and manage question paper patterns for examinations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Pattern
          </Button>
          <Button onClick={handleCreatePattern}>
            <Plus className="h-4 w-4 mr-2" />
            Create Pattern
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Patterns</p>
                <p className="text-2xl font-bold">{questionPatterns.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{questionPatterns.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Draft</p>
                <p className="text-2xl font-bold">{questionPatterns.filter(p => p.status === 'draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Subjects</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patterns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="upload">Import/Export</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search patterns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Question Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{pattern.name}</CardTitle>
                        <CardDescription>{pattern.subject} • {pattern.examType}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(pattern.status)}>
                        {pattern.status.charAt(0).toUpperCase() + pattern.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Pattern Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span>{pattern.totalMarks} marks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span>{pattern.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span>{pattern.sections.length} sections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span>{pattern.sections.reduce((sum, sec) => sum + sec.questions, 0)} questions</span>
                      </div>
                    </div>

                    {/* Sections Preview */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Sections:</h4>
                      <div className="space-y-2">
                        {pattern.sections.map((section) => (
                          <div key={section.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <p className="text-sm font-medium">{section.name}</p>
                              <p className="text-xs text-gray-600">{section.questions} questions • {section.marks} marks</p>
                            </div>
                            <div className="flex gap-1">
                              <Badge className={getTypeColor(section.questionType)}>
                                {section.questionType.toUpperCase()}
                              </Badge>
                              <Badge className={getDifficultyColor(section.difficulty)}>
                                {section.difficulty.charAt(0).toUpperCase() + section.difficulty.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewPattern(pattern)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditPattern(pattern)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadPattern(pattern.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Status Actions */}
                    <div className="flex gap-2">
                      {pattern.status === 'draft' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleActivatePattern(pattern.id)}
                          className="flex-1"
                        >
                          Activate
                        </Button>
                      )}
                      {pattern.status === 'active' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleArchivePattern(pattern.id)}
                          className="flex-1"
                        >
                          Archive
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeletePattern(pattern.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500">
                      Created by: {pattern.createdBy} • Updated: {pattern.updatedAt}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Import Pattern</CardTitle>
                <CardDescription>Upload question paper patterns from files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Pattern File</h3>
                  <p className="text-gray-600 mb-4">Drag and drop your file here, or click to browse</p>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Supported formats:</strong> Excel (.xlsx), CSV, JSON</p>
                  <p><strong>Maximum size:</strong> 10MB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Pattern</CardTitle>
                <CardDescription>Download patterns in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export as Excel
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export as JSON
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Template:</strong> Download template for bulk upload</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Templates</CardTitle>
              <CardDescription>Pre-configured templates for common exam patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pattern Templates</h3>
                <p className="text-gray-600 mb-4">Create and manage reusable pattern templates</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Pattern Dialog */}
      {selectedPattern && (
        <Dialog open={!!selectedPattern} onOpenChange={() => setSelectedPattern(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedPattern.name}</DialogTitle>
              <DialogDescription>
                Question paper pattern details and sections
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPattern.totalMarks}</p>
                  <p className="text-sm text-gray-600">Total Marks</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPattern.duration}</p>
                  <p className="text-sm text-gray-600">Duration (min)</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPattern.sections.length}</p>
                  <p className="text-sm text-gray-600">Sections</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPattern.sections.reduce((sum, sec) => sum + sec.questions, 0)}</p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Sections</h3>
                {selectedPattern.sections.map((section) => (
                  <Card key={section.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{section.name}</h4>
                        <div className="flex gap-2">
                          <Badge className={getTypeColor(section.questionType)}>
                            {section.questionType.toUpperCase()}
                          </Badge>
                          <Badge className={getDifficultyColor(section.difficulty)}>
                            {section.difficulty.charAt(0).toUpperCase() + section.difficulty.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                      <div className="flex items-center gap-4 text-sm mb-2">
                        <span>{section.questions} questions</span>
                        <span>{section.marks} marks</span>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          <strong>Topics:</strong> {section.topics.join(', ')}
                        </p>
                      </div>
                      <p className="text-sm p-2 bg-blue-50 rounded">
                        <strong>Instructions:</strong> {section.instructions}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default AdminPatternUpload
