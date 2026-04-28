import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const UserContext = createContext();

const fetchUser = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/users`);
    if (!response.ok) throw new Error("Failed to fetch user data");
    return response.json();
};

export const UserProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const {
        data: users,
        isPending: userLoading,
        error: userError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });

    // Add refresh function
    const refreshUser = () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
    };

    return (
    <UserContext.Provider
      value={{ users, userLoading, userError, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// custom hook
export const useUser = () => {
  return useContext(UserContext);
};