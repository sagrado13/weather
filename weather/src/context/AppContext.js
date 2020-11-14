import { useState, createContext } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState();

  return (
    <AppContext.Provider value={{ waiting, setWaiting, error, setError }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
