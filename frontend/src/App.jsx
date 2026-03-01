import { Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col">
      
      <Header />

      <main className="flex-1 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
