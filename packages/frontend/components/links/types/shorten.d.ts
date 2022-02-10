export interface IShortenAPI {
  url: string;
  customURL?: string;
}

export interface IShortenResponse {
  success: boolean;
  shortUrl: string;
  error?: string;
}

export type ShortenFn = (LinkData: IShortenAPI) => Promise<IShortenResponse>;
