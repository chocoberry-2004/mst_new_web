import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const PartnerContext = createContext();

const fetchPartner = async () => {
   const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/partners/`);
  if (!response.ok) throw new Error("Failed to fetch partners");
  return response.json();
};

export const PartnerProvider = ({ children }) => {
  const {
    data: partners,
    isPending: partnerLoading,
    error: partnerError,
  } = useQuery({
    queryKey: ["partners"],
    queryFn: fetchPartner,
  });

  return (
    <PartnerContext.Provider
      value={{ partners, partnerLoading, partnerError }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

// custom hook
export const usePartner = () => {
  return useContext(PartnerContext);
};