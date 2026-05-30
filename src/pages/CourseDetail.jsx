import    { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import  { Play, CheckCircle, Clock, Users, Star, Book, Award, Lock, PlayCircle, Download, Code, Database, FileText, Globe, MessageCircle, Smartphone } from 'lucide-react' 
import CalendarButton from '../components/CalendarButton'
import { useCurrency } from '../contexts/CurrencyContext'  

export  default function CourseDetail({ user }) {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [enrolled, setEnrolled] = useState(false)
  const { formatPrice } = useCurrency() 
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState([])
  const [completedModules, setCompletedModules] = useState([])
  const [currentVideo, setCurrentVideo] = useState(null)
  const [showVideo, setShowVideo] = useState(false)

   const courses = {
    1: {
      id: 1,
      title: 'React.js Complete Course',
      instructor: 'John Doe',
      rating: 4.8,
      students: 1234,
      duration: '40 hours',
      price: 99,
      category: 'tech',
      description: 'Master React.js from basics to advanced concepts with hands-on projects.',
      detailedDescription: `Build modern, interactive web applications with React.js - the most popular JavaScript library used by companies like Facebook, Netflix, and Airbnb. This comprehensive course takes you from complete beginner to advanced React developer.

What You'll Learn:
• Master React fundamentals including components, JSX, and props
• Advanced state management with React Hooks and Context API
• Build real-world projects including a social media app and e-commerce platform
• Learn React Router for single-page applications
• Testing React applications with Jest and React Testing Library
• Deploy your React apps to production

Prerequisites:
• Basic HTML, CSS, and JavaScript knowledge
• Familiarity with ES6+ features (arrow functions, destructuring, modules)
• No prior React experience required

Course Features:
• 40+ hours of video content
• 15+ hands-on projects and exercises
• Downloadable source code for all projects
• Lifetime access to course materials
• Certificate of completion
• 30-day money-back guarantee

Who This Course Is For:
• Web developers wanting to learn React
• JavaScript developers looking to advance their skills
• Frontend developers transitioning to modern frameworks
• Computer science students and bootcamp graduates`,
      whatYouWillLearn: [
        'Build production-ready React applications from scratch',
        'Understand React hooks, context, and state management',
        'Create reusable components and custom hooks',
        'Implement routing with React Router',
        'Test React components effectively',
        'Deploy React apps to cloud platforms',
        'Optimize React performance',
        'Handle forms and user input validation'
      ],
      requirements: [
        'Basic knowledge of HTML, CSS, and JavaScript',
        'Understanding of ES6+ JavaScript features',
        'A computer with internet access',
        'Code editor (VS Code recommended)',
        'Node.js installed on your machine'
      ],
      courseFeatures: [
        { icon: 'PlayCircle', text: '120+ HD video lectures' },
        { icon: 'Download', text: 'Downloadable resources' },
        { icon: 'Award', text: 'Certificate of completion' },
        { icon: 'Clock', text: 'Lifetime access' },
        { icon: 'Users', text: 'Access to student community' },
        { icon: 'Smartphone', text: 'Mobile and desktop access' }
      ],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop', 
      modules: [
        {
          id: 1,
          title: 'Introduction to React',
          description: 'Learn the fundamentals of React library',
          lessons: [
            { 
              id: 1, 
              title: 'What is React?', 
              type: 'video', 
              duration: '12 min', 
              videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
              content: 'React is a JavaScript library for building user interfaces, particularly web applications...'
            },
            { 
              id: 2, 
              title: 'Setting up Development Environment', 
              type: 'video', 
              duration: '15 min', 
              videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
              content: 'Learn how to set up your development environment for React development...'
            },
            { 
              id: 3, 
              title: 'First React Component', 
              type: 'reading', 
              duration: '10 min',
              content: `# Creating Your First React Component

A React component is a JavaScript function or class that returns JSX (JavaScript XML). Here's how to create your first component:

## Function Component
\`\`\`javascript
function Welcome() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

## Class Component
\`\`\`javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}
\`\`\`

## Key Points:
- Components must return a single JSX element
- Component names must start with a capital letter
- Components can accept props as parameters
- Function components are preferred in modern React`
            }
          ]
        },
        {
          id: 2,
          title: 'Components and JSX',
          description: 'Master React components and JSX syntax',
          lessons: [
            { 
              id: 4, 
              title: 'Understanding JSX', 
              type: 'video', 
              duration: '14 min', 
              videoUrl: 'https://www.youtube.com/embed/7fPXI_MnBOY',
              content: 'JSX is a syntax extension for JavaScript that lets you write HTML-like code...'
            },
            { 
              id: 5, 
              title: 'Component Props', 
              type: 'reading', 
              duration: '8 min',
              content: `# React Props

Props (short for properties) are how you pass data from parent to child components.

## Basic Props Example
\`\`\`javascript
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Greeting name="Alice" />;
}
\`\`\`

## Destructuring Props
\`\`\`javascript
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
\`\`\`

## Key Points:
- Props are read-only
- Props flow down from parent to child
- Use PropTypes for type checking
- Default props can be set using defaultProps`
            }
          ]
        },
        {
          id: 3,
          title: 'State Management',
          description: 'Learn React state and hooks',
          lessons: [
            { 
              id: 6, 
              title: 'useState Hook', 
              type: 'video', 
              duration: '18 min', 
              videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0',
              content: 'useState is a React hook that lets you add state to functional components...'
            },
            { 
              id: 7, 
              title: 'Event Handling', 
              type: 'video', 
              duration: '12 min', 
              videoUrl: 'https://www.youtube.com/embed/Znqv84xi8Vs',
              content: 'Learn how to handle user events in React applications...'
            }
          ]
        }
      ]
    },
       2: {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Jane Smith',
      rating: 4.6,
      students: 890,
      duration: '30 hours',
      price: 79,
      category: 'tech',
      description: 'Learn data science fundamentals including Python, statistics, and machine learning.',
      detailedDescription: `Transform raw data into actionable insights with this comprehensive data science course. Learn the essential skills used by data scientists at top companies like Google, Amazon, and Microsoft.

What You'll Master:
• Python programming for data analysis
• Statistical analysis and hypothesis testing
• Data visualization with Matplotlib and Seaborn
• Machine learning algorithms and implementation
• Working with databases and APIs
• Real-world data science projects

Course Highlights:
• Hands-on projects using real datasets
• Industry-standard tools and libraries
• Portfolio-worthy projects for job applications
• Expert instruction from seasoned data scientist
• Career guidance and interview preparation

Tools You'll Use:
• Python and Jupyter Notebooks
• Pandas for data manipulation
• NumPy for numerical computing
• Scikit-learn for machine learning
• SQL for database queries
• Git for version control

Career Opportunities:
Upon completion, you'll be prepared for roles such as Data Analyst, Junior Data Scientist, Business Intelligence Analyst, and Research Analyst.`,
      whatYouWillLearn: [
        'Master Python programming for data science',
        'Perform statistical analysis and hypothesis testing',
        'Create stunning data visualizations',
        'Build and evaluate machine learning models',
        'Clean and preprocess messy datasets',
        'Work with APIs and databases',
        'Communicate findings effectively',
        'Apply data science to real business problems'
      ],
      requirements: [
        'Basic programming knowledge (any language)',
        'High school level mathematics',
        'Computer with Python installation capability',
        'Curiosity about data and problem-solving',
        'No prior data science experience needed'
      ],
      courseFeatures: [
        { icon: 'Code', text: '50+ coding exercises' },
        { icon: 'Database', text: 'Real datasets included' },
        { icon: 'Award', text: 'Industry-recognized certificate' },
        { icon: 'Book', text: 'Comprehensive course materials' },
        { icon: 'Users', text: 'Mentor support included' },
        { icon: 'Download', text: 'Jupyter notebooks provided' }
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', 
      modules: [
        {
          id: 1,
          title: 'Python Basics',
          description: 'Introduction to Python programming',
          lessons: [
            { 
              id: 1, 
              title: 'Python Syntax', 
              type: 'video', 
              duration: '15 min', 
              videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
              content: 'Learn Python syntax and basic programming concepts...'
            },
            { 
              id: 2, 
              title: 'Variables and Data Types', 
              type: 'reading', 
              duration: '10 min',
              content: `# Python Variables and Data Types

## Variables
In Python, variables are created when you assign a value to them:

\`\`\`python
name = "John"
age = 25
height = 5.9
is_student = True
\`\`\`

## Data Types
- **String**: Text data
- **Integer**: Whole numbers
- **Float**: Decimal numbers
- **Boolean**: True/False values
- **List**: Ordered collection
- **Dictionary**: Key-value pairs

## Examples
\`\`\`python
# String
message = "Hello, World!"

# List
numbers = [1, 2, 3, 4, 5]

# Dictionary
person = {"name": "Alice", "age": 30}
\`\`\``
            }
          ]
        },
        {
          id: 2,
          title: 'Data Analysis with Pandas',
          description: 'Learn data manipulation and analysis',
          lessons: [
            { 
              id: 3, 
              title: 'Introduction to Pandas', 
              type: 'video', 
              duration: '20 min', 
              videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
              content: 'Pandas is a powerful data manipulation library for Python...'
            }
          ]
        }
      ]
    },
       3: {
      id: 3,
      title: 'Business Strategy & Management',
      instructor: 'Robert Johnson',
      rating: 4.7,
      students: 567,
      duration: '25 hours',
      price: 89,
      category: 'business',
      description: 'Master strategic thinking and business management principles.',
      detailedDescription: `Develop the strategic mindset and leadership skills needed to drive business success. Learn from a Harvard MBA with 15+ years of C-level executive experience at Fortune 500 companies.

Strategic Excellence:
• Develop comprehensive business strategies
• Master competitive analysis and market positioning
• Learn financial planning and performance metrics
• Understand organizational design and culture
• Practice crisis management and change leadership

Real-World Application:
• Case studies from Apple, Amazon, Tesla, and more
• Interactive strategy simulations
• Group projects with peer feedback
• Executive interview sessions
• Industry trend analysis

Leadership Development:
• Build high-performing teams
• Master communication and presentation skills
• Learn negotiation and conflict resolution
• Develop emotional intelligence
• Practice decision-making under pressure

Business Tools:
• Strategic planning frameworks (Porter's Five Forces, SWOT, Blue Ocean)
• Financial modeling and analysis
• Project management methodologies
• Performance measurement systems
• Innovation and design thinking processes

This course prepares you for senior management roles and provides the foundation for MBA-level strategic thinking.`,
      whatYouWillLearn: [
        'Develop and execute winning business strategies',
        'Lead teams and manage organizational change',
        'Analyze competitive landscapes and market opportunities',
        'Create financial models and business plans',
        'Master negotiation and stakeholder management',
        'Build sustainable competitive advantages',
        'Make data-driven strategic decisions',
        'Communicate strategy effectively to all levels'
      ],
      requirements: [
        'Bachelor\'s degree or equivalent work experience',
        'Basic understanding of business concepts',
        'Access to Microsoft Office or Google Workspace',
        'Willingness to participate in group discussions',
        'No specific industry experience required'
      ],
      courseFeatures: [
        { icon: 'Users', text: 'Live Q&A sessions with instructor' },
        { icon: 'FileText', text: 'Strategic planning templates' },
        { icon: 'Award', text: 'LinkedIn skill verification' },
        { icon: 'Globe', text: 'Global case studies' },
        { icon: 'MessageCircle', text: 'Peer networking opportunities' },
        { icon: 'Book', text: 'Executive reading list' }
      ],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', 
      modules: [
        {
          id: 1,
          title: 'Strategic Planning',
          description: 'Learn strategic planning fundamentals',
          lessons: [
            { 
              id: 1, 
              title: 'What is Strategy?', 
              type: 'video', 
              duration: '14 min', 
              videoUrl: 'https://www.youtube.com/embed/iuYlGRnC7J8',
              content: 'Strategy is the art and science of planning and marshalling resources...'
            },
            { 
              id: 2, 
              title: 'SWOT Analysis', 
              type: 'reading', 
              duration: '12 min',
              content: `# SWOT Analysis

SWOT Analysis is a strategic planning tool that evaluates Strengths, Weaknesses, Opportunities, and Threats.

 Components

 Strengths (Internal, Positive)
- What advantages does your organization have?
- What do you do better than anyone else?
- What unique resources can you draw on?

 Weaknesses (Internal, Negative)
- What could you improve?
- What should you avoid?
- What are people likely to see as weaknesses?

 Opportunities (External, Positive)
- What opportunities are open to you?
- What trends could you take advantage of?
- How can you turn your strengths into opportunities?

 Threats (External, Negative)
- What threats could harm you?
- What is your competition doing?
- What obstacles do you face?

 How to Conduct SWOT Analysis
1. Gather a diverse team
2. Brainstorm each category
3. Prioritize items
4. Develop action plans`
            }
          ]
        }
      ]
    }
  }

  const course = courses[courseId]

  useEffect(() => {
    if (user) {
      const userCourses = JSON.parse(localStorage.getItem(`user_${user.id}_courses`) || '[]')
      setEnrolled(userCourses.includes(parseInt(courseId)))
      
      const progress = JSON.parse(localStorage.getItem(`user_${user.id}_course_${courseId}_progress`) || '[]')
      setCompletedLessons(progress)
      
      const moduleProgress = JSON.parse(localStorage.getItem(`user_${user.id}_course_${courseId}_modules`) || '[]')
      setCompletedModules(moduleProgress)
    }
  }, [courseId, user])

  const handleEnroll = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/payment?courseId=${courseId}`)
  }

  const markLessonComplete = (lessonId) => {
    const newCompleted = [...completedLessons, lessonId]
    setCompletedLessons(newCompleted)
    localStorage.setItem(`user_${user.id}_course_${courseId}_progress`, JSON.stringify(newCompleted))
    
    if (user) {
      const currentPoints = parseInt(localStorage.getItem(`welx_points_${user.id}`) || '0')
      const newPoints = currentPoints + 15
      localStorage.setItem(`welx_points_${user.id}`, newPoints.toString())
      window.dispatchEvent(new CustomEvent('welxPointsUpdated', { detail: { userId: user.id, points: newPoints } }))
    }
  }

  const isModuleUnlocked = (moduleId) => {
    if (moduleId === 1) return true
    return completedModules.includes(moduleId - 1)
  }

  const isModuleCompleted = (moduleId) => {
    return completedModules.includes(moduleId)
  }

  const getModuleProgress = (module) => {
    const moduleLessons = module.lessons.map(l => l.id)
    const completedInModule = moduleLessons.filter(id => completedLessons.includes(id))
    return (completedInModule.length / moduleLessons.length) * 100
  }

  const openVideo = (lesson) => {
    setCurrentVideo(lesson)
    setShowVideo(true)
  }

  const totalLessons = course?.modules?.reduce((total, module) => total + module.lessons.length, 0) || 0
  const progressPercentage = (completedLessons.length / totalLessons) * 100

  if (!course) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Course not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          
                   <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{course.description}</p>
          
          {!enrolled && (
            <div className="space-y-8 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">About This Course</h3>
                <div className="prose max-w-none text-gray-700">
                  <pre className="whitespace-pre-wrap font-sans">{course.detailedDescription}</pre>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    What You'll Learn
                  </h4>
                  <ul className="space-y-2">
                    {course.whatYouWillLearn?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Book className="w-5 h-5 text-blue-600 mr-2" />
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {course.requirements?.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Course Features</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.courseFeatures?.map((feature, index) => {
                    const IconComponent = {
                      PlayCircle,
                      Download,
                      Award,
                      Clock,
                      Users,
                      Smartphone,
                      Code,
                      Database,
                      FileText,
                      Globe,
                      MessageCircle,
                      Book
                    }[feature.icon] || Star
                    
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )} 
          
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1">{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="ml-1">{course.students} students</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="ml-1">{course.duration}</span>
            </div>
          </div>

          {enrolled && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Your Progress</h3>
                <span className="text-sm text-gray-600">{Math.round(progressPercentage)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-800 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Course Modules</h3>
            {course.modules?.map((module) => (
              <div key={module.id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {isModuleCompleted(module.id) ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : isModuleUnlocked(module.id) ? (
                        <Play className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                      <div>
                        <h4 className="font-semibold">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {Math.round(getModuleProgress(module))}% Complete
                      </div>
                                           {enrolled && isModuleUnlocked(module.id) && getModuleProgress(module) === 100 && !isModuleCompleted(module.id) && (
                        <div className="flex flex-col gap-1 mt-1">
                          <CalendarButton 
                            event={{
                              title: `Module Quiz: ${module.title}`,
                              date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                              description: `Complete the quiz for ${module.title} module in ${course.title}`,
                              location: 'Wel.x Learning Platform'
                            }}
                            className="justify-center"
                          />
                          <Link 
                            to={`/module-quiz/${courseId}/${module.id}`}
                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 inline-block text-center"
                          >
                            Take Quiz
                          </Link>
                        </div>
                      )} 
                    </div>
                  </div>
                </div>
                
                {enrolled && isModuleUnlocked(module.id) && (
                  <div className="p-4 space-y-3">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between border-l-4 border-blue-200 pl-4">
                        <div className="flex items-center space-x-3">
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : lesson.type === 'video' ? (
                            <PlayCircle className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Book className="w-5 h-5 text-purple-600" />
                          )}
                          <div>
                            <h5 className="font-medium">{lesson.title}</h5>
                            <p className="text-sm text-gray-600">{lesson.type} • {lesson.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {lesson.type === 'video' && (
                            <button
                              onClick={() => openVideo(lesson)}
                              className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-200"
                            >
                              Watch
                            </button>
                          )}
                          {lesson.type === 'reading' && (
                            <button
                              onClick={() => {
                                setCurrentVideo(lesson)
                                setShowVideo(true)
                              }}
                              className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-lg hover:bg-purple-200"
                            >
                              Read
                            </button>
                          )}
                          {!completedLessons.includes(lesson.id) && (
                            <button
                              onClick={() => markLessonComplete(lesson.id)}
                              className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-lg hover:bg-green-200"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

                   {enrolled && completedModules.length === course.modules?.length && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Ready for Final Quiz!</h3>
                    <p className="text-green-600">Complete all modules! Take the final quiz to earn your certificate.</p>
                  </div>
                </div>
                <CalendarButton 
                  event={{
                    title: `Final Quiz: ${course.title}`,
                    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    description: `Take the final quiz for ${course.title} to earn your certificate`,
                    location: 'Wel.x Learning Platform'
                  }}
                  size="md"
                />
              </div>
              <Link 
                to={`/quiz/${courseId}`}
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Take Final Quiz
              </Link>
            </div>
          )} 
        </div>

        <div className="lg:col-span-1">
                   <div className="card sticky top-8">
            <div className="text-center mb-6">
              <span className="text-3xl font-bold text-blue-800">{formatPrice(course.price)}</span>
            </div> 
            
            {!enrolled ? (
              <button onClick={handleEnroll} className="w-full btn-primary mb-4">
                Enroll Now
              </button>
            ) : (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
                ✓ Enrolled
              </div>
            )}
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Instructor:</span>
                <span className="font-medium">{course.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Modules:</span>
                <span className="font-medium">{course.modules?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVideo && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{currentVideo.title}</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {currentVideo.type === 'video' ? (
              <div className="aspect-video mb-4">
                <iframe
                  src={currentVideo.videoUrl}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="prose max-w-none mb-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">{currentVideo.content}</pre>
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <button
                onClick={() => setShowVideo(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              {!completedLessons.includes(currentVideo.id) && (
                <button
                  onClick={() => {
                    markLessonComplete(currentVideo.id)
                    setShowVideo(false)
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}