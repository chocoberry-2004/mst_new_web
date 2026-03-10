import React from "react";
import w4 from "../assets/images/w1.jpg";
import { useQuery } from "@tanstack/react-query";
import ApplicationForm from "../components/ApplicationForm";
import { AppContext } from "../providers/AppContextProvider";
import { useContext } from "react";
import Loading from "./Loading";

const fetchFaculty = async () => {
  const response = await fetch("/js/faculty.json");
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

const fetchLecturer = async () => {
  const response = await fetch ("/js/lecturer.json");
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}


function Faculty() {

  let {showModal, setShowModal, ApplicationFormHandler} = useContext(AppContext);

  const { data: facultyList, isPending: facultyLoading, error: facultyError } = useQuery({
    queryKey: ["faculty"],
    queryFn: fetchFaculty,
  });

  const { data: lecturers, isPending: lecturerLoading, error: lecturerError } = useQuery({
    queryKey: ["lecturers"],
    queryFn: fetchLecturer,
  });

  if (facultyLoading || lecturerLoading) return <Loading/>;
  if (facultyError) return <p className="text-center mt-20">Error: {facultyError.message}</p>;
  if (lecturerError) return <p className="text-center mt-20">Error: {lecturerError.message}</p>;

  const faculty = facultyList?.faculty;

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
                <a href="#faculty" className="group relative px-6 sm:px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:scale-95">
                  <span className="text-sm sm:text-base">Explore Faculty Profiles</span>
                  <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <button className="px-6 sm:px-8 py-3 bg-transparent border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 active:scale-95 text-sm sm:text-base">
                  View Departments
                </button>
              </div>

              {/* Stats Section - Responsive Grid */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 ">
                {[
                  { value: "50+", label: "Faculty" },
                  { value: "150+", label: "Experienced Tutor" },
                  { value: "2500+", label: "Students" },
                  { value: "50+", label: "Awards" }
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Expert Lecturers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Learn from experienced professionals with strong academic backgrounds and real-world industry expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {lecturers?.map((lecturer, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center flex flex-col items-center"
              >
                <img
                  src={lecturer.profileImage}
                  alt={lecturer.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-yellow-400"
                />
                <h3 className="text-xl font-semibold text-gray-800">{lecturer.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{lecturer.degree}</p>
                <p className="text-gray-600 mt-2 text-sm">{lecturer.expertise}</p>
                {lecturer.award && (
                  <p className="mt-2 text-xs text-yellow-600 font-medium">{lecturer.award}</p>
                )}
                <button
                  onClick={() => ApplicationFormHandler()}
                  className="mt-4 px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 cursor-pointer"
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty section */}
      <section id="faculty" className="min-h-screen py-10 px-6">
      {/* Faculty Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 border-b border-[var(--accent-yellow)] py-5">
        <h1 className="text-4xl font-bold text-[var(--primary-dark)]">
          {faculty?.name}
        </h1>
        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
          {faculty?.description}
        </p>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {faculty?.courses?.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-indigo-600">
              {course.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{course.type}</p>

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
            onClick={() => ApplicationFormHandler()}
            className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer" >
              Contact
            </button>
          </div>
        ))}
      </div>
    </section>

    <ApplicationForm/>
    </div>
  );
}

export default Faculty;
