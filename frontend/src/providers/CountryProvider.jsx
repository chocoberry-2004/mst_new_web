import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const CountryContext = createContext();

// fetch + normalize countries
const fetchCountry = async () => {
  const url = `https://restcountries.com/v3.1/all?fields=name,flags`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch country data");

  const data = await response.json();


  return data
    .map((c) => ({
      name: c?.name?.common || "Unknown",
      flag: c?.flags?.png || c?.flags?.svg || "",
    }))
    .filter((c) => c.name !== "Unknown")
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const CountryProvider = ({ children }) => {
  const {
    data: countries = [], 
    isPending: countryLoading,
    error: countryErr,
  } = useQuery({
    queryKey: ["country"],
    queryFn: fetchCountry,
    staleTime: 1000 * 60 * 60, 
  });

  return (
    <CountryContext.Provider
      value={{ countries, countryLoading, countryErr }}
    >
      {children}
    </CountryContext.Provider>
  );
};

// custom hook
export const useCountry = () => {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error("useCountry must be used within CountryProvider");
  }

  return context;
};