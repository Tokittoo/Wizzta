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
import { Zap, Download, Eye, Settings, FileText, BookOpen, Clock, Users, Plus, Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface QuestionPaper {
  id: string
  name: string
  subject: string
  examType: string
  totalMarks: number
  duration: number
  totalQuestions: number
  sections: QuestionSection[]
  status: 'draft' | 'generated' | 'approved' | 'published'
  createdAt: string
  generatedBy: string
}

interface QuestionSection {
  id: string
  name: string
  marks: number
  questions: number
  questionType: 'mcq' | 'short' | 'long' | 'practical'
  difficulty: 'easy' | 'medium' | 'hard'
  topics: string[]
}

interface GenerationSettings {
  subject: string
  examType: string
  totalMarks: number
  duration: number
  sections: QuestionSection[]
  difficultyDistribution: {
    easy: number
    medium: number
    hard: number
  }
  topicDistribution: Record<string, number>
}

const AdminQuestionGenerator: React.FC = () => {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaper | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Mock data for generated question papers
  const questionPapers: QuestionPaper[] = [
    {
      id: 'QP001',
      name: 'Mathematics - Final Exam 2024',
      subject: 'Mathematics',
      examType: 'Final Examination',
      totalMarks: 100,
      duration: 180,
      totalQuestions: 25,
      status: 'generated',
      createdAt: '2024-01-20',
      generatedBy: 'Dr. Smith',
      sections: [
        {
          id: 'SEC001',
          name: 'Section A - Multiple Choice',
          marks: 20,
          questions: 10,
          questionType: 'mcq',
          difficulty: 'easy',
          topics: ['Algebra', 'Calculus']
        },
        {
          id: 'SEC002',
          name: 'Section B - Short Answer',
          marks: 30,
          questions: 6,
          questionType: 'short',
          difficulty: 'medium',
          topics: ['Trigonometry', 'Geometry']
        },
        {
          id: 'SEC003',
          name: 'Section C - Long Answer',
          marks: 50,
          questions: 5,
          questionType: 'long',
          difficulty: 'hard',
          topics: ['Calculus', 'Statistics']
        }
      ]
    },
    {
      id: 'QP002',
      name: 'Physics - Midterm 2024',
      subject: 'Physics',
      examType: 'Midterm Examination',
      totalMarks: 80,
      duration: 120,
      totalQuestions: 20,
      status: 'approved',
      createdAt: '2024-01-18',
      generatedBy: 'Dr. Johnson',
      sections: [
        {
          id: 'SEC004',
          name: 'Section A - Theory',
          marks: 40,
          questions: 8,
          questionType: 'short',
          difficulty: 'medium',
          topics: ['Mechanics', 'Thermodynamics']
        },
        {
          id: 'SEC005',
          name: 'Section B - Numerical',
          marks: 40,
          questions: 4,
          questionType: 'long',
          difficulty: 'hard',
          topics: ['Electromagnetism', 'Optics']
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
      case 'generated': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'published': return 'bg-purple-100 text-purple-800'
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

  const filteredPapers = questionPapers.filter(paper => {
    const matchesSearch = paper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = !selectedSubject || selectedSubject === "all" || paper.subject === selectedSubject
    const matchesStatus = !selectedStatus || selectedStatus === "all" || paper.status === selectedStatus
    return matchesSearch && matchesSubject && matchesStatus
  })

  const handleGeneratePaper = () => {
    setIsGenerateDialogOpen(true)
  }

  const handleViewPaper = (paper: QuestionPaper) => {
    setSelectedPaper(paper)
  }

  const handleApprovePaper = (paperId: string) => {
    console.log('Approving paper:', paperId)
  }

  const handlePublishPaper = (paperId: string) => {
    console.log('Publishing paper:', paperId)
  }

  const handleDownloadPaper = (paperId: string) => {
    console.log('Downloading paper:', paperId)
  }

  const handleEditPaper = (paperId: string) => {
    console.log('Editing paper:', paperId)
  }

  const handleDeletePaper = (paperId: string) => {
    console.log('Deleting paper:', paperId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Paper Generator</h1>
          <p className="text-gray-600">Automatically generate question papers from question banks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsSettingsDialogOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button onClick={handleGeneratePaper}>
            <Zap className="h-4 w-4 mr-2" />
            Generate Paper
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
                <p className="text-sm text-gray-600">Total Papers</p>
                <p className="text-2xl font-bold">{questionPapers.length}</p>
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
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{questionPapers.filter(p => p.status === 'approved').length}</p>
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
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold">{questionPapers.filter(p => p.status === 'published').length}</p>
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
                <p className="text-2xl font-bold">{questionPapers.filter(p => p.status === 'draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="papers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="papers">Generated Papers</TabsTrigger>
          <TabsTrigger value="generator">Auto Generator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="papers" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search papers..."
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
                    <SelectItem value="generated">Generated</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Question Papers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{paper.name}</CardTitle>
                        <CardDescription>{paper.subject} • {paper.examType}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(paper.status)}>
                        {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Paper Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span>{paper.totalMarks} marks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span>{paper.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span>{paper.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span>{paper.sections.length} sections</span>
                      </div>
                    </div>

                    {/* Sections Preview */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Sections:</h4>
                      <div className="space-y-2">
                        {paper.sections.map((section) => (
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
                        onClick={() => handleViewPaper(paper)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadPaper(paper.id)}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    {/* Status Actions */}
                    <div className="flex gap-2">
                      {paper.status === 'generated' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleApprovePaper(paper.id)}
                          className="flex-1"
                        >
                          Approve
                        </Button>
                      )}
                      {paper.status === 'approved' && (
                        <Button 
                          size="sm" 
                          onClick={() => handlePublishPaper(paper.id)}
                          className="flex-1"
                        >
                          Publish
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditPaper(paper.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeletePaper(paper.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500">
                      Generated by: {paper.generatedBy} • {paper.createdAt}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auto Question Paper Generator</CardTitle>
              <CardDescription>Configure settings and generate question papers automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
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
                  <div>
                    <label className="text-sm font-medium">Exam Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam type" />
                      </SelectTrigger>
                      <SelectContent>
                        {examTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Difficulty Distribution</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-16">Easy:</span>
                        <Input type="number" placeholder="30" className="flex-1" />
                        <span className="text-sm">%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-16">Medium:</span>
                        <Input type="number" placeholder="50" className="flex-1" />
                        <span className="text-sm">%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-16">Hard:</span>
                        <Input type="number" placeholder="20" className="flex-1" />
                        <span className="text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Section Configuration</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Section Name</label>
                      <Input placeholder="Section A" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Question Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {questionTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Marks</label>
                      <Input type="number" placeholder="20" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">
                  Save Template
                </Button>
                <Button>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Paper
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Question Paper Templates</CardTitle>
              <CardDescription>Manage and use pre-configured templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Templates</h3>
                <p className="text-gray-600 mb-4">Create and manage question paper templates for quick generation</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Paper Dialog */}
      {selectedPaper && (
        <Dialog open={!!selectedPaper} onOpenChange={() => setSelectedPaper(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedPaper.name}</DialogTitle>
              <DialogDescription>
                Question paper details and sections
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPaper.totalMarks}</p>
                  <p className="text-sm text-gray-600">Total Marks</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPaper.duration}</p>
                  <p className="text-sm text-gray-600">Duration (min)</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPaper.totalQuestions}</p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPaper.sections.length}</p>
                  <p className="text-sm text-gray-600">Sections</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Sections</h3>
                {selectedPaper.sections.map((section) => (
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
                      <div className="flex items-center gap-4 text-sm">
                        <span>{section.questions} questions</span>
                        <span>{section.marks} marks</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Topics: {section.topics.join(', ')}</p>
                      </div>
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

export default AdminQuestionGenerator
