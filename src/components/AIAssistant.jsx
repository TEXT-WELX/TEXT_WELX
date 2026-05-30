import  { useState } from 'react' 
import { MessageCircle, X, Send } from 'lucide-react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Wel.x assistant. How can I help you today?", isBot: true }
  ])
  const [input, setInput] = useState('')

  const quickQuestions = [
    "How do I get started?",
    "What courses are available?",
    "How do I track progress?",
    "Need technical support"
  ]

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { id: messages.length + 1, text: input, isBot: false }
      setMessages([...messages, newMessage])
      setInput('')
      
      setTimeout(() => {
        const botResponse = { 
          id: messages.length + 2, 
          text: "Thanks for your question! I'm processing your request and will get back to you shortly.", 
          isBot: true 
        }
        setMessages(prev => [...prev, botResponse])
      }, 1000)
    }
  }

  const handleQuickQuestion = (question) => {
    const newMessage = { id: messages.length + 1, text: question, isBot: false }
    setMessages([...messages, newMessage])
    
    setTimeout(() => {
      let response = ""
      if (question.includes("get started")) {
        response = "To get started, sign up for an account and complete your profile. Then browse our course catalog to find courses that match your interests!"
      } else if (question.includes("courses")) {
        response = "We offer 500+ courses in programming, data science, business, and more. Visit our course marketplace to explore all available options."
      } else if (question.includes("progress")) {
        response = "You can track your progress on your dashboard. It shows completed courses, current progress, and upcoming deadlines."
      } else {
        response = "For technical support, please visit our contact page or email support@wel-x.com. Our team will help you resolve any issues."
      }
      
      const botResponse = { id: messages.length + 2, text: response, isBot: true }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 h-96 mb-4 border">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Wel.x Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.isBot 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            
            <div className="flex flex-wrap gap-2 mt-4">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  )
}
 