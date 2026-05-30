import  { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, Award, Trophy, Star, Map } from 'lucide-react'
import Leaderboard from './Leaderboard' 

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [userStats, setUserStats] = useState({ points: 0, badge: null })
  const navigate = useNavigate()

  const badges = [
    { name: 'Bronze Explorer', points: 100, icon: Award, color: 'text-amber-600' },
    { name: 'Silver Strategist', points: 500, icon: Award, color: 'text-gray-600' },
    { name: 'Gold Master', points: 1000, icon: Trophy, color: 'text-yellow-600' },
    { name: 'Platinum Legend', points: 2500, icon: Trophy, color: 'text-purple-600' },
    { name: 'Diamond Elite', points: 5000, icon: Star, color: 'text-blue-600' }
  ]

   useEffect(() => {
    if (user) {
      const points = parseInt(localStorage.getItem(`welx_points_${user.id}`) || '0')
      const currentBadge = [...badges].reverse().find(badge => points >= badge.points)
      setUserStats({ points, badge: currentBadge })
    }
  }, [user])

  useEffect(() => {
    const handleWelxPointsUpdate = () => {
      if (user) {
        const points = parseInt(localStorage.getItem(`welx_points_${user.id}`) || '0')
        const currentBadge = [...badges].reverse().find(badge => points >= badge.points)
        setUserStats({ points, badge: currentBadge })
      }
    }
    
    window.addEventListener('welxPointsUpdated', handleWelxPointsUpdate)
    return () => window.removeEventListener('welxPointsUpdated', handleWelxPointsUpdate)
  }, [user]) 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLeaderboard && !event.target.closest('.relative')) {
        setShowLeaderboard(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showLeaderboard])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full z-40 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-800">Wel.X</div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-blue-800 font-medium">Courses</Link>
            <Link to="/playground" className="text-gray-700 hover:text-blue-800 font-medium">SandBox</Link>
            <Link to="/simulation" className="text-gray-700 hover:text-blue-800 font-medium">Simulation</Link>
            {(user?.role === 'student' || user?.role === 'employee') && (
              <Link to="/learning-roadmap" className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 font-medium">
                <Map className="w-4 h-4" />
                <span>Career Path</span>
              </Link>
            )}
            <Link to="/contact" className="text-gray-700 hover:text-blue-800 font-medium">Contact</Link>
            
                       {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm hover:from-blue-600 hover:to-purple-700"
                  >
                    {userStats.badge && <userStats.badge.icon className="w-4 h-4" />}
                    <span>{userStats.points.toLocaleString()} WelX</span>
                  </button>
                  {showLeaderboard && (
                    <div className="absolute right-0 mt-2 w-80 z-50">
                      <Leaderboard user={user} />
                    </div>
                  )}
                </div> 
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-800">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      {user.role === 'employer' && (
                        <Link to="/employee-management" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Team Management</Link>
                      )}
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-800 font-medium">Login</Link>
                <Link to="/signup" className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900">Sign Up</Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/courses" className="block py-2 text-gray-700 hover:text-blue-800">Courses</Link>
            <Link to="/playground" className="block py-2 text-gray-700 hover:text-blue-800">Playground</Link>
            <Link to="/simulation" className="block py-2 text-gray-700 hover:text-blue-800">Simulation</Link>
            {(user?.role === 'student' || user?.role === 'employee') && (
              <Link to="/learning-roadmap" className="block py-2 text-gray-700 hover:text-blue-800">Career Path</Link>
            )}
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-800">Contact</Link>
                       {user ? (
              <>
                <div className="py-2 text-center">
                  <button
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {userStats.badge && <userStats.badge.icon className="w-4 h-4" />}
                    <span>{userStats.points.toLocaleString()} WelX</span>
                  </button>
                </div>
                <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-blue-800">Dashboard</Link>
                {user.role === 'employer' && (
                  <Link to="/employee-management" className="block py-2 text-gray-700 hover:text-blue-800">Team Management</Link>
                )}
                <button onClick={handleLogout} className="block py-2 text-gray-700 hover:text-blue-800">Logout</button>
              </>
            ) : ( 
              <div className="pt-4 space-y-2">
                <Link to="/login" className="block text-center bg-gray-100 text-gray-700 py-2 rounded-lg">Login</Link>
                <Link to="/signup" className="block text-center bg-blue-800 text-white py-2 rounded-lg">Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
 