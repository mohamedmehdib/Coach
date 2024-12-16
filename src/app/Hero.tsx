"use client"
import React from 'react'
import Image from 'next/image'
import { ReactTyped } from "react-typed";
import { Red_Hat_Display } from 'next/font/google';
const ms_madi = Red_Hat_Display({ subsets: ['latin'] ,weight:'500'});


import { useEffect, useState } from 'react';

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div id="home" className={ms_madi+` md:h-screen bg-zinc-300 text-zinc-600 flex md:flex-row flex-col-reverse justify-between items-center md:p-10 p-5 pt-24 md:pt-0`}>
      <div className="md:w-1/2 pt-10">
        <p className="md:text-4xl text-3xl font-medium">
          I&apos;m{' '}
          {isClient && (
            <ReactTyped
              className="text-zinc-500"
              strings={["Mohamed Gharieni"]}
              typeSpeed={70}
              loop
              backSpeed={20}
              cursorChar="|"
            />
          )}
        </p>
        <p className="text-lg md:text-2xl py-5 text-justify">
          As a seasoned men&apos;s coach, I&apos;m committed to helping ambitious men break through their limitations and achieve extraordinary results. I specialize in guiding men towards personal growth, leadership development, and relationship building. With a focus on practical strategies and mindset shifts, I empower my clients to live their best lives.
        </p>
      </div>
      <div className="md:w-1/2 pb-14 md:pb-0">
        <Image src="/hero.webp" alt="image" width={400} height={400} className="mx-auto my-auto rounded-full" />
      </div>
    </div>
  );
}
