import React from 'react';

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
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="space-y-4">

          {/* Title + Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedEvent.title}
              </h3>

              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                  {selectedEvent.type}
                </span>

                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
              </div>
            </div>

            <i className={`fas ${getStatusIcon(selectedEvent.status)} text-3xl`}></i>
          </div>

          {/* Venue */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">Venue</p>
            <p className="font-semibold text-gray-900">{selectedEvent.venue}</p>
          </div>

          {/* Date & Time */}
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

          {/* Highlight + Registered */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-600">Highlighted</p>
              <p className="font-semibold text-gray-900">
                {selectedEvent.highlight ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">Registered</p>
              <p className="font-semibold text-gray-900">
                {selectedEvent.registered ? 'Yes' : 'No'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
            <p className="text-gray-600">{selectedEvent.description}</p>
          </div>

          {/* Images */}
          {selectedEvent.imageURL?.length > 0 && (
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Images</p>

              <div className="grid grid-cols-3 gap-2">
                {selectedEvent.imageURL.map((img, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}${img}`}
                    alt={`event ${index}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FFC53A] rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default EventViewModal;