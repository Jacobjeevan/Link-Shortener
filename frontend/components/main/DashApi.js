import { axiosInstance } from "../../utils/axios";

export async function shorten(body) {
  let response;
  try {
    response = await axiosInstance.post("shorten/", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function getLongUrl(shortUrl) {
  let response;
  try {
    response = await axiosInstance.get(`/${shortUrl}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
