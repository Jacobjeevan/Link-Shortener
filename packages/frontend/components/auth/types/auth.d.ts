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
  success?: boolean;
  user?: IUser;
  error?: string;
}

export type AuthFn = (AuthData: IAuth) => Promise<IAuthResponse>;

export interface IRequestResetResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export interface IResetReponse {
  success: boolean;
  error?: string;
}
