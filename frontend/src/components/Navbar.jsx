import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchEventType = async () => {
  const response = await fetch("/js/eventType.json");
  return await response.json();
}

function Navbar() {
    const [isEventsOpen, setIsEventsOpen] = useState(false);
  
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


    const { data: eventType, isPending: eventTypeLoading, error: eventTypeErr } = useQuery({
      queryKey: ['eventType'],
      queryFn: fetchEventType,
    });

      // Toggle dropdown
  const toggleEventsDropdown = () => {
    setIsEventsOpen(!isEventsOpen);
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

      <div className="flex flex-col relative">
        <button
          onClick={toggleEventsDropdown}
          className="flex justify-between items-center w-full px-3 py-2 text-[#FEFEFE] hover:text-[#FFC53A] transition-all duration-300 font-medium relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#FFC53A] after:transition-all after:duration-300 after:w-0 hover:after:w-full"
        >
          <span>Event</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-300 ml-2 ${isEventsOpen ? 'rotate-180' : ''}`}></i>
        </button>
      
        {/* event type dropdown - conditionally rendered */}
                  {isEventsOpen && (
                    <div className="ml-4 mt-2 p-2 border-l-2 border-white/20 absolute bg-[var(--primary-dark)]/20 backdrop-blur-lg z-100 min-w-44 -left-5 top-10">
                      {eventTypeLoading && (
                        <p className="text-gray-300 text-sm py-1">Loading...</p>
                      )}
      
                      {eventTypeErr && (
                        <p className="text-red-400 text-sm py-1">Failed to load</p>
                      )}
      
                      {eventType && eventType.length > 0 ? (
                        <ul className="flex flex-col gap-1">
                          {/* "All Events" option */}
                          <li>
                            <NavLink
                              to="/event"
                              className={({ isActive }) => 
                                `block text-sm py-1.5 px-2 transition rounded font-bold
                                 ${isActive 
                                   ? "text-[#FFC53A] bg-white/10" 
                                   : "text-white hover:text-[#FFC53A] hover:bg-white/5"}`
                              }
                              onClick={() => {
                                onClose();
                                setIsEventsOpen(false);
                              }}
                            >
                              All Events
                            </NavLink>
                          </li>
      
                          {/* Event type options */}
                          {eventType.map((type) => (
                            <li key={type.id}>
                              <NavLink
                                to={`/events/type/${type.slug}`}
                                className={({ isActive }) => 
                                  `block text-sm py-1.5 px-2 transition rounded text-shadow-lg
                                   ${isActive 
                                     ? "text-[#FFC53A] bg-white/10" 
                                     : "text-white hover:text-[#FFC53A] hover:bg-white/5"}`
                                }
                                onClick={() => {
                                  onClose();
                                  setIsEventsOpen(false);
                                }}
                              >
                                {type.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        !eventTypeLoading && !eventTypeErr && (
                          <p className="text-gray-300 text-sm py-1">No event types</p>
                        )
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
