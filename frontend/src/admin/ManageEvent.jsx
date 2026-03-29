import React, { useState, useEffect } from 'react';
import { useEventContext } from '../providers/EventProvider';
import Loading from '../pages/Loading';
import NotFound from '../pages/NotFound';

import logo from '../assets/images/mst_logo1.png';

// handler functions
import { createEvent } from '../CRUD_handlers/Event/createEvent';
import { deleteEvent } from '../CRUD_handlers/Event/deleteEvent';
import { updateEvent } from '../CRUD_handlers/Event/updateEvent';

// modals 
import EventCreateModal from '../CRUD_Modals/Event/EventCreateModal';
import EventViewModal from '../CRUD_Modals/Event/EventViewModal';
import EventEditModal from '../CRUD_Modals/Event/EventEditModal';
import EventDeleteModal from '../CRUD_Modals/Event/EventDeleteModal';
import SearchNotFound from '../components/SearchNotFound';

function ManageEvent() {
  const { events, eventType, loading, error } = useEventContext();
  const [eventList, setEventList] = useState([]);

  const [createLoading, setCreateLoading] = useState(false);
  const [createErr, setCreateErr] = useState(null);

  const [editImageFiles, setEditImageFiles] = useState([]);
  const [editPreviewImages, setEditPreviewImages] = useState([]);

  const [deletedImages, setDeletedImages] = useState([]);

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

      console.log(response);

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

      const response = await createEvent(eventData);

      if (response && response.success) {
       
        setEventList(prev => [response.event, ...prev]);
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

    const remainingSlots =
      4 - (selectedEvent.imageURL.length + editImageFiles.length);

    if (remainingSlots <= 0) return;

    const newFiles = validFiles.slice(0, remainingSlots);
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
  



  const removeExistingImage = (index) => {
    const imgToDelete = selectedEvent.imageURL[index];

    const updated = [...selectedEvent.imageURL];
    updated.splice(index, 1);

    setSelectedEvent(prev => ({
      ...prev,
      imageURL: updated
    }));

    // track deleted image
    setDeletedImages(prev => [...prev, imgToDelete]);
  };

  const removeNewImage = (index) => {
    URL.revokeObjectURL(editPreviewImages[index]);
    
    const newPreviews = [...editPreviewImages];
    const newFiles = [...editImageFiles];
    
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    
    setEditPreviewImages(newPreviews);
    setEditImageFiles(newFiles);
  };

  const handleEditEvent = async () => {
    
    try {
      const formData = new FormData();

      // append all fields except imageURL
      Object.keys(selectedEvent).forEach(key => {
        if (key !== "imageURL" && key !== "_id") {
          formData.append(key, selectedEvent[key]);
        }
      });

      // remaining images after deletion
      formData.append(
        "existingImages",
        JSON.stringify(selectedEvent.imageURL || [])
      );

      // delete images
      formData.append(
        "deleteImages",
        JSON.stringify(deletedImages)
      );

      // new images
      editImageFiles.forEach(file => {
        formData.append("imageURL", file);
      });

      const response = await updateEvent(selectedEvent._id, formData);

      if (response.success) {
        // Update the event in the list

        const updatedEvent = response.event || response.data;

        setEventList(prev =>
          prev.map(event =>
            event._id === selectedEvent._id
              ? updatedEvent
              : event
          )
        );

        // cleanup
        editPreviewImages.forEach(url => URL.revokeObjectURL(url));
        setEditImageFiles([]);
        setEditPreviewImages([]);
        setDeletedImages([]);

        setShowEditModal(false);
        setSelectedEvent(null);

      } else {
        console.error(response.message);
      }

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;
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

      {

        totalEvents === 0 ? (
          <SearchNotFound searchType={'event'}/>
        ) : (

      viewMode === 'grid' ? (
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
                        setDeletedImages([]);
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
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
                          setDeletedImages([]);
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
      )
        )
      }

      

      <EventCreateModal
        show={showAddModal}
        onClose={resetForm}
        onSubmit={EventConfirm}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        imageFiles={imageFiles}
        eventImages={eventImages}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
        createLoading={createLoading}
        createErr={createErr}
        eventType={eventType}
      />

      
      {/* Edit Event Modal */}
      <EventEditModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          // Clean up preview URLs when closing
          editPreviewImages.forEach(url => URL.revokeObjectURL(url));
          setEditImageFiles([]);
          setEditPreviewImages([]);
        }}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        onSubmit={handleEditEvent}
        editPreviewImages={editPreviewImages}
        editImageFiles={editImageFiles}
        handleEditImageChange={handleEditImageChange}
        eventType={eventType}
        removeExistingImage={removeExistingImage}
        removeNewImage={removeNewImage}
      />
      

      <EventViewModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        selectedEvent={selectedEvent}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        BASE_URL={BASE_URL}
      />

      <EventDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        selectedEvent={selectedEvent}
      />
    </div>
  );
}

export default ManageEvent;