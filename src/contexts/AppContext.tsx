import React, { createContext, useState, Dispatch, SetStateAction } from "react";

export interface AppContextProps {
  // Theme Selection
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Modals
  isBasicModalOpen: boolean;
  setIsBasicModalOpen: Dispatch<SetStateAction<boolean>>; // Updated type

}

export const AppContext = createContext<AppContextProps>({
  isDarkMode: false,
  toggleTheme: () => {},

  // Modals
  isBasicModalOpen: false,
  setIsBasicModalOpen: () => {}, // Updated type;
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
        setIsBasicModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
