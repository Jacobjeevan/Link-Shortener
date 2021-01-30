import { mutateCallback } from "swr";

export interface ILink {
  longUrl: string;
  shortUrl: string;
  _id: string;
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
