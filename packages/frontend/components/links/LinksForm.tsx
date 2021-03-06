import React from "react";
import { useForm } from "react-hook-form";
import { shorten } from "./LinksApi";
import { formResolver, submitLink } from "./LinkHelpers";
import { mutate } from "swr";
import { IShortenAPI } from "./types/shorten";

export default function LinksForm(): JSX.Element {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: formResolver,
  });

  const onSubmit = async (data: IShortenAPI) => {
    const link = await submitLink(shorten, data);
    if (link) {
      mutate("links");
    }
    reset();
  };

  const inputClass = "shadow-md p-2 rounded-sm focus:ring-2 focus:ring-black";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 items-center">
      <div className="p-3 mb-3 rounded-sm shadow-md bg-yellow-300">
        <h3 className="text-md">Create a new short url</h3>
      </div>

      <input name="url" ref={register} placeholder="Destination Url" className={inputClass} />
      <p className="text-sm text-gray-400">{errors.url?.message}</p>

      <input name="customURL" ref={register} placeholder="Custom identifier" className={inputClass} />
      <p className="text-sm text-gray-400">{errors.customURL?.message}</p>

      <input
        type="submit"
        className="shadow-md p-2 self-center bg-yellow-400 hover:bg-yellow-600 cursor-pointer"
        value="Shorten Url"
      />
    </form>
  );
}
