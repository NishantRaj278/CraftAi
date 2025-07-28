"use client";
import useSessionStore from "@/store/sessionStore";
import useUserStore from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { IoMenuOutline, IoClose, IoLogOutOutline } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { authUser, getUser, logoutUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleClick = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Backdrop blur overlay for mobile menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav className="flex items-center justify-between w-full h-16 fixed top-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 px-6 sm:px-12 lg:px-24 z-50">
        {/* Logo */}
        <Link href="/" className="group">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
            CraftAI
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center gap-4 hidden md:flex">
          {authUser === null ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* User Profile */}
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700/50">
                <div className="relative w-8 h-8">
                  <Image
                    src="/profile12.jpg"
                    alt="Profile"
                    fill
                    className="w-full h-full object-cover rounded-full ring-2 ring-blue-500/30"
                  />
                </div>
                <span className="text-gray-300 text-sm font-medium hidden lg:block">
                  {authUser?.name || "User"}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleClick}
                className="flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium group"
              >
                <IoLogOutOutline className="text-lg group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden sm:block cursor-pointer">Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <IoMenuOutline className="text-xl" />
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-0 right-0 w-80 h-screen bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 flex flex-col z-50 md:hidden">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Menu
              </h2>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 flex flex-col justify-center items-center gap-8 p-6">
              {authUser === null ? (
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <Link
                    href="/login"
                    className="w-full px-6 py-3 text-center text-gray-300 hover:text-white border border-gray-700/50 rounded-xl transition-colors duration-200 font-medium"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="w-full px-6 py-3 text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  {/* User Profile */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src="/profile12.jpg"
                        alt="Profile"
                        fill
                        className="w-full h-full object-cover rounded-full ring-4 ring-blue-500/30"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-semibold text-lg">
                        {authUser?.name || "User"}
                      </h3>
                      <p className="text-gray-400 text-sm">Welcome back!</p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      handleClick();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-red-400 border border-gray-700/50 hover:border-red-500/50 rounded-xl transition-all duration-200 font-medium group"
                  >
                    <IoLogOutOutline className="text-lg group-hover:scale-110 transition-transform duration-200" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
