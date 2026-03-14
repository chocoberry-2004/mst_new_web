import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useEventContext } from '../providers/EventProvider';

function Navbar() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { events, eventType, loading, error } = useEventContext();

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 font-medium transition-all duration-300
    ${
      isActive
        ? "text-[#FFC53A]"
        : "text-[#FEFEFE] hover:text-[#FFC53A]"
    }
    after:absolute after:left-0 after:-bottom-1
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsEventsOpen(false);
  }, [location.pathname]);

  const toggleEventsDropdown = () => {
    setIsEventsOpen(!isEventsOpen);
  };

  const closeDropdown = () => {
    setIsEventsOpen(false);
  };

  return (
    <nav className="flex items-center gap-8 text-shadow-lg">
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>

      <NavLink to="/faculty" className={linkClass}>
        Faculty
      </NavLink>

      <NavLink to="/course" className={linkClass}>
        Course
      </NavLink>

      <NavLink to="/article" className={linkClass}>
        Article
      </NavLink>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleEventsDropdown}
          className="flex items-center px-3 py-2 text-[#FEFEFE] hover:text-[#FFC53A] transition-all duration-300 font-medium relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#FFC53A] after:transition-all after:duration-300 after:w-0 hover:after:w-full"
        >
          <span>Event</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-300 ml-2 ${isEventsOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Event type dropdown */}
        {isEventsOpen && (
          <div className="absolute left-0 top-10 mt-2 p-2 min-w-48 bg-[var(--primary-dark)]/20 backdrop-blur-lg rounded-md border border-white/10 z-50">
            {loading && (
              <p className="text-gray-300 text-sm py-2 px-2">Loading...</p>
            )}

            {error && (
              <p className="text-red-400 text-sm py-2 px-2">Failed to load</p>
            )}

            {!loading && !error && (
              <ul className="flex flex-col gap-1">
                {/* All Events option */}
                <li>
                  <NavLink
                    to="/event"
                    className={({ isActive }) => 
                      `block text-sm py-2 px-3 transition rounded-md
                       ${isActive 
                         ? "text-[#FFC53A] bg-white/10" 
                         : "text-white hover:text-[#FFC53A] hover:bg-white/5"}`
                    }
                    onClick={closeDropdown}
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
                          `block text-sm py-2 px-3 transition rounded-md
                           ${isActive 
                             ? "text-[#FFC53A] bg-white/10" 
                             : "text-white hover:text-[#FFC53A] hover:bg-white/5"}`
                        }
                        onClick={closeDropdown}
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

      <NavLink to="/contact" className={linkClass}>
        Contact
      </NavLink>

      <NavLink to="/about" className={linkClass}>
        About
      </NavLink>
    </nav>
  );
}

export default Navbar;