import React from "react";
import w4 from "../assets/images/w1.jpg";

function Faculty() {
  return (
    <div className="bg-white">

      <section className="relative h-[100vh] flex items-center overflow-hidden">
        {/* Background Container */}
        <div className="absolute inset-0 z-0">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center lg:bg-right bg-no-repeat"
            style={{ 
              backgroundImage: `url(${w4})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
              backgroundAttachment: 'fixed'
            }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* Subtle Badge */}
              <div className="inline-flex items-center gap-3 lg:mt-10 mb-6 lg:mb-8">
                <div className="w-10 h-0.5 bg-yellow-500"></div>
                <span className="text-yellow-400 font-medium tracking-widest uppercase text-sm">
                  Excellence in Education
                </span>
              </div>

              {/* Main Heading - Responsive */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-white block">Meet Our</span>
                <span className="text-yellow-400">Distinguished</span>
                <span className="text-white"> Faculty</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mb-8 sm:mb-10 leading-relaxed">
                World-class educators, researchers, and industry leaders dedicated to shaping the future of academia and innovation.
              </p>

              {/* CTA Buttons - Responsive */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group relative px-6 sm:px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:scale-95">
                  <span className="text-sm sm:text-base">Explore Faculty Profiles</span>
                  <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className="px-6 sm:px-8 py-3 bg-transparent border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 active:scale-95 text-sm sm:text-base">
                  View Departments
                </button>
              </div>

              {/* Stats Section - Responsive Grid */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { value: "150+", label: "Expert Faculty" },
                  { value: "95%", label: "PhD Holders" },
                  { value: "25+", label: "Countries" },
                  { value: "50+", label: "Research Awards" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="lecturer-section min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Our Expert Lecturers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn from experienced professionals with strong academic backgrounds and
              real-world industry expertise.
            </p>
          </div>

          {/* Lecturer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Lecturer Card */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Dr. Aung Min"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-5 border-4 border-yellow-400"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. Aung Min
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                PhD (Computer Science)
              </p>
              <p className="text-gray-600 mt-3 text-sm">
                Artificial Intelligence, Machine Learning, Data Science
              </p>
            </div>

            {/* Lecturer Card */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Ms. Thandar Win"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-5 border-4 border-yellow-400"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Ms. Thandar Win
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                MSc (Information Technology)
              </p>
              <p className="text-gray-600 mt-3 text-sm">
                Web Development, UI/UX Design, Frontend Engineering
              </p>
            </div>

            {/* Lecturer Card */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="U Kyaw Zaw"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-5 border-4 border-yellow-400"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                U Kyaw Zaw
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                BEng (Software Engineering)
              </p>
              <p className="text-gray-600 mt-3 text-sm">
                Backend Development, Cloud Computing, System Architecture
              </p>
            </div>

            {/* Lecturer Card */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Daw May Zin Oo"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-5 border-4 border-yellow-400"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Daw May Zin Oo
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                MBA, Dip (ICT Education)
              </p>
              <p className="text-gray-600 mt-3 text-sm">
                Project Management, Business IT, Digital Transformation
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Faculty;
