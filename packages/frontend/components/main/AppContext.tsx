import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
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
    if (!user) {
      getUser()
        .then(({ success, user, error }: IAuthResponse) => {
          if (success) {
            setUser(user);
          } else {
            toast.error(error);
          }
        })
        .catch((response: IAuthResponse) => toast.error(response.error));
    }
  }, [user]);

  return <AppContext.Provider value={{ user, setUser }}>{props.children}</AppContext.Provider>;
}

export function useAppContext(): IAppContext {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("Context is undefined");
  return context;
}
