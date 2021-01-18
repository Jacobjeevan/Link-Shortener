import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { useAppContext } from "../main/AppContext";
import { shorten, useGetLinks } from "./LinksApi";
import { formResolver, submitLink } from "./LinkHelpers";
import Link from "next/link";

export default function DashLinks() {
  const { user } = useAppContext();
  const { links, fetchError, isLoading } = useGetLinks(Boolean(user), user);

  const { register, handleSubmit, errors } = useForm({
    resolver: formResolver,
  });

  const onSubmit = async (data) => {
    const link = await submitLink(shorten, data);
    if (link) {
      mutate("links");
    }
  };

  console.log(links);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 items-center"
      >
        <div className="flex-1 bg-green-300 p-3 mb-3 rounded-sm shadow-md">
          <h3 className="text-md">Create a new short url</h3>
        </div>
        <div className="flex-1 flex flex-col">
          <input
            name="url"
            ref={register}
            placeholder="Destination Url"
            className="shadow-md p-2"
          />
          <p className="p-2 text-sm text-gray-400">{errors.url?.message}</p>
        </div>

        <div className="flex-1 flex flex-col">
          <input
            name="customURL"
            ref={register}
            placeholder="Custom identifier"
            className="shadow-md p-2"
          />
          <p className="p-2 text-sm text-gray-400">
            {errors.customURL?.message}
          </p>
        </div>

        <input type="submit" className="shadow-md p-2 self-center" />
      </form>
      {links ? (
        <div className="mt-5 mb-2 ml-2 mr-2 space-y-4 py-3">
          {links.map((UrlEntry) => (
            <div
              className="flex flex-col bg-green-300 p-3 rounded-sm border-l-4 border-green-500 shadow-md"
              key={UrlEntry._id}
            >
              <Link href={UrlEntry.shortUrl}>
                <div className="flex items-stretch">
                  <div className="flex-1">
                    <p>{UrlEntry.shortUrl}</p>
                  </div>
                  <div className="flex-1">{UrlEntry.longUrl}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        "Loading your data"
      )}
    </div>
  );
}
