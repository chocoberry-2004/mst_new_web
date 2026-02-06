import React from 'react';
import tchal from '../assets/images/tchal.png';

function About() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">

      {/* Hero Section */}
      <section className="h-[100vh] relative flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 py-20 bg-gradient-to-br from-white to-[var(--gray-text)] relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden">
        
        {/* background decoration */}
        {[2, 4, 6, 8, 10, 12,14,16,18,20,22,24].map((r, i) => (
          <div
            key={i}
            className={`absolute ${i % 2 === 0 ? "top-0 bg-gradient-to-b" : "bottom-0 bg-gradient-to-t"} w-1 sm:w-2 h-[80vh] ${
              i % 3 === 0
                ? "from-[var(--accent-yellow)] to-transparent"
                : i % 3 === 1
                ? "from-[var(--primary-dark)] to-transparent"
                : "from-white to-transparent"
            }`}
            style={{ right: `${r}rem` }}
          />
        ))}

          
          {/* Subtle grid pattern in background */}
          <div className="absolute inset-0 opacity-[0.05]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #0B124E 1px, transparent 1px),
                              linear-gradient(to bottom, #0B124E 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        {/* Left Content - Banner */}
        <div className="relative z-10 w-full lg:w-1/2 mb-5 lg:mb-0">
          <div className="banner max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-drop-in">
              Shaping Future
              <span className="block text-[var(--primary)] mt-2">Tech Innovators</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              For over 20 years, we've been at the forefront of IT education, 
              empowering students with cutting-edge technology skills and 
              industry-relevant knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="group relative px-5 py-2.5 border-2 border-[var(--primary-dark)] text-white rounded-lg font-medium text-sm bg-gradient-to-r from-[var(--primary-dark)] to-blue-800 hover:from-white hover:to-white hover:text-[var(--primary-dark)] transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <i className="fas fa-play-circle mr-2 text-sm"></i>
                Watch Campus Tour
                <i className="fas fa-chevron-right ml-1 transform group-hover:translate-x-0.5 transition-transform duration-300"></i>
              </button>

              <button className="group relative px-5 py-2.5 bg-white text-[var(--primary-dark)] border-2 border-[var(--primary-dark)] rounded-lg font-medium text-sm hover:text-white transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] to-blue-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <span className="relative z-10">Explore Programs</span>
                <i className="fas fa-arrow-right ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>

          </div>
        </div>

        {/* Right Content - Image */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="relative border-2 border-[var(--primary-dark)] animate-rise-up
              w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 
              rounded-full bg-gradient-to-br from-[var(--primary-dark)] to-[var(--accent-yellow)] 
              flex justify-center items-center overflow-hidden shadow-2xl">

              <img 
                src={tchal} 
                alt="Campus view" 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>

      </section>


      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission & Vision
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2"></div>
              </h2>
              
              <div className="space-y-8">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-bullseye text-white text-xl"></i>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                      <p className="text-gray-700">
                        To provide world-class IT education that combines theoretical knowledge 
                        with practical skills, fostering innovation, entrepreneurship, and 
                        social responsibility in our students.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-eye text-white text-xl"></i>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
                      <p className="text-gray-700">
                        To be recognized globally as a premier institution for IT education 
                        and research, producing graduates who lead technological innovation 
                        and drive digital transformation worldwide.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Core Values</h3>
                <div className="space-y-6">
                  {[
                    { icon: 'fas fa-lightbulb', title: 'Innovation', desc: 'Fostering creative thinking and novel solutions' },
                    { icon: 'fas fa-shield-alt', title: 'Integrity', desc: 'Upholding ethical standards in all endeavors' },
                    { icon: 'fas fa-hands-helping', title: 'Collaboration', desc: 'Working together for shared success' },
                    { icon: 'fas fa-trophy', title: 'Excellence', desc: 'Striving for the highest quality in everything' },
                    { icon: 'fas fa-globe-americas', title: 'Global Perspective', desc: 'Preparing students for worldwide impact' },
                  ].map((value, index) => (
                    <div key={index} className="flex items-center p-4 bg-white/10 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <i className={`${value.icon} text-white`}></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-lg">{value.title}</h4>
                        <p className="text-gray-300 text-sm">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Recognition */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2 mx-auto"></div>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Recognized for excellence in IT education and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '1st', text: 'Highest Enrollment Award', icon: 'fas fa-trophy', color: 'from-yellow-500 to-orange-500' },
              { number: '500+', text: 'Industry Partnerships', icon: 'fas fa-handshake', color: 'from-green-500 to-emerald-500' },
              { number: '95%', text: 'Placement Rate', icon: 'fas fa-briefcase', color: 'from-blue-500 to-cyan-500' },
              { number: '50+', text: 'Patents & Innovations', icon: 'fas fa-lightbulb', color: 'from-purple-500 to-pink-500' },
            ].map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
                  <i className={`${achievement.icon} text-white text-2xl`}></i>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                  <p className="text-gray-700">{achievement.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our BOD
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2 mx-auto"></div>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Visionary leaders guiding our institution towards excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: 'Dr. Daw Su Nandar Aung', 
                position: 'Vice Principal',
                bio: 'PhD in Computer Science, 25+ years experience',
                expertise: 'AI & Research',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                name: 'U Aung Zaw Myint', 
                position: 'Principal',
                bio: 'Former Director at Tech Giant Inc.',
                expertise: 'Curriculum Development',
                color: 'from-purple-500 to-pink-500'
              },
              { 
                name: 'U Myat Min Oo', 
                position: 'Vice Principal',
                bio: 'Industry liaison with 100+ company networks',
                expertise: 'Corporate Relations',
                color: 'from-green-500 to-emerald-500'
              },
            ].map((leader, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`h-40 bg-gradient-to-r ${leader.color} relative`}>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 rounded-full bg-white p-1">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                        <i className="fas fa-user-tie text-4xl text-gray-600"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-16 pb-8 px-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{leader.position}</p>
                  <p className="text-gray-600 mb-4">{leader.bio}</p>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700">
                    <i className="fas fa-star mr-2 text-yellow-500"></i>
                    {leader.expertise}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              World-Class Infrastructure
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2 mx-auto"></div>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              State-of-the-art facilities for holistic learning and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Advanced Labs', 
                description: '15+ specialized labs including AI, IoT, and Cybersecurity',
                icon: 'fas fa-flask',
                color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
              },
              { 
                title: 'Digital Library', 
                description: 'Access to 50,000+ e-books and research papers',
                icon: 'fas fa-book',
                color: 'bg-gradient-to-r from-purple-500 to-pink-500'
              },
              { 
                title: 'Innovation Center', 
                description: 'Dedicated space for startups and research projects',
                icon: 'fas fa-lightbulb',
                color: 'bg-gradient-to-r from-green-500 to-emerald-500'
              },
              { 
                title: 'Smart Classrooms', 
                description: 'Interactive learning with latest technology',
                icon: 'fas fa-chalkboard-teacher',
                color: 'bg-gradient-to-r from-orange-500 to-red-500'
              },
              { 
                title: 'Sports Complex', 
                description: 'Indoor and outdoor sports facilities',
                icon: 'fas fa-running',
                color: 'bg-gradient-to-r from-indigo-500 to-purple-500'
              },
              { 
                title: 'Hostel Facilities', 
                description: 'Modern accommodation with all amenities',
                icon: 'fas fa-home',
                color: 'bg-gradient-to-r from-teal-500 to-green-500'
              },
            ].map((facility, index) => (
              <div key={index} className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start">
                  <div className={`w-14 h-14 rounded-xl ${facility.color} flex items-center justify-center mr-4`}>
                    <i className={`${facility.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{facility.title}</h3>
                    <p className="text-gray-600">{facility.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2 mx-auto"></div>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {[
                { year: '1995', title: 'Foundation', description: 'College established with Computer Science department' },
                { year: '2005', title: 'Expansion', description: 'New campus inaugurated with modern infrastructure' },
                { year: '2010', title: 'Autonomy', description: 'Granted academic autonomy by UGC' },
                { year: '2015', title: 'International Recognition', description: 'Ranked among top 10 IT colleges nationally' },
                { year: '2020', title: 'Digital Transformation', description: 'Complete shift to smart campus infrastructure' },
                { year: '2023', title: 'Global Partnerships', description: 'Collaboration with 20+ international universities' },
              ].map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Shape Your Future in M.S.T ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of innovators and start your journey towards excellence in technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-file-alt mr-2"></i>
                Download Brochure
              </button>
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-white text-blue-900 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-calendar-alt mr-2"></i>
                Schedule Campus Tour
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;