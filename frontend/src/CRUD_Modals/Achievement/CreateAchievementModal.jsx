import React, { useState } from 'react';
import logo from '../../assets/images/mst_logo1.png';
import { createAchievement } from '../../CRUD_handlers/Achievement/createAchievement';
import { useCountry } from '../../providers/CountryProvider';

function CreateAchievementModal({ isOpen, onClose, onSave, categories }) {
  const { countries, countryLoading, countryErr } = useCountry();
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0] || 'Academic Excellence',
    organization: '',
    country: '',
    location: '',
    date: '',
    how: '',
    why: '',
    impact: '',
    metrics: {},
    image: null,
    description: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      // append all fields
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("organization", formData.organization);
      data.append("country", formData.country);
      data.append("location", formData.location);
      data.append("date", formData.date);
      data.append("description", formData.description);
      data.append("how", formData.how);
      data.append("why", formData.why);
      data.append("impact", formData.impact);

      // optional fields
      data.append("metrics", JSON.stringify(formData.metrics || {}));

      if (formData.image) {
        data.append("image", formData.image);
      }

      // call API
      const result = await createAchievement(data);

      if (result.success) {
        // console.log(formData);
        setLoading(false);
        onSave(result.achievement); // send back to parent
        handleClose();
      } else {
        setLoading(false);
        console.error(result.message);
        alert("Failed to create achievement");
      }

    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Something went wrong");
    }
  };



  const handleClose = () => {
    setFormData({
      title: '',
      category: categories[0] || 'Academic Excellence',
      organization: '',
      country: '',
      location: '',
      date: '',
      how: '',
      why: '',
      impact: '',
      metrics: {},
      image: null, 
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        
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
              <p className="text-sm text-gray-500">Add New Achievement</p>
            </div>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-times text-md"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className='p-6'>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter achievement title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={formData.organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                placeholder="Organization name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>

              {countryLoading ? (
                <div className="flex items-center justify-center px-3 py-2 border border-gray-200 rounded-xl bg-gray-50">
                  <svg className="animate-spin h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-sm text-gray-500">Loading countries...</p>
                </div>
              ) : countryErr ? (
                <div className="px-3 py-2 border border-red-200 rounded-xl bg-red-50">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Failed to load countries. Please try again.
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative">
                    <select
                      required
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      className={`
                        w-full px-3 py-2 pr-12 
                        border border-gray-300 rounded-lg 
                        bg-white
                        focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent
                        transition-all duration-200
                        appearance-none
                        cursor-pointer
                        ${formData.country ? 'text-gray-900' : 'text-gray-500'}
                      `}
                    >
                      <option value="" disabled>Select Country</option>
                      {countries.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    
                    {/* Custom dropdown icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Selected country flag display */}
                  {formData.country && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
                      <img
                        src={countries.find(c => c.name === formData.country)?.flag}
                        alt={`${formData.country} flag`}
                        className="w-6 h-6 object-cover rounded-full border border-gray-200 shadow-sm"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City/Location"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] cursor-pointer"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>


            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="file"
                accept='image/*'
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                onChange={(e) => handleChange('image', e.target.files[0])}
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of the achievement"
              ></textarea>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How Achieved
              </label>
              <textarea
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={formData.how}
                onChange={(e) => handleChange('how', e.target.value)}
                placeholder="Describe how this achievement was accomplished"
              ></textarea>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why Received
              </label>
              <textarea
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={formData.why}
                onChange={(e) => handleChange('why', e.target.value)}
                placeholder="Reason for receiving this achievement"
              ></textarea>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Impact
              </label>
              <textarea
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={formData.impact}
                onChange={(e) => handleChange('impact', e.target.value)}
                placeholder="Impact of this achievement"
              ></textarea>
            </div>
            
            
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
                type="submit"
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                    Creating...
                  </>
                ) : (
                  "Add Achievement"
                )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAchievementModal;