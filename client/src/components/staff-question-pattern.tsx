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
import { Plus, Edit, Trash2, Eye, FileText, Clock, Users, BookOpen, Save } from "lucide-react"
import { motion } from "framer-motion"

interface QuestionPattern {
  id: string
  name: string
  subject: string
  totalMarks: number
  duration: number // in minutes
  sections: QuestionSection[]
  status: 'draft' | 'active' | 'archived'
  createdAt: string
  updatedAt: string
}

interface QuestionSection {
  id: string
  name: string
  description: string
  marks: number
  questions: number
  questionType: 'mcq' | 'short' | 'long' | 'practical'
  instructions: string
}

const StaffQuestionPattern: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPattern, setSelectedPattern] = useState<QuestionPattern | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  // Mock data for question patterns
  const questionPatterns: QuestionPattern[] = [
    {
      id: 'QP001',
      name: 'Mathematics - Final Exam Pattern',
      subject: 'Mathematics',
      totalMarks: 100,
      duration: 180,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      sections: [
        {
          id: 'SEC001',
          name: 'Section A - Multiple Choice',
          description: 'Choose the correct answer',
          marks: 20,
          questions: 10,
          questionType: 'mcq',
          instructions: 'Each question carries 2 marks. Choose the correct answer from the given options.'
        },
        {
          id: 'SEC002',
          name: 'Section B - Short Answer',
          description: 'Answer in brief',
          marks: 30,
          questions: 6,
          questionType: 'short',
          instructions: 'Each question carries 5 marks. Answer in 2-3 sentences.'
        },
        {
          id: 'SEC003',
          name: 'Section C - Long Answer',
          description: 'Detailed answers required',
          marks: 50,
          questions: 5,
          questionType: 'long',
          instructions: 'Each question carries 10 marks. Provide detailed solutions with steps.'
        }
      ]
    },
    {
      id: 'QP002',
      name: 'Physics - Midterm Pattern',
      subject: 'Physics',
      totalMarks: 80,
      duration: 120,
      status: 'draft',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-05',
      sections: [
        {
          id: 'SEC004',
          name: 'Section A - Theory',
          description: 'Theoretical questions',
          marks: 40,
          questions: 8,
          questionType: 'short',
          instructions: 'Answer any 8 questions. Each question carries 5 marks.'
        },
        {
          id: 'SEC005',
          name: 'Section B - Numerical',
          description: 'Problem solving',
          marks: 40,
          questions: 4,
          questionType: 'long',
          instructions: 'Answer any 4 questions. Each question carries 10 marks. Show all calculations.'
        }
      ]
    }
  ]

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'mcq': return 'bg-blue-100 text-blue-800'
      case 'short': return 'bg-green-100 text-green-800'
      case 'long': return 'bg-purple-100 text-purple-800'
      case 'practical': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPatterns = questionPatterns.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pattern.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = !selectedSubject || selectedSubject === "all" || pattern.subject === selectedSubject
    return matchesSearch && matchesSubject
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
    // In real implementation, this would delete the pattern
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Paper Pattern</h1>
          <p className="text-gray-600">Create and manage question paper patterns for examinations</p>
        </div>
        <Button onClick={handleCreatePattern}>
          <Plus className="h-4 w-4 mr-2" />
          Create Pattern
        </Button>
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
                    <CardDescription>{pattern.subject}</CardDescription>
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
                        <Badge className={getQuestionTypeColor(section.questionType)}>
                          {section.questionType.toUpperCase()}
                        </Badge>
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
                    onClick={() => handleDeletePattern(pattern.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  Updated: {pattern.updatedAt}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPatterns.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Question Patterns Found</h3>
            <p className="text-gray-600">Create your first question paper pattern to get started.</p>
          </CardContent>
        </Card>
      )}

      {/* Create Pattern Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Question Paper Pattern</DialogTitle>
            <DialogDescription>
              Create a new question paper pattern for examinations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Pattern Name</label>
                <Input placeholder="Enter pattern name" />
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Total Marks</label>
                <Input type="number" placeholder="100" />
              </div>
              <div>
                <label className="text-sm font-medium">Duration (minutes)</label>
                <Input type="number" placeholder="180" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Create Pattern
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
              <div className="grid grid-cols-3 gap-4">
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
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Sections</h3>
                {selectedPattern.sections.map((section) => (
                  <Card key={section.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{section.name}</h4>
                        <Badge className={getQuestionTypeColor(section.questionType)}>
                          {section.questionType.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>{section.questions} questions</span>
                        <span>{section.marks} marks</span>
                      </div>
                      <p className="text-sm mt-2 p-2 bg-blue-50 rounded">
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

export default StaffQuestionPattern
