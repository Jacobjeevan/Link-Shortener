import React from "react";
import { useForm } from "react-hook-form";
import { shorten } from "./LinksApi";
import { formResolver, submitLink } from "./LinkHelpers";
import { mutate } from "swr";

export default function LinksForm() {
  const { register, handleSubmit, errors } = useForm({
    resolver: formResolver,
  });

  const onSubmit = async (data) => {
    const link = await submitLink(shorten, data);
    if (link) {
      mutate("links");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-2 items-center"
    >
      <div className="p-3 mb-3 rounded-sm shadow-md">
        <h3 className="text-md">Create a new short url</h3>
      </div>

      <input
        name="url"
        ref={register}
        placeholder="Destination Url"
        className="shadow-md p-2 rounded-sm focus:ring-2 focus:ring-green-400"
      />
      <p className="text-sm text-gray-400">{errors.url?.message}</p>

      <input
        name="customURL"
        ref={register}
        placeholder="Custom identifier"
        className="shadow-md p-2 rounded-sm focus:ring-2 focus:ring-green-400"
      />
      <p className="text-sm text-gray-400">{errors.customURL?.message}</p>

      <input
        type="submit"
        className="shadow-md p-2 self-center bg-green-400 hover:bg-green-600 cursor-pointer"
        value="Shorten Url"
      />
    </form>
  );
}
