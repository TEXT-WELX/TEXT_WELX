import  { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { BookOpen, Clock, Award, Target, Bell, Star } from "lucide-react" 
import { Link } from "react-router-dom"

export default function StudentDashboard({ user }) {
  const welxPoints = user ? parseInt(localStorage.getItem(`welx_points_${user.id}`) || '0') : 0

  const progressData = [ 
    { month: 'Jan', completed: 4, target: 6 },
    { month: 'Feb', completed: 6, target: 6 },
    { month: 'Mar', completed: 8, target: 8 },
    { month: 'Apr', completed: 5, target: 8 },
    { month: 'May', completed: 9, target: 10 },
    { month: 'Jun', completed: 7, target: 8 }
  ]

  const currentCourses = [
    { id: 1, title: 'React.js Complete Course', progress: 75, nextLesson: 'State Management' },
    { id: 2, title: 'Data Science Fundamentals', progress: 45, nextLesson: 'Data Visualization' },
    { id: 3, title: 'UI/UX Design Principles', progress: 60, nextLesson: 'Color Theory' }
  ]

  const achievements = [
    { icon: Award, title: 'Fast Learner', description: 'Completed 3 courses this month' },
    { icon: Target, title: 'Goal Achiever', description: 'Met your monthly learning target' },
    { icon: Clock, title: 'Consistent', description: '15-day learning streak' }
  ]

  const notifications = [
    { type: 'deadline', message: 'React.js assignment due in 2 days', time: '2 hours ago' },
    { type: 'achievement', message: 'You earned a new badge!', time: '1 day ago' },
    { type: 'course', message: 'New course added to your recommendations', time: '2 days ago' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Learning Progress</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#3B82F6" name="Completed" />
                  <Bar dataKey="target" fill="#E5E7EB" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Courses</h2>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <span className="text-sm text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Next: {course.nextLesson}</span>
                    <Link to={`/course/${course.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
                      Continue →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-gray-600">WelX Points</span>
                </div>
                <span className="font-semibold text-yellow-600">{welxPoints.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Courses Completed</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Hours Learned</span>
                <span className="font-semibold text-blue-600">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Certificates Earned</span>
                <span className="font-semibold text-purple-600">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Streak</span>
                <span className="font-semibold text-orange-600">15 days</span>
              </div>
            </div> 
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <achievement.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{achievement.title}</p>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'deadline' ? 'bg-red-500' :
                    notification.type === 'achievement' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 