import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// all providers
import { AppContextProvider } from "./AppContextProvider";
import { ContactInfoProvider } from "./ContactInfoProvider";
import { EventProvider } from "./EventProvider";
import LecturerProvider from "./LecturerProvider";
import { FacultyProvider } from "./FacultyProvider";
import { CourseProvider } from "./CourseProvider";
import { AchievementProvider } from "./AchievemetProvider";
import { TimeLineProvider } from "./TimeLineProvider";
import { FAQProvider } from "./FAQprovider";
import { PartnerProvider } from "./PartnerProvider";
import { CountryProvider } from "./CountryProvider";
import { ArticleProvider } from "./ArticleProvider";
import { MaintenanceProvider } from "./MaintenanceProvider";
import { UserProvider } from "./UserProvider";

const queryClient = new QueryClient();

const AppProviders = ({ children }) => {
  return (
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
                                <UserProvider>
                                  {children}
                                </UserProvider>
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
  );
};

export default AppProviders;