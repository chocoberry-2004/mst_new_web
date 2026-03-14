import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const TimeLineContext = createContext();

const fetchTimeLine = async () => {
  const response = await fetch("/js/timeline.json");
  if (!response.ok) throw new Error("Failed to fetch timeline data");
  return response.json();
};

export const TimeLineProvider = ({ children }) => {

  const {
    data: timeLine,
    isPending: timeLineLoading,
    error: timeLineErr,
  } = useQuery({
    queryKey: ["timeLine"],
    queryFn: fetchTimeLine,
  });

  return (
    <TimeLineContext.Provider
      value={{ timeLine, timeLineLoading, timeLineErr }}
    >
      {children}
    </TimeLineContext.Provider>
  );
};

// custom hook
export const useTimeLine = () => {
  return useContext(TimeLineContext);
};