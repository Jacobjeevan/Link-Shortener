import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { shorten } from "./LinksApi";
import { formResolver } from "./LinkHelpers";
import { mutate } from "swr";
import { IShortenAPI, IShortenResponse } from "./types/shorten";
import { toast } from "react-toastify";

export default function LinksForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IShortenAPI>({
    resolver: formResolver,
  });

  const onSubmit: SubmitHandler<IShortenAPI> = async (data) => {
    shorten(data)
      .then(({ success, error }: IShortenResponse) => {
        if (success) {
          mutate("links");
        } else {
          toast.error(error);
        }
        reset();
      })
      .catch((response: IShortenResponse) => toast.error(response.error));
  };

  const inputClass = "shadow-md p-2 rounded-sm focus:ring-2 focus:ring-black";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 items-center">
      <div className="p-3 mb-3 rounded-sm shadow-md bg-gray-300">
        <h3 className="text-md">Create a new short url</h3>
      </div>

      <input {...register("url")} placeholder="Destination Url" className={inputClass} />
      <p className="text-sm text-gray-400">{errors.url?.message}</p>

      <input {...register("customURL")} placeholder="Custom identifier" className={inputClass} />
      <p className="text-sm text-gray-400">{errors.customURL?.message}</p>

      <input
        type="submit"
        className="shadow-md p-2 self-center bg-gray-200 hover:bg-gray-300 cursor-pointer"
        value="Shorten Url"
      />
    </form>
  );
}
