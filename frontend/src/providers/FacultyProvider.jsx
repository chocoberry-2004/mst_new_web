import React, { createContext, useContext } from "react";
import { useQuery,useQueryClient } from "@tanstack/react-query";

const FacultyContext = createContext();

const fetchFaculty = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/faculties/`);
  // const response = await fetch(`/js/faculty.json`);
  if (!response.ok) throw new Error("Failed to fetch faculty data");
  return response.json();
};

export const FacultyProvider = ({ children }) => {

  const queryClient = useQueryClient();
  
  const {
    data: facultyList,
    isPending: facultyLoading,
    error: facultyError,
  } = useQuery({
    queryKey: ["faculty"],
    queryFn: fetchFaculty,
  });

  console.log(facultyList);

  // Add refresh function
  const refetchFaculties = () => {
    queryClient.invalidateQueries({ queryKey: ["faculty"] });
  };



  return (
    <FacultyContext.Provider
      value={{ facultyList, facultyLoading, facultyError,refetchFaculties }}
    >
      {children}
    </FacultyContext.Provider>
  );
};

// custom hook for easier usage
export const useFaculty = () => {
  return useContext(FacultyContext);
};