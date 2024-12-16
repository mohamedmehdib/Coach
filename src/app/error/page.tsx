"use client";

import BackButton from "../BackButton";

export default function ErrorPage() {

  return (
    <div>
      <BackButton/>

      <div className="bg-gray-300 text-zinc-600 min-h-screen flex justify-center items-center p-4">
        <span className="text-center">
          <i className="text-5xl sm:text-6xl md:text-7xl uil uil-annoyed"></i>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-4">An unexpected error occurred</h1>
        </span>
      </div>
    </div>
  );
}
