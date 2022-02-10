import React, { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorClass, formClass, inputClass, resetPasswordResolver, submitBtnClass } from "./AuthHelpers";
import { checkTokenValidity, changePassword } from "./AuthApi";
import { toast } from "react-toastify";
import { IResetReponse } from "./types/auth";

export default function ResetPassword(Props: { token: string }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string; passwordConfirm: string }>({
    resolver: resetPasswordResolver,
  });
  const [tokenInvalid, setTokenInvalid] = useState(false);

  const { token } = Props;

  useEffect(() => {
    if (token) {
      checkTokenValidity(token).catch((response: IResetReponse) => {
        if (response.error) {
          setTokenInvalid(true);
        }
      });
    }
  }, [token]);

  const onSubmit: SubmitHandler<{ password: string }> = async ({ password }) => {
    changePassword(token, password)
      .then(({ success, error }: IResetReponse) => {
        if (success) {
          toast.success("Password updated. You may now login with new password.");
        } else {
          toast.error(error);
        }
      })
      .catch((response: IResetReponse) => toast.error(response.error));
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
