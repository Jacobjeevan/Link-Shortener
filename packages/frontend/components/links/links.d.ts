import { mutateCallback } from "swr";

export interface ILink {
  longUrl: string;
  shortUrl: string;
  _id: string;
}

export interface IShortenAPI {
  longUrl: string;
  shortUrl?: string;
}

export interface IShortenResponse {
  success: boolean;
  shortUrl: string;
  error?: string;
}
export interface IGetUrlResponse {
  success: boolean;
  longUrl: string;
  error?: string;
}

export interface IDeleteResponse {
  success: boolean;
  error?: string;
}

export interface IGetLinksAxiosResponse {
  success: boolean;
  links: Array<ILink>;
  error?: string;
}

export interface IGetLinksResponse {
  links: Array<ILink> | null;
  fetchError: Error;
  isLoading: boolean;
  mutate: (data?: Data | Promise<Data> | mutateCallback<Data>, shouldRevalidate?: boolean) => Promise<Data | undefined>;
}

export type LinksFn = (LinkData: IShortenAPI) => Promise<IShortenResponse>;
