import html from "../assets/images/html.png";
import css from "../assets/images/css.png";
import js from "../assets/images/js.png";
import android from "../assets/images/android.png";
import ios from "../assets/images/ios.png";
import react from "../assets/images/react.png";
import cyber from "../assets/images/cyber.png";
import java from "../assets/images/java.png";
import linux from "../assets/images/linux.png";
import microsoft from "../assets/images/microsoft.png";
import php from "../assets/images/php.png";
import nodejs from "../assets/images/nodejs.png";
import python from "../assets/images/python.png";
import wifi from "../assets/images/wifi.png";
import course_bg from "../assets/images/course_bg.jpg";
import c_double_plus from "../assets/images/C_double_plus.png";
import logo from '../assets/images/mst_logo1.png';
import c_sharp from "../assets/images/c_sharp.png";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { AppContext } from "../providers/AppContextProvider";
import { useContext } from "react";
import { useCourse } from "../providers/CourseProvider";
import Loading from "./Loading";


function Course() {

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(null);
let {showModal, setShowModal, ApplicationFormHandler, openApplicationForm} = useContext(AppContext);
const { course, courseLoading, courseError } = useCourse();

const aboveLogos = [
  { src: html, alt: "HTML", delay: "0s", line: 120, color: "white" },
  { src: css, alt: "CSS", delay: "0.3s", line: 80, color: "var(--primary-dark)" },
  { src: js, alt: "JavaScript", delay: "0.6s", line: 60, color: "var(--accent-yellow)" },
  { src: android, alt: "Android", delay: "0.9s", line: 150, color: "white" },
  { src: ios, alt: "iOS", delay: "1.2s", line: 100, color: "var(--primary-dark)" },
  { src: react, alt: "React", delay: "1.5s", line: 90, color: "var(--accent-yellow)" },
  { src: cyber, alt: "Cyber Security", delay: "1.8s", line: 140, color: "white" },
  { src: c_double_plus, alt: "C++", delay: "2.1s", line: 90, color: "var(--primary-dark)" },
];

const belowLogos = [
  { src: java, alt: "Java", delay: "2.4s", line: 70, color: "var(--accent-yellow)" },
  { src: linux, alt: "Linux", delay: "2.7s", line: 130, color: "white" },
  { src: microsoft, alt: "Microsoft", delay: "3s", line: 110, color: "var(--primary-dark)" },
  { src: php, alt: "PHP", delay: "3.3s", line: 90, color: "var(--accent-yellow)" },
  { src: nodejs, alt: "Node.js", delay: "3.6s", line: 150, color: "white" },
  { src: python, alt: "Python", delay: "3.9s", line: 90, color: "var(--primary-dark)" },
  { src: wifi, alt: "WiFi", delay: "4.2s", line: 75, color: "var(--accent-yellow)" },
  { src: c_sharp, alt: "c-sharp", delay: "4.2s", line: 120, color: "white" },
];


const openModal = (course) => {
  setSelectedCourse(course);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedCourse(null);
  setIsModalOpen(false);
};

const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
};


  if (courseLoading) return <Loading/>;

  return (

    <>

    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img
        src={course_bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10 fixed top-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-dark)] via-transparent to-transparent"></div>

      {/* above Balloon Container */}
      <div className="absolute inset-0 flex gap-10 items-start justify-start animate-drop-in transition-all duration-300 ease-in-out">

        {aboveLogos.map((logo, index) => (
          <div
            key={index}
            className="flex flex-col items-center animate-balloon"
            style={{ animationDelay: logo.delay }}
          >
            {/* String */}
            <div
              style={{
                height: logo.line + "px",
                backgroundColor: logo.color,
              }}
              className="w-[4px]"
            ></div>
            
            {/* Balloon */}
            <img
              src={logo.src}
              alt={logo.alt}
              className={`w-12 h-12 object-contain drop-shadow-xl bg-gradient-to-b from-white to-pink-200 border-4 shadow-xl p-2 rounded-full`}
              style={{
                borderColor: logo.color,
              }}
            />
          </div>
        ))}

      </div>

      {/*below Balloon Container */}
      <div className="absolute inset-0 flex gap-10 items-end justify-end animate-rise-up transition-all duration-300 ease-in-out">

        {belowLogos.map((logo, index) => (
          <div
            key={index}
            className="flex flex-col items-center animate-balloon"
            style={{ animationDelay: logo.delay }}
          >
            
            {/* Balloon */}
            <img
              src={logo.src}
              alt={logo.alt}
              className={`w-12 h-12 object-contain drop-shadow-xl bg-gradient-to-b from-white to-pink-200 border-4 shadow-xl p-2 rounded-full`}
              style={{
                borderColor: logo.color,
              }}
            />

            {/* String */}
            <div
              style={{
                height: logo.line + "px",
                backgroundColor: logo.color,
              }}
              className="w-[4px]"
            ></div>
          </div>
        ))}

      </div>


      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        {/* College Logo */}
        <img
          src={logo}
          alt="College Logo"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 
                    mx-auto bg-white rounded-full border-4 border-[var(--primary-dark)] 
                    shadow-xl p-2"
        />

        {/* Title */}
        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--primary-dark)]">
          Our IT Courses
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
          We provide diverse technology courses designed to equip students with
          modern programming, cybersecurity, networking, and software development
          skills to succeed in the digital world.
        </p>

        {/* Optional Button */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <a href="#course-section" className="px-6 py-3 bg-[var(--primary-dark)] text-white rounded-lg shadow-md hover:scale-105 transition">
            Explore Courses
          </a>

          <NavLink to="/contact">
          <button className="cursor-pointer px-6 py-3 border-2 border-[var(--primary-dark)] text-[var(--primary-dark)] rounded-lg hover:bg-[var(--primary-dark)] hover:text-white transition">
            Contact Us
          </button>
          </NavLink>
        </div>

      </div>

    </section>


    {/* course section */}
    <section className="py-20 px-2 lg:px-4 bg-gray-50" id="course-section">
        <div className="container mx-auto">
          <div className="">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--primary-dark)]">
            Our Courses
          </h2>

          <p>

          </p>
          </div>

          {courseLoading && (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--primary-dark)] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          )}

          {courseError && (
            <div className="text-center py-10 text-red-600">
              Error loading courses. Please try again later.
            </div>
          )}

          {course && course?.courses && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
              {course?.courses?.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="h-48 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent-yellow)] p-6 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center">
                      {course.name}
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        For {course.level || course.type}
                      </span>
                      <span className="text-lg font-bold text-[var(--primary-dark)]">
                        {formatCurrency(course.fees.amount, course.fees.currency)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.overview}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Duration: {course.duration}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Instructor: {course.instructor.name}</span>
                      </div>

                      {course.class_type && (
                        <div className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>Class Type: {course.class_type}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => openModal(course)}
                        className="cursor-pointer flex-1 bg-[var(--primary-dark)] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300 font-semibold"
                      >
                        View Details
                      </button>
                      <button
                      onClick={() => openApplicationForm('course')}
                      className="cursor-pointer flex-1 border-2 border-[var(--primary-dark)] text-[var(--primary-dark)] py-2 px-4 rounded-lg hover:bg-[var(--primary-dark)] hover:text-white transition-colors duration-300 font-semibold">
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity bg-black/50 bg-opacity-50 z-0"
              onClick={closeModal}
            ></div>

            {/* Modal panel */}
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative z-10">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Header with gradient */}
                <div className="h-24 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent-yellow)] -mx-4 -mt-5 px-4 pt-6 mb-6 rounded-t-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-bold text-white pr-8">
                      {selectedCourse.name}
                    </h3>
                    <button
                      onClick={closeModal}
                      className="text-white hover:text-gray-200 transition-colors cursor-pointer"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  {/* Course Info Badges */}
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      ID: {selectedCourse.id}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {selectedCourse.type}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                      Level: {selectedCourse.level || selectedCourse.type}
                    </span>
                  </div>

                  {/* Overview */}
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--primary-dark)] mb-2">Overview</h4>
                    <p className="text-gray-700">{selectedCourse.overview}</p>
                  </div>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-[var(--primary-dark)] mb-2">Duration & Schedule</h5>
                      <p className="text-gray-700">Duration: {selectedCourse.duration}</p>
                      <p className="text-gray-700">Hours/Week: {selectedCourse.hours_per_week}</p>
                      {selectedCourse.delivery_methods && (
                        <div className="mt-2">
                          <p className="font-medium">Class Options:</p>
                          {selectedCourse.delivery_methods.map((method, idx) => (
                            <p key={idx} className="text-sm text-gray-600">
                              • {method.mode}: {method.schedule?.days?.join(', ')} {method.schedule?.time}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-[var(--primary-dark)] mb-2">Fees & Payment</h5>
                      <p className="text-2xl font-bold text-[var(--primary-dark)]">
                        {formatCurrency(selectedCourse.fees.amount, selectedCourse.fees.currency)}
                      </p>
                      <div className="mt-2">
                        <p className="font-medium">Payment Options:</p>
                        {selectedCourse.fees.payment_options.map((option, idx) => (
                          <p key={idx} className="text-sm text-gray-600">• {option}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-[var(--primary-dark)] mb-3">Instructor</h4>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-lg">{selectedCourse.instructor.name}</p>
                        <p className="text-gray-600">{selectedCourse.instructor.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{selectedCourse.instructor.bio}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Qualifications:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {selectedCourse.instructor.qualifications.map((qual, idx) => (
                            <li key={idx}>{qual}</li>
                          ))}
                        </ul>
                        <p className="font-medium mt-2 mb-1">Expertise:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCourse.instructor.expertise.map((exp, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  {selectedCourse.learning_objectives && (
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--primary-dark)] mb-2">Learning Objectives</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedCourse.learning_objectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Modules */}
                  {selectedCourse.modules && (
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--primary-dark)] mb-2">Course Modules</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedCourse.modules.map((module, idx) => (
                          <div key={idx} className="flex items-center bg-gray-50 p-2 rounded">
                            <span className="w-6 h-6 bg-[var(--primary-dark)] text-white rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Career Paths */}
                  {selectedCourse.career_paths && (
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--primary-dark)] mb-2">Career Paths</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.career_paths.map((path, idx) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {path}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prerequisites */}
                  {selectedCourse.prerequisites && (
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--primary-dark)] mb-2">Prerequisites</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {selectedCourse.prerequisites.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Start Dates */}
                  {selectedCourse.start_dates && (
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--primary-dark)] mb-2">Available Start Dates</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedCourse.start_dates.map((date, idx) => (
                          <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                            <span className="font-medium">{date.date}</span>
                            <span className="text-sm text-gray-600">{date.delivery_method}</span>
                            {date.spots_available && (
                              <span className="text-sm text-green-600">{date.spots_available} spots</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    ApplicationFormHandler();
                  }}
                  className="cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[var(--primary-dark)] text-base font-medium text-white hover:bg-opacity-90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Contact Us
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      <ApplicationForm/>

    </>
  );
}

export default Course;