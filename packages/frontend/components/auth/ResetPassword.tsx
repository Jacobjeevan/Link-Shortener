import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { errorClass, formClass, inputClass, resetPasswordResolver, submitBtnClass } from "./AuthHelpers";
import { checkTokenValidity, changePassword } from "./AuthApi";
import { toast } from "react-toastify";

export default function ResetPassword(Props: { token: string }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: resetPasswordResolver,
  });
  const [tokenInvalid, setTokenInvalid] = useState(false);

  const { token } = Props;

  useEffect(() => {
    async function tokenValidity() {
      if (token) {
        const response = await checkTokenValidity(token);
        const { error } = response;
        if (error) {
          setTokenInvalid(true);
        }
      }
    }
    tokenValidity();
  }, [token]);

  const onSubmit = async (data: { password: string }) => {
    const { password } = data;
    const response = await changePassword(token, password);
    const { success, error } = response;
    if (success) {
      toast.success("Password updated. You may now login with new password.");
    } else if (error) {
      toast.error(error);
    }
  };

  if (tokenInvalid) {
    return (
      <div className="flex flex-col space-y-3 items-center text-3xl">
        Your reset link is invalid or has expired. Please try again.
      </div>
    );
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        <input {...register("password")} placeholder="New Password" className={inputClass} type="password" />
        <p className={errorClass}>{errors.password?.message}</p>

        <input
          {...register("passwordConfirm")}
          placeholder="Confirm New Password"
          className={inputClass}
          type="password"
        />
        <p className={errorClass}>{errors.passwordConfirm?.message}</p>

        <input type="submit" className={submitBtnClass} value="Change Password" />
      </form>
    </Fragment>
  );
}
