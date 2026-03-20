import React from 'react';

function EventDeleteModal({ show, onClose, onDelete, selectedEvent }) {
  if (!show || !selectedEvent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Delete Event
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-800">
              "{selectedEvent.title}"
            </span>
            ? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={() => onDelete(selectedEvent._id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventDeleteModal;