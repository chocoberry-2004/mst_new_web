import React from 'react';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5 font-sans">
      <div className="max-w-md w-full text-center space-y-8">
        
        <div className="flex justify-center">
          <div className="bg-blue-100 p-6 rounded-full">
            <svg 
              className="w-16 h-16 text-blue-600 animate-spin-slow" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Maintaining...
          </h1>
          <p className="text-lg text-gray-600">
           We are temporarily maintaining our website to provide better services. 
          </p>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Footer Info */}
        <p className="text-sm text-gray-400 italic">
          We'll be back soon. Thank you for waiting.
        </p>

        {/* Button (Optional) */}
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
         We'll see if it reopens.
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;