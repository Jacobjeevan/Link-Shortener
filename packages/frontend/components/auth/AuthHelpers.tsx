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

const requestPasswordResetFormSchema = yup.object().shape({
  email: yup.string().required().email(),
});

const resetPasswordFormSchema = yup.object().shape({
  password: yup.string().required().min(8, "Passwords must at least be 8 characters long"),
  passwordConfirm: yup.string().test("password-match", "Passwords do not match", function (value) {
    return this.parent.password === value;
  }),
});

export const registerResolver = yupResolver(registerFormSchema);
export const loginResolver = yupResolver(loginFormSchema);
export const requestResetResolver = yupResolver(requestPasswordResetFormSchema);
export const resetPasswordResolver = yupResolver(resetPasswordFormSchema);

export async function submitForm(callAPI: AuthFn, data: IAuth): Promise<IUser | null> {
  const APIresponse: IAuthResponse = await callAPI(data);
  const { success, user, error } = APIresponse;
  if (success && user) {
    return user;
  } else {
    toast.error(error);
    return null;
  }
}

export const formClass = "flex flex-col space-y-3 items-center";
export const formHeaderClass = "p-4 text-2xl mb-3 bg-gray-200";
export const inputClass = "shadow-md p-2 rounded-sm focus:ring-2 focus:ring-black";
export const errorClass = "text-sm text-white";
export const submitBtnClass = "shadow p-4 font-bold self-center bg-gray-100 hover:bg-gray-300 cursor-pointer uppercase";

export const linkToResetClass = "hover:underline cursor-pointer";
