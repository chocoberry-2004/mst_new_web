import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const CourseContext = createContext();

const fetchCourse = async () => {
  const response = await fetch("/js/course.json");
  if (!response.ok) throw new Error("Failed to fetch course data");
  return response.json();
};

export const CourseProvider = ({ children }) => {
  const {
    data: course,
    isPending: courseLoading,
    error: courseError,
  } = useQuery({
    queryKey: ["course"],
    queryFn: fetchCourse,
  });

  return (
    <CourseContext.Provider
      value={{ course, courseLoading, courseError }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// custom hook
export const useCourse = () => {
  return useContext(CourseContext);
};