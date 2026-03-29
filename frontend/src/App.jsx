import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";

// admin
import Index from "./admin/Index";
import Dashboard from "./admin/Dashboard";
import ManageLecturer from "./admin/ManageLecturer";
import ManageFaculty from "./admin/ManageFaculty";
import ManageEvent from "./admin/ManageEvent";
import ManagePartner from "./admin/ManagePartner";
import ManageAchievement from "./admin/ManageAchievement";

// context
import { MaintainContext } from "./providers/MaintenanceProvider";

function App() {
  const [hideBacktoTop, setHideBacktoTop] = useState(true);   


  const {
        // Global user pages
        maintaining,

        // Pages
        maintainHome,
        maintainFaculty,
        maintainCourse,
        maintainArticle,
        maintainEvent,
        maintainContact,
        maintainAbout,
        maintainPrivacy,
      } = useContext(MaintainContext);

  useEffect(() => {
    const handleScroll = () => {
      setHideBacktoTop(window.scrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMaintenanceMode = import.meta.env.VITE_BASE_UNDERMAINTENANCE

  // global maintenance
  if(isMaintenanceMode==="true") {
    return <MaintenancePage/>
  }

  const MaintenanceGuard = ({ condition, children }) => {
    if (condition) return <MaintenancePage />;
    return children;
  };

  const isAdminAuth = localStorage.getItem("adminAuth");

  return (
    <div className="scrollbar-hide">

      <Routes>
        {/* user page routes */}
        <Route 
          element={
            maintaining ? <MaintenancePage /> : <MainLayout />
          }
        >
          {/* <Route path="/" element={renderPage(maintainHome, <Home />)} />
          <Route path="/faculty" element={renderPage(maintainFaculty, <Faculty />)} />
          <Route path="/course" element={renderPage(maintainCourse, <Course />)} />
          <Route path="/article" element={renderPage(maintainArticle, <Article />)} />
          <Route path="/event" element={renderPage(maintainEvent, <Events />)} />
          <Route path="/event/type/:typeSlug" element={renderPage(maintainEvent, <Events />)} />
          <Route path="/contact" element={renderPage(maintainContact, <Contact />)} />
          <Route path="/about" element={renderPage(maintainAbout, <About />)} />
          <Route path="/privacy-policy" element={renderPage(maintainPrivacy, <PrivacyPolicy />)} /> */}

          <Route
            path="/"
            element={
              <MaintenanceGuard condition={maintainHome}>
                <Home />
              </MaintenanceGuard>
            }
          />

          <Route
            path="/faculty"
            element={
              <MaintenanceGuard condition={maintainFaculty}>
                <Faculty />
              </MaintenanceGuard>
            }
          />

          <Route
            path="/course"
            element={
              <MaintenanceGuard condition={maintainCourse}>
                <Course />
              </MaintenanceGuard>
            }
          />

          <Route
            path="/article"
            element={
              <MaintenanceGuard condition={maintainArticle}>
                <Article />
              </MaintenanceGuard>
            }
          />

          <Route
            path="/event"
            element={
              <MaintenanceGuard condition={maintainEvent}>
                <Events />
              </MaintenanceGuard>
            }
          />

          <Route
            path="/event/type/:typeSlug"
            element={
              <MaintenanceGuard condition={maintainEvent}>
                <Events />
              </MaintenanceGuard>
            }
          />

          <Route
            path="/contact"
            element={
              <MaintenanceGuard condition={maintainContact}>
                <Contact />
              </MaintenanceGuard>
            }
          />

          <Route
            path="/about"
            element={
              <MaintenanceGuard condition={maintainAbout}>
                <About />
              </MaintenanceGuard>
            }
          />

          <Route
            path="/privacy-policy"
            element={
              <MaintenanceGuard condition={maintainPrivacy}>
                <PrivacyPolicy />
              </MaintenanceGuard>
            }
          />

        </Route>

        {/* auth routes */}
        {/* <Route path="/login" element={<Login />} /> */}

        <Route
          path="/login"
          element={
            isAdminAuth ? <Navigate to="/admin/dashboard" /> : <Login />
          }
        />
        <Route path="/register" element={<Register />} />


        {/* admin pages routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lecturer" element={<ManageLecturer />} />
          <Route path="faculty" element={<ManageFaculty />} />
          <Route path="event" element={<ManageEvent />} />
          <Route path="partner" element={<ManagePartner />} />
          <Route path="achievement" element={<ManageAchievement />} />
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