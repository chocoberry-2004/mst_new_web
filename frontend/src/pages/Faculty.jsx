import React from "react";
import { NavLink } from "react-router-dom";
import w4 from "../assets/images/WF-hero.png";
import event_bg from "../assets/images/event_bg1.jpg";
import { useQuery } from "@tanstack/react-query";
import ApplicationForm from "../components/ApplicationForm";
import { AppContext } from "../providers/AppContextProvider";
import { useContext } from "react";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { useLecturer } from "../providers/LecturerProvider";
import { useFaculty } from "../providers/FacultyProvider";


function Faculty() {

  let {showModal, setShowModal, ApplicationFormHandler, openApplicationForm} = useContext(AppContext);
  const { lecturers, lecturerLoading, lecturerError } = useLecturer();
  const { facultyList, facultyLoading, facultyError } = useFaculty();

  if (facultyLoading || lecturerLoading) return <Loading/>;
  // if (facultyError || lecturerError) return <NotFound/>;


  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Dynamic Statistics
  const totalCourses = facultyList?.length || 0;
  const totalLecturers = lecturers?.length || 0;

  const totalCareerPaths =
    facultyList?.reduce(
      (sum, course) => sum + (course.career_paths?.length || 0),
      0
    ) || 0;

  const totalLevels =
    facultyList?.reduce(
      (sum, course) => sum + (course.levels?.length || 0),
      0
    ) || 0;

  return (
    <div className="bg-white relative">

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

             
              {/* Stats Section - Responsive Grid */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 ">
                {[
                  { value: totalCourses, label: "Programs" },
                  { value: totalLecturers, label: "Expert Lecturers" },
                  { value: totalCareerPaths, label: "Career Paths" },
                  { value: totalLevels, label: "Study Levels" }
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

      {/* Lecturer Grid */}
      <section className={`py-16 bg-gray-50 ${lecturers?.length == 0 ? `hidden` : ``}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 pb-8 border-b border-[var(--accent-yellow)]">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-dark)]">
              Our Expert Lecturers
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-3">
              Learn from experienced professionals with strong academic backgrounds and real-world industry expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {lecturers?.map((lecturer, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden text-center flex flex-col items-center border border-gray-200"
              >
                {
                  // console.log(lecturer)
                }

                <div className=" w-full bg-gray-200 flex justify-center items-center p-6">
                  <img
                    src={`${BASE_URL}${lecturer.profileImageURL}`}
                    alt={lecturer.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[var(--primary-dark)]"
                  />
                </div>

                <div className="py-6 px-3 space-y-3 w-full">

                <h3 className="text-xl font-semibold text-gray-800">
                  {lecturer.name}
                </h3>

                {/* Positions */}
                <p className="text-sm text-gray-500 mt-1 space-x-3">
                  {lecturer.position?.map((pos, i)=> (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-md border-b border-gray-300">
                      {pos}
                    </span>
                  ))}
                </p>

                {/* Degrees */}
                <div className="text-xs text-gray-400 mt-1 space-y-3 text-start">
                  {lecturer.degree?.map((deg, i) => (
                    <p
                      key={i}
                      className="text-md bg-gray-100 p-2 rounded-md border-b border-gray-300"
                    >
                      <span className="mr-3">
                        <i className="fas fa-graduation-cap"></i>
                      </span>
                      {deg}
                    </p>
                  ))}
                </div>

                {/* expertise */}
                <div className="space-y-3 text-start mt-2 text-gray-400 border-t pt-3 border-gray-300 w-full">
                  <h3>Expertise</h3>
                  {lecturer?.expertise?.map((skill, i) => (
                    <p key={i} className="text-xs bg-gray-100 p-2 w-full rounded-md border-b border-gray-300">
                      <span className="mr-3"><i className="far fa-star"></i> </span>{skill}
                    </p>
                  ))}
                </div>

                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Faculty section */}
      <section id="faculty" className={`min-h-screen py-16 lg:py-24 px-6 ${facultyList?.length == 0 ? `hidden` : ``}`}>
      {/* Faculty Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 border-b border-[var(--accent-yellow)] py-5">
        <h1 className="text-4xl font-bold text-[var(--primary-dark)]">
          Our Distinguished Faculty
        </h1>
        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
          M.S.T offers industry-focused programs and international certifications
        </p>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facultyList?.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-indigo-600">
              {course.name}
            </h2>

            <div className="mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Duration:</span>{" "}
                {course.duration}
              </p>
            </div>

            <p className="text-gray-600 text-sm mt-3">
              {course.overview}
            </p>

            {/* Levels */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Levels:
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {course.levels.map((level, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full border"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Paths */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Career Paths:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                {course.career_paths.map((career, index) => (
                  <li key={index}>{career}</li>
                ))}
              </ul>
            </div>

            <button 
            onClick={() => openApplicationForm("program")}
            className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer" >
              Contact
            </button>
          </div>
        ))}
      </div>
      </section>


      {/* Hero Section */}
      <section 
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${event_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-dark)]/80 via-[var(--primary-dark)]/60 to-[var(--primary-dark)]/80"></div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-5xl px-6 py-20 text-center text-white">
          
          {/* Animated Badge (Optional but trendy) */}
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide uppercase bg-blue-600/20 border border-blue-400/30 rounded-full backdrop-blur-sm animate-fade-in">
            Empowering Futures
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Trusted by Over <span className="text-blue-400">6000+</span> Students
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join a community supported by fully qualified educators, 
            continuous counseling, and an enthusiastic support team dedicated to your success.
          </p>
          
          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink to="/contact">
              <button className="cursor-pointer group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transform hover:-translate-y-1">
                Contact Us
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </NavLink>
            
            {/* Secondary Action - Optional */}
            <NavLink to="/course">
              <button className="cursor-pointer  px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold transition-all duration-300">
                View Courses
              </button>
            </NavLink>
          </div>

        </div>

        {/* Decorative bottom fade to blend with next section */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[var(--background-color)] to-transparent"></div>
      </section>

    <ApplicationForm/>
    </div>
  );
}

export default Faculty;
