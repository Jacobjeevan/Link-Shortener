import React, { useState, useContext, useEffect } from "react";

export const defaultState = {
  user: null,
  links: [],
};

export const AppContext = React.createContext(defaultState);

export function StateWrapper({ children }) {
  const [user, set] = useState(defaultState.user);
  const [links, setLinks] = useState(defaultState.links);

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set(user);
  };

  useEffect(() => {
    if (!user) {
      const foundUser = JSON.parse(localStorage.getItem("user"));
      if (foundUser) setUser(foundUser);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, links, setLinks }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
