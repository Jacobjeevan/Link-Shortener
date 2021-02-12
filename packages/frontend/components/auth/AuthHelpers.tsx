import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { IAuth, AuthFn, IUser, IAuthResponse } from "./types/auth";

const registerFormSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8, "Passwords must at least be 8 characters long"),
  passwordConfirm: yup.string().test("password-match", "Passwords do not match", function (value) {
    return this.parent.password === value;
  }),
});

const loginFormSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const registerResolver = yupResolver(registerFormSchema);
export const loginResolver = yupResolver(loginFormSchema);

export async function submitForm(callAPI: AuthFn, data: IAuth): Promise<IUser | null> {
  const APIresponse: IAuthResponse = await callAPI(data);
  const { success, user, error } = APIresponse;
  if (success) {
    return user;
  } else {
    toast.error(error);
    return null;
  }
}
