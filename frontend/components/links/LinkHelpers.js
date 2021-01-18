import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
  url: yup.string().required().url(),
  customURL: yup.string(),
});

export const formResolver = yupResolver(formSchema);

export async function submitLink(callAPI, data) {
  const APIresponse = await callAPI(data);
  const { success, shortUrl, error } = APIresponse;
  if (success) {
    return shortUrl;
  } else {
    toast.error(error);
    return null;
  }
}
