import  { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen, Clock, Target, Star, ChevronRight, Award, CheckCircle } from 'lucide-react'

export default function LearningRoadmap({ user }) {
  const navigate = useNavigate()
  const [roadmap, setRoadmap] = useState(null)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    if (!user?.onboardingData) {
      navigate('/onboarding')
      return
    }
    generateRoadmap()
  }, [user, navigate])

  const courseDatabase = {
    programming: [
      { id: 1, title: 'JavaScript Fundamentals', duration: '4 weeks', difficulty: 'Beginner', skills: ['Programming'] },
      { id: 2, title: 'React.js Complete Course', duration: '6 weeks', difficulty: 'Intermediate', skills: ['Web Development', 'Programming'] },
      { id: 3, title: 'Node.js Backend Development', duration: '5 weeks', difficulty: 'Intermediate', skills: ['Programming', 'Web Development'] },
      { id: 4, title: 'Full Stack Project', duration: '8 weeks', difficulty: 'Advanced', skills: ['Web Development', 'Programming'] }
    ],
    dataScience: [
      { id: 5, title: 'Python for Data Science', duration: '5 weeks', difficulty: 'Beginner', skills: ['Data Analysis', 'Programming'] },
      { id: 6, title: 'Statistics & Probability', duration: '4 weeks', difficulty: 'Beginner', skills: ['Data Analysis'] },
      { id: 7, title: 'Machine Learning Basics', duration: '6 weeks', difficulty: 'Intermediate', skills: ['Machine Learning', 'Data Analysis'] },
      { id: 8, title: 'Advanced ML & Deep Learning', duration: '8 weeks', difficulty: 'Advanced', skills: ['Machine Learning'] }
    ],
    business: [
      { id: 9, title: 'Business Fundamentals', duration: '3 weeks', difficulty: 'Beginner', skills: ['Business Analysis', 'Leadership'] },
      { id: 10, title: 'Project Management', duration: '4 weeks', difficulty: 'Intermediate', skills: ['Project Management', 'Leadership'] },
      { id: 11, title: 'Strategic Planning', duration: '5 weeks', difficulty: 'Advanced', skills: ['Business Analysis', 'Leadership'] }
    ],
    design: [
      { id: 12, title: 'Design Principles', duration: '3 weeks', difficulty: 'Beginner', skills: ['UI/UX Design'] },
      { id: 13, title: 'Figma Mastery', duration: '4 weeks', difficulty: 'Intermediate', skills: ['UI/UX Design'] },
      { id: 14, title: 'Advanced UX Research', duration: '6 weeks', difficulty: 'Advanced', skills: ['UI/UX Design'] }
    ],
    marketing: [
      { id: 15, title: 'Digital Marketing Basics', duration: '3 weeks', difficulty: 'Beginner', skills: ['Digital Marketing'] },
      { id: 16, title: 'Social Media Strategy', duration: '4 weeks', difficulty: 'Intermediate', skills: ['Digital Marketing'] },
      { id: 17, title: 'Advanced Analytics', duration: '5 weeks', difficulty: 'Advanced', skills: ['Digital Marketing', 'Data Analysis'] }
    ]
  }

  const generateRoadmap = () => {
    const { targetRole, skillsToImprove, currentLevel, completionTimeline } = user.onboardingData
    
    const roleMapping = {
      'software engineer': 'programming',
      'developer': 'programming',
      'data scientist': 'dataScience',
      'data analyst': 'dataScience',
      'product manager': 'business',
      'business analyst': 'business',
      'ui designer': 'design',
      'ux designer': 'design',
      'marketing manager': 'marketing'
    }

    const primaryTrack = Object.keys(roleMapping).find(role => 
      targetRole.toLowerCase().includes(role)
    ) ? roleMapping[Object.keys(roleMapping).find(role => 
      targetRole.toLowerCase().includes(role)
    )] : 'programming'

    const phases = []
    
    // Phase 1: Foundation
    const foundationCourses = courseDatabase[primaryTrack]?.filter(course => 
      course.difficulty === 'Beginner'
    ).slice(0, 2) || []
    
    if (foundationCourses.length > 0) {
      phases.push({
        title: 'Foundation Phase',
        description: 'Build your fundamental skills',
        courses: foundationCourses,
        duration: foundationCourses.reduce((sum, course) => sum + parseInt(course.duration), 0),
        completed: false
      })
    }

    // Phase 2: Skill Building
    const intermediateCourses = courseDatabase[primaryTrack]?.filter(course => 
      course.difficulty === 'Intermediate'
    ).slice(0, 2) || []
    
    if (intermediateCourses.length > 0) {
      phases.push({
        title: 'Skill Building Phase',
        description: 'Develop intermediate competencies',
        courses: intermediateCourses,
        duration: intermediateCourses.reduce((sum, course) => sum + parseInt(course.duration), 0),
        completed: false
      })
    }

    // Phase 3: Specialization
    const advancedCourses = courseDatabase[primaryTrack]?.filter(course => 
      course.difficulty === 'Advanced'
    ).slice(0, 1) || []
    
    if (advancedCourses.length > 0) {
      phases.push({
        title: 'Specialization Phase',
        description: 'Master advanced concepts',
        courses: advancedCourses,
        duration: advancedCourses.reduce((sum, course) => sum + parseInt(course.duration), 0),
        completed: false
      })
    }

    // Add supplementary skills
    skillsToImprove.forEach(skill => {
      if (skill !== skillsToImprove[0]) {
        Object.values(courseDatabase).flat().filter(course => 
          course.skills.includes(skill) && !phases.some(phase => 
            phase.courses.some(c => c.id === course.id)
          )
        ).slice(0, 1).forEach(course => {
          if (phases.length > 0) {
            phases[phases.length - 1].courses.push(course)
          }
        })
      }
    })

    setRoadmap({
      title: `Path to ${targetRole}`,
      timeline: completionTimeline,
      totalCourses: phases.reduce((sum, phase) => sum + phase.courses.length, 0),
      phases,
      estimatedHours: phases.reduce((sum, phase) => sum + phase.duration * 10, 0)
    })
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p>Generating your personalized roadmap...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.title}</h1>
          <p className="text-gray-600 mb-4">Your personalized learning journey based on your goals</p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {roadmap.timeline}
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {roadmap.totalCourses} courses
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              ~{roadmap.estimatedHours} hours
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Your Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-800 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentPhase / roadmap.phases.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Phase {currentPhase + 1} of {roadmap.phases.length} • 
            {currentPhase === 0 ? ' Ready to start!' : ` ${Math.round((currentPhase / roadmap.phases.length) * 100)}% complete`}
          </p>
        </div>

        <div className="space-y-6">
          {roadmap.phases.map((phase, index) => (
            <div 
              key={index}
              className={`card border-l-4 ${
                index === currentPhase 
                  ? 'border-blue-800 bg-blue-50' 
                  : index < currentPhase 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {index < currentPhase ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                    ) : index === currentPhase ? (
                      <div className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-sm font-bold mr-2">
                        {index + 1}
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold mr-2">
                        {index + 1}
                      </div>
                    )}
                    <h3 className="text-xl font-bold">{phase.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{phase.description}</p>
                  <div className="text-sm text-gray-500">
                    Duration: {phase.duration} weeks • {phase.courses.length} courses
                  </div>
                </div>
                {index < currentPhase && (
                  <Award className="w-8 h-8 text-green-600" />
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {phase.courses.map((course, courseIndex) => (
                  <div 
                    key={courseIndex}
                    className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{course.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        course.difficulty === 'Beginner' 
                          ? 'bg-green-100 text-green-800'
                          : course.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {course.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{course.duration}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {index === currentPhase && (
                      <Link 
                        to={`/course/${course.id}`}
                        className="btn-primary text-sm w-full flex items-center justify-center"
                      >
                        Start Course <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {index === currentPhase && (
                <div className="mt-4 pt-4 border-t">
                  <button 
                    onClick={() => setCurrentPhase(Math.min(currentPhase + 1, roadmap.phases.length - 1))}
                    className="btn-primary"
                  >
                    Mark Phase as Complete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 space-x-4">
          <Link to="/course-marketplace" className="btn-secondary">
            Browse All Courses
          </Link>
          <Link to="/student-dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
 