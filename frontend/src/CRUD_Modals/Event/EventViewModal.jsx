import React from 'react';
import logo from '../../assets/images/mst_logo1.png';


function EventViewModal({
  show,
  onClose,
  selectedEvent,
  getStatusColor,
  getStatusIcon,
  BASE_URL
}) {
  if (!show || !selectedEvent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">

        {/* header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
          {/* Left Section */}
          <div className="flex gap-3 items-center ">
            <img
              src={logo}
              alt="MST Logo"
              className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
              <p className="text-sm text-gray-500">View Event Details</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="space-y-2 p-6 max-w-2xl mx-auto">

          {/* Header Card with Hero Section */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg overflow-hidden  h-60 ">
            
              <img 
              src={`${BASE_URL}${selectedEvent?.imageURL?.[0] || ''}`} 
              alt={selectedEvent.title}
              className="w-full h-full object-cover"
               
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/90 via-black/50 to-transparent"></div>
              
              {/* Event Title Overlay */}
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-2xl font-bold mb-1">{selectedEvent.title || 'Untitled Event'}</h2>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs">
                    <i className="fas fa-calendar mr-1"></i>
                    {selectedEvent.date}
                  </span>
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs">
                    <i className="fas fa-clock mr-1"></i>
                    {selectedEvent.time}
                  </span>
                </div>
              </div>

          </div>

          {/* Title + Status */}
          <div className="flex items-center justify-between p-2 bg-gray-200 rounded-lg border border-gray-100 shadow-lg">
            <div className='p-2 bg-white w-full rounded-lg border border-gray-200'>
              <h3 className="text-xl font-semibold text-gray-900 text-shadow-lg">
                {selectedEvent.title}
              </h3>

              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                  {selectedEvent.type}
                </span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { 
                data: selectedEvent.date, 
                label: 'Date', 
                color: 'green', 
              },
              { 
                data: selectedEvent.time, 
                label: 'Time', 
                color: 'orange', 
              },
              { 
                data: selectedEvent.status, 
                label: 'Status',
                color: 'blue', 
              },
              { 
                data: selectedEvent.highlight ? 'Yes' : 'No', 
                label: 'Highlight',
                color: 'yellow', 
              },
            ].map((stat, index) => (
              <div className="bg-gray-200 rounded-lg shadow-lg border border-gray-100 p-2" key={index}>
                <div className="bg-white shadow-lg p-2 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-md font-semibold text-gray-900">{stat.data}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Venue */}
          <div className="p-2 bg-gray-200 rounded-lg border border-gray-100 shadow-lg">
            <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-lg">
              <p className="text-sm text-gray-500">Venue</p>
              <p className="font-semibold text-gray-900">{selectedEvent.venue}</p>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/50 px-5 py-3">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-align-left text-gray-500 text-sm"></i>
                  <h3 className="font-medium text-gray-700">Description</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 leading-relaxed">
                  {selectedEvent.description || 'No description provided for this event.'}
                </p>
              </div>
          </div>

          {/* Images Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/50 px-5 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-images text-gray-500 text-sm"></i>
                    <h3 className="font-medium text-gray-700">Gallery</h3>
                  </div>
                  {selectedEvent.imageURL?.length > 0 && (
                    <span className="text-xs font-medium text-gray-500">
                      {selectedEvent.imageURL.length} {selectedEvent.imageURL.length === 1 ? 'image' : 'images'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-5">
                {selectedEvent.imageURL && selectedEvent.imageURL.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {selectedEvent.imageURL.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100"
                        onClick={() => window.open(`${BASE_URL}${image}`, '_blank')}
                      >
                        <img
                          src={`${BASE_URL}${image}`}
                          alt={`Event ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i className="fas fa-expand text-white text-xl"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                      <i className="fas fa-image text-gray-400 text-3xl"></i>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">No images available</p>
                    <p className="text-gray-400 text-xs mt-1">Images will appear here once added</p>
                  </div>
                )}
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventViewModal;