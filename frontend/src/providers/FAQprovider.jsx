import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const FAQContext = createContext();


const fetchFAQ = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/faqs/`);
  if (!response.ok) throw new Error("Failed to fetch FAQ data");
  return response.json();
};

export const FAQProvider = ({ children }) => {

  const queryClient = useQueryClient();

  const {
    data: FAQ,
    isPending: FAQLoading,
    error: FAQErr,
  } = useQuery({
    queryKey: ["faq"],
    queryFn: fetchFAQ,
  });


  // Add refresh function
  const refreshFAQ = () => {
    queryClient.invalidateQueries({ queryKey: ["faq"] });
  };


  return (
    <FAQContext.Provider value={{ FAQ, FAQLoading, FAQErr, refreshFAQ }}>
      {children}
    </FAQContext.Provider>
  );
};

// custom hook
export const useFAQ = () => {
  return useContext(FAQContext);
};