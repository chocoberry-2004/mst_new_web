import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Mst_logo from "../assets/images/mst_logo1.png";
import { useEventContext } from '../providers/EventProvider';
import { AppContext } from "../providers/AppContextProvider";

function Sidebar({ isOpen, onClose }) {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const { events, eventType, loading, error } = useEventContext();
  const {showSidebar, setShowSidebar, sideBarHandler} = useContext(AppContext);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 font-medium transition-all duration-300
     ${
       isActive
         ? "text-[#FFC53A]"
         : "text-[#FEFEFE] hover:text-[#FFC53A]"
     }
     after:absolute after:left-0 after:bottom-0
     after:h-[2px] after:bg-[#FFC53A]
     after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsEventsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close dropdown when route changes
  useEffect(() => {
    setIsEventsOpen(false);
  }, [location.pathname]);

  // Close dropdown when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      setIsEventsOpen(false);
    }
  }, [isOpen]);

  const toggleEventsDropdown = (e) => {
    e.stopPropagation();
    setIsEventsOpen(!isEventsOpen);
  };

  const handleLinkClick = () => {
    setIsEventsOpen(false);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0B124E] z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `}
      >
        {/* Header */}
        
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <NavLink to="/">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={Mst_logo}
              alt="M.S.T College Logo"
              className="h-10 w-auto border-2 border-[var(--accent-yellow)] bg-white rounded-full"
            />
            <h1 className="text-[#FEFEFE] text-xl font-bold tracking-wide whitespace-nowrap">
              M.S.T College
            </h1>
          </div>
          </NavLink>
          
          <button
            className="text-white text-xl cursor-pointer"
            onClick={onClose}
            aria-label="Close Menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2 px-6 py-6 relative">
          <NavLink to="/" className={linkClass} onClick={handleLinkClick}>
            Home
          </NavLink>

          <NavLink to="/faculty" className={linkClass} onClick={handleLinkClick}>
            Faculty
          </NavLink>

          <NavLink to="/course" className={linkClass} onClick={handleLinkClick}>
            Course
          </NavLink>

          {/* <NavLink to="/article" className={linkClass} onClick={handleLinkClick}>
            Article
          </NavLink> */}

          {/* Events dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleEventsDropdown}
              className="flex cursor-pointer justify-between items-center w-full px-3 py-2 text-[#FEFEFE] hover:text-[#FFC53A] transition-all duration-300 font-medium relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#FFC53A] after:transition-all after:duration-300 after:w-0 hover:after:w-full"
            >
              <span>Events</span>
              <i className={`fa-solid fa-chevron-right transition-transform duration-300 ${isEventsOpen ? 'rotate-90' : ''}`}></i>
            </button>

            {/* Event type dropdown */}
            {isEventsOpen && (
              <div className="ml-4 mt-2 p-2 border-l-2 border-white/20 bg-[#0B124E] rounded-r-md shadow-lg w-44">
                {loading && (
                  <p className="text-gray-300 text-sm py-2 px-2">Loading...</p>
                )}

                {error && (
                  <p className="text-red-400 text-sm py-2 px-2">Failed to load</p>
                )}

                {!loading && !error && (
                  <ul className="flex flex-col gap-1">
                    {/* "All Events" option */}
                    <li>
                      <NavLink
                        to="/event"
                        className={({ isActive }) => 
                          `block text-sm py-2 px-3 transition rounded
                           ${isActive 
                             ? "text-[#FFC53A] bg-white/10" 
                             : "text-gray-300 hover:text-[#FFC53A] hover:bg-white/5"}`
                        }
                        onClick={handleLinkClick}
                      >
                        All Events
                      </NavLink>
                    </li>

                    {/* Event type options */}
                    {eventType && eventType.length > 0 ? (
                      eventType.map((type) => (
                        <li key={type.id}>
                          <NavLink
                            to={`/event/type/${type.slug}#event-grid`}
                            className={({ isActive }) => 
                              `block text-sm py-2 px-3 transition rounded
                               ${isActive 
                                 ? "text-[#FFC53A] bg-white/10" 
                                 : "text-gray-300 hover:text-[#FFC53A] hover:bg-white/5"}`
                            }
                            onClick={handleLinkClick}
                          >
                            {type.name}
                          </NavLink>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-300 text-sm py-2 px-3">No event types</p>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>

          <NavLink to="/contact" className={linkClass} onClick={handleLinkClick}>
            Contact
          </NavLink>

          <NavLink to="/about" className={linkClass} onClick={handleLinkClick}>
            About
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;