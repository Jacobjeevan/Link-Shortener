import React, { useState, useContext, useEffect } from "react";
import { getUser } from "../auth/AuthApi";

export const defaultState = {
  user: null,
};

export const AppContext = React.createContext(defaultState);

export function StateWrapper({ children }) {
  const [user, set] = useState(defaultState.user);

  const setUser = (user) => {
    set(user);
  };

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        const APIresponse = await getUser();
        const { success, user } = APIresponse;
        if (success) setUser(user);
      }
    }
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
