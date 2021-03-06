import { axiosInstance } from "../utils/axios";
import useSWR from "swr";
import axios, { AxiosResponse } from "axios";
import { IShortenAPI, IShortenResponse } from "./types/shorten";
import { IDeleteResponse } from "./types/deleteLink";
import { IGetLongUrlResponse } from "./types/getLongUrl";
import { ILink, IGetLinksResponse, IGetLinksAxiosResponse } from "./types/getLinks";

export async function shorten(body: IShortenAPI): Promise<IShortenResponse> {
  let response: AxiosResponse<IShortenResponse>;
  try {
    response = await axiosInstance.post<IShortenResponse>("shorten/", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function getLongUrl(shortUrl: string): Promise<IGetLongUrlResponse> {
  let response: AxiosResponse<IGetLongUrlResponse>;
  try {
    response = await axios.get<IGetLongUrlResponse>(`${process.env.BACKEND_URL}/${shortUrl}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export function useGetLinks(shouldFetch: boolean): IGetLinksResponse {
  const fetcher = () => axiosInstance.get<IGetLinksAxiosResponse>("/all/").then((res) => res.data);
  const { data, error, mutate } = useSWR(shouldFetch ? "links" : null, fetcher);
  let links: null | Array<ILink> = null;
  if (data) {
    links = data.links;
  }
  return { links, fetchError: error, isLoading: !error && !links, mutate };
}

export async function deleteShortUrl(urlId: string): Promise<IDeleteResponse> {
  let response: AxiosResponse<IDeleteResponse>;
  try {
    response = await axiosInstance.post<IDeleteResponse>("/delete", {
      urlId,
    });
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
