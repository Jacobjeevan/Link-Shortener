import React, { forwardRef } from "react";
import { useAppContext } from "../main/AppContext";
import { useGetLinks } from "./LinksApi";
import Link from "next/link";
import LinksForm from "./LinksForm";
import { useRouter } from "next/router";

export default function DashLinks() {
  const { user } = useAppContext();
  const { links, fetchError, isLoading } = useGetLinks(Boolean(user), user);
  const router = useRouter();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <LinksForm />
      {links ? (
        <div className="mt-5 mb-2 ml-2 mr-2 space-y-4 py-3">
          {links.map((UrlEntry) => (
            <div className="flex shadow-md" key={UrlEntry._id}>
              <div className="flex items-stretch bg-green-300 p-3 rounded-sm border-l-4 border-green-500 flex-1">
                <div className="flex-initial mr-5">
                  <p>{UrlEntry.shortUrl}</p>
                </div>
                <div className="flex-1 text-base">{UrlEntry.longUrl}</div>
              </div>
              <div className="flex-initial flex-nowrap">
                <button
                  onClick={() => router.push(UrlEntry.shortUrl)}
                  className="flex-1 bg-green-400 h-full p-2 hover:bg-green-600"
                >
                  Open
                </button>
                <button className="flex-1 bg-red-400 h-full p-2 hover:bg-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "Loading your data"
      )}
    </div>
  );
}