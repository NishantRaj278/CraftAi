"use client";

import useUserStore from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function LoginPage() {
  const { loginUser, authUser, getUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, [getUser]);

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser, router]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser(formData);
    if (result.success) {
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="pt-20 w-full h-screen flex items-center justify-center">
      <div className="w-1/3 h-2/3 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            className="bg-black text-white p-2 rounded cursor-pointer"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className="mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
