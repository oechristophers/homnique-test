import Tooltip from "@/components/Tooltip";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
    <div className="flex flex-col items-center p-8 rounded-xl  box-shadow gap-4 w-[60%]">
      <div className="text-black text-3xl font-bold">Homnique Platform</div>
      
      <div className="text-2xl mt-4 mb-4">
       Several stuffs about Homnique
      </div>
      <div>
        <Link
          href="/auth/login"
          className="py-3 px-5 rounded-full text-sm cursor-pointer text-white font-bold bg-[hsl(208,86%,48%)] hover:bg-[hsl(208,86%,58%)]"
        >
          Go to Login
        </Link>
      </div>
    </div>
  </div>
  );
}
