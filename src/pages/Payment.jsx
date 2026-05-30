import   { useState, useEffect } from 'react'  
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CreditCard, Lock, Check } from 'lucide-react'
import { useCurrency } from '../contexts/CurrencyContext'  

export   default function Payment({ user }) {   
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const courseId = searchParams.get('courseId')
  const { formatPrice, convertPrice } = useCurrency() 
  
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    address: '',
    city: '',
    zipCode: ''
  })

  const courses = {
    1: {
      title: 'React.js Complete Course',
      instructor: 'John Doe',
      price: 99,
      originalPrice: 149,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
    },
    2: {
      title: 'Data Science Fundamentals',
      instructor: 'Jane Smith',
      price: 79,
      originalPrice: 129,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    }
  }

  const courseDetails = courses[courseId] || courses[1]

  useEffect(() => {
    if (!courseId) {
      navigate('/marketplace')
    }
  }, [courseId, navigate])

   const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login')
      return
    }
    
    // For corporate employees, courses are pre-paid by employer
    if (user.role === 'employee') {
      alert('Course enrollment successful! This course is covered by your organization.')
      navigate('/employee-dashboard')
      return
    }
    
    if (user && user.id) {
      // Add course to user's enrolled courses 
      const userCourses = JSON.parse(localStorage.getItem(`user_${user.id}_courses`) || '[]')
      if (!userCourses.includes(parseInt(courseId))) {
        userCourses.push(parseInt(courseId))
        localStorage.setItem(`user_${user.id}_courses`, JSON.stringify(userCourses))
      }
    }
    
    alert('Payment processed successfully! Welcome to the course.')
    navigate(`/course/${courseId}`)
  } 

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="card">
          <div className="flex items-center mb-6">
            <Lock className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">Secure Payment</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="w-5 h-5 mr-2" />
                  Credit/Debit Card
                </label>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                      placeholder="123"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                    required
                  />
                </div>
              </div>
            )}

                       <button type="submit" className="w-full btn-primary">
              Complete Purchase - {formatPrice(courseDetails.price)}
            </button> 
          </form>
        </div>

        {/* Order Summary */}
               <div className="card">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          
          <div className="flex mb-4">
            <img src={courseDetails.image} alt={courseDetails.title} className="w-20 h-20 object-cover rounded-lg mr-4" />
            <div>
              <h4 className="font-semibold">{courseDetails.title}</h4>
              <p className="text-gray-600">by {courseDetails.instructor}</p>
            </div>
          </div>
          
                   {(() => {
            const userPoints = user ? parseInt(localStorage.getItem(`welx_points_${user.id}`) || '0') : 0
            const hasDiscount = userPoints >= 2500
            const discountAmount = hasDiscount ? Math.round(courseDetails.price * 0.3) : 0
            const finalPrice = hasDiscount ? courseDetails.price - discountAmount : courseDetails.price
            
            return (
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Original Price</span>
                  <span className="line-through text-gray-500">{formatPrice(courseDetails.originalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Course Discount</span>
                  <span className="text-green-600">-{formatPrice(courseDetails.originalPrice - courseDetails.price)}</span>
                </div>
                {hasDiscount && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-blue-600">WelX Points Discount (30%)</span>
                      <span className="text-blue-600">-{formatPrice(discountAmount)}</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-sm text-blue-700">
                      🎉 You saved an extra {formatPrice(discountAmount)} with your {userPoints} WelX Points!
                    </div>
                  </>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(finalPrice)}</span>
                  </div>
                </div>
              </div>
            ) 
          })()} 
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">What you'll get:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li className="flex items-center"><Check className="w-4 h-4 mr-2" />Lifetime access</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2" />Certificate of completion</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2" />Access to coding playground</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2" />Community support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
 