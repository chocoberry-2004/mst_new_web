import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const ArticleContext = createContext();

const fetchArticle = async () => {
  const response = await fetch("/js/article.json"); 
  if (!response.ok) throw new Error("Failed to fetch Article data");
  return response.json();
};

export const ArticleProvider = ({ children }) => {
  const {
    data: articles,               
    isPending: articlesLoading,
    error: articlesErr,
  } = useQuery({
    queryKey: ["articles"],    
    queryFn: fetchArticle,
  });

  return (
    <ArticleContext.Provider
      value={{ articles, articlesLoading, articlesErr }} 
    >
      {children}
    </ArticleContext.Provider>
  );
};

// custom hook
export const useArticle = () => {
  return useContext(ArticleContext);
};