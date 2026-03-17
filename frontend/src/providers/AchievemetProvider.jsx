import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const AchievementContext = createContext();

// https://mst-new-web-shiv.onrender.com

const fetchAchievement = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/achievements/`);
  if (!response.ok) throw new Error("Failed to fetch achievement data");
  return response.json();
};

export const AchievementProvider = ({ children }) => {
  const {
    data: awards,
    isPending: awardLoading,
    error: awardErr,
  } = useQuery({
    queryKey: ["achievement"],
    queryFn: fetchAchievement,
  });

  return (
    <AchievementContext.Provider
      value={{ awards, awardLoading, awardErr }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

// custom hook
export const useAchievement = () => {
  return useContext(AchievementContext);
};