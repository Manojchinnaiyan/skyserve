"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ token = null }) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/signin");
  };
  return (
    <div className="p-3 mx-20 rounded-full mt-10 flex justify-between  sticky top-0 z-50 items-center bg-[#756e6e]">
      <div className="ml-10">
        <Image src="/logo.webp" alt="Hello" width={150} height={150} />
      </div>
      <div>
        {token === null ? (
          <div className="flex gap-20 mr-20 items-centerß">
            <Link href="/signin" className="p-3">
              Signin{" "}
            </Link>
            <Link
              href="/signup"
              className="text-[#eccf2b] border-2 rounded-xl p-3 border-solid border-[#eccf2b] font-medium"
            >
              Signup{" "}
            </Link>
          </div>
        ) : (
          <div className="flex gap-20 mr-20 items-centerß">
            <div
              onClick={handleLogout}
              className="text-[#eccf2b] border-2 rounded-xl p-3 border-solid border-[#eccf2b] font-medium cursor-pointer"
            >
              Logout{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
