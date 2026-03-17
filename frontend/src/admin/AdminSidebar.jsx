import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Mst_logo from "../assets/images/mst_logo1.png";

function AdminSidebar() {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[var(--primary-dark)] text-white p-2 rounded-md"
        onClick={() => setOpen(true)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`
        fixed top-0 left-0 z-50
        h-screen w-64 bg-[var(--primary-dark)]
        transform transition-transform duration-300
        
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Logo */}
        <NavLink to={"/"}>
        <div className="flex items-center gap-3 p-6 border-b border-gray-600">
          <img
            src={Mst_logo}
            alt="M.S.T College Logo"
            className="h-10 w-auto border-2 border-[var(--accent-yellow)] bg-white rounded-full"
          />
          <h1 className="text-white text-xl font-bold whitespace-nowrap">
            M.S.T College
          </h1>

          {/* Close Button Mobile */}
          <button
            className="ml-auto lg:hidden text-white"
            onClick={() => setOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        </NavLink>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 px-6 py-6">
          <NavLink to="dashboard" className={linkClass} onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>

          <NavLink to="lecturer" className={linkClass} onClick={() => setOpen(false)}>
            Lecturers
          </NavLink>

          <NavLink to="faculty" className={linkClass} onClick={() => setOpen(false)}>
            Faculty
          </NavLink>

          <NavLink to="event" className={linkClass} onClick={() => setOpen(false)}>
            Events
          </NavLink>

          <NavLink to="partner" className={linkClass} onClick={() => setOpen(false)}>
            Partners
          </NavLink>

          <NavLink to="achievement" className={linkClass} onClick={() => setOpen(false)}>
            Achievements
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default AdminSidebar;