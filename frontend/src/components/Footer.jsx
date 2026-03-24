import React from 'react'
import { NavLink } from 'react-router-dom';
import Mst_logo from "../assets/images/mst_logo1.png";
import privacy1 from "../assets/images/privacy1.jpg";
import privacy2 from "../assets/images/privacy2.jpg";
import { useContactInfo } from '../providers/ContactInfoProvider';

function Footer() {

  const { contactInfo, contactInfoLoading } = useContactInfo();

  const linkClass = ({ isActive }) => 
    isActive 
      ? "text-[var(--accent-yellow)] font-medium" 
      : "text-[#B8B8CC] hover:text-[var(--accent-yellow)] transition-colors duration-300";

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Faculty", path: "/faculty" },
    { name: "Course", path: "/course" },
    { name: "Article", path: "/article" },
    { name: "Events", path: "/event" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <footer className=" text-white"
     style={{
        backgroundImage: `url(${privacy1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>

      <div className="bg-[#010035]/80">

        {/* Main Footer Content bg-[#010035]*/}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src={Mst_logo}
                  alt="M.S.T College Logo"
                  className="h-14 w-14 border-2 border-[var(--accent-yellow)] bg-white rounded-full p-1"
                />
                <div>
                  <h1 className="text-2xl font-bold tracking-wide">M.S.T College</h1>
                  <p className="text-[#B8B8CC] text-sm mt-1">Excellence in Education Since 2005</p>
                </div>
              </div>
              <p className="text-[#B8B8CC] leading-relaxed">
                Empowering students with quality education and state-of-the-art facilities to build a brighter future.
              </p>
              
              {/* Social Media */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://www.facebook.com/share/18C3xyCbKu/"
                  aria-label="Facebook"
                  target='_blank'
                  className="h-10 w-10 rounded-full bg-[#1a1a4a] flex items-center justify-center text-white hover:bg-[var(--accent-yellow)] hover:text-[#010035] transition-all duration-300"
                >
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>

                <a
                  href="https://www.tiktok.com/@m.s.t_college?_r=1&_t=ZS-94YzEASJQNc"
                  aria-label="TikTok"
                  target='_blank'
                  className="h-10 w-10 rounded-full bg-[#1a1a4a] flex items-center justify-center text-white hover:bg-[var(--accent-yellow)] hover:text-[#010035] transition-all duration-300"
                >
                  <i className="fab fa-tiktok text-lg"></i>
                </a>

                <a
                  href="https://youtube.com/@m.s.tcollege?si=y_mrYdgQoGY-A664"
                  aria-label="YouTube"
                  target='_blank'
                  className="h-10 w-10 rounded-full bg-[#1a1a4a] flex items-center justify-center text-white hover:bg-[var(--accent-yellow)] hover:text-[#010035] transition-all duration-300"
                >
                  <i className="fab fa-youtube text-lg"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/mstcollege/"
                  aria-label="LinkedIn"
                  target='_blank'
                  className="h-10 w-10 rounded-full bg-[#1a1a4a] flex items-center justify-center text-white hover:bg-[var(--accent-yellow)] hover:text-[#010035] transition-all duration-300"
                >
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#2a2a4a]">Quick Links</h3>
              <ul className="grid grid-cols-1 gap-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink 
                      to={link.path} 
                      className={linkClass}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* HQ Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#2a2a4a]">
                Contact Us
              </h3>

              {contactInfoLoading ? (
                <p className="text-[#B8B8CC]">Loading...</p>
              ) : (
                <ul className="space-y-4">
                  
                  {/* Address */}
                  <li className="flex items-start gap-3">
                    <i className="fas fa-map-marker-alt text-[var(--accent-yellow)] mt-1 flex-shrink-0 text-lg"></i>
                    <span className="text-[#B8B8CC]">
                      {contactInfo?.mst_college_contact?.headquarters?.address}
                    </span>
                  </li>

                  {/* Phone */}
                  {contactInfo?.mst_college_contact?.headquarters?.phone?.map((phone, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <i className="fas fa-phone text-[var(--accent-yellow)] text-lg"></i>
                      <span className="text-[#B8B8CC]">{phone}</span>
                    </li>
                  ))}

                  {/* Email */}
                  <li className="flex items-center gap-3">
                    <i className="fas fa-envelope text-[var(--accent-yellow)] text-lg"></i>
                    <span className="text-[#B8B8CC]">
                      {contactInfo?.mst_college_contact?.headquarters?.email}
                    </span>
                  </li>

                </ul>
              )}
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#2a2a4a]">Newsletter</h3>
              <p className="text-[#B8B8CC] mb-4">
                Subscribe to our newsletter for the latest updates and announcements.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1a4a] border border-[#2a2a4a] text-white placeholder-[#807F9A] focus:outline-none focus:border-[var(--accent-yellow)] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[var(--accent-yellow)] text-[#010035] font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="bg-[#0a0a2a] py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#807F9A] text-sm">
                <i className="far fa-copyright mr-1"></i>
                {new Date().getFullYear()} M.S.T College. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <NavLink to={"/privacy-policy"} >
                <p className="text-[#B8B8CC] hover:text-[var(--accent-yellow)] transition-colors">
                  <i className="fas fa-shield-alt mr-1"></i>
                  Privacy Policy
                </p>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;