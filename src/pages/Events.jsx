import React, { useState, useContext,useEffect } from 'react';
import { AppContext } from '../providers/AppContextProvider';
import { useEventContext } from '../providers/EventProvider';
import { useParams, useLocation } from "react-router-dom";

// components
import EventGallery from '../components/EventGallery';
import ApplicationForm from '../components/ApplicationForm';
import Loading from "./Loading";
import NotFound from './NotFound';

// images
import event1 from "../assets/images/event1.jpg";
import event2 from "../assets/images/event2.jpg";
import event3 from "../assets/images/event3.jpg";
import event4 from "../assets/images/event4.jpg";
import event5 from "../assets/images/event6.jpg";



function Events() {
    const { typeSlug } = useParams();
    const [activeFilter, setActiveFilter] = useState('all');
    const {showModal, setShowModal, ApplicationFormHandler, openApplicationForm} = useContext(AppContext);
    const { events, eventType, loading, error } = useEventContext(); // from EventProvider

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");


    useEffect(() => {
    if (typeSlug) {
        setSelectedType(typeSlug);
    } else {
        setSelectedType("all");
    }
    }, [typeSlug]);

    const location = useLocation();

    useEffect(() => {
    if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
        element.scrollIntoView({
            behavior: "smooth"
        });
        }
    }
    }, [location]);
  
   
    if (loading) return <Loading />;
    if (error) return <NotFound/>;
    if (!events || events.length === 0) return <NotFound/>;

    const eventList = Array.isArray(events) ? events : [];

    // Statistics
    const totalEvents = eventList.length;
    const totalParticipants = eventList.reduce((sum, event) => sum + (event.participants || 0), 0);
    const totalSpeakers = eventList.reduce((sum, event) => sum + (event.speakers || 0), 0);
    const upcomingEvents = eventList.filter(event => event.status === "upcoming").length;


    const filteredEvents = eventList.filter((event) => {
        const matchesSearch =
            searchQuery === "" ||
            event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.venue?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType =
            selectedType === "all" || event.type === selectedType;

        const matchesStatus =
            selectedStatus === "all" || event.status === selectedStatus;

        const matchesCategory =
            activeFilter === "all" ||
            event.type === activeFilter ||
            (activeFilter === "upcoming" && event.status === "upcoming");

        return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });

    const highlightEvents = eventList?.filter(event => event.highlight == true) || [];
    const pastEvents = eventList?.filter(event => event.status === 'past') || [];

    return (
        <div className="min-h-screen">
           

            {/*  Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-4">
                
                {/* Background Images Grid - Curtain Effect */}
                <div className="absolute inset-0 flex fixed top-0 -z-10 overflow-hidden">
                {/* Event 1 - First curtain */}
                <div className="relative h-full flex-1 -mr-12 last:mr-0 animate-dramatic-curtain" 
                    style={{ animationDelay: '0.1s' }}>
                    <div className="relative h-full overflow-hidden shadow-2xl">
                    <img 
                        src={event1} 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/70 via-black/40 to-transparent"></div>
                    </div>
                </div>

                {/* Event 2 - Second curtain */}
                <div className="relative h-full flex-1 -mr-12 last:mr-0 animate-dramatic-curtain" 
                    style={{ animationDelay: '0.3s' }}>
                    <div className="relative h-full overflow-hidden shadow-2xl">
                    <img 
                        src={event2} 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/70 via-black/40 to-transparent"></div>
                    </div>
                </div>

                {/* Event 3 - Third curtain */}
                <div className="relative h-full flex-1 -mr-12 last:mr-0 animate-dramatic-curtain" 
                    style={{ animationDelay: '0.5s' }}>
                    <div className="relative h-full overflow-hidden shadow-2xl">
                    <img 
                        src={event3} 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/70 via-black/40 to-transparent"></div>
                    </div>
                </div>

                {/* Event 4 - Fourth curtain */}
                <div className="relative h-full flex-1 -mr-12 last:mr-0 animate-dramatic-curtain" 
                    style={{ animationDelay: '0.7s' }}>
                    <div className="relative h-full overflow-hidden shadow-2xl">
                    <img 
                        src={event4} 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/70 via-black/40 to-transparent"></div>
                    </div>
                </div>

                {/* Event 5 - Fifth curtain */}
                <div className="relative h-full flex-1 animate-dramatic-curtain" 
                    style={{ animationDelay: '0.9s' }}>
                    <div className="relative h-full overflow-hidden shadow-2xl">
                    <img 
                        src={event5} 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/70 via-black/40 to-transparent"></div>
                    </div>
                </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-dark)]/90 to-transparent z-10"></div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-4xl mx-auto">

                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-800/10 border border-blue-500/20 mb-6 backdrop-blur-sm">
                        <span className="text-sm font-medium text-blue-800">
                            Dynamic Campus Life
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-300 leading-tight">
                        Campus
                        <span className="block text-[var(--primary-dark)] mt-2">
                            Events & Activities
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                        Experience innovation, creativity, and learning through our diverse range
                        of technical, cultural, and professional events.
                    </p>

                </div>

                {/* Stats (Bottom of Hero) */}
                <div className="absolute bottom-10 left-0 w-full z-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-4 gap-4">

                            {[
                                { number: totalEvents, label: 'Total Events' },
                                { number: totalParticipants, label: 'Participants' },
                                { number: totalSpeakers, label: 'Industry Speakers' },
                                { number: upcomingEvents, label: 'Upcoming Events'},
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border-b-4 border-[var(--accent-yellow)]"
                                >
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

            </section>

            {/* Filter & Events Section */}
            <section id="event-grid" className="scroll-mt-0 py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter Tabs */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 border-b border-gray-200 pb-5 mb-8 text-center">
                            Browse Events by Category
                        </h2>

                        {/* filter events mechanism */}
                        <div className="border-2 border-[var(--accent-yellow)] rounded-lg flex flex-wrap items-center gap-2">
                            <div className="relative flex-1 min-w-[200px]">
                                <input
                                    type="search"
                                    id="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="p-3 pl-10 focus:outline-none rounded-lg w-full"
                                    placeholder="Search here ..."
                                />
                                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                            </div>

                            <div className="min-w-[150px]">
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="focus:outline-none p-3 w-full bg-transparent"
                                >
                                    <option value="all">All Events</option>
                                    {eventType?.map((type) => (
                                        <option key={type.id} value={type.slug}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="min-w-[150px]">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="focus:outline-none p-3 w-full bg-transparent"
                                >
                                    <option value="all">All Status</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>

                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedType("all");
                                    setSelectedStatus("all");
                                    setActiveFilter("all");
                                }}
                                className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors whitespace-nowrap"
                            >
                                Clear Filters
                            </button>
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
                                        src={event?.images?.[0]}
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
                                            {event.status?.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Type Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                                            {event.type?.toUpperCase()}
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
                                        onClick={() => openApplicationForm("event")}
                                        className={`w-full py-2.5 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
                                            event.registered
                                                ? "bg-green-600 text-white"
                                                : event.status === "upcoming"
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-400 text-white cursor-not-allowed"
                                        }`}
                                        disabled={event.status !== "upcoming" && !event.registered}
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

                    {highlightEvents?.length > 0 && (
                        <div className="mb-20">
                            {/* Section Title */}
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                    <i className="fas fa-fire text-orange-500"></i>
                                    Upcoming Highlights
                                </h2>
                                <div className="w-28 h-1 mt-3 rounded-full bg-gradient-to-r from-cyan-500 to-[var(--primary-dark)]"></div>
                            </div>

                            <div
                            className={`${
                                highlightEvents.length > 1
                                ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
                                : "max-w-4xl mx-auto"
                            }`}
                            >

                            {highlightEvents?.map((highlightEvent) => (
                                <div key={highlightEvent.id} className="relative rounded-3xl overflow-hidden shadow-xl">
                                    {/* Background Image */}
                                    <img
                                        src={highlightEvent?.images?.[0]}
                                        alt={highlightEvent.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B124E]/95 via-[#0B124E]/85 to-[#0B124E]/60"></div>

                                    {/* Content */}
                                    <div className="relative flex flex-col lg:grid lg:grid-cols-2 gap-6 p-6 lg:p-10 text-white">                                        {/* LEFT CONTENT */}
                                        <div className='space-y-2'>
                                            {/* Featured Badge */}
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                                            bg-white/20 backdrop-blur-md mb-6">
                                                <i className="fas fa-crown text-yellow-300"></i>
                                                <span className="text-sm font-medium">
                                                    Featured Event
                                                </span>
                                            </div>


                                            {/* Event Type Badge */}
                                            <div className="absolute top-6 right-6">
                                                <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
                                                    {highlightEvent.type?.toUpperCase()}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-3xl font-bold mb-3">
                                                {highlightEvent.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-200 leading-relaxed mb-6 line-clamp-2">
                                                {highlightEvent.description}
                                            </p>

                                            {/* Event Stats */}
                                            <div className="space-y-3 mb-5 border-b pb-5">
                                                <div className="flex items-center gap-2">
                                                    <i className="fas fa-calendar-alt text-yellow-400"></i>
                                                    <div>
                                                        <p className="text-xs text-gray-300">Date</p>
                                                        <p className="font-medium">{highlightEvent.date}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <i className="fas fa-clock text-yellow-400"></i>
                                                    <div>
                                                        <p className="text-xs text-gray-300">Time</p>
                                                        <p className="font-medium">{highlightEvent.time}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <i className="fas fa-map-marker-alt text-yellow-400"></i>
                                                    <div>
                                                        <p className="text-xs text-gray-300">Venue</p>
                                                        <p className="font-medium">{highlightEvent.venue}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                                <div className="flex flex-wrap items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                    <i className="fas fa-users text-yellow-400"></i>
                                                    <span className="text-sm">
                                                        {highlightEvent.participants}+ Participants
                                                    </span>
                                                    </div>

                                                    {highlightEvent.speakers > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        <i className="fas fa-microphone text-yellow-400"></i>
                                                        <span className="text-sm">
                                                        {highlightEvent.speakers} Speakers
                                                        </span>
                                                    </div>
                                                    )}

                                                    <button
                                                        onClick={() => openApplicationForm("event")}
                                                        className="inline-flex items-center gap-2 text-[#0B124E]
                                                        px-6 py-2.5 rounded-full font-semibold
                                                        bg-[var(--accent-yellow)]
                                                        transition-all duration-300
                                                        shadow-lg hover:shadow-2xl hover:scale-105
                                                        hover:bg-yellow-400 cursor-pointer"
                                                    >
                                                        {highlightEvent.status === "upcoming" ? (
                                                        <>
                                                            <i className="fas fa-ticket-alt"></i>
                                                            Register Now
                                                        </>
                                                        ) : (
                                                        <>
                                                            <i className="fas fa-eye"></i>
                                                            View Details
                                                        </>
                                                        )}
                                                    </button>
                                                </div>

                                               
                                            </div>

                                        </div>

                                        {/* RIGHT SIDE SPACE (keeps balance) */}
                                        <div className="hidden lg:block"></div>
                                    </div>
                                </div>
                            ))}

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
                            
                            <div className="">
                                <EventGallery/>
                            </div>
                            
                            <div className="text-center mt-8">
                                <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 transform hover:scale-105">
                                    View All Gallery <i className="fas fa-arrow-right ml-2"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16">
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-[var(--primary-dark)]/70"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 lg:p-12 text-center text-white">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Want to Host an Event?
                        </h2>

                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Student clubs and organizations can apply to host events on campus.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <i className="fas fa-file-signature mr-2"></i>
                                Submit Event Proposal
                            </button>

                            <button 
                                className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-white text-green-900 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
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