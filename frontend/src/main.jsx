import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx';

// providers
import { AppContextProvider } from "./providers/AppContextProvider.jsx";
import { ContactInfoProvider } from "./providers/ContactInfoProvider.jsx";
import { EventProvider } from "./providers/EventProvider.jsx";
import LecturerProvider from "./providers/LecturerProvider.jsx";
import { FacultyProvider } from "./providers/FacultyProvider.jsx";
import { CourseProvider } from "./providers/CourseProvider.jsx";
import { AchievementProvider } from "./providers/AchievemetProvider.jsx";
import { TimeLineProvider } from "./providers/TimeLineProvider.jsx";
import { FAQProvider } from "./providers/FAQprovider.jsx";
import { PartnerProvider } from "./providers/PartnerProvider.jsx";
import { CountryProvider } from "./providers/CountryProvider.jsx";
import { ArticleProvider } from "./providers/ArticleProvider.jsx";
import { MaintenanceProvider } from "./providers/MaintenanceProvider.jsx";

const queryClient = new QueryClient();

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ContactInfoProvider>
          <EventProvider>
            <LecturerProvider>
              <FacultyProvider>
                <CourseProvider>
                  <AchievementProvider>
                    <TimeLineProvider>
                      <FAQProvider>
                        <PartnerProvider>
                          <CountryProvider>
                            <ArticleProvider>
                              <MaintenanceProvider>
                                <App />
                              </MaintenanceProvider>
                            </ArticleProvider>
                          </CountryProvider>
                        </PartnerProvider>
                      </FAQProvider>
                    </TimeLineProvider>
                  </AchievementProvider>
                </CourseProvider>
              </FacultyProvider>
            </LecturerProvider>
          </EventProvider>
        </ContactInfoProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
