import React, { useState } from "react";
import Mst_logo from "../assets/images/mst_logo1.png";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER BAR */}
      <header
        id="navbar"
        className="fixed top-0 left-0 w-full z-50 bg-[#0B124E] shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

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

          {/* Desktop Navbar */}
          <div className="hidden lg:block">
            <Navbar />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-2xl cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      {/* SIDEBAR (Mobile) */}
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
