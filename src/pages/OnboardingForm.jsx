import  { useState, useEffect } from 'react' 
import { useNavigate } from 'react-router-dom'
import { BookOpen, Target, User, Briefcase, ChevronRight, Check } from 'lucide-react'

export  default function OnboardingForm({ user, setUser }) { 
  const navigate = useNavigate()

  // Handle employer redirect in useEffect to avoid state update during render
  useEffect(() => {
    if (user.role === 'employer') {
      const updatedUser = { ...user, onboardingComplete: true }
      setUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      navigate('/employee-management')
    }
  }, [user.role, user, setUser, navigate]) 

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    currentLevel: '',
    primaryGoal: '',
    timeCommitment: '',
    
    // Education Background
    education: '',
    fieldOfStudy: '',
    workExperience: '',
    
    // Career Goals
    targetRole: '',
    skillsToImprove: [],
    preferredLearningStyle: '',
    
    // Learning Preferences
    budget: '',
    startDate: '',
    completionTimeline: ''
  })

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
           // Save onboarding data and redirect to roadmap
      const updatedUser = { ...user, onboardingData: formData, onboardingComplete: true }
      setUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      navigate('/learning-roadmap') 
    }
  } 

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skillsToImprove: prev.skillsToImprove.includes(skill)
        ? prev.skillsToImprove.filter(s => s !== skill)
        : [...prev.skillsToImprove, skill]
    }))
  }

  const skills = [
    'Programming', 'Data Analysis', 'Web Development', 'Mobile Development', 'Marketing', 'Sales',
    'UI/UX Design', 'Digital Marketing', 'Project Management', 'Business Analysis','Software Development', 
    'Machine Learning', 'Cloud Computing', 'Cybersecurity', 'Leadership', 'Bussiness Analytics', 
  ]

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.currentLevel && formData.primaryGoal && formData.timeCommitment
      case 2:
        return formData.education && formData.workExperience
      case 3:
        return formData.targetRole && formData.skillsToImprove.length > 0
      case 4:
        return formData.preferredLearningStyle && formData.completionTimeline
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Let's personalize your learning journey</h1>
            <span className="text-sm text-gray-600">Step {step} of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="card">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="w-12 h-12 text-blue-800 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
                <p className="text-gray-600">Help us understand your starting point</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What's your current skill level?</label>
                <div className="grid md:grid-cols-3 gap-3">
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <button
                      key={level}
                      onClick={() => setFormData({...formData, currentLevel: level})}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.currentLevel === level
                          ? 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What's your primary goal?</label>
                <div className="space-y-2">
                  {[
                    'Career advancement',
                    'Learning new skills',
                    'Career change',
                    'Academic improvement',
                    'Personal development'
                  ].map(goal => (
                    <button
                      key={goal}
                      onClick={() => setFormData({...formData, primaryGoal: goal})}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        formData.primaryGoal === goal
                          ? 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How much time can you dedicate weekly?</label>
                <div className="grid md:grid-cols-4 gap-3">
                  {['1-3 hours', '4-6 hours', '7-10 hours', '10+ hours'].map(time => (
                    <button
                      key={time}
                      onClick={() => setFormData({...formData, timeCommitment: time})}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.timeCommitment === time
                          ? 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education Background */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <BookOpen className="w-12 h-12 text-blue-800 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Education & Experience</h2>
                <p className="text-gray-600">Tell us about your background</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Highest level of education</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                >
                  <option value="">Select education level</option>
                  <option value="high-school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Field of study (optional)</label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({...formData, fieldOfStudy: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                  placeholder="e.g., Computer Science, Business, Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Work experience</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'No experience',
                    '1-2 years',
                    '3-5 years',
                    '6-10 years',
                    '10+ years',
                    'Student'
                  ].map(exp => (
                    <button
                      key={exp}
                      onClick={() => setFormData({...formData, workExperience: exp})}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.workExperience === exp
                          ? 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Career Goals */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Target className="w-12 h-12 text-blue-800 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Career Goals</h2>
                <p className="text-gray-600">What do you want to achieve?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Target role or position</label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                  placeholder="e.g., Software Engineer, Data Analyst, Product Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Skills you want to improve (select all that apply)
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`p-3 rounded-lg border-2 transition-colors flex items-center justify-between ${
                        formData.skillsToImprove.includes(skill)
                          ? 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>{skill}</span>
                      {formData.skillsToImprove.includes(skill) && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Learning Preferences */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Briefcase className="w-12 h-12 text-blue-800 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Learning Preferences</h2>
                <p className="text-gray-600">Customize your learning experience</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred learning style</label>
                <div className="space-y-2">
                  {[
                    'Visual (videos, diagrams)',
                    'Hands-on (projects, coding)',
                    'Reading (articles, documentation)',
                    'Interactive (quizzes, games)',
                    'Mixed approach'
                  ].map(style => (
                    <button
                      key={style}
                      onClick={() => setFormData({...formData, preferredLearningStyle: style})}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        formData.preferredLearningStyle === style
                          ? 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">When would you like to start?</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Target completion timeline</label>
                <div className="grid md:grid-cols-4 gap-3">
                  {['1 month', '3 months', '6 months', '1 year'].map(timeline => (
                    <button
                      key={timeline}
                      onClick={() => setFormData({...formData, completionTimeline: timeline})}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.completionTimeline === timeline
                          ? 'border-blue-800 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-2 rounded-lg ${
                step === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-6 py-2 rounded-lg flex items-center ${
                isStepValid()
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === 4 ? 'Complete Setup' : 'Next'}
              <ChevronRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
 