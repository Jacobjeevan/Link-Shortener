export interface IShortenAPI {
  longUrl: string;
  shortUrl?: string;
}

export interface IShortenResponse {
  success: boolean;
  shortUrl: string;
  error?: string;
}

export type ShortenFn = (LinkData: IShortenAPI) => Promise<IShortenResponse>;
