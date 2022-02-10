import React, { Fragment } from "react";
import { useAppContext } from "../main/AppContext";
import { useForm } from "react-hook-form";
import { errorClass, formClass, formHeaderClass, inputClass, registerResolver, submitBtnClass } from "./AuthHelpers";
import { register as registerUser } from "./AuthApi";
import { IAuth } from "./types/auth";
import { toast } from "react-toastify";

export default function Register(): JSX.Element {
  const { setUser } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>({
    resolver: registerResolver,
  });

  const onSubmit = async (data: IAuth) => {
    registerUser(data)
      .then((user) => setUser(user))
      .catch((error) => toast.error(error));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        <div className={formHeaderClass}>
          <h3 className="text-md">Register to shorten urls</h3>
        </div>
        <input {...register("email")} placeholder="Email/Username" className={inputClass} />
        <p className={errorClass}>{errors.email?.message}</p>

        <input {...register("password")} placeholder="Password" type="password" className={inputClass} />
        <p className={errorClass}>{errors.password?.message}</p>

        <input {...register("passwordConfirm")} placeholder="Confirm Password" type="password" className={inputClass} />
        <p className={errorClass}>{errors.passwordConfirm?.message}</p>

        <input type="submit" className={submitBtnClass} value="Register" />
      </form>
    </Fragment>
  );
}
