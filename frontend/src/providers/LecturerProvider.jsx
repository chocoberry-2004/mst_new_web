import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

// Create Context
const LecturerContext = createContext();

// Fetch function
const fetchLecturer = async () => {
  const response = await fetch(`${apiUrl}/lecturers/`);
  if (!response.ok) throw new Error("Failed to fetch lecturers");
  return response.json();
};

// Provider Component
function LecturerProvider({ children }) {

  const {
    data: lecturers,
    isPending: lecturerLoading,
    error: lecturerError
  } = useQuery({
    queryKey: ["lecturers"],
    queryFn: fetchLecturer,
  });

  return (
    <LecturerContext.Provider
      value={{ lecturers, lecturerLoading, lecturerError }}
    >
      {children}
    </LecturerContext.Provider>
  );
}

// Custom Hook
export function useLecturer() {
  return useContext(LecturerContext);
}

export default LecturerProvider;