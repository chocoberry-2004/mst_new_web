import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Create Context
const LecturerContext = createContext();

// Fetch function
const fetchLecturer = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/lecturers/`);
  if (!response.ok) throw new Error("Failed to fetch lecturers");
  return response.json();
};



// Provider Component
function LecturerProvider({ children }) {

  const queryClient = useQueryClient();

  const {
    data: lecturers,
    isPending: lecturerLoading,
    error: lecturerError
  } = useQuery({
    queryKey: ["lecturers"],
    queryFn: fetchLecturer,
  });

  // Add refresh function
  const refreshLecturers = () => {
    queryClient.invalidateQueries({ queryKey: ["lecturers"] });
  };

  console.log(lecturers, "hhihihi");

  return (
    <LecturerContext.Provider
      value={{ lecturers, lecturerLoading, lecturerError, refreshLecturers }}
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