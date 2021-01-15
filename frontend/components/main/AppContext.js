import React, { useState, useContext } from "react";

export const defaultState = {
  user: null,
  links: [],
};

export const AppContext = React.createContext(defaultState);

export function StateWrapper({ children }) {
  const [user, setUser] = useState(defaultState.user);
  const [links, setLinks] = useState(defaultState.links);
  return (
    <AppContext.Provider value={{ user, setUser, links, setLinks }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
