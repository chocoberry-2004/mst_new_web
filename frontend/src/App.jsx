import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import Course from "./pages/Course";
import Article from "./pages/Article";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MaintenancePage from "./pages/MaintenancePage";

// auth
import Login from "./components/Login";
import Register from "./components/Register";

// admin
import Index from "./admin/Index";
import Dashboard from "./admin/Dashboard";
import ManageLecturer from "./admin/ManageLecturer";
import ManageFaculty from "./admin/ManageFaculty";
import ManageEvent from "./admin/ManageEvent";
import ManagePartner from "./admin/ManagePartner";
import ManageAchievement from "./admin/ManageAchievement";

function App() {
  const [hideBacktoTop, setHideBacktoTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setHideBacktoTop(window.scrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMaintenanceMode = import.meta.env.VITE_BASE_UNDERMAINTENANCE

  if(isMaintenanceMode) {
    return <MaintenancePage/>
  }

  return (
    <div className="scrollbar-hide">

      <Routes>
        {/* user page routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/course"  element={<Course/>}/>
          <Route path="/article" element={<Article/>}/>
          <Route path="/event" element={<Events />} />
          <Route path="/event/type/:typeSlug" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        </Route>

        {/* auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin pages routes */}
        <Route path="/admin" element={<Index />}>
            <Route index element={<Navigate to="dashboard" />} /> 
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="lecturer" element={<ManageLecturer />} />
            <Route path="faculty" element={<ManageFaculty />} />
            <Route path="event" element={<ManageEvent />} />
            <Route path="partner" element={<ManagePartner/>}/>
            <Route path="achievement" element={<ManageAchievement/>}/>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Back To Top */}
      {!hideBacktoTop && (
        <button
          className="fixed right-5 bottom-5 lg:right-7 lg:bottom-7 w-10 h-10 rounded-full bg-[var(--accent-yellow)] text-blue-800 border animate-text-slide-up cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          <i className="fa-solid fa-angle-up"></i>
        </button>
      )}
    </div>
  );
}

export default App;