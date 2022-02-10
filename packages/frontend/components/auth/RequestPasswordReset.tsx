import React, { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorClass, formClass, inputClass, requestResetResolver, submitBtnClass } from "./AuthHelpers";
import { requestPasswordReset } from "./AuthApi";
import { toast } from "react-toastify";
import { IRequestResetResponse } from "./types/auth";

export default function RequestPasswordReset(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: requestResetResolver,
  });

  const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    requestPasswordReset(email)
      .then(({ success, error }: IRequestResetResponse) => {
        if (success) {
          toast.success("A reset link has been sent to your email.");
        } else {
          toast.error(error);
        }
      })
      .catch((response: IRequestResetResponse) => toast.error(response.error));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        <input {...register("email")} placeholder="Email/Username" className={inputClass} />
        <p className={errorClass}>{errors.email?.message}</p>

        <input type="submit" className={submitBtnClass} value="Request Reset" />
      </form>
    </Fragment>
  );
}
