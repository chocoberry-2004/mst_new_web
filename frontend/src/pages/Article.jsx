
import React from 'react'
import article_bg from "../assets/images/article_bg.jpg";
import outdoor_study_group from "../assets/images/outdoor-study-group.webp";
import study_group from "../assets/images/study-group.png";
import article_ai_bg from "../assets/images/article_ai_bg.png";

function Article() {
  return (
    <div>
      
      {/* hero section */}

      <section className="relative w-full min-h-screen flex justify-end items-end overflow-hidden">

        {/* Background Image */}
        <img
          src={article_ai_bg}
          alt="AI background"
          className="fixed inset-0 w-full h-full object-cover -z-10"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-dark)] via-transparent to-transparent -z-10"></div>

        {/* Content Box */}
        <section className="bg-[var(--primary-dark)]/40 backdrop-blur-sm animate-slide-right transition-all duration-300 ease-in-out
        py-10 md:py-16 
        px-6 md:px-10 
        text-white 
        rounded-l-[150px] 
        mb-6 sm:mb-8 md:mb-10 
        w-[95%] sm:w-[80%] md:w-auto">

          <div className="max-w-4xl ml-auto text-right ">
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Articles for IT Enthusiasts
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-200">
              Exploring the cutting-edge technologies shaping the digital landscape
            </p>

          </div>
        </section>

      </section>

    

      <section className="w-full bg-gray-50">

          {/* Header */}
          <div className="sticky top-0 bg-white z-10 shadow-sm">
            <div className="text-center py-6 border-b border-gray-200">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-[var(--primary-dark)]">
                Articles
              </h1>

              <p className="text-gray-600 text-sm md:text-base">
                Our lecturers contribute IT knowledge for the community
              </p>
            </div>
          </div>

          {/* Main Layout */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-10">

            {/* Category Sidebar */}
            <aside className="md:col-span-1 bg-white rounded-xl shadow-sm p-5 h-fit sticky top-32">

              <h2 className="text-lg font-semibold mb-4 text-[var(--primary-dark)]">
                Categories
              </h2>

              <ul className="space-y-3 text-gray-700">
                <li className="cursor-pointer hover:text-[var(--primary-dark)] transition">
                  Web Development
                </li>
                <li className="cursor-pointer hover:text-[var(--primary-dark)] transition">
                  Artificial Intelligence
                </li>
                <li className="cursor-pointer hover:text-[var(--primary-dark)] transition">
                  Cyber Security
                </li>
                <li className="cursor-pointer hover:text-[var(--primary-dark)] transition">
                  Cloud Computing
                </li>
                <li className="cursor-pointer hover:text-[var(--primary-dark)] transition">
                  Programming
                </li>
              </ul>

            </aside>

            {/* News Feed */}
            <main className="md:col-span-2 space-y-6">

              {/* Article Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <img
                  src="/images/article1.jpg"
                  alt=""
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-[var(--primary-dark)]">
                    Introduction to Artificial Intelligence
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    Learn the fundamentals of artificial intelligence and how it is
                    transforming modern technology.
                  </p>

                  <button className="text-sm font-medium text-[var(--primary-dark)] hover:underline">
                    Read More →
                  </button>
                </div>
              </div>

              {/* Article Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <img
                  src="/images/article2.jpg"
                  alt=""
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-[var(--primary-dark)]">
                    Cyber Security Best Practices
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    Protect your systems and applications by understanding common
                    security vulnerabilities.
                  </p>

                  <button className="text-sm font-medium text-[var(--primary-dark)] hover:underline">
                    Read More →
                  </button>
                </div>
              </div>

            </main>

            {/* Profile / User Panel */}
            <aside className="md:col-span-1 bg-white rounded-xl shadow-sm p-5 h-fit sticky top-32">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>

                <div>
                  <h4 className="font-semibold text-gray-800">Guest User</h4>
                  <p className="text-xs text-gray-500">Not logged in</p>
                </div>
              </div>

              <button className="w-full bg-[var(--primary-dark)] text-white py-2 rounded-lg text-sm mb-3 hover:opacity-90">
                Login
              </button>

              <button className="w-full border border-[var(--primary-dark)] text-[var(--primary-dark)] py-2 rounded-lg text-sm hover:bg-[var(--primary-dark)] hover:text-white transition">
                Create Article
              </button>

            </aside>

          </div>

        </section>

    </div>
  )
}

export default Article