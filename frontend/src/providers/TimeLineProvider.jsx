import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const TimeLineContext = createContext();

const fetchTimeLine = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/timeline/`);
  if (!response.ok) throw new Error("Failed to fetch timeline data");
  return response.json();
};

export const TimeLineProvider = ({ children }) => {

  const queryClient = useQueryClient();

  const {
    data: timeLine,
    isPending: timeLineLoading,
    error: timeLineErr,
  } = useQuery({
    queryKey: ["timeLine"],
    queryFn: fetchTimeLine,
  });


  // Add refresh function
  const refreshTimeLine = () => {
    queryClient.invalidateQueries({ queryKey: ["timeLine"] });
  };

  return (
    <TimeLineContext.Provider
      value={{ timeLine, timeLineLoading, timeLineErr,refreshTimeLine }}
    >
      {children}
    </TimeLineContext.Provider>
  );
};

// custom hook
export const useTimeLine = () => {
  return useContext(TimeLineContext);
};