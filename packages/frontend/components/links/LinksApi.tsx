import { axiosInstance } from "../utils/axios";
import useSWR from "swr";
import { AxiosError, AxiosResponse } from "axios";
import { IShortenAPI, IShortenResponse } from "./types/shorten";
import { IDeleteResponse } from "./types/deleteLink";
import { IGetLongUrlResponse } from "./types/getLongUrl";
import { ILink, IGetLinksResponse, IGetLinksAxiosResponse } from "./types/getLinks";

const responseBody = (response: AxiosResponse) => response.data;
const errorBody = (error: AxiosError) => error.response?.data;

export const shorten = (body: IShortenAPI): Promise<IShortenResponse> =>
  axiosInstance.post("shorten/", body).then(responseBody).catch(errorBody);

export const getLongUrl = (shortUrl: string): Promise<IGetLongUrlResponse> =>
  axiosInstance.get(`${process.env.BACKEND_URL}/${shortUrl}`).then(responseBody).catch(errorBody);

export const deleteShortUrl = (urlId: string): Promise<IDeleteResponse> =>
  axiosInstance.post("/delete", { urlId }).then(responseBody).catch(errorBody);

export function useGetLinks(shouldFetch: boolean): IGetLinksResponse {
  const fetcher = () => axiosInstance.get<IGetLinksAxiosResponse>("/all/").then((res) => res.data);
  const { data, error, mutate } = useSWR(shouldFetch ? "links" : null, fetcher);
  let links: null | Array<ILink> = null;
  if (data) {
    links = data.links;
  }
  return { links, fetchError: error, isLoading: !error && !links, mutate };
}
