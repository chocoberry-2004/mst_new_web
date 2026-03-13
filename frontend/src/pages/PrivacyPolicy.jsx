import React from "react";
import privacy1 from "../assets/images/privacy1.jpg";
import privacy2 from "../assets/images/privacy2.jpg";
import privacy3 from "../assets/images/privacy3.png";
import Mst_logo from "../assets/images/mst_logo1.png";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";

const fetchPrivacyPolicy = async () => {
  const response = await fetch("/js/privacy_policy.json");
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};


function PrivacyPolicy() {

  const { data: privacyData, isPending: privacyLoading, error: privacyErr } = useQuery({
    queryKey: ["privacy"],
    queryFn: fetchPrivacyPolicy,
  });


  if(privacyLoading) return <Loading/>;

  return (

    <div className="min-h-screen py-5 ">

    <img src={privacy3} alt="" className="w-full min-h-screen fixed top-0 -z-10" />
      

    <div className="max-w-5xl mx-auto px-6">
        {/* Privacy Policy Header Card */}
        <div className="relative w-full mt-10 overflow-hidden rounded-t-3xl shadow-2xl">
          {/* Background Gradient with Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary-dark)] to-[var(--primary-dark)]/90">
            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 opacity-10" 
                style={{ 
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} 
            />
          </div>
          
          {/* Animated Gradient Orbs */}
          <div className="absolute top-0 -left-20 w-72 h-72 bg-[var(--accent-yellow)]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-[#00ffaa]/20 rounded-full blur-3xl animate-pulse delay-1000" />

          {/* Main Content */}
          <div className="relative z-10 p-8 md:p-12">
            {/* Logo and Tagline Section */}
            <div className="flex flex-col items-center mb-10 md:mb-16">
              <div className="relative group">
                {/* Logo Glow Effect */}
                <div className="absolute inset-0 bg-[var(--accent-yellow)]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <img 
                  src={Mst_logo} 
                  alt="M.S.T College Logo" 
                  className="relative w-40 h-auto drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="relative mt-4">
                <p className="text-xl md:text-2xl font-medium text-[var(--accent-yellow)] tracking-wider">
                  Your Success, Our Destination
                </p>
                {/* Decorative Underline */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-yellow)] to-transparent" />
              </div>
            </div>

            {/* Privacy Policy Content */}
            <div className="max-w-4xl mx-auto">
              {/* Title Section */}
              <div className="text-center mb-10">
                <div className="inline-block relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -left-8 w-12 h-12 border-l-2 border-t-2 border-[var(--accent-yellow)]/30 rounded-tl-xl" />
                  <div className="absolute -bottom-4 -right-8 w-12 h-12 border-r-2 border-b-2 border-[var(--accent-yellow)]/30 rounded-br-xl" />
                  
                  <h1 className="text-4xl md:text-6xl font-bold text-white relative">
                    Privacy <span className="text-[var(--accent-yellow)]">Policy</span>
                  </h1>
                </div>
              </div>

              {/* Description Card */}
              <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl">
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 text-4xl text-[var(--accent-yellow)]/30 font-serif">"</div>
                
                <p className="text-gray-100 text-lg md:text-xl leading-relaxed text-center md:text-left relative z-10">
                  <span className="font-semibold text-[var(--accent-yellow)]">M.S.T College Myanmar</span> is committed to protecting your privacy and 
                  safeguarding your personal information. We respect your personal 
                  data and ensure it is handled securely in compliance with applicable laws.
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-b-xl p-8 space-y-8">
          {privacyData.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">{index + 1}. {section.title}</h2>

              {section.description.map((text, i) => (
                <p className="text-gray-600 leading-relaxed" key={i}>{text}</p>
              ))}
            </section>
          ))}


          {/* Last Updated */}
          <div className="border-t pt-6 text-sm text-gray-500 text-center">
            Last Updated: {new Date().getFullYear()}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default PrivacyPolicy;