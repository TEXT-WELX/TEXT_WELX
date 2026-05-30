import   { useState, useEffect } from 'react'
import { Trophy, Star, Award, Medal, Crown, Sparkles, X, Zap } from 'lucide-react' 

export default function BadgeCelebration({ isVisible, badge, onClose }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [animate, setAnimate] = useState(false)

  const badges = {
    'Bronze Explorer': { icon: Award, color: 'from-amber-400 to-amber-600', bgColor: 'bg-amber-500' },
    'Silver Strategist': { icon: Medal, color: 'from-gray-400 to-gray-600', bgColor: 'bg-gray-500' },
    'Gold Master': { icon: Trophy, color: 'from-yellow-400 to-yellow-600', bgColor: 'bg-yellow-500' },
    'Platinum Legend': { icon: Crown, color: 'from-purple-400 to-purple-600', bgColor: 'bg-purple-500' },
    'Diamond Elite': { icon: Star, color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-500' }
  }

   useEffect(() => {
    if (isVisible) {
      setShowConfetti(true)
      setAnimate(true)
      
      // Play celebration sound if available
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYiCD2K0fHLeDEGGGm+8qWKOQgPat/zw2wkBTSN2+/AajIA')
      audio.volume = 0.7
      audio.play().catch(() => {})
      
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible]) 

  if (!isVisible || !badge) return null

  const BadgeIcon = badges[badge.name]?.icon || Award
  const gradientColor = badges[badge.name]?.color || 'from-gray-400 to-gray-600'
  const bgColor = badges[badge.name]?.bgColor || 'bg-gray-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
           {/* Confetti and Balloon Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Confetti */}
          {[...Array(100)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className={`absolute animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            >
              <div className={`w-3 h-3 ${
                i % 6 === 0 ? 'bg-yellow-400' : 
                i % 6 === 1 ? 'bg-blue-400' : 
                i % 6 === 2 ? 'bg-red-400' : 
                i % 6 === 3 ? 'bg-green-400' : 
                i % 6 === 4 ? 'bg-purple-400' : 'bg-pink-400'
              } rounded-full shadow-lg transform rotate-45`} />
            </div>
          ))}
          
          {/* Balloons */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`balloon-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            >
              <div className={`w-6 h-8 ${
                i % 4 === 0 ? 'bg-red-400' : 
                i % 4 === 1 ? 'bg-blue-400' : 
                i % 4 === 2 ? 'bg-green-400' : 'bg-yellow-400'
              } rounded-full shadow-lg transform -rotate-12`}>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-400"></div>
              </div>
            </div>
          ))}
          
          {/* Sparkle Effects */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-spin"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <Star className="w-4 h-4 text-yellow-300 drop-shadow-lg" />
            </div>
          ))}
          
          {/* Lightning Effects */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`lightning-${i}`}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              <Zap className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
            </div>
          ))}
        </div>
      )} 

           {/* Main Modal */}
      <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 max-w-md w-full mx-4 text-center transform transition-all duration-700 shadow-2xl border-4 border-gradient-to-r ${animate ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          animation: animate ? 'modalPulse 2s ease-in-out infinite' : 'none'
        }}> 
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

               {/* Celebration Header */}
        <div className="mb-6">
          <div className="relative">
            {/* Enhanced Sparkles Animation */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
              <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
              <Sparkles className="absolute -bottom-4 -right-4 w-8 h-8 text-pink-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
            
            {/* Rotating Ring Effect */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
              <div className="w-32 h-32 border-4 border-dashed border-yellow-300 rounded-full opacity-60"></div>
            </div>
            
            {/* Main Badge Icon with Enhanced Animation */}
            <div className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center mb-4 transform shadow-2xl border-4 border-white`}
              style={{
                animation: 'badgeBounce 1s ease-in-out infinite alternate'
              }}>
              <BadgeIcon className="w-14 h-14 text-white drop-shadow-lg" />
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradientColor} blur-xl opacity-30 animate-pulse`}></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-pulse">
            🎊 AMAZING ACHIEVEMENT! 🎊
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">You've unlocked a new badge!</h3>
          <div className="text-lg text-gray-600 animate-bounce">
            ✨ Keep up the excellent work! ✨
          </div>
        </div> 

               {/* Badge Details */}
        <div className={`${bgColor} text-white rounded-2xl p-6 mb-6 transform hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-white/20`}
          style={{
            animation: 'cardGlow 2s ease-in-out infinite alternate'
          }}>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <BadgeIcon className="w-10 h-10 mr-3 animate-pulse" />
              <div className="absolute inset-0 blur-sm opacity-50">
                <BadgeIcon className="w-10 h-10 mr-3" />
              </div>
            </div>
            <span className="text-3xl font-bold drop-shadow-lg">{badge.name}</span>
          </div>
          <div className="text-xl opacity-90 mb-2 font-semibold">
            🏆 {badge.points} WelX Points Milestone! 🏆
          </div>
          <div className="text-base opacity-90 font-medium bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            {badge.name === 'Bronze Explorer' && "🌟 Welcome to your learning journey! You're off to a great start!"}
            {badge.name === 'Silver Strategist' && "🎯 You're becoming a strategic thinker! Keep building those skills!"}
            {badge.name === 'Gold Master' && "🔥 Excellent progress, you're mastering skills! You're on fire!"}
            {badge.name === 'Platinum Legend' && "⚡ Outstanding achievement, you're legendary! Incredible dedication!"}
            {badge.name === 'Diamond Elite' && "💎 Ultimate mastery reached! You're among the elite learners!"}
          </div>
        </div> 

               {/* Achievement Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <div className="text-3xl font-bold text-blue-800 animate-pulse">{badge.points}+</div>
            <div className="text-sm text-blue-600 font-semibold">WelX Points Earned</div>
            <div className="text-xs text-blue-500 mt-1">🎯 Keep collecting!</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <div className="text-3xl font-bold text-green-800 animate-bounce">🏆</div>
            <div className="text-sm text-green-600 font-semibold">New Badge Unlocked</div>
            <div className="text-xs text-green-500 mt-1">✨ Achievement!</div>
          </div>
        </div> 

               {/* Special Rewards */}
        {badge.points >= 2500 && (
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-4 border-yellow-300 rounded-xl p-6 mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300"
            style={{
              animation: 'specialRewardPulse 1.5s ease-in-out infinite'
            }}>
            <div className="text-yellow-800 font-bold mb-3 text-xl animate-pulse">
              🎊 MEGA REWARD UNLOCKED! 🎊
            </div>
            <div className="text-yellow-700 text-lg font-semibold mb-2">
              30% Discount on All Courses!
            </div>
            <div className="text-yellow-600 text-sm">
              🔥 Limited time offer - Use your achievement power!
            </div>
          </div>
        )} 

               {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-white/20"
            style={{
              animation: 'buttonGlow 2s ease-in-out infinite alternate'
            }}
          >
             Continue Your Amazing Journey!🎉
          </button>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `I just earned the ${badge.name} badge on Wel.x!`,
                  text: `🎉 Just achieved ${badge.name} with ${badge.points}+ WelX points! Join me on this incredible learning journey! #WelxLearning #Achievement`,
                  url: window.location.origin
                })
              }
            }}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-2xl font-bold hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-xl border-2 border-white/20"
          >
            📱 Share This Epic Achievement! 🎊
          </button>
        </div> 

               {/* Motivational Message */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
          <div className="text-lg font-bold text-indigo-800 mb-2">
            🌟 You're Unstoppable! 🌟
          </div>
          <div className="text-sm text-indigo-600 font-medium">
            Keep learning, keep growing! Your next badge awaits! ✨
          </div>
          <div className="text-xs text-indigo-500 mt-2">
            Every expert was once a beginner - and you're proving it! 🎯
          </div>
        </div> 
      </div>
    </div>
  )
}
 