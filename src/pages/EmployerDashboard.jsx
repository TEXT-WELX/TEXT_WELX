import  { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, BookOpen, Award, TrendingUp, User, Download, X, Check, FileText } from "lucide-react"
import jsPDF from 'jspdf'

export default function EmployerDashboard({ user }) {
  const [showCourseAssignment, setShowCourseAssignment] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([]) 
  const employeeData = [
    { department: 'Engineering', enrolled: 45, completed: 32 },
    { department: 'Marketing', enrolled: 23, completed: 18 },
    { department: 'Sales', enrolled: 31, completed: 25 },
    { department: 'HR', enrolled: 12, completed: 10 },
    { department: 'Finance', enrolled: 18, completed: 14 }
  ]

  const skillData = [
    { skill: 'Programming', value: 35, color: '#3B82F6' },
    { skill: 'Data Analysis', value: 25, color: '#10B981' },
    { skill: 'Marketing', value: 20, color: '#F59E0B' },
    { skill: 'Management', value: 15, color: '#EF4444' },
    { skill: 'Design', value: 5, color: '#8B5CF6' }
  ]

   const recentActivity = [
    { name: 'John Smith', action: 'completed React.js Course', time: '2 hours ago' },
    { name: 'Sarah Johnson', action: 'started Data Science track', time: '4 hours ago' },
    { name: 'Mike Wilson', action: 'earned Leadership certificate', time: '1 day ago' },
    { name: 'Lisa Chen', action: 'completed UX Design module', time: '2 days ago' }
  ]

  const employees = [
    { id: 1, name: 'John Smith', email: 'john@company.com', department: 'Engineering', assignedCourses: 3, completedCourses: 2, progress: 67 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', department: 'Marketing', assignedCourses: 2, completedCourses: 2, progress: 100 },
    { id: 3, name: 'Mike Wilson', email: 'mike@company.com', department: 'Sales', assignedCourses: 4, completedCourses: 1, progress: 25 },
    { id: 4, name: 'Lisa Chen', email: 'lisa@company.com', department: 'Engineering', assignedCourses: 3, completedCourses: 3, progress: 100 }
  ]

  const courseBundles = {
    'Programming': [
      { id: 'prog1', title: 'React.js Complete Course', duration: '8h', level: 'Intermediate' },
      { id: 'prog2', title: 'Node.js Backend Development', duration: '10h', level: 'Advanced' },
      { id: 'prog3', title: 'JavaScript Fundamentals', duration: '6h', level: 'Beginner' },
      { id: 'prog4', title: 'TypeScript Mastery', duration: '7h', level: 'Intermediate' }
    ],
    'Data Science': [
      { id: 'ds1', title: 'Python for Data Analysis', duration: '12h', level: 'Beginner' },
      { id: 'ds2', title: 'Machine Learning Basics', duration: '15h', level: 'Intermediate' },
      { id: 'ds3', title: 'Data Visualization with Tableau', duration: '8h', level: 'Beginner' },
      { id: 'ds4', title: 'Advanced Statistics', duration: '10h', level: 'Advanced' }
    ],
    'Cybersecurity': [
      { id: 'cyber1', title: 'Network Security Fundamentals', duration: '9h', level: 'Beginner' },
      { id: 'cyber2', title: 'Ethical Hacking', duration: '14h', level: 'Advanced' },
      { id: 'cyber3', title: 'Security Risk Assessment', duration: '6h', level: 'Intermediate' },
      { id: 'cyber4', title: 'Incident Response', duration: '8h', level: 'Advanced' }
    ],
    'Business': [
      { id: 'biz1', title: 'Project Management', duration: '10h', level: 'Intermediate' },
      { id: 'biz2', title: 'Leadership Skills', duration: '8h', level: 'Beginner' },
      { id: 'biz3', title: 'Strategic Planning', duration: '12h', level: 'Advanced' },
      { id: 'biz4', title: 'Team Management', duration: '6h', level: 'Intermediate' }
    ]
  }

  const generateCSVReport = () => {
    const csvContent = [
      ['Employee Name', 'Email', 'Department', 'Assigned Courses', 'Completed Courses', 'Progress %', 'Status'].join(','),
      ...employees.map(emp => [
        emp.name,
        emp.email,
        emp.department,
        emp.assignedCourses,
        emp.completedCourses,
        emp.progress,
        emp.progress === 100 ? 'All Complete' : emp.progress > 0 ? 'In Progress' : 'Not Started'
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `employee-progress-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const generatePDFReport = () => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text('Employee Progress Report', 20, 20)
    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
    
    let y = 50
    employees.forEach((emp, index) => {
      if (y > 250) {
        doc.addPage()
        y = 20
      }
      doc.text(`${emp.name} (${emp.email})`, 20, y)
      doc.text(`Department: ${emp.department}`, 20, y + 10)
      doc.text(`Progress: ${emp.assignedCourses} assigned, ${emp.completedCourses} completed (${emp.progress}%)`, 20, y + 20)
      y += 40
    })
    
    doc.save(`employee-report-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const toggleEmployeeSelection = (empId) => {
    setSelectedEmployees(prev => 
      prev.includes(empId) 
        ? prev.filter(id => id !== empId)
        : [...prev, empId]
    )
  }

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const assignCoursesToEmployees = () => {
    if (selectedEmployees.length === 0 || selectedCourses.length === 0) {
      alert('Please select both employees and courses')
      return
    }
    
    const employeeNames = employees
      .filter(emp => selectedEmployees.includes(emp.id))
      .map(emp => emp.name)
    
    const courseCount = selectedCourses.length
    
    alert(`Successfully assigned ${courseCount} courses to ${employeeNames.join(', ')}`)
    setShowCourseAssignment(false)
    setSelectedEmployees([])
    setSelectedCourses([])
  } 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Employer Dashboard</h1>
          <p className="text-gray-600">Monitor your team's learning progress</p>
        </div>
               <div className="flex gap-3">
          <div className="relative group">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <FileText size={16} />
              Generate Report
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-10 hidden group-hover:block">
              <button onClick={generateCSVReport} className="block w-full text-left px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                Download CSV
              </button>
              <button onClick={generatePDFReport} className="block w-full text-left px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                Download PDF
              </button>
            </div>
          </div>
          <button 
            onClick={() => setShowCourseAssignment(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Assign Courses
          </button>
        </div> 
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Employees</p>
              <p className="text-2xl font-bold text-blue-600">129</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Learners</p>
              <p className="text-2xl font-bold text-green-600">98</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Certificates</p>
              <p className="text-2xl font-bold text-purple-600">245</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completion Rate</p>
              <p className="text-2xl font-bold text-orange-600">76%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Department Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#3B82F6" name="Enrolled" />
                <Bar dataKey="completed" fill="#10B981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Skills Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ skill, value }) => `${skill}: ${value}%`}
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  <span className="font-medium">{activity.name}</span> {activity.action}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
                   ))}
        </div>
      </div>

      {showCourseAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Assign Course Bundles</h2>
              <button onClick={() => setShowCourseAssignment(false)}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="flex h-full max-h-[80vh]">
              <div className="w-1/3 border-r p-6 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Select Employees</h3>
                <div className="space-y-2">
                  {employees.map(emp => (
                    <div key={emp.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(emp.id)}
                        onChange={() => toggleEmployeeSelection(emp.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{emp.name}</div>
                        <div className="text-sm text-gray-500">{emp.department}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Course Bundles</h3>
                <div className="space-y-6">
                  {Object.entries(courseBundles).map(([category, courses]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-3 text-blue-900">{category}</h4>
                      <div className="grid gap-3">
                        {courses.map(course => (
                          <div key={course.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={selectedCourses.includes(course.id)}
                              onChange={() => toggleCourseSelection(course.id)}
                              className="w-4 h-4 text-green-600"
                            />
                            <div className="flex-1">
                              <div className="font-medium">{course.title}</div>
                              <div className="text-sm text-gray-500">
                                {course.duration} • {course.level}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {selectedEmployees.length} employees selected • {selectedCourses.length} courses selected
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowCourseAssignment(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={assignCoursesToEmployees}
                    disabled={selectedEmployees.length === 0 || selectedCourses.length === 0}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
                  >
                    <Check size={16} />
                    Assign Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}