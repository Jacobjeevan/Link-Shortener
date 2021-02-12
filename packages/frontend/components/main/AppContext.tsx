import React, { useState, useContext, useEffect } from "react";
import { getUser } from "../auth/AuthApi";
import { IAuthResponse, IUser } from "../auth/types/auth";
import { IAppProps, IAppContext, setStateUser } from "./main";

const AppContext = React.createContext<IAppContext | undefined>(undefined);

export function StateWrapper(props: IAppProps): JSX.Element {
  const [user, set] = useState<IUser | null>(null);

  const setUser = (user: setStateUser) => {
    set(user);
  };

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        const APIresponse: IAuthResponse = await getUser();
        const { success, user } = APIresponse;
        if (success) setUser(user);
      }
    }
    fetchUser();
  }, [user]);

  return <AppContext.Provider value={{ user, setUser }}>{props.children}</AppContext.Provider>;
}

export function useAppContext(): IAppContext {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("Context is undefined");
  return context;
}
