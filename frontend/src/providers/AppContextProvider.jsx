import React from 'react'
import { createContext } from 'react'
import { useState } from 'react';

const AppContext = createContext();

function AppContextProvider({children}) {
    let [showModal, setShowModal] = useState(false);
    let [showCampusTour, setShowCampusTour] = useState(false);
    let [showAwardDetail, setShowAwardDetail] = useState(false);

    const [formType, setFormType] = useState("");

    const openApplicationForm = (type = "general") => {
      setFormType(type);
      setShowModal(true);
    };

    const ApplicationFormHandler = () => {
        if(showModal) {
          setShowModal(false);
        } else {
          setShowModal(true);
        }
    }

    const CampusTourHandler = () => {
        if(showCampusTour) {
          setShowCampusTour(false);
        } else {
          setShowCampusTour(true);
        }
    }

    const AwardDetailHandler = () => {
        if(showAwardDetail) {
          setShowAwardDetail(false);
        } else {
          setShowAwardDetail(true);
        }
    }

    return (
        <AppContext.Provider value={{showModal, setShowModal, openApplicationForm, formType,ApplicationFormHandler,showCampusTour, setShowCampusTour,CampusTourHandler,showAwardDetail, setShowAwardDetail,AwardDetailHandler}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext};