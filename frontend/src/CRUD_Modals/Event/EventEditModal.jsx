import React from 'react';
import logo from '../../assets/images/mst_logo1.png';

function EventEditModal({
  show,
  onClose,
  selectedEvent,
  setSelectedEvent,
  onSubmit,
  editPreviewImages,
  editImageFiles,
  handleEditImageChange,
  eventType,
  removeExistingImage,
  removeNewImage,
}) {
  if (!show || !selectedEvent) return null;

  const BASE_URL = "http://localhost:8000";

  return (
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
          <button 
            onClick={onClose} 
            className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form 
          className='p-6' 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 space-y-4">
              {/* title */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title <span className="text-red-600 text-lg">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}
                />
              </div>

              {/* event type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type <span className="text-red-600 text-lg">*</span>
                </label>
                <select
                  required
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-600 text-lg">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent [color-scheme:light] cursor-pointer"
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
                  {(selectedEvent.imageURL?.length + editImageFiles.length) > 0 && 
                  `(${selectedEvent.imageURL?.length + editImageFiles.length}/4)`
                  }
                </label>

                <div className="relative bg-gray-200 min-h-[200px] w-full rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FFC53A] transition-colors flex flex-col items-center justify-center overflow-hidden p-2">
                
                  {/* Image Previews */}
                  {selectedEvent?.imageURL?.length > 0 || editPreviewImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 w-full">
    
                    {/* Existing Images */}
                    {selectedEvent.imageURL?.map((img, index) => (
                      <div key={`existing-${index}`} className="relative group">

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
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </div>
                        
                      </div>
                    ))}

                    {/* New Images */}
                    {editPreviewImages.map((img, index) => (
                      <div key={`new-${index}`} className="relative group">
                        <img 
                          src={img} 
                          alt="new preview"
                          className="w-full h-24 object-cover rounded-lg" 
                        />
                        
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <i className="fas fa-times text-xs"></i>
                        </button>
                      </div>
                    ))}

                    {/* Add button */}
                    {(selectedEvent.imageURL?.length + editImageFiles.length) < 4 && (
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

                  {(selectedEvent.imageURL?.length + editImageFiles.length) < 4 && (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time <span className="text-red-600 text-lg">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 9:00 AM - 9:00 PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={selectedEvent.time}
                onChange={(e) => setSelectedEvent({...selectedEvent, time: e.target.value})}
              />
            </div>

            {/* venue */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue <span className="text-red-600 text-lg">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={selectedEvent.venue}
                onChange={(e) => setSelectedEvent({...selectedEvent, venue: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-600 text-lg">*</span>
              </label>
              <select
                required
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
                <p className="mb-1 text-sm font-medium text-gray-700">
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
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type='submit'
              className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer flex items-center justify-center gap-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventEditModal;