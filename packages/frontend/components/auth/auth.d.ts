export interface IAuth {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface IUser {
  email: string;
  id: string;
}

export interface IAuthResponse {
  success: boolean;
  user: IUser;
  error?: string;
}

export type AuthFn = (AuthData: IAuth) => Promise<IAuthResponse>;
