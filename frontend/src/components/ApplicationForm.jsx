import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../providers/AppContextProvider';
import Mst_logo from "../assets/images/mst_logo1.png";

function ApplicationForm() {

    let {showModal, ApplicationFormHandler} = useContext(AppContext);

    return (
        <div 
        onClick={() => ApplicationFormHandler()}
        className={` bg-black/60 backgrop-blur-sm trinsition-all duration-300 ease-in-out justify-center fixed inset-0 top-0 w-full h-screen z-[100] items-center p-5 ${showModal ? `flex` : `hidden`}`}>
            <div className="bg-white rounded-lg min-w-150 border border-gray-300 max-h-[100vh] overflow-y-auto scrollbar-hide">
                <div className="flex p-5 justify-between items-center sticky top-0 bg-white border-b border-gray-300">
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={Mst_logo}
                            alt="M.S.T College Logo"
                            className="h-13 w-auto border-2 border-[var(--accent-yellow)] bg-white rounded-full"
                        />
                        <div className="">
                            <h1 className="text-[var(--primary-dark)] text-xl font-bold tracking-wide whitespace-nowrap">
                                M.S.T College
                            </h1>
                            <p className='text-[var(--gray-text)] text-md font-semibold'>Application Form</p>
                        </div>
                    </div>

                    <button 
                    onClick={() => ApplicationFormHandler()}
                    className='cursor-pointer w-10 h-10 rounded-full bg-gray-100 border border-gray-300 text-gray-400 hover:rotate-90 transition-all duration-300 ease-in-out'>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                
                <form className="space-y-6 p-5">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fas fa-user mr-2 text-blue-600"></i>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent focus:outline-none transition-all"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fas fa-user mr-2 text-blue-600"></i>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent focus:outline-none transition-all"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-envelope mr-2 text-blue-600"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent focus:outline-none transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-phone mr-2 text-blue-600"></i>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent focus:outline-none transition-all"
                    placeholder="09-123456789"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-graduation-cap mr-2 text-blue-600"></i>
                    Interested Program
                  </label>
                  <select 
                    name="program"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent focus:outline-none transition-all"
                    required
                  >
                    <option value="">Select a program</option>
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Software Engineering">Software Engineering</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-comment-alt mr-2 text-blue-600"></i>
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent focus:outline-none transition-all"
                    placeholder="Tell us about your inquiry..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[var(--primary-dark)] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </button>
              </form>

            </div>

        </div>
    )
}

export default ApplicationForm