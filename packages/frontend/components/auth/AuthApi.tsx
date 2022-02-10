import { axiosInstance } from "../utils/axios";
import { AxiosError, AxiosResponse } from "axios";
import { IAuth, IAuthResponse, IResetReponse, IRequestResetResponse } from "./types/auth";

const responseBody = (response: AxiosResponse) => response.data;
const errorBody = (error: AxiosError) => error.response?.data;

export const login = (loginInfo: IAuth): Promise<IAuthResponse> =>
  axiosInstance.post("login/", loginInfo).then(responseBody).catch(errorBody);

export const logout = (): Promise<IAuthResponse> => axiosInstance.get("logout/").then(responseBody).catch(errorBody);

export const register = (registerInfo: IAuth): Promise<IAuthResponse> =>
  axiosInstance.post("/register", registerInfo).then(responseBody).catch(errorBody);

export const getUser = (): Promise<IAuthResponse> => axiosInstance.get("user/").then(responseBody).catch(errorBody);

export const requestPasswordReset = (email: string): Promise<IRequestResetResponse> =>
  axiosInstance.post("/password/reset/", email).then(responseBody).catch(errorBody);

export const checkTokenValidity = (token: string): Promise<IResetReponse> =>
  axiosInstance.get(`password/reset/${token}`).then(responseBody).catch(errorBody);

export const changePassword = (token: string, password: string): Promise<IResetReponse> =>
  axiosInstance.post(`password/reset/${token}`, { password }).then(responseBody).catch(errorBody);
