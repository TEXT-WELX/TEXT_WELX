import   { useState } from 'react' 
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react'
import { useCurrency } from '../contexts/CurrencyContext'  

export  default function CourseMarketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const { formatPrice } = useCurrency() 

  const categories = ['all', 'programming', 'data-science', 'design', 'business', 'marketing']
  const levels = ['all', 'beginner', 'intermediate', 'advanced']

   const courses = [
    {
      id: 1,
      title: 'React.js Complete Course',
      instructor: 'John Doe',
      category: 'programming',
      level: 'intermediate',
      rating: 4.8,
      students: 1234,
      duration: '40 hours',
      price: 99,
      type: 'tech',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Jane Smith',
      category: 'data-science',
      level: 'beginner',
      rating: 4.6,
      students: 890,
      duration: '30 hours',
      price: 79,
      type: 'tech',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
       },
    {
      id: 3,
      title: 'Business Strategy & Management',
      instructor: 'Robert Johnson',
      category: 'business',
      level: 'intermediate',
      rating: 4.7,
      students: 567,
      duration: '25 hours',
      price: 89,
      type: 'business',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Financial Analysis & Investment',
      instructor: 'Sarah Wilson',
      category: 'business',
      level: 'advanced',
      rating: 4.5,
      students: 423,
      duration: '35 hours',
      price: 129,
      type: 'finance',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop'
    }, 
    {
      id: 5,
      title: 'UI/UX Design Masterclass',
      instructor: 'Mike Johnson',
      category: 'design',
      level: 'advanced',
      rating: 4.9,
      students: 567,
      duration: '25 hours',
      price: 129,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Digital Marketing Strategy',
      instructor: 'Sarah Wilson',
      category: 'marketing',
      level: 'intermediate',
      rating: 4.7,
      students: 2341,
      duration: '35 hours',
      price: 89,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    }, 
       {
      id: 7,
      title: 'Python for Beginners',
      instructor: 'Alex Brown',
      category: 'programming',
      level: 'beginner',
      rating: 4.5,
      students: 3456,
      duration: '20 hours',
      price: 59,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Business Analytics',
      instructor: 'Lisa Davis',
      category: 'business',
      level: 'intermediate',
      rating: 4.4,
      students: 678,
      duration: '28 hours',
      price: 99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    } 
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Course Marketplace</h1>
        <p className="text-gray-600">Discover courses to advance your skills</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <div key={course.id} className="card hover:shadow-xl transition-shadow">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {course.level}
              </span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">{course.rating}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-3">by {course.instructor}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {course.students}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </div>
            </div>
            
                       <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-800">{formatPrice(course.price)}</span>
                           <Link to={`/course/${course.id}`} className="btn-primary">
                Enroll Now
              </Link> 
            </div> 
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
 