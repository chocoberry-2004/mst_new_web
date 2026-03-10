import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx';
import { AppContextProvider } from "./providers/AppContextProvider.jsx";
import { ContactInfoProvider } from "./providers/ContactInfoProvider.jsx";

const queryClient = new QueryClient();

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ContactInfoProvider>
          <App />
        </ContactInfoProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
