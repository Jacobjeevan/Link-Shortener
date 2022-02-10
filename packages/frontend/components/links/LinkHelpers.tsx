import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
  url: yup.string().required().url(),
  customURL: yup.string(),
});

export const formResolver = yupResolver(formSchema);
