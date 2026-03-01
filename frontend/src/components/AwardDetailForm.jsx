import React, { useContext, useEffect, useState } from 'react';
import Award from "../assets/images/award1.png";
import { AppContext } from '../providers/AppContextProvider';

function AwardDetailForm() {
  const { showAwardDetail, setShowAwardDetail, AwardDetailHandler } = useContext(AppContext);
  const [awardDetail, setAwardDetail] = useState(null);

  useEffect(() => {
    const storedAward = localStorage.getItem('award-detail');
    if (storedAward) {
      try {
        setAwardDetail(JSON.parse(storedAward));
      } catch (error) {
        console.error('Error parsing award detail:', error);
        setAwardDetail(null);
      }
    }
  }, [showAwardDetail]); // Re-fetch when modal visibility changes

  if (!awardDetail || !showAwardDetail) return null;

  return (
    <div
        onClick={() => AwardDetailHandler()}
        id="award-modal-backdrop"
        className={`fixed inset-0 z-[100] items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out 
            ${
            showAwardDetail ? "flex" : "hidden"
        }`}
    >
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 max-w-2xl w-full relative max-h-[95vh] overflow-y-auto scrollbar-hide">
        {/* Close Button */}
        <div className="flex justify-end sticky top-0 bg-white p-4 pb-2">
            <button 
                onClick={() => AwardDetailHandler()}
                className='cursor-pointer w-10 h-10 rounded-full bg-gray-100 border border-gray-300 text-gray-400 hover:rotate-90 transition-all duration-300 ease-in-out'>
                    <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
        
        <div className="flex flex-col items-center mb-4 p-4">
          <img 
            src={awardDetail.image || Award} 
            alt={awardDetail?.title} 
            className="w-40 h-40 object-cover rounded-lg mb-4 shadow-md" 
          />
          
          <div className="text-center w-full">
            <div className="text-2xl font-bold text-gray-900 mb-3">{awardDetail?.title}</div>
            
            {/* Award Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-left bg-gray-100 p-4 rounded-lg mb-4 border border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{awardDetail?.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Organization</p>
                <p className="font-medium">{awardDetail?.organization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{awardDetail?.location}, {awardDetail?.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{awardDetail?.date}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 text-left bg-gray-100 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{awardDetail?.description}</p>
            </div>

            {/* How and Why */}
            <div className="mb-4 text-left bg-gray-100 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">How We Achieved It</h3>
              <p className="text-gray-700 mb-3">{awardDetail?.how}</p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Why We Won</h3>
              <p className="text-gray-700 mb-3">{awardDetail?.why}</p>
            </div>

            {/* Impact */}
            <div className="mb-4 text-left bg-gray-100 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Impact</h3>
              <p className="text-gray-700">{awardDetail?.impact}</p>
            </div>

            {/* Metrics */}
            {awardDetail?.metrics && (
              <div className="mb-4 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Key Metrics</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  {Object.entries(awardDetail.metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between mb-2">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}: 
                      </span>
                      <span className="font-semibold">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwardDetailForm;