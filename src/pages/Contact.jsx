import { useState } from 'react'  
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Construct URL with query params (avoids CORS issues)
      const baseUrl = "https://script.google.com/macros/s/AKfycbxlpOnqBn3j6SfkbkaLIWiOcJ9_l1pk8nrTYPa0fVL6Dgwb8CmftecHANeBApV99jlP/exec";
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
      });

      const response = await fetch(`${baseUrl}?${params.toString()}`, {
        method: "GET",
        mode: "no-cors"  // bypass CORS
      });

      // Even though no-cors hides response, we assume success if no error
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'welx@wellingtoncampus.co',
      description: 'Send us an email anytime!'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Learning Street, Education City, EC 12345',
      description: 'Come say hello at our office!'
    }
  ]

  const faqItems = [
    {
      question: 'How do I enroll in a course?',
      answer: 'Simply browse our course marketplace, select a course, and click "Enroll Now". You can pay securely and start learning immediately.'
    },
    {
      question: 'Can I access courses on mobile?',
      answer: 'Yes! Our platform is fully responsive and works seamlessly on all devices including smartphones and tablets.'
    },
    {
      question: 'Do you offer certificates?',
      answer: 'Yes, we provide certificates of completion for all courses. These can be downloaded and shared on professional networks.'
    },
    {
      question: 'Is there a refund policy?',
      answer: 'We offer a 30-day money-back guarantee. If you are not satisfied with a course, contact us for a full refund.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
              <p className="text-green-600">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  required
                />
              </div>
              
              <button type="submit" className="w-full btn-primary flex items-center justify-center">
                <Send className="mr-2" size={16} />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & FAQ */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <info.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    <p className="text-blue-800 font-medium mb-1">{info.details}</p>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <HelpCircle className="mr-2" size={24} />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{item.question}</span>
                    <span className="group-open:rotate-180 transition-transform">⌄</span>
                  </summary>
                  <div className="p-3 text-gray-600 text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
        <p className="text-gray-600 mb-6">Our support team is here to help you succeed</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary flex items-center">
            <MessageCircle className="mr-2" size={16} />
            Live Chat
          </button>
          <button className="btn-secondary flex items-center">
            <HelpCircle className="mr-2" size={16} />
            Help Center
          </button>
        </div>
      </div>
    </div>
  )
}
 