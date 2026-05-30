import   { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'  
import { Users, Plus, Upload, Mail, Download, Search, Filter, Send, UserPlus, FileText } from 'lucide-react'

export  default function EmployeeManagement({ user }) {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Smith', email: 'john@company.com', designation: 'Developer', department: 'Engineering', skills: 'React, Node.js', assignedCourses: 3, completedCourses: 1, status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', designation: 'Manager', department: 'Marketing', skills: 'Marketing, Analytics', assignedCourses: 2, completedCourses: 2, status: 'active' }
  ])

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees))
  }, [employees]) 
  const [showAddForm, setShowAddForm] = useState(false)
  const [showBulkInvite, setShowBulkInvite] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('all')
  const [bulkEmails, setBulkEmails] = useState('')
  const [customMessage, setCustomMessage] = useState('Welcome to our learning platform! Your manager has invited you to join our team\'s professional development program.')

  const [newEmployee, setNewEmployee] = useState({
    name: '', email: '', designation: '', department: '', skills: ''
  })

  const handleAddEmployee = (e) => {
    e.preventDefault()
    const employee = {
      id: Date.now(),
      ...newEmployee,
      assignedCourses: 0,
      completedCourses: 0,
      status: 'invited'
    }
    setEmployees([...employees, employee])
    setNewEmployee({ name: '', email: '', designation: '', department: '', skills: '' })
    setShowAddForm(false)
    alert(`Welcome email sent to ${newEmployee.email}`)
  }

  const handleBulkInvite = () => {
    const emails = bulkEmails.split('\n').filter(email => email.trim())
    let successCount = 0
    
    emails.forEach(email => {
      if (email.includes('@')) {
        const employee = {
          id: Date.now() + Math.random(),
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: email.trim(),
          designation: 'Employee',
          department: 'General',
          skills: 'To be updated',
          assignedCourses: 0,
          completedCourses: 0,
          status: 'invited'
        }
        setEmployees(prev => [...prev, employee])
        successCount++
      }
    })
    
    setBulkEmails('')
    setShowBulkInvite(false)
    alert(`${successCount} invitations sent successfully!`)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const csvData = event.target.result
        const lines = csvData.split('\n')
        const headers = lines[0].split(',')
        
        const newEmployees = lines.slice(1)
          .filter(line => line.trim() && line.includes('@'))
          .map(line => {
            const values = line.split(',')
            const email = values[headers.indexOf('email')] || values[1]
            return {
              id: Date.now() + Math.random(),
              name: values[headers.indexOf('name')] || values[0] || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              email: email.trim(),
              designation: values[headers.indexOf('designation')] || values[2] || 'Employee',
              department: values[headers.indexOf('department')] || values[3] || 'General',
              skills: values[headers.indexOf('skills')] || values[4] || 'To be updated',
              assignedCourses: 0,
              completedCourses: 0,
              status: 'invited'
            }
          })
        setEmployees([...employees, ...newEmployees])
        alert(`${newEmployees.length} employees added and invitations sent!`)
      }
      reader.readAsText(file)
    }
  }

  const downloadTemplate = () => {
    const csvContent = "name,email,designation,department,skills\nJohn Doe,john@company.com,Developer,Engineering,React Node.js\nJane Smith,jane@company.com,Designer,Marketing,UI/UX Design\n"
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employee-template.csv'
    a.click()
  }

  const exportEmployees = () => {
    const csvContent = "Name,Email,Department,Designation,Assigned Courses,Completed Courses,Progress\n" +
      employees.map(emp => 
        `${emp.name},${emp.email},${emp.department},${emp.designation},${emp.assignedCourses},${emp.completedCourses},${emp.assignedCourses > 0 ? Math.round((emp.completedCourses / emp.assignedCourses) * 100) : 0}%`
      ).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employee-report.csv'
    a.click()
  }

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterDept === 'all' || emp.department === filterDept)
  )

  const departments = [...new Set(employees.map(emp => emp.department))]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Team Management</h1>
          <p className="text-gray-600">Invite and manage your team members</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowBulkInvite(true)} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <Send size={16} />
            Send Invitations
          </button>
          <button onClick={() => setShowAddForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => setShowAddForm(true)}>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Add Employee</h3>
              <p className="text-sm text-blue-700">Manually add team members</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="bg-green-600 p-2 rounded-lg">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Bulk Upload</h3>
              <p className="text-sm text-green-700">Upload CSV file</p>
            </div>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => setShowBulkInvite(true)}>
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">Send Invitations</h3>
              <p className="text-sm text-purple-700">Bulk email invites</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 cursor-pointer hover:bg-orange-100 transition-colors" onClick={exportEmployees}>
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-900">Export Reports</h3>
              <p className="text-sm text-orange-700">Download progress data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=300&fit=crop" alt="Department Performance Overview" className="w-full h-64 object-cover rounded-lg mb-4" />
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
            <div className="text-gray-600">Total Employees</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{employees.filter(e => e.status === 'active').length}</div>
            <div className="text-gray-600">Active Learners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">76%</div>
            <div className="text-gray-600">Avg Completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">42</div>
            <div className="text-gray-600">Certificates Earned</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border rounded-lg"
            />
          </div>
          <select 
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <button onClick={downloadTemplate} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2">
            <Download size={16} />
            Template
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold">Employee</th>
                <th className="text-left py-3 px-6 font-semibold">Department</th>
                <th className="text-center py-3 px-6 font-semibold">Assigned</th>
                <th className="text-center py-3 px-6 font-semibold">Completed</th>
                <th className="text-center py-3 px-6 font-semibold">Progress</th>
                <th className="text-center py-3 px-6 font-semibold">Status</th>
                <th className="text-center py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                      <div className="text-xs text-gray-400">{employee.designation}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {employee.department}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-medium">{employee.assignedCourses}</td>
                  <td className="py-4 px-6 text-center font-medium">{employee.completedCourses}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                          style={{ width: `${employee.assignedCourses > 0 ? (employee.completedCourses / employee.assignedCourses) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {employee.assignedCourses > 0 ? Math.round((employee.completedCourses / employee.assignedCourses) * 100) : 0}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                                   <td className="py-4 px-6 text-center">
                    <button 
                      onClick={() => navigate(`/employee/${employee.id}`)}
                      className="text-blue-600 hover:text-blue-800 mr-3 text-sm"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => navigate(`/assign-courses/${employee.id}`)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Assign
                    </button>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Add New Employee</h2>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Job Title"
                value={newEmployee.designation}
                onChange={(e) => setNewEmployee({...newEmployee, designation: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
              <input
                type="text"
                placeholder="Key Skills (comma separated)"
                value={newEmployee.skills}
                onChange={(e) => setNewEmployee({...newEmployee, skills: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                  Add & Send Invite
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showBulkInvite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-purple-900">Send Bulk Invitations</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Addresses (one per line)</label>
                <textarea
                  value={bulkEmails}
                  onChange={(e) => setBulkEmails(e.target.value)}
                  placeholder="john@company.com&#10;jane@company.com&#10;mike@company.com"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows="6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Message</label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={handleBulkInvite} className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
                  Send Invitations
                </button>
                <button onClick={() => setShowBulkInvite(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
 