import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const FAQContext = createContext();


const fetchFAQ = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/faqs/`);
  if (!response.ok) throw new Error("Failed to fetch FAQ data");
  return response.json();
};

export const FAQProvider = ({ children }) => {

  const {
    data: FAQ,
    isPending: FAQLoading,
    error: FAQErr,
  } = useQuery({
    queryKey: ["faq"],
    queryFn: fetchFAQ,
  });

  return (
    <FAQContext.Provider value={{ FAQ, FAQLoading, FAQErr }}>
      {children}
    </FAQContext.Provider>
  );
};

// custom hook
export const useFAQ = () => {
  return useContext(FAQContext);
};