import  { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Play, Users, Award, BookOpen, ChevronRight, Star, Code, Settings, Database, Zap, ArrowUp, CheckCircle } from 'lucide-react'

export default function Landing() {
  const [isVisible, setIsVisible] = useState({})
  const [activeFeature, setActiveFeature] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [counters, setCounters] = useState({ users: 0, courses: 0, success: 0, hours: 0 }) 

   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
          
          if (entry.target.id === 'stats' && entry.isIntersecting) {
            const targetValues = { users: 50, courses: 500, success: 95, hours: 1000 }
            const duration = 2000
            const steps = 60
            const interval = duration / steps
            
            Object.keys(targetValues).forEach(key => {
              let current = 0
              const increment = targetValues[key] / steps
              
              const timer = setInterval(() => {
                current += increment
                if (current >= targetValues[key]) {
                  current = targetValues[key]
                  clearInterval(timer)
                }
                setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
              }, interval)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id]').forEach(el => observer.observe(el))

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) 

  const testimonials = [
    { 
      name: "Sarah Johnson", 
      role: "Software Developer", 
      text: "Wel.x transformed my career. The interactive coding playground made learning so engaging!", 
      rating: 5, 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8c5?w=60&h=60&fit=crop&crop=face",
      company: "TechCorp"
    },
    { 
      name: "Michael Chen", 
      role: "HR Manager", 
      text: "Our team's productivity increased by 40% after using Wel.x for upskilling.", 
      rating: 5, 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      company: "InnovateInc"
    },
    { 
      name: "Emily Davis", 
      role: "Data Scientist", 
      text: "The AI-powered recommendations helped me find exactly what I needed to learn.", 
      rating: 5, 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      company: "DataFlow"
    }
  ]

   const stats = [
    { icon: Users, value: `${counters.users}K+`, label: "Active Learners", color: "text-purple-600", bg: "bg-purple-100", gradient: "from-purple-400 to-purple-600" },
    { icon: BookOpen, value: `${counters.courses}+`, label: "Courses Available", color: "text-green-600", bg: "bg-green-100", gradient: "from-green-400 to-green-600" },
    { icon: Award, value: `${counters.success}%`, label: "Success Rate", color: "text-orange-600", bg: "bg-orange-100", gradient: "from-orange-400 to-orange-600" },
    { icon: Play, value: `${counters.hours > 999 ? '1M' : counters.hours}+`, label: "Hours Learned", color: "text-pink-600", bg: "bg-pink-100", gradient: "from-pink-400 to-pink-600" }
  ] 

  const features = [
    {
      icon: Code,
      title: "Interactive Coding Playground",
      description: "Practice coding in real-time with our advanced playground environment supporting 15+ languages",
      color: "text-blue-600",
      bg: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop"
    },
    {
      icon: Settings,
      title: "Business Simulations",
      description: "Make strategic decisions in realistic business scenarios with AI-powered feedback",
      color: "text-purple-600",
      bg: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=500&h=300&fit=crop"
    },
    {
      icon: Database,
      title: "Personalized Learning Paths",
      description: "AI-driven course recommendations tailored to your career goals and learning style",
      color: "text-green-600",
      bg: "bg-green-50",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop"
    },
    {
      icon: Zap,
      title: "Real-time Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and performance insights",
      color: "text-orange-600",
      bg: "bg-orange-50",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-24 flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg opacity-80 transform rotate-12"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float animation-delay-2000">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-80"></div>
        </div>
        <div className="absolute bottom-40 left-32 animate-float animation-delay-4000">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-red-400 rounded-lg opacity-80 transform -rotate-12"></div>
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 text-center z-10 ${isVisible.hero ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="inline-block glass-effect text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 hover:scale-105 transition-transform cursor-pointer">
            🚀 Transform Your Career Today
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-slideInLeft">
            Welcome to Wel.X
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed animate-slideInRight">
            Empowering learners and organizations with cutting-edge online education through interactive experiences and AI-powered learning paths
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scaleIn">
            <Link 
              to="/signup" 
              className="group bg-gradient-to-r from-pink-500 to-violet-600 text-white px-10 py-5 rounded-2xl font-bold hover:from-pink-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-2xl btn-glow relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Learning Today
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity shimmer"></div>
            </Link>
            
            <Link 
              to="/courses" 
              className="group glass-effect text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-purple-900 transition-all transform hover:scale-105 border-2 border-white/30 hover:border-white relative overflow-hidden"
            >
              <span className="relative z-10">Explore Courses</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-gradient-to-r from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 transform skew-y-1"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group cursor-pointer transition-all duration-500 ${isVisible.stats ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${stat.gradient} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative overflow-hidden`}>
                  <stat.icon className="w-12 h-12 text-white relative z-10" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity shimmer"></div>
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-20 ${isVisible.features ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-6xl font-bold mb-6 text-gradient">
              Why Choose Wel.x?
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of online learning with our innovative platform designed for modern learners
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group hover:scale-105 transition-all duration-500 ${isVisible.features ? 'animate-slideInLeft' : 'opacity-0 -translate-x-10'}`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="gradient-border rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 bg-white relative overflow-hidden">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-48 h-32 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className={`w-16 h-16 ${feature.color} mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <feature.icon className="w-full h-full" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">{feature.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  {activeFeature === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section id="categories" className="py-24 parallax-bg relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className={`text-5xl font-bold text-center mb-16 text-white ${isVisible.categories ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Popular Course Categories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Programming & Tech",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=400&fit=crop",
                description: "Master modern programming languages and frameworks with hands-on projects",
                tags: ["React", "Python", "JavaScript", "Node.js"],
                color: "blue",
                students: "25K+"
              },
              {
                title: "Data Science",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
                description: "Unlock insights from data with machine learning and analytics",
                tags: ["ML", "Analytics", "AI", "Statistics"],
                color: "purple",
                students: "18K+"
              },
              {
                title: "Business & Finance",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
                description: "Develop strategic thinking and business acumen for leadership roles",
                tags: ["Strategy", "Finance", "Management", "Leadership"],
                color: "green",
                students: "12K+"
              }
            ].map((category, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer ${isVisible.categories ? 'animate-scaleIn' : 'opacity-0 scale-75'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-4 relative">
                  <div className="relative overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                      {category.students} students
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold mb-4 text-${category.color}-600 group-hover:text-${category.color}-700 transition-colors`}>
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className={`bg-${category.color}-100 text-${category.color}-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to="/courses" 
                      className={`inline-flex items-center text-${category.color}-600 hover:text-${category.color}-700 font-semibold group-hover:translate-x-2 transition-all`}
                    >
                      Explore Courses <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-5xl font-bold text-center mb-20 text-gray-900 ${isVisible.testimonials ? 'animate-fadeInUp' : 'opacity-0'}`}>
            What Our Users Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer ${isVisible.testimonials ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-200 relative overflow-hidden h-full">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="text-6xl text-purple-600">"</div>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-6 h-6 text-yellow-400 fill-current group-hover:scale-110 transition-transform" 
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-8 text-lg italic leading-relaxed group-hover:text-gray-800 transition-colors">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full mr-4 group-hover:scale-110 transition-transform border-4 border-purple-100"
                      />
                      <div className="absolute inset-0 rounded-full ring-4 ring-purple-400 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.role}</div>
                      <div className="text-purple-600 text-sm font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative bg-gradient-to-r from-purple-800 via-pink-700 to-red-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full animate-float"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-green-400 rounded-full animate-float animation-delay-4000"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-400 rounded-full animate-float animation-delay-1000"></div>
          </div>
        </div>
        
        <div className={`relative max-w-7xl mx-auto px-4 text-center z-10 ${isVisible.cta ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 text-sm font-semibold">
            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
            Join 50,000+ successful learners
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-8 animate-slideInLeft">
            Ready to Transform Your Learning?
          </h2>
          
          <p className="text-2xl mb-12 text-pink-100 max-w-3xl mx-auto leading-relaxed animate-slideInRight">
            Join thousands of learners already advancing their careers with Wel.x. Start your journey today and unlock your potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scaleIn">
            <Link 
              to="/signup" 
              className="group bg-white text-purple-800 px-12 py-6 rounded-2xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center justify-center relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get Started Now 
                <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={24} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link 
              to="/courses" 
              className="group glass-effect text-white px-12 py-6 rounded-2xl font-bold hover:bg-white hover:text-purple-800 transition-all transform hover:scale-105 border-2 border-white/50 hover:border-white"
            >
              Browse Courses
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid md:grid-cols-4 gap-8 opacity-80">
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-pink-200">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-pink-200">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-pink-200">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-pink-200">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 animate-bounce"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  )
}
 