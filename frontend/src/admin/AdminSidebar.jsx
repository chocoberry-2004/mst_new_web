import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Mst_logo from "../assets/images/mst_logo1.png";
import { AppContext } from "../providers/AppContextProvider";
import { useContext } from "react";

function AdminSidebar() {
  let {showAdminSideBar, setShowAdminSideBar, AdminSideBarHandler} = useContext(AppContext);
  
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
     

      {showAdminSideBar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => AdminSideBarHandler()}
        ></div>
      )}

      <aside
        className={`
        fixed top-0 left-0 z-50
        h-screen w-64 bg-[var(--primary-dark)]
        transform transition-transform duration-300
        
        ${showAdminSideBar ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Logo */}
       
        <div className="flex items-center gap-3 p-6 border-b border-gray-600">
          <NavLink to={"/"}>
            <div className="flex items-center gap-3">
              <img
                src={Mst_logo}
                alt="M.S.T College Logo"
                className="h-10 w-auto border-2 border-[var(--accent-yellow)] bg-white rounded-full"
              />
              <h1 className="text-white text-xl font-bold whitespace-nowrap">
                M.S.T College
              </h1>
            </div>
          </NavLink>

          {/* Close Button Mobile */}
          <button
            className="ml-auto lg:hidden text-white cursor-pointer"
            onClick={() => AdminSideBarHandler()}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 px-6 py-6">
          <NavLink to="dashboard" className={linkClass} onClick={() => setShowAdminSideBar(false)}>
            Dashboard
          </NavLink>

          <NavLink to="lecturer" className={linkClass} onClick={() => setShowAdminSideBar(false)}>
            Lecturers
          </NavLink>

          {/* <NavLink to="faculty" className={linkClass} onClick={() => setShowAdminSideBar(false)}>
            Faculty
          </NavLink> */}

          <NavLink to="event" className={linkClass} onClick={() => setShowAdminSideBar(false)}>
            Events
          </NavLink>

          {/* <NavLink to="partner" className={linkClass} onClick={() => setShowAdminSideBar(false)}>
            Partners
          </NavLink> */}

          <NavLink to="achievement" className={linkClass} onClick={() => setShowAdminSideBar(false)}>
            Achievements
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default AdminSidebar;