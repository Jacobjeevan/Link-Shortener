import { axiosInstance } from "../utils/axios";
import useSWR from "swr";

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

export function useGetLinks(shouldFetch, user) {
  const fetcher = () =>
    axiosInstance.get(`/all/${user.id}`).then((res) => res.data);
  const { data, error } = useSWR(shouldFetch ? "links" : null, fetcher);
  let links = null;
  if (data) {
    links = data.links;
  }
  return { links, fetchError: error, isLoading: !error && !links };
}
