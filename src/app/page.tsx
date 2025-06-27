'use client'
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
export default function Home() {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  useEffect(() => {
    if(titleRef.current != null){
      const words = titleRef.current.querySelectorAll("span");
      const allExceptLast = Array.from(words).slice(0, -1); // All but the last span
      const lastWord = words[words.length - 1];
      gsap.from(allExceptLast, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: "bounce.out",
        stagger: 0.15,
      });
        gsap.from(lastWord, {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.4)",
          delay: allExceptLast.length * 0.15 + 0.1,
        });
    }
  },[])
  return (
    <div className="relative min-h-screen w-full bg-[#242038]">
      <main className="flex w-full h-screen justify-center items-center ">
        <div className="relative flex flex-col items-center w-200 h-140 rounded-4xl">
          <h1 ref={titleRef} className="text-4xl font-bold mt-10">      
            <span className="inline-block mr-2">Widgets</span>
            <span className="inline-block mr-2">Widgets</span>
            <span className="inline-block mr-2">and</span>
            <span className="inline-block mr-2">more</span>
            <span className="inline-block font-black">WIDGETS!</span>
          </h1>
          <button className="bg-[#8D86C9] py-2 px-6 rounded-xl cursor-pointer mt-2">Download</button>
        </div>
      </main>
    </div>
  );
}
