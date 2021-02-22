import { useRouter } from "next/router";
import React from "react";

const siteLinkClass = "flex-initial h-full p-4 shadow-md uppercase bg-yellow-400 hover:bg-yellow-500";

export default function JobTrackerPage(): JSX.Element {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-8 self-center">
      <h3 className="text-xl text-center p-3 rounded-sm shadow-md bg-white">Job Tracker Project</h3>

      <div className="flex flex-row space-x-4">
        <div className="self-center w-44 bg-white p-4 shadow-md">Django Fullstack</div>
        <button onClick={() => router.push("/DjangoGit")} className={siteLinkClass}>
          Github
        </button>
        <button onClick={() => router.push("/Djangojb")} className={siteLinkClass}>
          Site
        </button>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="self-center w-44 bg-white p-4 shadow-md">React.js and Node.js</div>
        <button onClick={() => router.push("/ReactGit")} className={siteLinkClass}>
          Github
        </button>
        <button onClick={() => router.push("/Reactjb")} className={siteLinkClass}>
          Site
        </button>
      </div>
    </div>
  );
}
