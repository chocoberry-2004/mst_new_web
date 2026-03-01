import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";

// pages
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";

function App() {
  const [hideBacktoTop, setHideBacktoTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHideBacktoTop(false);
      } else {
        setHideBacktoTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=" scrollbar-hide">
      <Header />

      <main className="flex-1 scrollbar-hide">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/*' element={<NotFound/>} />
        </Routes>
      </main>

      {/* Back to Top Button */}
      {!hideBacktoTop && (
        <button
          className="fixed right-5 bottom-5 lg:right-7 lg:bottom-7 w-10 h-10 rounded-full bg-[var(--accent-yellow)] text-blue-800 cursor-pointer border border-1 animate-text-slide-up"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <i className="fa-solid fa-angle-up"></i>
        </button>
      )}

      <Footer />
    </div>
  );
}

export default App;
