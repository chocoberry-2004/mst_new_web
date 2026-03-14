import React, { useState, useEffect } from "react";
import Mst_logo from "../assets/images/mst_logo1.png";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setChangeNavbarColor(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          changeNavbarColor
            ? "bg-[#0B124E] shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <NavLink to="/">
          <div className="flex items-center gap-3">
            <img
              src={Mst_logo}
              alt="M.S.T College Logo"
              className="h-10 w-auto border-2 border-[var(--accent-yellow)] bg-white rounded-full"
            />
            <h1 className="text-white text-xl font-bold tracking-wide whitespace-nowrap text-shadow-lg">
              M.S.T College
            </h1>
          </div>
          </NavLink>

          {/* Desktop Navbar */}
          <div className="hidden lg:block">
            <Navbar />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-2x cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

export default Header;