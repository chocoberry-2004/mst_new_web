import React, { useState } from 'react';
import diamond2 from "../assets/images/diamond2.png";
import technolympic from "../assets/images/technolympic.jpg"
import bookundercap from "../assets/images/booksundercap.png";
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AppContext } from '../providers/AppContextProvider';
import ApplicationForm from '../components/ApplicationForm';
import Loading from "./Loading";

const fetchEvent = async () => {
  const response = await fetch("/js/event.json");
  if (!response.ok) throw new Error("Failed to fetch events");
  return await response.json();
};

const fetchEventType = async () => {
  const response = await fetch("/js/eventType.json");
  return await response.json();
}


function Events() {
  const [activeFilter, setActiveFilter] = useState('all');
  let {showModal, setShowModal, ApplicationFormHandler} = useContext(AppContext);
  
  const { data: events, isPending, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvent
  });

  const { data: eventType, isPending: eventTypeLoading, error: eventTypeErr } = useQuery({
        queryKey: ['eventType'],
        queryFn: fetchEventType,
  });

  const filters = [
    { id: 'all', name: 'All Events', icon: 'fas fa-calendar-alt' },
    { id: 'upcoming', name: 'Upcoming', icon: 'fas fa-rocket' },
    { id: 'tech', name: 'Tech Fests', icon: 'fas fa-microchip' },
    { id: 'workshop', name: 'Workshops', icon: 'fas fa-laptop-code' },
    { id: 'hackathon', name: 'Hackathons', icon: 'fas fa-code' },
    { id: 'seminar', name: 'Seminars', icon: 'fas fa-chalkboard-teacher' },
    { id: 'cultural', name: 'Cultural', icon: 'fas fa-music' },
  ];


  if (isPending) return <Loading/>;
  if (error) return "Error: " + error.message;

  const eventList = Array.isArray(events) ? events : [];

  const filteredEvents = eventList?.filter(event =>
    activeFilter === 'all' ||
    event.type === activeFilter ||
    (activeFilter === 'upcoming' && event.status === 'upcoming')
  );

  const upcomingEvents = eventList?.filter(event => event.status === 'upcoming');
  const pastEvents = eventList?.filter(event => event.status === 'past');


  return (
    <div className="min-h-screen bg-white to-white">

      <section className="h-[80vh] relative text-white py-20 lg:py-24 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-t from-white to-[var(--gray-text)]">
          {/* Top Left Cluster */}
          <div className="absolute top-10 left-10 opacity-30">
            <img src={diamond2} alt="diamond" className="w-12 h-12 animate-pulse" />
          </div>
          <div className="absolute top-24 left-24 opacity-30">
            <img src={diamond2} alt="diamond" className="w-8 h-8" />
          </div>
          
          {/* Top Right Cluster */}
          <div className="absolute top-8 right-16 opacity-30">
            <img src={diamond2} alt="diamond" className="w-16 h-16" />
          </div>
          <div className="absolute top-32 right-32 opacity-30">
            <img src={diamond2} alt="diamond" className="w-10 h-10 animate-pulse" />
          </div>
          
          {/* Bottom Left Cluster */}
          <div className="absolute bottom-20 left-20 opacity-20">
            <img src={diamond2} alt="diamond" className="w-20 h-20" />
          </div>
          <div className="absolute bottom-40 left-40 opacity-30">
            <img src={diamond2} alt="diamond" className="w-6 h-6" />
          </div>
          
          {/* Bottom Right Cluster */}
          <div className="absolute bottom-24 right-24 opacity-30">
            <img src={diamond2} alt="diamond" className="w-14 h-14 animate-pulse" />
          </div>
          <div className="absolute bottom-32 right-40 opacity-30">
            <img src={diamond2} alt="diamond" className="w-8 h-8" />
          </div>
          
          {/* Center Large Diamond */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40">
            <img src={bookundercap} alt="diamond" className="w-64 h-64 md:w-96 md:h-96" />
          </div>
          
          {/* Additional scattered diamonds */}
          <div className="absolute top-16 left-1/4 opacity-20">
            <img src={diamond2} alt="diamond" className="w-10 h-10" />
          </div>
          <div className="absolute top-1/3 right-1/4 opacity-25">
            <img src={diamond2} alt="diamond" className="w-12 h-12" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 opacity-20">
            <img src={diamond2} alt="diamond" className="w-8 h-8" />
          </div>
          <div className="absolute top-2/3 right-1/3 opacity-30">
            <img src={diamond2} alt="diamond" className="w-14 h-14" />
          </div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-800/10 border border-blue-500/20 mb-6 backdrop-blur-sm">
              <i className="fas fa-bolt mr-2 text-blue-600"></i>
              <span className="text-sm font-medium text-blue-800">Dynamic Campus Life</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Campus
              <span className="block text-[var(--primary-dark)] mt-2">
                Events & Activities
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Experience innovation, creativity, and learning through our diverse range of 
              technical, cultural, and professional events.
            </p>
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="lg:h-[20vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Events Yearly', icon: 'fas fa-calendar-check', color: 'text-blue-600' },
              { number: '5K+', label: 'Participants', icon: 'fas fa-user-graduate', color: 'text-green-600' },
              { number: '100+', label: 'Industry Speakers', icon: 'fas fa-microphone', color: 'text-purple-600' },
              { number: '25+', label: 'Clubs & Chapters', icon: 'fas fa-users', color: 'text-orange-600' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-5 border-b-4 border-[var(--accent-yellow)] rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 animate-drop-in">
                <i className={`${stat.icon} ${stat.color} text-3xl mb-2`}></i>
                <div className="text-xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Events Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 border-b border-gray-200 pb-5  mb-8 text-center">
              Browse Events by Category
            </h2>

            <div className="border-2 border-[var(--accent-yellow)] rounded-lg grid grid-cols-3 px-2">
              <div className="relative col-span-1">
                <input 
                  type="search" 
                  id="search" 
                  className="p-3 pl-10 focus:outline-none rounded-lg  w-full" 
                  placeholder='Search here ...'
                />
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              </div>

              <div className="col-span-1">
                <select name="" id="" className="focus:outline-none p-3 w-full">
                  <option value="">All Events</option>
                  {
                    eventType?.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="col-span-1">
                <select name="" id="" className="focus:outline-none p-3 w-full">
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredEvents?.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 animate-rise-up"
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "upcoming"
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {event.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                      {event.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-1 mb-5 text-sm">

                    {/* Date */}
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl hover:bg-gray-100 transition border border-gray-100">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="font-medium text-gray-700">{event.date}</p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl hover:bg-gray-100 transition border border-gray-100">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="font-medium text-gray-700">{event.time}</p>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl hover:bg-gray-100 transition border border-gray-100">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Venue</p>
                        <p className="font-medium text-gray-700">{event.venue}</p>
                      </div>
                    </div>

                  </div>

                  <p className="text-gray-600 mb-5 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex justify-between items-center mb-5">

                    {/* Participants */}
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl hover:bg-gray-100 transition">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                        <i className="fas fa-users"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Participants</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {event.participants}
                        </p>
                      </div>
                    </div>

                    {/* Speakers */}
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl hover:bg-gray-100 transition">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                        <i className="fas fa-microphone"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Speakers</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {event.speakers}
                        </p>
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={() => ApplicationFormHandler()}
                    className={`w-full py-2.5 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
                      event.registered
                        ? "bg-green-600 text-white"
                        : event.status === "upcoming"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-gray-600"
                    }`}
                  >
                    {event.registered
                      ? "Registered"
                      : event.status === "upcoming"
                      ? "Register Now"
                      : "View Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents?.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              No events found 😢
            </p>
          )}


          {upcomingEvents?.length > 0 && (
            <div className="mb-20">

              {/* Section Title */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <i className="fas fa-fire text-orange-500"></i>
                  Upcoming Highlights
                </h2>
                <div className="w-28 h-1 mt-3 rounded-full bg-gradient-to-r from-cyan-500 to-[var(--primary-dark)]"></div>
              </div>

              {/* Highlight Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl">

                {/* Background Image */}
                <img
                  src={technolympic}
                  alt="Technolympic Event"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B124E]/95 via-[#0B124E]/85 to-[#0B124E]/60"></div>

                {/* Content */}
                <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-14 text-white">

                  {/* LEFT CONTENT */}
                  <div>

                    {/* Featured Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                    bg-white/20 backdrop-blur-md mb-6">
                      <i className="fas fa-crown text-yellow-300"></i>
                      <span className="text-sm font-medium">
                        Featured Event
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl font-bold mb-4">
                      Technolympic 2025
                    </h3>

                    {/* Description */}
                    <p className="text-gray-200 leading-relaxed mb-8">
                      The biggest technology festival featuring competitions,
                      workshops, innovation showcases, and networking opportunities
                      with industry professionals and recruiters.
                    </p>

                    {/* Event Stats */}
                    <div className="flex gap-10 mb-10">

                      <div>
                        <p className="text-3xl font-bold">15–17</p>
                        <p className="text-gray-300 text-sm">December 2025</p>
                      </div>

                      <div>
                        <p className="text-3xl font-bold">500+</p>
                        <p className="text-gray-300 text-sm">
                          Participants Expected
                        </p>
                      </div>

                    </div>

                    {/* CTA */}
                    <button
                      onClick={ApplicationFormHandler}
                      className="cursor-pointer inline-flex items-center gap-2 text-[var(--primary-dark)]
                      px-7 py-3 rounded-full font-semibold
                      bg-[var(--accent-yellow)]
                      transition-all duration-300
                      shadow-lg hover:shadow-2xl hover:scale-105"
                    >
                      <i className="fas fa-ticket-alt"></i>
                      Register Now
                    </button>

                  </div>

                  {/* RIGHT SIDE SPACE (keeps balance) */}
                  <div className="hidden lg:block"></div>

                </div>
              </div>
            </div>
          )}

          {/* Past Events Gallery */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                <i className="fas fa-images text-purple-500 mr-3"></i>
                Past Events Gallery
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-[var(--primary-dark)] mt-2"></div>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div 
                    key={item} 
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-500/80 group-hover:opacity-0 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                      <i className="fas fa-image text-gray-400 text-4xl"></i>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white">
                        <div className="font-semibold">Event {item}</div>
                        <div className="text-sm text-gray-300">25 Nov 2023</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300">
                  View All Gallery <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-3xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Want to Host an Event?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Student clubs and organizations can apply to host events on campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
              className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-file-signature mr-2"></i>
                Submit Event Proposal
              </button>
              <button 
              className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-white text-green-900 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-question-circle mr-2"></i>
                Event Guidelines
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <ApplicationForm/>
    </div>
  );
}

export default Events;