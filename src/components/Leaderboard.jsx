import  { useState, useEffect } from 'react'
import { Trophy, Medal, Award, Star, Crown, Target } from 'lucide-react'
import BadgeCelebration from './BadgeCelebration' 

import  React from 'react'

export default function Leaderboard({ user }) { 
  const [leaderboardData, setLeaderboardData] = useState([])
  const [userStats, setUserStats] = useState({ points: 0, rank: 0, badge: null })
  const [showBadgeCelebration, setShowBadgeCelebration] = useState(false)
  const [newBadge, setNewBadge] = useState(null) 

  const badges = [
    { name: 'Bronze Explorer', points: 100, icon: Award, color: 'text-amber-600 bg-amber-100' },
    { name: 'Silver Strategist', points: 500, icon: Medal, color: 'text-gray-600 bg-gray-100' },
    { name: 'Gold Master', points: 1000, icon: Trophy, color: 'text-yellow-600 bg-yellow-100' },
    { name: 'Platinum Legend', points: 2000, icon: Crown, color: 'text-purple-600 bg-purple-100' },
    { name: 'Diamond Elite', points: 5000, icon: Star, color: 'text-blue-600 bg-blue-100' }
  ]

  const mockLeaderboard = [
    { id: 1, name: 'Alex Chen', points: 2450, badge: 'Platinum Legend', avatar: '👨‍💼' },
    { id: 2, name: 'Sarah Wilson', points: 1875, badge: 'Gold Master', avatar: '👩‍💻' },
    { id: 3, name: 'Mike Johnson', points: 1650, badge: 'Gold Master', avatar: '👨‍🎓' },
    { id: 4, name: 'Emma Davis', points: 1200, badge: 'Gold Master', avatar: '👩‍🏫' },
    { id: 5, name: 'David Kim', points: 950, badge: 'Silver Strategist', avatar: '👨‍🔬' },
    { id: 6, name: 'Lisa Thompson', points: 720, badge: 'Silver Strategist', avatar: '👩‍⚕️' },
    { id: 7, name: 'James Rodriguez', points: 680, badge: 'Silver Strategist', avatar: '👨‍🏭' },
    { id: 8, name: 'Anna Martinez', points: 450, badge: 'Bronze Explorer', avatar: '👩‍🎨' },
    { id: 9, name: 'Tom Anderson', points: 320, badge: 'Bronze Explorer', avatar: '👨‍🔧' },
    { id: 10, name: 'Kate Brown', points: 180, badge: 'Bronze Explorer', avatar: '👩‍🌾' }
  ]

   useEffect(() => {
    const savedPoints = localStorage.getItem(`welx_points_${user?.id}`) || '0'
    const points = parseInt(savedPoints)
    
    const currentBadge = badges.slice().reverse().find(badge => points >= badge.points)
    const userRank = mockLeaderboard.filter(u => u.points > points).length + 1
    
    // Check for new badge achievement
    const lastCheckedPoints = parseInt(localStorage.getItem(`last_badge_check_${user?.id}`) || '0')
    if (currentBadge && (!lastCheckedPoints || points >= currentBadge.points && lastCheckedPoints < currentBadge.points)) {
      setNewBadge(currentBadge)
      setShowBadgeCelebration(true)
      localStorage.setItem(`last_badge_check_${user?.id}`, points.toString())
    }
    
    setUserStats({ points, rank: userRank, badge: currentBadge })
    setLeaderboardData(mockLeaderboard)
  }, [user]) 

  const getBadgeIcon = (badgeName) => {
    const badge = badges.find(b => b.name === badgeName)
    if (!badge) return Award
    return badge.icon
  }

  const getBadgeColor = (badgeName) => {
    const badge = badges.find(b => b.name === badgeName)
    if (!badge) return 'text-gray-600 bg-gray-100'
    return badge.color
  }

  const getNextBadge = () => {
    return badges.find(badge => badge.points > userStats.points)
  }

   return (
    <div className="space-y-6">
      <BadgeCelebration 
        isVisible={showBadgeCelebration}
        badge={newBadge}
        onClose={() => setShowBadgeCelebration(false)}
      /> 
      {/* User Progress Card */}
      <div className="card">
        <h3 className="font-semibold mb-4 flex items-center">
          <Target className="mr-2" size={20} />
          Your Progress
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-800">{userStats.points}</div>
            <div className="text-sm text-gray-600">WelX Points</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-800">#{userStats.rank}</div>
            <div className="text-sm text-gray-600">Global Rank</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            {userStats.badge ? (
              <>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(userStats.badge.name)}`}>
                  {React.createElement(getBadgeIcon(userStats.badge.name), { size: 16, className: 'mr-1' })}
                  {userStats.badge.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">Current Badge</div>
              </>
            ) : (
              <>
                <div className="text-gray-400">No Badge</div>
                <div className="text-xs text-gray-600">Complete simulations to earn badges</div>
              </>
            )}
          </div>
        </div>

               {/* Discount Eligibility */}
        {userStats.points >= 2500 && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <Star className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800">30% Discount Unlocked!</span>
            </div>
            <p className="text-sm text-green-700">
              You've earned 2500+ WelX Points and qualify for 30% off all courses!
            </p>
          </div>
        )}

        {/* Progress to Discount */}
        {userStats.points < 2500 && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-yellow-800">Progress to 30% Course Discount</span>
              <span className="text-sm text-yellow-700">
                {userStats.points}/2500 points
              </span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((userStats.points / 2500) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-yellow-700 mt-1">
              {2500 - userStats.points} points to unlock 30% discount on all courses
            </div>
          </div>
        )}

        {/* Progress to Next Badge */}
        {getNextBadge() && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress to {getNextBadge().name}</span>
              <span className="text-sm text-gray-600">
                {userStats.points}/{getNextBadge().points} points
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((userStats.points / getNextBadge().points) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {getNextBadge().points - userStats.points} points to go
            </div>
          </div>
        )} 
      </div>

      {/* Badge Collection */}
      <div className="card">
        <h3 className="font-semibold mb-4">Badge Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon
            const isEarned = userStats.points >= badge.points
            
            return (
              <div 
                key={index} 
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  isEarned 
                    ? `${badge.color} border-current` 
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                }`}
              >
                <IconComponent className="w-8 h-8 mx-auto mb-2" />
                <div className="text-xs font-medium">{badge.name}</div>
                <div className="text-xs opacity-75">{badge.points} pts</div>
                {isEarned && (
                  <div className="text-xs text-green-600 font-medium mt-1">✓ Earned</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Global Leaderboard */}
      <div className="card">
        <h3 className="font-semibold mb-4 flex items-center">
          <Trophy className="mr-2" size={20} />
          Global Leaderboard
        </h3>
        
        <div className="space-y-2">
          {leaderboardData.map((player, index) => {
            const IconComponent = getBadgeIcon(player.badge)
            const isCurrentUser = user && player.name === user.name
            
            return (
              <div 
                key={player.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  isCurrentUser 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index < 3 
                      ? index === 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : index === 1 
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-amber-100 text-amber-800'
                      : 'bg-gray-50 text-gray-600'
                  }`}>
                    {index < 3 ? (
                      index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{player.avatar}</span>
                    <div>
                      <div className="font-semibold">{player.name}</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getBadgeColor(player.badge)}`}>
                        <IconComponent size={12} className="mr-1" />
                        {player.badge}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg">{player.points.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">WelX Points</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Points Earning Guide */}
      <div className="card">
        <h3 className="font-semibold mb-4">How to Earn WelX Points</h3>
        <div className="grid md:grid-cols-2 gap-4">
                   {[
            { action: 'Complete a simulation', points: '20-100', description: 'Based on performance score' },
            { action: 'Perfect score (90%+)', points: '50', description: 'Bonus for excellent performance' },
            { action: 'Complete a course', points: '150', description: 'Finish entire course with certificate' },
            { action: 'Complete course lesson', points: '15', description: 'Per lesson completed' },
            { action: 'Create playground project', points: '40', description: 'Save and run code project' },
            { action: 'Share playground project', points: '20', description: 'Share your code with others' },
            { action: 'Try new scenario', points: '10', description: 'First attempt at each scenario' },
            { action: 'Consecutive simulations', points: '5', description: 'Daily streak bonus' },
            { action: 'Beat personal best', points: '25', description: 'Improve your previous score' }
          ].map((item, index) => ( 
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-sm">{item.action}</div>
                <div className="text-xs text-gray-600">{item.description}</div>
              </div>
              <div className="text-blue-800 font-bold">+{item.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
 