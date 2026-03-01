import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx';

const queryClient = new QueryClient();

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
