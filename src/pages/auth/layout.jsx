import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const path = router.pathname.split("/")[2];
  return (
    <div className="flex w-full">
      <div
        className={`${
          path === "finish-up" ? "md:sticky md:top-0 md:z-10 " : "relative"
        } w-full md:w-[360px] lg:w-[420px] h-screen transition-all duration-300 ease-in-out`}
      >
        {/* Background Layer with reduced opacity */}
        <div className="absolute inset-0 bg-[#0855EA]/30 z-10 transition-opacity duration-300"></div>

        {/* Image Layer */}
        <Image
          src={path === "finish-up" ? "/signin2.png" : "/signin.png"}
          alt="signin"
          layout="fill"
          objectFit="contain"
          className="max-h-full max-w-full z-0 transition-all duration-300 ease-in-out"
        />
      </div>

      <a href="/" className="w-[181px] h-[50px] flex items-center mr-[90%] mt-[14px] ml-[22px] md:mt-0  md:ml-0 gap-2 z-30 md:fixed top-[14px] left-[22px] transition-all duration-300 ease-in-out">
        <section className="relative w-[53.85px] h-[53.85px] flex items-center justify-center transition-all duration-300 ease-in-out">
          {/* Centered Black Background */}
          <div className="absolute w-[80%] h-[80%] bg-black rounded-full z-0 transition-all duration-300 ease-in-out"></div>

          {/* Logo Image */}
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={200}
            layout="responsive"
            objectFit="contain"
            className="max-h-full max-w-full rounded-full border-2 border-white z-10 transition-all duration-300 ease-in-out"
          />
        </section>

        <h1 className="font-bold text-[24px]  transition-all duration-300 ease-in-out">
          Homnique
        </h1>
      </a>

      <div className="absolute md:relative z-20 w-full sm:px-[6%] md:px-0 bg-white  md:w-[calc(100%-360px)] lg:w-[calc(100%-420px)] md:bg-gray-50 transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
}
