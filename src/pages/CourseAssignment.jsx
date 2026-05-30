import  { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Book, Clock, Award, Plus, Search, Filter } from 'lucide-react'

export default function CourseAssignment() {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCourses, setSelectedCourses] = useState([])

  const availableCourses = [
    { id: 1, title: 'Advanced React Patterns', category: 'programming', duration: '8h', difficulty: 'advanced', rating: 4.8 },
    { id: 2, title: 'Machine Learning Basics', category: 'data-science', duration: '12h', difficulty: 'intermediate', rating: 4.7 },
    { id: 3, title: 'Project Management', category: 'business', duration: '6h', difficulty: 'beginner', rating: 4.6 },
    { id: 4, title: 'Digital Marketing Strategy', category: 'marketing', duration: '10h', difficulty: 'intermediate', rating: 4.9 },
    { id: 5, title: 'Python for Automation', category: 'programming', duration: '15h', difficulty: 'intermediate', rating: 4.5 }
  ]

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]')
    const emp = employees.find(e => e.id === parseInt(employeeId))
    if (emp) {
      setEmployee({
        ...emp,
        assignedCourseIds: [1, 2] // existing assigned courses
      })
    }
  }, [employeeId])

  const handleCourseToggle = (courseId) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const handleAssignCourses = () => {
    if (selectedCourses.length === 0) {
      alert('Please select at least one course to assign')
      return
    }

    const employees = JSON.parse(localStorage.getItem('employees') || '[]')
    const updatedEmployees = employees.map(emp => {
      if (emp.id === parseInt(employeeId)) {
        return {
          ...emp,
          assignedCourses: emp.assignedCourses + selectedCourses.length,
          assignedCourseIds: [...(emp.assignedCourseIds || []), ...selectedCourses]
        }
      }
      return emp
    })
    
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    alert(`${selectedCourses.length} course(s) assigned successfully!`)
    navigate('/employee-management')
  }

  const filteredCourses = availableCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || course.category === selectedCategory) &&
    !employee?.assignedCourseIds?.includes(course.id)
  )

  if (!employee) return <div>Loading...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/employee-management')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ArrowLeft size={20} />
          Back to Team
        </button>
        <h1 className="text-3xl font-bold text-blue-900">Assign Courses</h1>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">{employee.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-600">{employee.designation} • {employee.department}</p>
          </div>
          <div className="ml-auto">
            <div className="text-sm text-gray-500">Currently Assigned</div>
            <div className="text-2xl font-bold text-blue-600">{employee.assignedCourses}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex gap-4 items-center mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border rounded-lg"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="programming">Programming</option>
            <option value="data-science">Data Science</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map(course => (
            <div key={course.id} className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedCourses.includes(course.id) ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
            }`} onClick={() => handleCourseToggle(course.id)}>
              <div className="flex items-start justify-between mb-3">
                <Book className="w-6 h-6 text-blue-600" />
                <input 
                  type="checkbox" 
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleCourseToggle(course.id)}
                  className="w-4 h-4"
                />
              </div>
              
              <h3 className="font-semibold mb-2">{course.title}</h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  course.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  course.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {course.difficulty}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedCourses.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">Selected: {selectedCourses.length} course(s)</div>
                <div className="text-sm text-gray-600">These courses will be assigned to {employee.name}</div>
              </div>
              <button 
                onClick={handleAssignCourses}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Assign Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
 