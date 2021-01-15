import { axiosInstance } from "../../axios";

export async function login(body) {
  let response;
  try {
    response = await axiosInstance.post("login/", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function logout() {
  let response;
  try {
    response = await axiosInstance.get("logout/");
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function register(body) {
  let response;
  try {
    response = await axiosInstance.post("register/", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
