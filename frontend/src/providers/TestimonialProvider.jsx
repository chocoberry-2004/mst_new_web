import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const TestimonialContext = createContext();

const fetchTestimonial = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/testimonial`);
    if (!response.ok) throw new Error("Failed to fetch user data");
    return response.json();
};

export const TestimonialProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const {
        data: Testimonial,
        isPending: TestimonialLoading,
        error: TestimonialError,
    } = useQuery({
        queryKey: ["testimonial"],
        queryFn: fetchTestimonial,
    });

    // Add refresh function
    const refreshTestimonial = () => {
        queryClient.invalidateQueries({ queryKey: ["testimonial"] });
    };

    return (
    <TestimonialContext.Provider
      value={{ Testimonial, TestimonialLoading, TestimonialError, refreshTestimonial }}
    >
      {children}
    </TestimonialContext.Provider>
  );
};




// custom hook
export const useTestimonial = () => {
  return useContext(TestimonialContext);
};