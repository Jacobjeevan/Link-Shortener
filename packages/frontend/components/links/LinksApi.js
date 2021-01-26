import { axiosInstance } from "../utils/axios";
import useSWR from "swr";
import axios from "axios";

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
    response = await axios.get(`${process.env.BACKEND_URL}/${shortUrl}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export function useGetLinks(shouldFetch) {
  const fetcher = () => axiosInstance.get("/all/").then((res) => res.data);
  const { data, error, mutate } = useSWR(shouldFetch ? "links" : null, fetcher);
  let links = null;
  if (data) {
    links = data.links;
  }
  return { links, fetchError: error, isLoading: !error && !links, mutate };
}

export async function deleteShortUrl(urlId) {
  let response;
  try {
    response = await axiosInstance.post("/delete", { urlId });
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
