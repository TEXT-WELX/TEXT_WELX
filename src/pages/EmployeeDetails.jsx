import  { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Award, Book, Calendar, Star, TrendingUp, Target, Clock } from 'lucide-react'

export default function EmployeeDetails() {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]')
    const emp = employees.find(e => e.id === parseInt(employeeId))
    if (emp) {
      setEmployee({
        ...emp,
        currentCourses: [
          { id: 1, title: 'React.js Complete Course', progress: 75, instructor: 'John Doe', timeSpent: '24h', status: 'in-progress' },
          { id: 2, title: 'Data Science Fundamentals', progress: 45, instructor: 'Jane Smith', timeSpent: '18h', status: 'in-progress' }
        ],
        completedCourses: [
          { id: 3, title: 'JavaScript Basics', completedDate: '2024-01-15', score: 95, certificate: true }
        ],
        skills: ['React', 'JavaScript', 'Node.js', 'Python'],
        efficiency: 87,
        totalHours: 156,
        avgScore: 89,
        streakDays: 12,
        badges: ['Fast Learner', 'Consistent Student', 'High Achiever']
      })
    }
  }, [employeeId])

  if (!employee) return <div>Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/employee-management')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ArrowLeft size={20} />
          Back to Team
        </button>
        <h1 className="text-3xl font-bold text-blue-900">{employee.name}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
              <p className="text-gray-600">{employee.designation}</p>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-2 inline-block">
                {employee.department}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Joined: March 2024</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{employee.totalHours}h total learning</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{employee.efficiency}%</div>
              <div className="text-sm text-blue-700">Efficiency</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{employee.avgScore}</div>
              <div className="text-sm text-green-700">Avg Score</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{employee.streakDays}</div>
              <div className="text-sm text-purple-700">Day Streak</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{employee.completedCourses.length}</div>
              <div className="text-sm text-orange-700">Completed</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {['overview', 'courses', 'performance', 'badges'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Learning Progress</h4>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-600">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '68%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Book className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">Completed Module 5 in React.js Course</span>
                        <span className="text-xs text-gray-500 ml-auto">2h ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Earned "Fast Learner" badge</span>
                        <span className="text-xs text-gray-500 ml-auto">1d ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Current Courses ({employee.currentCourses.length})</h4>
                    {employee.currentCourses.map(course => (
                      <div key={course.id} className="border rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-semibold">{course.title}</h5>
                            <p className="text-sm text-gray-600">by {course.instructor}</p>
                          </div>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                            {course.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: `${course.progress}%`}}></div>
                        </div>
                        <div className="text-xs text-gray-500">Time spent: {course.timeSpent}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Completed Courses ({employee.completedCourses.length})</h4>
                    {employee.completedCourses.map(course => (
                      <div key={course.id} className="border rounded-lg p-4 mb-4 bg-green-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-semibold">{course.title}</h5>
                            <p className="text-sm text-gray-600">Completed: {course.completedDate}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{course.score}%</div>
                            {course.certificate && <Award className="w-5 h-5 text-yellow-500" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        <h4 className="font-semibold">Learning Velocity</h4>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">8.5/10</div>
                      <p className="text-sm text-blue-700">Above average completion rate</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold">Goal Achievement</h4>
                      </div>
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <p className="text-sm text-green-700">Monthly targets met</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Course Completion Rate</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="font-medium">85%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Quiz Performance</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '89%'}}></div>
                          </div>
                          <span className="font-medium">89%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Engagement Level</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
                          </div>
                          <span className="font-medium">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'badges' && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Earned Badges ({employee.badges.length})</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {employee.badges.map((badge, idx) => (
                      <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <div className="font-semibold text-yellow-800">{badge}</div>
                        <div className="text-xs text-yellow-600 mt-1">Earned recently</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 