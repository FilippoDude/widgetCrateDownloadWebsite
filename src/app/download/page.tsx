'use client'
import gsap from "gsap";
import { useEffect, useRef} from "react";
import Releases from "../components/Releases";
export default function Download() {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  useEffect(() => {
    if(titleRef.current != null){
      const words = titleRef.current.querySelectorAll("span");
      const allExceptLast = Array.from(words).slice(0, -1);
      const lastWord = words[words.length - 1];
      gsap.set(allExceptLast, { clearProps: "all" });
      gsap.set(lastWord, { clearProps: "all" });
      gsap.fromTo(allExceptLast, 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: "bounce.out", stagger: 0.15 }
      );
      gsap.fromTo(lastWord,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.4)", delay: allExceptLast.length * 0.15 + 0.1 }
      );
    }
  },[])

  return (
    <div className="absolute top-0 left-0 w-full bg-[#242038] overflow-x-hidden">
      <main className="relative flex w-full h-screen justify-center ">
        <div className="absolute top-0 left-0 h-full w-full movingBackground"></div>
        <div className=" relative flex flex-col items-center rounded-4xl">
          <h1 ref={titleRef} className="px-2 text-4xl font-bold mt-10 text-center">      
            <span className="inline-block mr-2">Widgets</span>
            <span className="inline-block mr-2">Widgets</span>
            <span className="inline-block mr-2">and</span>
            <span className="inline-block mr-2">more</span>
            <span className="inline-block font-black text-transparent  bg-clip-text bg-[length:200%_200%] bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600">WIDGETS!</span>
          </h1>
          <div className="w-9/10 h-0.5 bg-white mt-1.5"/>
          <Releases className="py-4 w-full"/>
        </div>
      </main>
    </div>
  );
}
