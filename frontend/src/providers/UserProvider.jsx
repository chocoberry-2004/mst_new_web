// import React, { createContext, useContext } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

// const UserContext = createContext();

// const fetchUser = async () => {
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const response = await fetch(`${apiUrl}/users`);
//     if (!response.ok) throw new Error("Failed to fetch user data");
//     return response.json();
// };

// export const UserProvider = ({ children }) => {
//     const queryClient = useQueryClient();

//     const {
//         data: users,
//         isPending: userLoading,
//         error: userError,
//     } = useQuery({
//         queryKey: ["user"],
//         queryFn: fetchUser,
//     });

//     // Add refresh function
//     const refreshUser = () => {
//         queryClient.invalidateQueries({ queryKey: ["user"] });
//     };

//     return (
//     <UserContext.Provider
//       value={{ users, userLoading, userError, refreshUser }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // custom hook
// export const useUser = () => {
//   return useContext(UserContext);
// };


import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all users
const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch user data");
    return response.json();
};

// Create user
const createUser = async (userData) => {
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create user");
    }
    return response.json();
};

// Update user
const updateUser = async ({ id, userData }) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
    }
    return response.json();
};

// Delete user
const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete user");
    }
    return response.json();
};

export const UserProvider = ({ children }) => {
    const queryClient = useQueryClient();

    // Query for fetching users
    const {
        data: users = [],
        isPending: userLoading,
        error: userError,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    // Create user mutation
    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    // Update user mutation
    const updateMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    // Delete user mutation
    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    // Add refresh function
    const refreshUsers = () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    return (
        <UserContext.Provider
            value={{
                users,
                userLoading,
                userError,
                refreshUsers,
                // Create user
                createUser: createMutation.mutateAsync,
                createLoading: createMutation.isPending,
                createError: createMutation.error,
                // Update user
                updateUser: updateMutation.mutateAsync,
                updateLoading: updateMutation.isPending,
                updateError: updateMutation.error,
                // Delete user
                deleteUser: deleteMutation.mutateAsync,
                deleteLoading: deleteMutation.isPending,
                deleteError: deleteMutation.error,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// custom hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};