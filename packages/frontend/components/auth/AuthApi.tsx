import { axiosInstance } from "../utils/axios";
import { AxiosResponse } from "axios";
import { IAuth, IAuthResponse, IResetReponse, IRequestResetResponse } from "./types/auth";

export async function login(loginInfo: IAuth): Promise<IAuthResponse> {
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
