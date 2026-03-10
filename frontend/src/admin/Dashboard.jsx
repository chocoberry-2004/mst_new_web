import React from 'react'
import { NavLink } from 'react-router-dom'

function Dashboard() {
  // Mock statistical data
  const statsData = [
    {
      title: 'Total Lecturers',
      value: '156',
      icon: 'fa-users',
      change: '+12%',
      changeType: 'increase',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Faculty Departments',
      value: '24',
      icon: 'fa-book',
      change: '+3',
      changeType: 'increase',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Upcoming Events',
      value: '18',
      icon: 'fa-calendar-alt',
      change: '+5',
      changeType: 'increase',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Active Courses',
      value: '342',
      icon: 'fa-chart-line',
      change: '+23',
      changeType: 'increase',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ]

  // Recent events data
  const recentEvents = [
    { id: 1, name: 'Faculty Meeting', date: '2024-03-15', time: '10:00 AM', department: 'Computer Science', status: 'upcoming' },
    { id: 2, name: 'Research Symposium', date: '2024-03-18', time: '2:00 PM', department: 'Engineering', status: 'upcoming' },
    { id: 3, name: 'Guest Lecture: AI Trends', date: '2024-03-10', time: '11:30 AM', department: 'Data Science', status: 'completed' },
    { id: 4, name: 'Department Workshop', date: '2024-03-12', time: '3:00 PM', department: 'Mathematics', status: 'ongoing' },
    { id: 5, name: 'Student Conference', date: '2024-03-20', time: '9:00 AM', department: 'Physics', status: 'upcoming' }
  ]

  // Top lecturers data
  const topLecturers = [
    { id: 1, name: 'Dr. Sarah Johnson', department: 'Computer Science', courses: 4, rating: 4.8 },
    { id: 2, name: 'Prof. Michael Chen', department: 'Engineering', courses: 3, rating: 4.9 },
    { id: 3, name: 'Dr. Emily Williams', department: 'Mathematics', courses: 5, rating: 4.7 },
    { id: 4, name: 'Prof. David Brown', department: 'Physics', courses: 3, rating: 4.6 }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'upcoming': return 'text-yellow-500'
      case 'ongoing': return 'text-green-500'
      case 'completed': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your institution today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors font-medium">
            <i className="fas fa-file-export mr-2"></i>
            Download Report
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <i className="fas fa-clock text-gray-600"></i>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <i className={`fas ${stat.icon} ${stat.iconColor} text-xl`}></i>
              </div>
              <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                stat.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Events</h2>
            <NavLink to="event">
              <button className="text-sm text-[#FFC53A] hover:text-[#e6b234] font-medium cursor-pointer">
                View All
              </button>
            </NavLink>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Event</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Department</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Time</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">{event.name}</td>
                    <td className="py-3 text-sm text-gray-600">{event.department}</td>
                    <td className="py-3 text-sm text-gray-600">{event.date}</td>
                    <td className="py-3 text-sm text-gray-600">{event.time}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <i className={`fas fa-circle text-xs ${getStatusIcon(event.status)}`}></i>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Lecturers Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Top Lecturers</h2>
            <i className="fas fa-award text-[#FFC53A] text-xl"></i>
          </div>
          <div className="space-y-4">
            {topLecturers.map((lecturer) => (
              <div key={lecturer.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-semibold">
                  {lecturer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">{lecturer.name}</h3>
                  <p className="text-xs text-gray-600">{lecturer.department}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">{lecturer.courses} courses</span>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <i className="fas fa-star text-xs text-yellow-500"></i>
                      <span className="text-xs text-yellow-600">{lecturer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <NavLink  to={"lecturer"}>
            <button className="cursor-pointer w-full mt-4 px-4 py-2 text-sm text-[#FFC53A] border border-[#FFC53A] rounded-lg hover:bg-[#FFC53A] hover:text-white transition-colors">
              <i className="fas fa-users mr-2"></i>
              View All Lecturers
            </button>
          </NavLink>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-[#FFC53A] hover:shadow-md transition-all group">
            <i className="fas fa-calendar-alt text-[#FFC53A] text-2xl mb-2 group-hover:scale-110 transition-transform block"></i>
            <h3 className="font-medium text-gray-900">Create Event</h3>
            <p className="text-sm text-gray-600 mt-1">Schedule a new event</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-[#FFC53A] hover:shadow-md transition-all group">
            <i className="fas fa-user-plus text-[#FFC53A] text-2xl mb-2 group-hover:scale-110 transition-transform block"></i>
            <h3 className="font-medium text-gray-900">Add Lecturer</h3>
            <p className="text-sm text-gray-600 mt-1">Register new lecturer</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-[#FFC53A] hover:shadow-md transition-all group">
            <i className="fas fa-book-open text-[#FFC53A] text-2xl mb-2 group-hover:scale-110 transition-transform block"></i>
            <h3 className="font-medium text-gray-900">New Department</h3>
            <p className="text-sm text-gray-600 mt-1">Add faculty department</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-[#FFC53A] hover:shadow-md transition-all group">
            <i className="fas fa-file-export text-[#FFC53A] text-2xl mb-2 group-hover:scale-110 transition-transform block"></i>
            <h3 className="font-medium text-gray-900">Generate Report</h3>
            <p className="text-sm text-gray-600 mt-1">Export analytics data</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard