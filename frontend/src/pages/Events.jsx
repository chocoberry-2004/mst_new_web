import React, { useState } from 'react';
import diamond2 from "../assets/images/diamond2.png";
import bookundercap from "../assets/images/booksundercap.png";
import { useQuery } from '@tanstack/react-query';

const fetchEvent = async () => {
  const response = await fetch("js/event.json");
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
};


function Events() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { data: events, isPending, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvent
  });

  console.log(events);

  const filters = [
    { id: 'all', name: 'All Events', icon: 'fas fa-calendar-alt' },
    { id: 'upcoming', name: 'Upcoming', icon: 'fas fa-rocket' },
    { id: 'tech', name: 'Tech Fests', icon: 'fas fa-microchip' },
    { id: 'workshop', name: 'Workshops', icon: 'fas fa-laptop-code' },
    { id: 'hackathon', name: 'Hackathons', icon: 'fas fa-code' },
    { id: 'seminar', name: 'Seminars', icon: 'fas fa-chalkboard-teacher' },
    { id: 'cultural', name: 'Cultural', icon: 'fas fa-music' },
  ];


  if (isPending) return "Loading...";
  if (error) return "Error: " + error.message;

  const filteredEvents = events?.filter(event =>
    activeFilter === 'all' ||
    event.type === activeFilter ||
    (activeFilter === 'upcoming' && event.status === 'upcoming')
  );

  const upcomingEvents = events?.filter(event => event.status === 'upcoming');
  const pastEvents = events?.filter(event => event.status === 'past');


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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-calendar-alt mr-2"></i>
                View All Events
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 border border-blue-200 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-gem mr-2"></i>
                Featured Highlights
              </button>
            </div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Browse Events by Category
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2 mx-auto"></div>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <i className={`${filter.icon} mr-2`}></i>
                  {filter.name}
                </button>
              ))}
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

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-calendar text-blue-500"></i>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-clock text-blue-500"></i>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-red-500"></i>
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-5 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-gray-500">
                      👥 {event.participants} participants
                    </span>
                    <span className="text-gray-500">
                      🎤 {event.speakers} speakers
                    </span>
                  </div>

                  <button
                    className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 ${
                      event.registered
                        ? "bg-green-600 text-white"
                        : event.status === "upcoming"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-600"
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


          {/* Upcoming Highlights */}
          {upcomingEvents?.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                <i className="fas fa-fire text-orange-500 mr-3"></i>
                Upcoming Highlights
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2"></div>
              </h2>
              
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  <div className="p-8 lg:p-12 text-white">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                      <i className="fas fa-crown mr-2"></i>
                      <span className="text-sm font-medium">Featured Event</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4">Technolympic 2025</h3>
                    <p className="text-gray-300 mb-6">
                      The biggest tech fest of the year featuring 50+ events, 100+ speakers, 
                      and opportunities to network with industry leaders and recruiters.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <div className="text-2xl font-bold mb-2">15-17 Dec</div>
                        <div className="text-gray-300">2023</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold mb-2">500+</div>
                        <div className="text-gray-300">Expected Participants</div>
                      </div>
                    </div>
                    
                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <i className="fas fa-star mr-2"></i>
                      Register Now - Early Bird Available
                    </button>
                  </div>
                  
                  <div className="relative min-h-[300px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <i className="fas fa-robot text-8xl text-white/30"></i>
                        <div className="mt-4 text-white/50">Featured Event Gallery</div>
                      </div>
                    </div>
                  </div>
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
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2"></div>
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
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-file-signature mr-2"></i>
                Submit Event Proposal
              </button>
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-white text-green-900 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-question-circle mr-2"></i>
                Event Guidelines
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Events;