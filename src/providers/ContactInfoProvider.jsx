import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const ContactInfoContext = createContext();

const fetchContactInfo = async () => {
  const response = await fetch("/js/contact_info.json");
  if (!response.ok) throw new Error("Failed to fetch contact info");
  return response.json();
};

export const ContactInfoProvider = ({ children }) => {
  const {
    data: contactInfo,
    isPending: contactInfoLoading,
    error: contactInfoError,
  } = useQuery({
    queryKey: ["contact-info"],
    queryFn: fetchContactInfo,
  });

  return (
    <ContactInfoContext.Provider
      value={{ contactInfo, contactInfoLoading, contactInfoError }}
    >
      {children}
    </ContactInfoContext.Provider>
  );
};

// custom hook for easier usage
export const useContactInfo = () => {
  return useContext(ContactInfoContext);
};