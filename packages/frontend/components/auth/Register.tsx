import React, { Fragment } from "react";
import { useAppContext } from "../main/AppContext";
import { useForm } from "react-hook-form";
import {
  errorClass,
  formClass,
  formHeaderClass,
  inputClass,
  registerResolver,
  submitBtnClass,
  submitForm,
} from "./AuthHelpers";
import { register as registerUser } from "./AuthApi";
import { IAuth } from "./types/auth";

export default function Register(): JSX.Element {
  const { setUser } = useAppContext();
  const { register, handleSubmit, errors } = useForm({
    resolver: registerResolver,
  });

  const onSubmit = async (data: IAuth) => {
    const user = await submitForm(registerUser, data);
    if (user) {
      setUser(user);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        <div className={formHeaderClass}>
          <h3 className="text-md">Register to shorten urls</h3>
        </div>
        <input name="email" ref={register} placeholder="Email/Username" className={inputClass} />
        <p className={errorClass}>{errors.email?.message}</p>

        <input name="password" ref={register} placeholder="Password" type="password" className={inputClass} />
        <p className={errorClass}>{errors.password?.message}</p>

        <input
          name="passwordConfirm"
          ref={register}
          placeholder="Confirm Password"
          type="password"
          className={inputClass}
        />
        <p className={errorClass}>{errors.passwordConfirm?.message}</p>

        <input type="submit" className={submitBtnClass} value="Register" />
      </form>
    </Fragment>
  );
}
