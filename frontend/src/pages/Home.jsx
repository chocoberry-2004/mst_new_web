import React, { useEffect, useRef, useState } from "react";
import w5 from "../assets/images/w5.png"
import principal from "../assets/images/principal.png";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const binaryDigits = Array.from({ length: 40 });

const fetchPartner = async () => {
  const response = await fetch("/js/partners.json");
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

function Home() {

    const { data: partners, isPending: partnerLoading, error: partnerError } = useQuery({
        queryKey: ["partners"],
        queryFn: fetchPartner,
    });

    console.log(partners);

    if(partnerLoading) return <Loading/>;

  return (
    <div className="">
        <section
        className="min-h-[80vh] bg-[#807F9A]  w-full flex items-end justify-center relative overflow-hidden transition-all duration-700 ease-in-out"

        >
        <div className="binary-bg"></div>

        <div className="binary-fall">
        {binaryDigits.map((_, i) => {
            const left = Math.random() * 100; // random horizontal position
            const duration = 6 + Math.random() * 8; // random speed
            const delay = Math.random() * 5; // random delay
            const color = Math.random() > 0.5 ? "#4876ff" : "#00ffaa";
            const value = Math.random() > 0.5 ? "0" : "1";

            return (
            <span
                key={i}
                className="binary-digit"
                style={{
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                color,
                }}
            >
                {value}
            </span>
            );
        })}
        </div>

        {/* Main content */}
        <div className="w-full h-full relative z-10 px-4 flex justify-between items-end transition-transform duration-300 ease-in-out">
            <div className="lg:py-20 py-5 transition-all duration-300 ease-in-out">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white animate-drop-in transition-all duration-300 ease-in-out space-x-3">
                    {/* Shaping Future IT Professionals in <span className="border-b-3"><span className="text-[var(--accent-yellow)]">M</span>.<span className="text-[var(--primary-dark)]">S</span>.<span>T</span> </span>  */}
                    <span className="text-[var(--accent-yellow)]">MYANMAR </span> <span className="text-[var(--primary-dark)]">SKILL </span> <span>TECHNOLOGY</span>
                </h2>
                <p className="text-[var(--accent-yellow)] mb-3 text-lg font-bold">Your Success Our Destination</p>
                <p className="max-w-2xl mb-8 text-gray-300">
                    Learn cutting-edge technologies, industry-ready skills, and real-world problem solving with us.
                </p>
                <button className="px-5 py-2 lg:px-8 lg:py-3 rounded-full lg:font-semibold border-2 border-[var(--accent-yellow)] text-[var(--accent-yellow)] hover:bg-[var(--accent-yellow)] hover:text-[var(--primary-dark)] transition-all duration-300 ease-in-out cursor-pointer">
                    <NavLink to="/faculty">
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

        {/* Our principal message */}
        
        <div className="graduation-background w-full min-h-screen bg-[#807F9A] fixed bottom-0 -z-1">

        </div>

        <section className=" text-[var(--primary-dark)] py-8 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Section Header */}
                <div className="text-center text-white mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
                    Our Principal's Message
                </h2>
                <p className="max-w-2xl mx-auto text-lg opacity-80">
                    A message from our leadership guiding the vision and future of M.S.T.
                </p>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row items-center gap-10 bg-white/60 backdrop-blur-lg rounded-3xl p-5 md:p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.35)]">

                {/* Principal Image */}
                <div className="w-full md:w-1/3 flex justify-center ">
                    <img
                    src={principal}
                    alt="Principal"
                    className="w-64 h-64 object-cover rounded-full border-4 border-[var(--accent-yellow)] shadow-lg bg-gradient-to-br from-[var(--primary-dark)] to-[var(--accent-yellow)] "
                    />
                </div>

                {/* Message Content */}
                <div className="w-full md:w-2/3 text-center md:text-left">
                    <h3 className="text-2xl font-semibold mb-4 text-[var(--primary-dark)]">
                    U Aung Zaw Myint
                    </h3>

                    <p className="text-gray-700 leading-relaxed mb-4">
                    “Education is the door to taste the sunlight of the brighter futures,which is not only for individuals but also for the entire nation.”
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                    Together, we build not just careers, but futures filled with opportunity, 
                    integrity, and excellence.
                    </p>

                    <div className="mt-6">
                    <span className="font-semibold text-[var(--primary-dark)]">
                        — Principal, M.S.T
                    </span>
                    </div>
                </div>

                </div>
            </div>
        
        </section>

        {/* Our Partners */}
        <section className=" py-16 px-6">
        <div className="max-w-6xl mx-auto">

            {/* Section Header */}
            <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4 text-shadow-lg">
                {partners?.partnersSection?.title}
            </h2>
            <p className="text-lg opacity-90">
                {partners?.partnersSection?.subtitle}
            </p>
            <p className="mt-3 max-w-2xl mx-auto opacity-75">
                {partners?.partnersSection?.description}
            </p>
            </div>

            {/* Loading */}
            {partnerLoading && (
            <p className="text-center text-white">Loading partners...</p>
            )}

            {/* Error */}
            {partnerError && (
            <p className="text-center text-red-400">Failed to load partners</p>
            )}

            {/* Partners Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners?.partnersSection?.partners?.map((partner) => (
                <div
                key={partner.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition duration-300"
                >
                <div className="flex justify-center mb-4">
                    <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 object-contain"
                    />
                </div>

                <h3 className="text-xl font-semibold text-center mb-2">
                    {partner.name}
                </h3>

                <p className="text-sm text-gray-600 text-center mb-3">
                    {partner.description}
                </p>

                <div className="space-y-2">
                    {partner.categories.map((cat, index) => (
                    <p
                        key={index}
                        className="text-xs bg-gray-200 px-2 py-1 rounded-full border border-gray-300"
                    >
                        {cat}
                    </p>
                    ))}
                </div>

                <div className="text-center mt-4">
                    <a
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline block w-full p-2 bg-gray-200 border border-gray-300 rounded-full"
                    >
                    Visit Website
                    </a>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>



    </div>
  );
}

export default Home;
