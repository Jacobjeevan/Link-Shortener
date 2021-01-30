export interface IAppProps {
  children: React.ReactNode;
}

export interface IAppContext {
  user: IUser | null;
  setUser: (user: setStateUser) => void;
}

export type setStateUser = React.SetStateAction<IUser | null>;
