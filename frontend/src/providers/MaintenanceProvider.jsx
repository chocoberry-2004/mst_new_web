import React, { createContext, useState } from "react";

const MaintainContext = createContext();

function MaintenanceProvider({ children }) {
  // Global maintenance switch
  const [maintaining, setMaintaining] = useState(false);

  // Page-specific maintenance
  const [maintainHome, setMaintainHome] = useState(false);
  const [maintainFaculty, setMaintainFaculty] = useState(false);
  const [maintainCourse, setMaintainCourse] = useState(false);
  const [maintainArticle, setMaintainArticle] = useState(false);
  const [maintainEvent, setMaintainEvent] = useState(false);
  const [maintainContact, setMaintainContact] = useState(false);
  const [maintainAbout, setMaintainAbout] = useState(false);
  const [maintainPrivacy, setMaintainPrivacy] = useState(false);

  console.log(maintaining);

  return (
    <MaintainContext.Provider
      value={{
        // Global user pages
        maintaining,
        setMaintaining,

        // Pages
        maintainHome,
        setMaintainHome,
        maintainFaculty,
        setMaintainFaculty,
        maintainCourse,
        setMaintainCourse,
        maintainArticle,
        setMaintainArticle,
        maintainEvent,
        setMaintainEvent,
        maintainContact,
        setMaintainContact,
        maintainAbout,
        setMaintainAbout,
        maintainPrivacy,
        setMaintainPrivacy,
      }}
    >
      {children}
    </MaintainContext.Provider>
  );
}

export { MaintenanceProvider, MaintainContext };