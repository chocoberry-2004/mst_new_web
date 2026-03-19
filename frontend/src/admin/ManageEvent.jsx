import React, { useState, useEffect } from 'react';
import { useEventContext } from '../providers/EventProvider';
import Loading from '../pages/Loading';
import NotFound from '../pages/NotFound';

import logo from '../assets/images/mst_logo1.png';

import { createEvent } from '../CRUD_handlers/Event/createEvent';
import { deleteEvent } from '../CRUD_handlers/Event/deleteEvent';
import { updateEvent } from '../CRUD_handlers/Event/updateEvent';

function ManageEvent() {
  const { events, eventType, loading, error } = useEventContext();
  const [eventList, setEventList] = useState([]);

  const [createLoading, setCreateLoading] = useState(false);
  const [createErr, setCreateErr] = useState(null);

  const [editImageFiles, setEditImageFiles] = useState([]);
  const [editPreviewImages, setEditPreviewImages] = useState([]);

  useEffect(() => {
    if (events) {
      setEventList(events);
    }
  }, [events]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // Form state for new event
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    status: 'upcoming',
    highlight: false,
  });

  useEffect(() => {
    return () => {
      editPreviewImages.forEach(url => URL.revokeObjectURL(url));
    };
  }, [editPreviewImages]);

  const [eventImages, setEventImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  // Filter events based on search and filters
  const filteredEvents = eventList?.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      event?.venue?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      event?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      event?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate statistics
  const totalEvents = eventList?.length || 0;
  const upcomingEvents = eventList?.filter(e => e.status === 'upcoming').length || 0;
  const completedEvents = eventList?.filter(e => e.status === 'past').length || 0;
  const highlightEvent = eventList?.filter(e => e.highlight=== true).length || 0;

  // Handle delete event
  const handleDelete = async (id) => {
    try {
      const response = await deleteEvent(id);

      if (response.success) {
        setEventList(eventList.filter(event => event._id !== id));
        setShowDeleteModal(false);
      } else {
        console.error(response.message);
      }

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const resetForm = () => {
    setNewEvent({
      title: '',
      type: '',
      date: '',
      time: '',
      venue: '',
      description: '',
      status: 'upcoming',
      highlight: false,

    });
    
    // Clean up object URLs to prevent memory leaks
    eventImages.forEach(url => URL.revokeObjectURL(url));
    setEventImages([]);
    setImageFiles([]);
    setShowAddModal(false);
    setCreateErr(null);
  };

  const EventConfirm = async () => {
    // Validate required fields
    if (!newEvent.title || !newEvent.type || !newEvent.date || !newEvent.venue) {
      setCreateErr('Please fill in all required fields');
      return;
    }

    // Optional: Validate that at least one image is uploaded
    if (imageFiles.length === 0) {
      setCreateErr('Please upload at least one image');
      return;
    }

    setCreateLoading(true);
    setCreateErr(null);

    try {
      // Prepare the event data with images
      const eventData = {
        title: newEvent.title,
        type: newEvent.type,
        date: newEvent.date,
        time: newEvent.time || '',
        venue: newEvent.venue,
        description: newEvent.description || '',
        status: newEvent.status,
        highlight: newEvent.highlight,
        imageFiles: imageFiles, 
      };

      console.log('Sending event data with images:', eventData);

      const response = await createEvent(eventData);

      if (response && response.success) {
        resetForm();
        setCreateLoading(false);
        
      } else {
        setCreateLoading(false);
        setCreateErr(response?.message || 'Failed to create event');
      }
    } catch (error) {
      setCreateLoading(false);
      setCreateErr(error.message || 'An error occurred while creating the event');
      console.error('Error creating event:', error);
    }
  };

  const handleEditEvent = async () => {
    try {

      const formData = new FormData();

      formData.append("title", selectedEvent.title);
      formData.append("type", selectedEvent.type);
      formData.append("date", selectedEvent.date);
      formData.append("time", selectedEvent.time);
      formData.append("venue", selectedEvent.venue);
      formData.append("description", selectedEvent.description);
      formData.append("status", selectedEvent.status);
      formData.append("highlight", selectedEvent.highlight);

      // existing images
      formData.append("imageURL", JSON.stringify(selectedEvent.imageURL));

      // new images
      editImageFiles.forEach(file => {
        formData.append("imageURL", file);
      });

      console.log(formData);

      const response = await updateEvent(selectedEvent._id, formData);

      if (response.success) {
        setEventList(
          eventList.map(event =>
            event._id === selectedEvent._id ? selectedEvent : event
          )
        );

        setEditImageFiles([]);
        setEditPreviewImages([]);
        setShowEditModal(false);
        setSelectedEvent(null);

      } else {
        console.error(response.message);
      }

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const validFiles = files.filter(file => {
        const isValid = file.type.startsWith('image/');
        if (!isValid) {
            setCreateErr('Please upload only image files');
        }
        return isValid;
    });

    if (validFiles.length === 0) return;

    // Limit to 4 files total
    const totalFiles = [...imageFiles, ...validFiles].slice(0, 4);
    const newFiles = validFiles.slice(0, 4 - imageFiles.length);
    
    if (newFiles.length === 0) {
        setCreateErr('Maximum 4 images allowed');
        return;
    }

    // Create preview URLs
    const newImageUrls = newFiles.map(f => URL.createObjectURL(f));
    
    setImageFiles(prev => [...prev, ...newFiles]);
    setEventImages(prev => [...prev, ...newImageUrls]);
    
    // Clear any previous error
    setCreateErr(null);
  };

  const removeImage = (index) => {
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(eventImages[index]);
    
    const newImages = [...eventImages];
    const newFiles = [...imageFiles];
    
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    
    setEventImages(newImages);
    setImageFiles(newFiles);
  };


  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(file => file.type.startsWith('image/'));

    const total = [...editImageFiles, ...validFiles].slice(0, 4);

    const newFiles = validFiles.slice(0, 4 - editImageFiles.length);

    const previews = newFiles.map(file => URL.createObjectURL(file));

    setEditImageFiles(prev => [...prev, ...newFiles]);
    setEditPreviewImages(prev => [...prev, ...previews]);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'past': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'upcoming': return 'fa-calendar-alt text-yellow-600';
      case 'past': return 'fa-check-circle text-gray-600';
      default: return 'fa-circle text-gray-400';
    }
  };

  const BASE_URL = "http://localhost:8000";
  const placeholderImg = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
          <p className="text-gray-600 mt-1">View and manage all academic and departmental events</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <i className={`fas fa-${viewMode === 'grid' ? 'list' : 'th-large'} text-gray-600`}></i>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="fas fa-download text-gray-600 mr-2"></i>
            Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors font-medium cursor-pointer"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Event
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {[
            { number: totalEvents, label: 'Total Events', icon: 'fas fa-calendar-alt', color: 'blue' },
            { number: completedEvents, label: 'Past Events', icon: 'fas fa-calendar-day', color: 'yellow' },
            { number: upcomingEvents, label: 'Upcoming Events' , icon: 'fas fa-check-circle', color: 'gray'},
            { number: highlightEvent, label: 'Highlight Events' , icon: 'fas fa-star', color: 'red'},
        ].map((stat, index) => (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4" key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
              </div>
              <div className={`bg-${stat.color}-50 p-3 rounded-lg`}>
                <i className={`${stat.icon} text-${stat.color}-600 text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search events by name, venue, type, or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                {eventType?.map(type => (
                  <option key={type.id} value={type.slug}>{type.name}</option>
                ))}
              </select>
              <i className="fas fa-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
              <i className="fas fa-flag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents?.map(event => (
            <div key={event._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <img
                  src={
                    event.imageURL?.length > 0
                      ? `${BASE_URL}${event.imageURL[0]}`
                      : `${placeholderImg}`
                  }
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{event.title}</h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-calendar-day w-5 text-gray-400"></i>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-clock w-5 text-gray-400"></i>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-map-marker-alt w-5 text-gray-400"></i>
                    <span>{event.venue}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <i className="fas fa-star text-gray-400"></i>
                    <span className="text-sm text-gray-600">{event.highlight ? 'Highlighted' : 'Regular'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowViewModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setEditImageFiles([]);
                        setEditPreviewImages([]);
                        setShowEditModal(true);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEvents?.map(event => (
                <tr key={event._id} className="hover:bg-gray-50">

                  <td className="px-6 py-4">
                      <img 
                        src={
                          event.imageURL?.length > 0
                            ? `${BASE_URL}${event.imageURL[0]}`
                            : `${placeholderImg}`
                        }
                        alt={event.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">{event.highlight ? 'Featured' : 'Regular'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{event.date}</div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{event.venue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setEditImageFiles([]);
                          setEditPreviewImages([]);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">

            {/* header section */}
            <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
              {/* Left Section */}
              <div className="flex gap-3 items-center">
                <img
                  src={logo}
                  alt="MST Logo"
                  className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
                />
              
                <div>
                  <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
                  <p className="text-sm text-gray-500">Add New Event</p>
                </div>
              </div>
              <button onClick={resetForm} className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6 ">
              {/* Display error message */}
              {createErr && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {createErr}
                </div>
              )}

              <form  
                encType="multipart/form-data" 
                onSubmit={(e) => {
                  e.preventDefault();
                  EventConfirm();
                }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1 space-y-4">
                    {/* title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Title <span className="text-red-600 text-lg">*</span></label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      />
                    </div>

                    {/* event type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Type <span className="text-red-600 text-lg">*</span></label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                      >
                        <option value="">Select Type</option>
                        {eventType?.map(type => (
                          <option key={type.id} value={type.slug}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent [color-scheme:light] cursor-pointer"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]} // Optional: prevents past dates
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Select a date for your event
                      </p>
                    </div>
                  </div>

                  {/* Event images */}
                  <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Images <span className="text-red-600 text-lg">*</span> {imageFiles.length > 0 && `(${imageFiles.length}/4)`}
                      </label>

                      <div className="relative bg-gray-200 min-h-[200px] w-full rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FFC53A] transition-colors flex flex-col items-center justify-center overflow-hidden p-2">
                        
                        {/* Image Previews */}
                        {eventImages.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2 w-full">
                            {eventImages.map((img, index) => (
                              <div key={index} className="relative group">

                                {/* Cover Image Badge */}
                                {index === 0 && (
                                  <div className="absolute bottom-0 left-2 z-10">
                                    <span className="bg-[#FFC53A] text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                                      Cover Image
                                    </span>
                                  </div>
                                )}

                                <div className="relative">
                                  <img
                                    src={img}
                                    alt={`preview ${index + 1}`}
                                    className={`w-full h-24 object-cover rounded-lg ${index === 0 ? `border-2 border-[var(--accent-yellow)]` : ``}`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center items-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                  >
                                    <i className="fas fa-times text-xs"></i>
                                  </button>
                                </div>
                              </div>
                            ))}

                            {eventImages.length < 4 && (
                              <label className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-[#FFC53A] transition-colors">
                                <i className="fas fa-plus text-gray-400"></i>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleImageChange}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        ) : (
                          // first display image before choosing any image
                          <label className="w-full h-full min-h-[200px] flex flex-col items-center justify-center cursor-pointer">
                            <div className="text-5xl text-gray-400 mb-2">
                              <i className="fa-solid fa-image"></i>
                            </div>
                            <p className="text-sm text-gray-500">Click to upload images</p>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageChange}
                              className="hidden"
                              required
                            />
                          </label>
                        )}

                        {eventImages.length > 0 && eventImages.length < 4 && (
                          <label className="mt-2 w-full py-2 border border-gray-300 rounded-lg text-center text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                            Add More Images
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">You can upload up to 4 images (JPEG, PNG, etc.)</p>
                    </div>
                  </div>

                
                  {/* time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time <span className="text-red-600 text-lg">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g., 9:00 AM - 9:00 PM"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Venue <span className="text-red-600 text-lg">*</span></label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                      value={newEvent.venue}
                      onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status <span className="text-red-600 text-lg">*</span></label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                      value={newEvent.status}
                      onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="">
                      <p className=" mb-1 text-sm font-medium text-gray-700">
                        Highlight Event
                      </p>
                      
                      <button
                        type="button"
                        role="switch"
                        aria-checked={newEvent.highlight}
                        onClick={() => setNewEvent({...newEvent, highlight: !newEvent.highlight})}
                        className={`
                          relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer
                          ${newEvent.highlight ? 'bg-[#FFC53A]' : 'bg-gray-400'}
                        `}
                      >
                        <span
                          className={`
                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                            ${newEvent.highlight ? 'translate-x-6' : 'translate-x-1'}
                          `}
                        />
                      </button>
                      
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                    disabled={createLoading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={createLoading || imageFiles.length === 0}
                  >
                    {createLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                        Creating...
                      </>
                    ) : (
                      "Add Event"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            {/* header section */}
            <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
              {/* Left Section */}
              <div className="flex gap-3 items-center">
                <img
                  src={logo}
                  alt="MST Logo"
                  className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
                />
              
                <div>
                  <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
                  <p className="text-sm text-gray-500">Edit Event</p>
                </div>
              </div>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form 
              className='p-6' 
              onSubmit={(e) => {
                e.preventDefault();
                handleEditEvent();
              }}
            >

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 space-y-4">
                  {/* title */}
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Title <span className="text-red-600 text-lg">*</span></label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                      value={selectedEvent.title}
                      onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}
                    />
                  </div>

                  {/* event type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type <span className="text-red-600 text-lg">*</span></label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                      value={selectedEvent.type}
                      onChange={(e) => setSelectedEvent({...selectedEvent, type: e.target.value})}
                    >
                      {eventType?.map(type => (
                        <option key={type.id} value={type.slug}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                
                  {/* event  date*/}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-600 text-lg">*</span></label>
                    <input
                      type="date"
                      value={selectedEvent.date}
                      onChange={(e) => setSelectedEvent({...selectedEvent, date: e.target.value})}
                    />
                  </div>

                </div>

                {/* Event images */}
                <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Images <span className="text-red-600 text-lg">*</span> 
                        {(selectedEvent.imageURL.length + editImageFiles.length) > 0 && 
                        `(${selectedEvent.imageURL.length + editImageFiles.length}/4)`
                        }
                      </label>

                      <div className="relative bg-gray-200 min-h-[200px] w-full rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FFC53A] transition-colors flex flex-col items-center justify-center overflow-hidden p-2">
                      
                        {/* Image Previews */}
                        {selectedEvent?.imageURL?.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2 w-full">
  
                          {/* Existing Images */}
                          {selectedEvent?.imageURL?.map((img, index) => (
                            <div key={index} className="relative group">

                              {/* Cover Image Badge */}
                              {index === 0 && (
                                  <div className="absolute bottom-0 left-2 z-10">
                                    <span className="bg-[#FFC53A] text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                                      Cover Image
                                    </span>
                                  </div>
                              )}

                              <div className="relative">
                                <img
                                  src={`${BASE_URL}${img}`}
                                  alt='event images'
                                  className={`w-full h-24 object-cover rounded-lg ${index === 0 ? `border-2 border-[var(--accent-yellow)]` : ``}`}
                                />
                                <button
                                  onClick={() => {
                                    const updated = [...selectedEvent.imageURL];
                                    updated.splice(index, 1);
                                    setSelectedEvent({...selectedEvent, imageURL: updated});
                                  }}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                  <i className="fas fa-times text-xs"></i>
                                </button>
                              </div>
                              
                            </div>
                          ))}

                          {/* New Images */}
                          {editPreviewImages.map((img, index) => (
                            <div key={index} className="relative group">
                              <img src={img} className="w-full h-24 object-cover rounded-lg " />
                              
                              <button
                                onClick={() => {
                                  const newPreviews = [...editPreviewImages];
                                  const newFiles = [...editImageFiles];

                                  URL.revokeObjectURL(newPreviews[index]);

                                  newPreviews.splice(index, 1);
                                  newFiles.splice(index, 1);

                                  setEditPreviewImages(newPreviews);
                                  setEditImageFiles(newFiles);
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 flex justify-center items-center  cursor-pointer"
                              >
                                <i className="fas fa-times text-xs"></i>
                              </button>
                             
                            </div>
                          ))}

                          {/* Add button */}
                          {(selectedEvent.imageURL.length + editImageFiles.length) < 4 && (
                              <label className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-[#FFC53A] transition-colors">
                              <i className="fas fa-plus text-gray-400"></i>
                              <input
                                type="file"
                                accept='image/*'
                                multiple
                                onChange={handleEditImageChange}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                        ) : (
                          // first display image before choosing any image
                          <label className="w-full h-full min-h-[200px] flex flex-col items-center justify-center cursor-pointer">
                            <div className="text-5xl text-gray-400 mb-2">
                              <i className="fa-solid fa-image"></i>
                            </div>
                            <p className="text-sm text-gray-500">Click to upload images</p>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleEditImageChange}
                              className="hidden"
                              required
                            />
                          </label>
                        )}

                        {(selectedEvent.imageURL.length + editImageFiles.length) < 4 && (
                          <label className="mt-2 w-full py-2 border border-gray-300 rounded-lg text-center text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                            Add More Images
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleEditImageChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">You can upload up to 4 images (JPEG, PNG, etc.)</p>
                    </div>
                </div>

                {/* time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time <span className="text-red-600 text-lg">*</span></label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={selectedEvent.time}
                    onChange={(e) => setSelectedEvent({...selectedEvent, time: e.target.value})}
                  />
                </div>

                {/* venue */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue <span className="text-red-600 text-lg">*</span></label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={selectedEvent.venue}
                    onChange={(e) => setSelectedEvent({...selectedEvent, venue: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status <span className="text-red-600 text-lg">*</span></label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={selectedEvent.status}
                    onChange={(e) => setSelectedEvent({...selectedEvent, status: e.target.value})}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>

                <div className="flex justify-center items-center">

                  <div className="">
                    <p className=" mb-1 text-sm font-medium text-gray-700">
                      Highlight Event
                    </p>

                    <button
                        type="button"
                        role="switch"
                        aria-checked={selectedEvent.highlight}
                        onClick={() => 
                          setSelectedEvent({
                            ...selectedEvent,
                            highlight: !selectedEvent.highlight
                          })
                        }
                        className={`
                          relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer
                          ${selectedEvent.highlight ? 'bg-[#FFC53A]' : 'bg-gray-400'}
                        `}
                      >
                        <span
                          className={`
                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                            ${selectedEvent.highlight ? 'translate-x-6' : 'translate-x-1'}
                          `}
                        />
                    </button>
                     

                  </div>

                  {/* <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedEvent.highlight}
                      onChange={(e) => setSelectedEvent({...selectedEvent, highlight: e.target.checked})}
                      className="rounded border-gray-300 text-[#FFC53A] focus:ring-[#FFC53A]"
                    />
                    Highlight Event
                  </label> */}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={selectedEvent.description}
                    onChange={(e) => setSelectedEvent({...selectedEvent, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      

      {/* View Event Modal */}
      {showViewModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                      {selectedEvent.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status}
                    </span>
                  </div>
                </div>
                <i className={`fas ${getStatusIcon(selectedEvent.status)} text-3xl`}></i>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Venue</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.venue}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Date</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.date}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600">Time</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-600">Highlighted</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.highlight ? 'Yes' : 'No'}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">Registered</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.registered ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                <p className="text-gray-600">{selectedEvent.description}</p>
              </div>

              {selectedEvent.imageURL && selectedEvent.imageURL.length > 0 && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Images</p>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedEvent.imageURL.map((image, index) => (
                      <img 
                        key={index}
                        src={`${BASE_URL}${image}`} 
                        alt={`Event ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Event</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedEvent.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedEvent._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEvent;