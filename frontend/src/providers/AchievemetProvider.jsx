import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const AchievementContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

const fetchAchievement = async () => {
  const response = await fetch(`${apiUrl}/achievements/`);
  if (!response.ok) throw new Error("Failed to fetch achievement data");
  return response.json();
};

const fetchAwardType = async () => {
  const response = await fetch(`/js/awardType.json`);
  if (!response.ok) throw new Error("Failed to fetch achievement category");
  return response.json();
}

export const AchievementProvider = ({ children }) => {
  const {
    data: awards,
    isPending: awardLoading,
    error: awardErr,
  } = useQuery({
    queryKey: ["achievement"],
    queryFn: fetchAchievement,
  });

  const {
    data: awardType,
    isPending: awardTypeLoading,
    error: awardTypeErr,
  } = useQuery({
    queryKey: ["awardType"],
    queryFn: fetchAwardType,
  });

  return (
    <AchievementContext.Provider
      value={{ awards, awardLoading, awardErr, awardType, awardTypeLoading, awardTypeErr }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

// custom hook
export const useAchievement = () => {
  return useContext(AchievementContext);
};