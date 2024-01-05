import React, { createContext, useState } from "react";

export interface AppContextProps {
  // Theme Selection
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Modals
  isBasicModalOpen: boolean;
  openBasicModal: () => void;
}

export const AppContext = createContext<AppContextProps>({
  isDarkMode: false,
  toggleTheme: () => {},

  // Modals
  isBasicModalOpen: false,
  openBasicModal: () => {},
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modals
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleTheme: () => setIsDarkMode(!isDarkMode),

        // Modals
        isBasicModalOpen,
        openBasicModal: () => setIsBasicModalOpen(!isBasicModalOpen),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
