import React, { useEffect, useRef, useState } from "react";
import w5 from "../assets/images/w5.png"
import { NavLink } from "react-router-dom";

function Home() {

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
    <div className="">
        <section
        className="min-h-[80vh] w-full flex items-end justify-center relative overflow-hidden transition-all duration-700 ease-in-out"

        >
        <div className="binary-bg"></div>

        <div className="binary-fall">
            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>  {/* M: 01001101 */}

            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">1</span>  {/* S: 01010011 */}

            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">1</span>
            <span className="binary-digit">0</span>
            <span className="binary-digit">0</span>  {/* T: 01010100 */}
        </div>

        {/* Main content */}
        <div className="w-full h-full relative z-10 px-4 flex justify-between items-end transition-transform duration-300 ease-in-out">
            <div className="lg:py-20 py-5 transition-all duration-300 ease-in-out">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white animate-drop-in transition-all duration-300 ease-in-out">
                    Shaping Future IT Professionals
                </h2>
                <p className="max-w-2xl mb-8 text-gray-300">
                    Learn cutting-edge technologies, industry-ready skills, and real-world problem solving.
                </p>
                <button className="px-5 py-2 lg:px-8 lg:py-3 rounded-full lg:font-semibold border-2 border-[var(--accent-yellow)] text-[var(--accent-yellow)] transition-all duration-300 ease-in-out">
                    <NavLink to="/faculty" className={linkClass}>
                        Explore Now
                    </NavLink>
                </button>
            </div>

            <div>
            <img
                src={w5}
                alt=""
                className="max-w-md w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px] h-auto animate-rise-up transition-all duration-300 ease-in-out"
            />
            </div>
        </div>
        </section>

        {/* decorative bar */}
        <section className="h-[20vh]  bg-[#807F9A] flex items-start ">

            <div className="bg-[linear-gradient(to_bottom,#B8860B_0%,#D9B84A_50%,#B8860B_100%)] border-b border-[#B8860B] h-[50%] lg:h-[80%] w-[20%] rounded-b-[100%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out">
                <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                    <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                        <div className="bg-[#B8860B] h-[80%] w-full rounded-b-[90%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)]">
                            <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                                <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                                </div>              
                            </div>
                        </div>             
                    </div>              
                </div>
            </div>

            <div className="bg-[linear-gradient(to_bottom,#B8860B_0%,#D9B84A_50%,#B8860B_100%)] border-b border-[#B8860B] h-[50%] lg:h-[80%] w-[20%] rounded-b-[100%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out">
                <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                    <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                        <div className="bg-[#B8860B] h-[80%] w-full rounded-b-[90%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)]">
                            <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                                <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                                </div>              
                            </div>
                        </div>             
                    </div>              
                </div>
            </div>

            <div className="bg-[linear-gradient(to_bottom,#B8860B_0%,#D9B84A_50%,#B8860B_100%)] border-b border-[#B8860B] h-[50%] lg:h-[80%] w-[20%] rounded-b-[100%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out">
                <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                    <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                        <div className="bg-[#B8860B] h-[80%] w-full rounded-b-[90%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)]">
                            <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                                <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                                </div>              
                            </div>
                        </div>             
                    </div>              
                </div>
            </div>

            <div className="bg-[linear-gradient(to_bottom,#B8860B_0%,#D9B84A_50%,#B8860B_100%)] border-b border-[#B8860B] h-[50%] lg:h-[80%] w-[20%] rounded-b-[100%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out">
                <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                    <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                        <div className="bg-[#B8860B] h-[80%] w-full rounded-b-[90%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)]">
                            <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                                <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                                </div>              
                            </div>
                        </div>             
                    </div>              
                </div>
            </div>

            <div className="bg-[linear-gradient(to_bottom,#B8860B_0%,#D9B84A_50%,#B8860B_100%)] border-b border-[#B8860B] h-[50%] lg:h-[80%] w-[20%] rounded-b-[100%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out">
                <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                    <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                        <div className="bg-[#B8860B] h-[80%] w-full rounded-b-[90%] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.4)]">
                            <div className="w-full bg-white h-[80%] rounded-b-[90%] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.25)]">
                                <div className="w-full bg-[var(--primary-dark)] h-[80%] rounded-b-[90%] shadow-[0_6px_12px_-10px_rgba(0,0,0,0.5)]">
                                </div>              
                            </div>
                        </div>             
                    </div>              
                </div>
            </div>
        </section>
        
       <section className="bg-[#807F9A] text-[var(--primary-dark)] py-16 px-6 graduation-background">
  
        <div className="max-w-6xl mx-auto text-center mb-12 text-[var(--accent-yellow)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" 
            style={{
                WebkitTextStroke: "1.5px var(--primary-dark)",
            }}>
            Our Mission
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-90" >
            We are driven by purpose, clarity, and commitment to creating meaningful impact.
            </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 
                            shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] 
                            hover:-translate-y-2 transition">
                <h3 className="text-xl font-semibold mb-4">
                    Purpose Driven
                </h3>
                <p className="opacity-80 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam eligendi nostrum corrupti impedit.
                </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 
                            shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] 
                            hover:-translate-y-2 transition">
                <h3 className="text-xl font-semibold mb-4">
                    Thoughtful Design
                </h3>
                <p className="opacity-80 leading-relaxed">
                    Nulla alias quidem cum nemo neque deleniti, creating experiences that feel natural and intentional.
                </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 
                            shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] 
                            hover:-translate-y-2 transition">
                <h3 className="text-xl font-semibold mb-4">
                    Lasting Impact
                </h3>
                <p className="opacity-80 leading-relaxed">
                    We focus on solutions that endure, scale, and positively affect people over time.
                </p>
            </div>

        </div>
        </section>

    </div>
  );
}

export default Home;
