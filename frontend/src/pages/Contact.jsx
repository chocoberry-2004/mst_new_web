import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/mst_logo1.png';
import library from "../assets/images/library.png";
import diamond2 from "../assets/images/star.png";
import { useQuery } from '@tanstack/react-query';
import { useContactInfo } from '../providers/ContactInfoProvider';
import Loading from './Loading';

const locationList =  [
  {
    id: 'yangon-campus-2',
    name: 'Yangon Campus - 2',
    address: 'M.S.T College Campus-2, Yangon',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59212.829389280756!2d96.01642404863283!3d21.9421683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6d000934fad1%3A0x9a927c433a459026!2sM.S.T%20College%20Campus-2!5e0!3m2!1sen!2smm!4v1769763315592!5m2!1sen!2smm',
    details: [
      { icon: 'fas fa-bus', text: 'Bus Stop: 300m from gate' },
      { icon: 'fas fa-subway', text: 'Near Sule Pagoda' },
      { icon: 'fas fa-wifi', text: 'High-speed WiFi' },
    ],
    active: true
  },
  {
    id: 'mandalay-campus-1',
    name: 'Mandalay Campus - 1',
    address: 'M.S.T College Mandalay Campus-1',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59212.829389280756!2d96.01642404863283!3d21.9421683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6d002f6a05c3%3A0xdddf9afc8652a665!2sM.S.T%20College%20Mandalay%20Campus-1!5e0!3m2!1sen!2smm!4v1769763275907!5m2!1sen!2smm',
    details: [
      { icon: 'fas fa-car', text: 'Ample Parking Space' },
      { icon: 'fas fa-utensils', text: 'Cafeteria Available' },
      { icon: 'fas fa-book', text: 'Digital Library' },
    ],
    active: false
  },
  {
    id: 'university-campus-1',
    name: 'MST University Campus - 1',
    address: 'M.S.T University (Campus 1)',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.877007908295!2d96.15591277461431!3d16.782793619941796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ec8817795cc3%3A0xb06372cdad1a36f!2sM.S.T%20University%20(Campus%201)!5e0!3m2!1sen!2smm!4v1769763193823!5m2!1sen!2smm',
    details: [
      { icon: 'fas fa-graduation-cap', text: 'Main Academic Block' },
      { icon: 'fas fa-flask', text: 'Advanced Labs' },
      { icon: 'fas fa-dumbbell', text: 'Sports Complex' },
    ],
    active: false
  },
  {
    id: 'university-campus-2',
    name: 'MST University Campus - 2',
    address: 'M.S.T University (Campus 2)',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.877007908295!2d96.15591277461431!3d16.782793619941796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ed1a1f15fb4f%3A0x2c3fd7b20068780!2sM.S.T%20University%20(Campus%202)!5e0!3m2!1sen!2smm!4v1769762853925!5m2!1sen!2smm',
    details: [
      { icon: 'fas fa-laptop-house', text: 'Hostel Facilities' },
      { icon: 'fas fa-heartbeat', text: 'Medical Center' },
      { icon: 'fas fa-tree', text: 'Green Campus Area' },
    ],
    active: false
  },
];


const fetchFAQ = async () => {
  const response = await fetch("/api/faqs/");
  return await response.json();
}

function Contact() {
  const [activeCampus, setActiveCampus] = useState(locationList[0]);
  const { contactInfo, contactInfoLoading } = useContactInfo();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    program: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      program: '',
      message: ''
    });
  };

  const {data: FAQ, isPending: FAQLoading, error: FAQErr} = useQuery({
        queryKey: ['faq'],
        queryFn: fetchFAQ,
  })


  if(contactInfoLoading || FAQLoading) return <Loading/>;

  return (
    <div className="min-h-screen">

      <img src={library} alt="" className='w-full h-full fixed -z-10' />
      
      {/* hero section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-300 to-[var(--gray-text)] overflow-hidden">

        {/* Wave Shapes - Must be at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] sm:h-[65%] bg-[var(--primary-dark)] rounded-t-[120%]"></div>
        <div className="absolute inset-x-0 bottom-0 h-[40%] sm:h-[55%] bg-[var(--accent-yellow)] rounded-t-[120%] opacity-90"></div>
        <div className="absolute inset-x-0 bottom-0 h-[35%] sm:h-[45%] bg-white rounded-t-[120%]"></div>

        {/* Diamond Pattern - Positioned above the waves but below content */}
        <div className="absolute inset-0">
          {/* Top Left Cluster - Above the waves */}
          <div className="absolute top-10 left-10 opacity-20">
            <img src={diamond2} alt="diamond" className="w-12 h-12" />
          </div>
          <div className="absolute top-32 left-24 opacity-25">
            <img src={diamond2} alt="diamond" className="w-8 h-8" />
          </div>
          
          {/* Top Right Cluster - Above the waves */}
          <div className="absolute top-12 right-16 opacity-25">
            <img src={diamond2} alt="diamond" className="w-16 h-16" />
          </div>
          <div className="absolute top-40 right-32 opacity-30">
            <img src={diamond2} alt="diamond" className="w-10 h-10" />
          </div>
          
          {/* Middle Diamonds - Positioned between waves */}
          <div className="absolute top-2/3 left-20 opacity-15">
            <img src={diamond2} alt="diamond" className="w-16 h-16" />
          </div>
          <div className="absolute top-3/4 right-24 opacity-20">
            <img src={diamond2} alt="diamond" className="w-12 h-12" />
          </div>
          
          {/* Lower Diamonds - On top of the colored waves */}
          <div className="absolute bottom-48 left-1/4 opacity-30">
            <img src={diamond2} alt="diamond" className="w-10 h-10" />
          </div>
          <div className="absolute bottom-40 right-1/4 opacity-25">
            <img src={diamond2} alt="diamond" className="w-8 h-8" />
          </div>
          
          {/* Diamonds on the yellow wave */}
          <div className="absolute bottom-32 left-32 opacity-40">
            <img src={diamond2} alt="diamond" className="w-14 h-14" />
          </div>
          <div className="absolute bottom-28 right-40 opacity-35">
            <img src={diamond2} alt="diamond" className="w-8 h-8" />
          </div>
          
          {/* Diamonds on the white wave (top wave) */}
          <div className="absolute bottom-24 left-48 opacity-50">
            <img src={diamond2} alt="diamond" className="w-6 h-6" />
          </div>
          <div className="absolute bottom-20 right-1/3 opacity-50">
            <img src={diamond2} alt="diamond" className="w-10 h-10" />
          </div>
          
          {/* Center Large Diamond - Positioned above all waves */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
            <img src={diamond2} alt="diamond" className="w-64 h-64 md:w-96 md:h-96" />
          </div>
          
          {/* Additional scattered diamonds in middle area */}
          <div className="absolute top-1/2 left-16 opacity-15">
            <img src={diamond2} alt="diamond" className="w-10 h-10" />
          </div>
          <div className="absolute top-1/2 right-20 opacity-15">
            <img src={diamond2} alt="diamond" className="w-12 h-12" />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-5xl mx-auto py-5 px-6 lg:px-12 text-center bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="logo"
              className="w-20 md:w-24 lg:w-28 drop-shadow-lg"
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[var(--primary-dark)] leading-tight">
            Get in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent-yellow)]">
              Touch With Us
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base md:text-lg text-[var(--primary-dark)]/80 max-w-2xl mx-auto">
            Have questions about our IT programs? Reach out to our team and get expert
            guidance for your future in technology.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact-form" className="group px-6 py-2.5 rounded-lg bg-[var(--primary-dark)] text-white font-semibold border-2 border-[var(--primary-dark)] hover:bg-white hover:text-[var(--primary-dark)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center no-underline">
              <i className="fas fa-paper-plane mr-2 group-hover:translate-x-0.5 transition-transform"></i>
              Send Message
            </a>

            <a href='#contact-info' className="group px-6 py-2.5 rounded-lg border-2 border-[var(--primary-dark)] text-[var(--primary-dark)] font-semibold hover:bg-[var(--primary-dark)] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <i className="fas fa-phone-alt mr-2 group-hover:rotate-12 transition-transform"></i>
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}      
        <section className='px-5 lg:px-16 bg-white'>
          <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div id="contact-form" className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-[var(--gray-text)]">
                <h2 className="text-3xl font-bold mb-8">
                  Send us a Message
                  <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2"></div>
                </h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <i className="fas fa-user mr-2 text-blue-600"></i>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
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
                        value={formData.lastName}
                        onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent focus:outline-none transition-all"
                      placeholder="john@example.com"
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
                      value={formData.program}
                      onChange={handleInputChange}
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
                      value={formData.message}
                      onChange={handleInputChange}
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

              {/* Contact Information */}
              <div id='contact-info'>
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Contact Information
                    <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2"></div>
                  </h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help! Reach out to us through any of the following channels.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-8">

                  {
                    contactInfoLoading ? (
                      <p className="text-[#B8B8CC]">Loading...</p>
                    ) : (
                      <div className="space-y-8">
                        <div className="flex items-start p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <i className="fas fa-map-marker-alt text-white text-xl"></i>
                          </div>
                          <div className="ml-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Our Campus</h3>
                            <p className="text-gray-600 mb-2">
                              {contactInfo?.mst_college_contact?.headquarters?.address}
                            </p>
                            <a href="#location" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                              Get Directions <i className="fas fa-arrow-right ml-2"></i>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <i className="fas fa-phone-alt text-white text-xl"></i>
                          </div>
                          <div className="ml-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                            {contactInfo?.mst_college_contact?.headquarters?.phone?.map((phone, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <span className="text-[#B8B8CC]">{phone}</span>
                              </li>
                            ))}
                            <p className="text-sm text-gray-500">
                              Mon-Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 4:00 PM
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <i className="fas fa-envelope text-white text-xl"></i>
                          </div>
                          <div className="ml-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                            <div className="space-y-2">
                              <div>
                                <a href={contactInfo?.mst_college_contact?.headquarters?.email} className="text-blue-600 hover:text-blue-800 block">
                                  {contactInfo?.mst_college_contact?.headquarters?.email}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  {/* Social Media */}
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      {[
                        { icon: 'fab fa-linkedin', color: 'bg-blue-600 hover:bg-white hover:text-blue-600', link: 'https://www.linkedin.com/company/mstcollege/' },
                        { icon: 'fab fa-facebook', color: 'bg-blue-800 hover:bg-white hover:text-blue-800', link: 'https://www.facebook.com/share/18C3xyCbKu/' },
                        { icon: 'fab fa-tiktok', color: 'bg-black hover:bg-white hover:text-black', link: 'https://www.tiktok.com/@m.s.t_college?_r=1&_t=ZS-94YzEASJQNc' },
                        { icon: 'fab fa-youtube', color: 'bg-red-600 hover:bg-white hover:text-red-600', link: 'https://youtube.com/@m.s.tcollege?si=UcQrsrm29dCeujhQ' },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-lg ${social.color} text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                        >
                          <i className={social.icon}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>

        <section className='px-5 lg:px-16 py-16 lg:py-24  bg-white'>
          {/* Map Section */}
          {
              contactInfoLoading ? (
                <p className="text-[#B8B8CC]">Loading...</p>
              ) : (
                <div id="location" className="mt-16 rounded-2xl shadow-xl overflow-hidden bg-white border border-gray-300">
                  <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[450px]">
                    {/* Map Display */}
                    <div className="relative w-full h-[300px] lg:h-auto lg:col-span-2">
                      <iframe
                        key={activeCampus.id}
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Campus Location Map"
                        src={activeCampus.mapUrl}
                      />
                    </div>

                    {/* Accordion */}
                    <div className="p-6 bg-gradient-to-b from-[var(--primary-dark)] to-[var(--secondary-dark)] text-white overflow-y-auto">
                      <h3 className="text-2xl font-bold mb-6">Our Campus Locations</h3>
                      <div className="space-y-4">
                        {locationList.map((campus) => {
                          const isActive = activeCampus.id === campus.id;

                          return (
                            <div
                              key={campus.id}
                              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                                isActive
                                  ? "border-cyan-400 shadow-lg bg-white/5"
                                  : "border-white/20 hover:border-white/40"
                              }`}
                            >
                              {/* Accordion Header */}
                              <button
                                onClick={() => setActiveCampus(campus)}
                                className="w-full p-4 text-left flex justify-between items-center hover:bg-white/5 transition"
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                                      isActive
                                        ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                                        : "bg-white/10"
                                    }`}
                                  >
                                    <i
                                      className={`fas fa-map-marker-alt ${
                                        isActive ? "text-white" : "text-cyan-300"
                                      }`}
                                    ></i>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">{campus.name}</h4>
                                    <p className="text-sm text-gray-300 mt-1">
                                      {campus.address}
                                    </p>
                                  </div>
                                </div>

                                <i
                                  className={`fas fa-chevron-right transition-transform duration-300 ${
                                    isActive ? "rotate-90 text-cyan-300" : "text-gray-400"
                                  }`}
                                ></i>
                              </button>

                              {/* Accordion Content */}
                              <div
                                className={`grid transition-all duration-300 ease-in-out ${
                                  isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                              >
                                <div className="overflow-hidden px-4 pb-4">
                                  <ul className="space-y-3 mt-2">
                                    {campus.details.map((detail, index) => (
                                      <li key={index} className="flex items-center text-sm">
                                        <i className={`${detail.icon} mr-3 text-cyan-300 w-5`}></i>
                                        <span className="text-gray-200">{detail.text}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                      campus.address
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-cyan-500 text-blue-900 font-semibold hover:bg-cyan-400 transition text-sm"
                                  >
                                    <i className="fas fa-directions mr-2"></i>
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* General Info */}
                      <div className="mt-8 pt-6 border-t border-white/20">
                        <h4 className="font-semibold mb-4 text-cyan-100">General Information</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center text-sm">
                            <i className="fas fa-clock mr-3 text-green-300 w-5"></i>
                            Office Hours: 9 AM - 5 PM
                          </li>
                          <li className="flex items-center text-sm">
                            <i className="fas fa-phone mr-3 text-green-300 w-5"></i>
                            Contact: +95 1 234 567
                          </li>
                          <li className="flex items-center text-sm">
                            <i className="fas fa-envelope mr-3 text-green-300 w-5"></i>
                            Email: info@mstinstitute.net
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
          }
        </section>

        {/* direct to article */}
        <section className="relative w-full py-20 flex items-center justify-center text-center overflow-hidden">

          {/* Overlay */}
          <div className="absolute inset-0 bg-[var(--primary-dark)]/70 -z-10"></div>

          {/* Content */}
          <div className="max-w-3xl mx-auto px-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore Our Educational Articles
            </h2>

            <p className="text-lg mb-8 text-gray-200">
              We value education and provide insightful articles contributed by our lecturers
              to support students in learning modern technologies and IT concepts.
            </p>

            <NavLink to="/article">
              <button className="cursor-pointer px-6 py-3 rounded-lg bg-[var(--accent-yellow)] text-[var(--primary-dark)] font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                Explore Articles
              </button>
            </NavLink>
          </div>

        </section>
            
        <section className='px-5 lg:px-16 py-16 lg:py-24 bg-white'>
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2 mx-auto"></div>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {FAQ?.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-question text-white text-sm"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                View All FAQs <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </section>
    </div>
  );
}

export default Contact;