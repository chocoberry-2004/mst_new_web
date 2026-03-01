import React from "react";
import Mst_logo from "../assets/images/mst_logo1.png";

function NotFound() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--primary-dark)] p-6">
      <div className="w-full max-w-4xl h-full max-h-[80vh] bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 flex items-center justify-center shadow-2xl">
        <div className="text-center px-6">

          <div className="flex items-center justify-center">

            <span className="text-8xl md:text-9xl font-extrabold text-[var(--primary-dark)] drop-shadow-lg">
              4
            </span>

            <div className="relative">

              {/* Graduation Cap */}
              <svg
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 text-[var(--primary-dark)] -rotate-10"
                viewBox="0 0 64 64"
                fill="currentColor"
              >
                <path d="M32 6 2 18l30 12 30-12L32 6z" />
                <path d="M12 26v12c0 6 20 6 20 6s20 0 20-6V26l-20 8-20-8z" />
              </svg>

              <img src={Mst_logo} alt="" className="w-22 h-22 bg-white rounded-full" />

            </div>

            <span className="text-8xl md:text-9xl font-extrabold text-[var(--accent-yellow)] drop-shadow-lg">
              4
            </span>
          </div>

          {/* Message */}
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-md mx-auto">
            Oops! The page you’re looking for seems to have graduated and moved on.
          </p>

          {/* CTA */}
          <a
            href="/"
            className="inline-block mt-8 px-8 py-3 rounded-xl bg-white text-[var(--primary-dark)] font-semibold border-2 border-[var(--accent-yellow)] hover:bg-[var(--accent-yellow)] hover:text-[var(--primary-dark)] transition-all duration-300 shadow-lg"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
