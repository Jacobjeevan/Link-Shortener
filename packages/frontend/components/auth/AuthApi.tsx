import { axiosInstance } from "../utils/axios";
import { AxiosError, AxiosResponse } from "axios";
import { IAuth, IAuthResponse, IResetReponse, IRequestResetResponse } from "./types/auth";

const responseBody = (response: AxiosResponse) => response.data;
const errorBody = (error: AxiosError) => error.response;

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
/* export async function login(loginInfo: IAuth): Promise<IAuthResponse> {
  let response: AxiosResponse<IAuthResponse>;
  try {
    response = await axiosInstance.post<IAuthResponse>("login/", loginInfo);
  } catch (error) {
    response = error.response;
  }
  return response.data;
} 

export async function logout(): Promise<IAuthResponse> {
  let response: AxiosResponse<IAuthResponse>;
  try {
    response = await axiosInstance.get<IAuthResponse>("logout/");
  } catch (error) {
    response = error.response;
  }
  return response.data;
} 

export async function register(registerInfo: IAuth): Promise<IAuthResponse> {
  let response: AxiosResponse<IAuthResponse>;
  try {
    response = await axiosInstance.post<IAuthResponse>("register/", registerInfo);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}


export async function getUser(): Promise<IAuthResponse> {
  let response: AxiosResponse<IAuthResponse>;
  try {
    response = await axiosInstance.get<IAuthResponse>("user/");
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function requestPasswordReset(email: string): Promise<IRequestResetResponse> {
  let response: AxiosResponse<IRequestResetResponse>;
  try {
    response = await axiosInstance.post<IRequestResetResponse>("password/reset/", { email });
  } catch (error) {
    response = error.response;
  }
  return response.data;
}


export async function checkTokenValidity(token: string): Promise<IResetReponse> {
  let response: AxiosResponse<IResetReponse>;
  try {
    response = await axiosInstance.get<IResetReponse>(`password/reset/${token}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function changePassword(token: string, password: string): Promise<IResetReponse> {
  let response: AxiosResponse<IResetReponse>;
  try {
    response = await axiosInstance.post<IResetReponse>(`password/reset/${token}`, { password });
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
*/
