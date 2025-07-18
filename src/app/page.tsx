'use client'
import Link from "next/link";
export default function Home() {
  return (
    <div className="absolute top-0 left-0 w-full bg-[#242038] overflow-x-hidden">
      <main className="relative flex flex-col w-full h-screen items-center justify-center ">
        <h1 className="text-4xl font-poppins font-bold">WidgetsCrate</h1>
        <p className="mt-2">Perhaps a crate.. full of widgets?</p>
        <Link className="cursor-pointer mt-2 bg-[#8D86C9] px-12 py-2 rounded-sm" href="/download">Download Now!</Link>
      </main>

    </div>
  );
}
