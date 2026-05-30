import   { BookOpen, Clock, Award, Target, Bell, MessageCircle, Star } from 'lucide-react' 
import { Link } from 'react-router-dom'
import CalendarButton from '../components/CalendarButton' 

export  default function EmployeeDashboard({ user }) {
  const welxPoints = user ? parseInt(localStorage.getItem(`welx_points_${user.id}`) || '0') : 0

  const assignedCourses = [ 
    { id: 1, title: 'React.js Complete Course', instructor: 'John Doe', progress: 60, deadline: '2024-03-15', type: 'programming' },
    { id: 2, title: 'Data Science Fundamentals', instructor: 'Jane Smith', progress: 25, deadline: '2024-03-20', type: 'data-science' },
    { id: 3, title: 'Business Strategy & Management', instructor: 'Robert Johnson', progress: 100, deadline: '2024-03-10', type: 'business' }
  ]

  const notifications = [
    { type: 'deadline', message: 'React.js course deadline in 3 days', time: '2 hours ago' },
    { type: 'message', message: 'New announcement from HR Team', time: '1 day ago' },
    { type: 'achievement', message: 'You earned a certificate in Business Strategy!', time: '2 days ago' }
  ]

   const stats = [
    { icon: Star, label: 'WelX Points', value: welxPoints.toLocaleString(), color: 'text-yellow-600' },
    { icon: BookOpen, label: 'Assigned Courses', value: '3', color: 'text-blue-600' },
    { icon: Award, label: 'Certificates', value: '1', color: 'text-green-600' },
    { icon: Clock, label: 'Hours This Week', value: '12', color: 'text-purple-600' }
  ] 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Employee'}!</h1>
        <p className="text-gray-600">Continue your learning journey assigned by your organization</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Assigned Courses */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Assigned Courses</h3>
            <div className="space-y-4">
              {assignedCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                   <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{course.title}</h4>
                    <div className="flex items-center gap-2">
                      <CalendarButton 
                        event={{
                          title: `${course.title} Deadline`,
                          date: course.deadline,
                          description: `Complete ${course.title} course by this deadline. Instructor: ${course.instructor}`,
                          location: 'Wel.x Learning Platform'
                        }}
                      />
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        new Date(course.deadline) < new Date() ? 'bg-red-100 text-red-800' :
                        new Date(course.deadline) < new Date(Date.now() + 7*24*60*60*1000) ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        Due: {course.deadline}
                      </span>
                    </div>
                  </div> 
                  <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{course.progress}% Complete</span>
                    <div className="flex gap-2">
                      {course.progress === 100 ? (
                        <Link to={`/quiz/${course.id}`} className="btn-primary text-sm">
                          Take Quiz
                        </Link>
                      ) : (
                        <Link to={`/course/${course.id}`} className="btn-primary text-sm">
                          Continue
                        </Link>
                      )}
                      {course.type === 'programming' && (
                        <Link to="/playground" className="btn-secondary text-sm">
                          Playground
                        </Link>
                      )}
                      {course.type === 'business' && (
                        <Link to="/simulation" className="btn-secondary text-sm">
                          Simulation
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2" size={20} />
            Notifications
          </h3>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  {notification.type === 'deadline' && <Clock size={16} className="text-red-500 mt-1" />}
                  {notification.type === 'message' && <MessageCircle size={16} className="text-blue-500 mt-1" />}
                  {notification.type === 'achievement' && <Award size={16} className="text-green-500 mt-1" />}
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Courses */}
      <div className="card mt-8">
        <h3 className="text-xl font-semibold mb-4">Optional Courses (Organization Approved)</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Advanced JavaScript', category: 'Programming', duration: '8 hours' },
            { title: 'Leadership Skills', category: 'Soft Skills', duration: '6 hours' },
            { title: 'Project Management', category: 'Business', duration: '10 hours' }
          ].map((course, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2">{course.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{course.category}</p>
              <p className="text-sm text-gray-600 mb-3">{course.duration}</p>
              <button className="w-full btn-secondary text-sm">
                Request Access
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="card mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Learning Path</h3>
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {[
            { title: 'Foundation', status: 'completed', courses: 2 },
            { title: 'Intermediate', status: 'current', courses: 3 },
            { title: 'Advanced', status: 'locked', courses: 4 },
            { title: 'Expert', status: 'locked', courses: 2 }
          ].map((level, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                level.status === 'completed' ? 'bg-green-500 text-white' :
                level.status === 'current' ? 'bg-blue-500 text-white' :
                'bg-gray-300 text-gray-500'
              }`}>
                {index + 1}
              </div>
              <p className="font-medium text-sm">{level.title}</p>
              <p className="text-xs text-gray-600">{level.courses} courses</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
 