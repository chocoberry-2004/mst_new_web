import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const FacultyContext = createContext();

const fetchFaculty = async () => {
  const response = await fetch("/api/faculties/");
  if (!response.ok) throw new Error("Failed to fetch faculty data");
  return response.json();
};

export const FacultyProvider = ({ children }) => {
  const {
    data: facultyList,
    isPending: facultyLoading,
    error: facultyError,
  } = useQuery({
    queryKey: ["faculty"],
    queryFn: fetchFaculty,
  });

  return (
    <FacultyContext.Provider
      value={{ facultyList, facultyLoading, facultyError }}
    >
      {children}
    </FacultyContext.Provider>
  );
};

// custom hook for easier usage
export const useFaculty = () => {
  return useContext(FacultyContext);
};