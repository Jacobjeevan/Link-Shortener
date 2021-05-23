import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { errorClass, formClass, inputClass, requestResetResolver, submitBtnClass } from "./AuthHelpers";
import { requestPasswordReset } from "./AuthApi";
import { toast } from "react-toastify";

export default function RequestPasswordReset(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: requestResetResolver,
  });

  const onSubmit = async (data: { email: string }) => {
    const { email } = data;
    const response = await requestPasswordReset(email);
    const { success, error } = response;
    if (success) {
      toast.success("A reset link has been sent to your email.");
    } else if (error) {
      toast.error(error);
    }
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
