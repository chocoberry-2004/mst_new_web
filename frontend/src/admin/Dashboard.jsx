import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

// import custom hooks
import { useAchievement } from '../providers/AchievemetProvider'
import { AppContext } from '../providers/AppContextProvider'
import { useArticle } from '../providers/ArticleProvider'
import { useContactInfo } from '../providers/ContactInfoProvider'
import { useCourse } from '../providers/CourseProvider'
import { useEventContext } from '../providers/EventProvider'
import { useLecturer } from '../providers/LecturerProvider'
import { usePartner } from '../providers/PartnerProvider'
import { useFaculty } from '../providers/FacultyProvider'

import { MaintainContext } from '../providers/MaintenanceProvider'

function Dashboard() {
  // Mock statistical data
  
  const { awards, awardLoading, awardErr,awardType, awardTypeLoading, awardTypeErr } = useAchievement();
  const { events, eventType, loading, error } = useEventContext();
  const { lecturers, lecturerLoading, lecturerError } = useLecturer();
  const { facultyList, facultyLoading, facultyError } = useFaculty();
  const { partners, partnerLoading, partnerError } = usePartner();
  const { contactInfo, contactInfoLoading, contactInfoError } = useContactInfo();
  let {showModal, setShowModal, ApplicationFormHandler, openApplicationForm} = useContext(AppContext);
  const { course, courseLoading, courseError } = useCourse();
  const { articles, articlesLoading, articlesErr } = useArticle();

  const {
        // Global user pages
        maintaining,
        setMaintaining,

        // Pages
        maintainHome,
        setMaintainHome,
        maintainFaculty,
        setMaintainFaculty,
        maintainCourse,
        setMaintainCourse,
        maintainArticle,
        setMaintainArticle,
        maintainEvent,
        setMaintainEvent,
        maintainContact,
        setMaintainContact,
        maintainAbout,
        setMaintainAbout,
        maintainPrivacy,
        setMaintainPrivacy,
      } = useContext(MaintainContext);

  const faculty = facultyList?.faculty;

  // Dynamic Statistics
  const totalCourses = faculty?.courses?.length || 0;
  const totalLecturers = lecturers?.length || 0;
  const totalPartners = partners?.length || 0;
  const totalEvents = events?.length || 0;

  

  const statsData = [
    {
      title: 'Total Lecturers',
      value: totalLecturers,
      icon: 'fa-users',
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: 'fa-book',
    },
    {
      title: 'Total Events',
      value: totalEvents,
      icon: 'fa-calendar-alt',
    },
    {
      title: "Total Partners",
      value: totalPartners,
      icon: 'fa-chart-line',
    }
  ]


  const recentEvents = events?.filter((event) => {
    const eventDate = new Date(event.date).getTime();
    const today = new Date().getTime();
    const sevenDaysAgo = today - (7 * 24 * 60 * 60 * 1000);

    return eventDate >= sevenDaysAgo;
  });



  // Top lecturers data
  const maintainencePages = [
    { id: 0, name: 'All Pages', controller: setMaintaining, status: maintaining },
    { id: 1, name: 'Home Page', controller: setMaintainHome, status: maintainHome },
    { id: 2, name: 'Faculty Page', controller: setMaintainFaculty, status:maintainFaculty },
    { id: 3, name: 'Events Page', controller: setMaintainEvent, status:maintainEvent },
    { id: 4, name: 'Course Page', controller: setMaintainCourse, status: maintainCourse },
    { id: 5, name: 'Article Page', controller: setMaintainArticle, status: maintainArticle },
    { id: 6, name: 'Contact Page', controller: setMaintainContact, status: maintainContact },
    { id: 7, name: 'About Page', controller: setMaintainAbout, status: maintainAbout },
    { id: 8, name: 'Privacy-Policy Page', controller: setMaintainPrivacy, status:maintainPrivacy },
  ];

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
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>

              <div className={`bg-[var(--primary-dark)]/10 p-3 rounded-lg`}>
                <i className={`fas ${stat.icon} text-[var(--primary-dark)] text-xl`}></i>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
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
            <NavLink to="../event">
              <button className="text-sm text-[#FFC53A] hover:text-[#e6b234] font-medium cursor-pointer">
                View All
              </button>
            </NavLink>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Title</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Time</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents?.length > 0 ? (
                  recentEvents?.map((event) => (
                    <tr key={event._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-900">{event.title}</td>

                      {/* You don't have department → use type */}
                      <td className="py-3 text-sm text-gray-600">{event.type}</td>

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
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No recent events
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Lecturers Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Page Maintenance Console</h2>
            <i className="fas fa-award text-[#FFC53A] text-xl"></i>
          </div>
          <div className="space-y-3">
            {
                maintainencePages?.map((page) => (
                  <div key={page.id} className="px-4 py-2 border border-gray-400 rounded-lg flex items-center justify-between">
                    <h1 className="text-sm font-medium text-gray-700">
                      {page.name}
                    </h1>

                    <button
                      onClick={() => page.controller((prev) => !prev)}
                      className={
                      `w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 
                      ${
                        page.status ? "bg-red-400" : "bg-gray-300"
                      }`} 
                      >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 
                        ${
                          page.status ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))
            }
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard