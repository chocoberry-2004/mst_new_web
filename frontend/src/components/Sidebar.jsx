import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Mst_logo from "../assets/images/mst_logo1.png";
import { useQuery } from "@tanstack/react-query";

const fetchEventType = async () => {
  const response = await fetch("/js/eventType.json");
  return await response.json();
}

function Sidebar({ isOpen, onClose }) {
  const [isEventsOpen, setIsEventsOpen] = useState(false);

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

  const { data: eventType, isPending: eventTypeLoading, error: eventTypeErr } = useQuery({
    queryKey: ['eventType'],
    queryFn: fetchEventType,
  });

  // Toggle dropdown
  const toggleEventsDropdown = () => {
    setIsEventsOpen(!isEventsOpen);
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={Mst_logo}
              alt="M.S.T College Logo"
              className="h-10 w-auto border-2 border-[var(--accent-yellow)] bg-white rounded-full"
            />
            <h1 className="text-[#FEFEFE] text-xl font-bold tracking-wide whitespace-nowrap">
              M.S.T College
            </h1>
          </div>
          
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
          <NavLink to="/" className={linkClass} onClick={onClose}>
            Home
          </NavLink>

          <NavLink to="/faculty" className={linkClass} onClick={onClose}>
            Faculty
          </NavLink>

          <NavLink to="/course" className={linkClass} onClick={onClose}>
            Course
          </NavLink>

          <NavLink to="/article" className={linkClass} onClick={onClose}>
            Article
          </NavLink>

          {/* Events dropdown */}
          <div className="flex flex-col ">
            <button
              onClick={toggleEventsDropdown}
              className="flex justify-between items-center w-full px-3 py-2 text-[#FEFEFE] hover:text-[#FFC53A] transition-all duration-300 font-medium relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#FFC53A] after:transition-all after:duration-300 after:w-0 hover:after:w-full"
            >
              <span>Events</span>
              <i className={`fa-solid fa-chevron-right transition-transform duration-300 ${isEventsOpen ? 'rotate-90' : ''}`}></i>
            </button>

            {/* event type dropdown - conditionally rendered */}
            {isEventsOpen && (
              <div className="ml-4 mt-2 p-2 border-l-2 border-white/20 absolute bg-[var(--primary-dark)]/20 backdrop-blur-lg z-100 w-44 left-0">
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
                             : "text-gray-300 hover:text-[#FFC53A] hover:bg-white/5"}`
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
                               : "text-gray-300 hover:text-[#FFC53A] hover:bg-white/5"}`
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

          <NavLink to="/contact" className={linkClass} onClick={onClose}>
            Contact
          </NavLink>

          <NavLink to="/about" className={linkClass} onClick={onClose}>
            About
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;