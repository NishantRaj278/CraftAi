"use client";

import useUserStore from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { authUser, getUser, logoutUser } = useUserStore();
  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleClick = async () => {
    await logoutUser();
  };

  return (
    <div className="flex items-center justify-between w-full h-14 fixed top-0 bg-white shadow-md px-24">
      <Link href="/">
        <h1>CraftAI</h1>
      </Link>

      <div className="items-center gap-2 hidden md:flex">
        {authUser === null ? (
          <>
            <Link
              href="/login"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <div className="relative w-10 h-10">
              <Image
                src="/profile12.jpg"
                alt="Description"
                fill
                className="w-full h-full object-cover rounded-b-full"
              />
            </div>
            <button onClick={handleClick} className="cursor-pointer">
              Logout
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <IoMenuOutline className="text-2xl" onClick={() => setOpen(!open)} />
        {open && (
          <div className="absolute w-full h-screen z-50 bg-white flex flex-col items-center justify-center gap-2 top-0 left-0">
            <IoClose
              className="text-2xl absolute top-4 right-4"
              onClick={() => setOpen(false)}
            />
            {authUser === null ? (
              <>
                <button
                  className="px-4 py-2 bg-black text-white rounded"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </button>
                <button
                  className="px-4 py-2 bg-black text-white rounded"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <div className="relative w-10 h-10">
                  <Image
                    src="/profile12.jpg"
                    alt="Description"
                    fill
                    className="w-full h-full object-cover rounded-b-full"
                  />
                </div>
                <h1>{authUser?.name}</h1>
                <button onClick={handleClick} className="cursor-pointer">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
