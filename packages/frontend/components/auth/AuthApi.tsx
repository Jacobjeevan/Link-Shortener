import { axiosInstance } from "../utils/axios";
import { AxiosResponse } from "axios";
import { IAuth, IAuthResponse } from "./auth";

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
