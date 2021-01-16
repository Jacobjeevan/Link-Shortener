import React, { Fragment } from "react";
import { useAppContext } from "../main/AppContext";
import { useForm } from "react-hook-form";
import { login } from "./AuthApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import RedirectToHome from "../../utils/redirect";

const formSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default function Login() {
  const { user, setUser } = useAppContext();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const APIresponse = await login(data);
    const { success, user, error } = APIresponse;
    if (success) {
      setUser(user);
    } else {
      toast.error(error);
    }
  };

  if (user) RedirectToHome();

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="email" ref={register} placeholder="Email/Username" />
        <p>{errors.email?.message}</p>

        <input
          name="password"
          ref={register}
          placeholder="Password"
          type="password"
        />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>
    </Fragment>
  );
}
