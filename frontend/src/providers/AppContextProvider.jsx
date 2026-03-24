import React from 'react'
import { createContext } from 'react'
import { useState, useEffect } from 'react';

const AppContext = createContext();

function AppContextProvider({children}) {
    let [showModal, setShowModal] = useState(false);
    let [showCampusTour, setShowCampusTour] = useState(false);
    let [showAwardDetail, setShowAwardDetail] = useState(false);
    let [showAdminSideBar, setShowAdminSideBar] = useState(false);
    let [showSidebar, setShowSidebar] = useState(false);

    const [formType, setFormType] = useState("");

    const closeAllOverlays = () => {
      setShowModal(false);
      setShowCampusTour(false);
      setShowAwardDetail(false);
      setShowAdminSideBar(false);
      setShowSidebar(false);
    };

    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      const handleBreakpointChange = (e) => {
        if (e.matches) {
          // switched to large screen
          closeAllOverlays();
        }
      };

      mediaQuery.addEventListener("change", handleBreakpointChange);

      return () => {
        mediaQuery.removeEventListener("change", handleBreakpointChange);
      };
    }, []);

    const openApplicationForm = (type = "general") => {
      setFormType(type);
      setShowModal(true);
    };

    const ApplicationFormHandler = () => {
      setShowModal(prev => !prev);
    };

    const CampusTourHandler = () => {
      setShowCampusTour(prev => !prev);
    };

    const AwardDetailHandler = () => {
      setShowAwardDetail(prev => !prev);
    };

    const AdminSideBarHandler = () => {
      setShowAdminSideBar(prev => !prev);
    };

    const sideBarHandler = () => {
      setShowSidebar(prev => !prev);
    }

    return (
        <AppContext.Provider value={{
          showModal, 
          setShowModal, 
          openApplicationForm, 
          formType,
          ApplicationFormHandler,
          showCampusTour, 
          setShowCampusTour,
          CampusTourHandler,
          showAwardDetail, 
          setShowAwardDetail,
          AwardDetailHandler, 
          showAdminSideBar, 
          setShowAdminSideBar, 
          AdminSideBarHandler,
          closeAllOverlays,
          showSidebar,
          setShowSidebar,
          sideBarHandler
          
          }}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext};