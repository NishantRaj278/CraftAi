"use client";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function RegisterPage() {
  const { authUser, registerUser, getUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser, router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (result.success) {
      toast.success("Registration successful!");
      router.push("/");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="pt-20 w-full h-screen flex items-center justify-center">
      <div className="w-1/3 h-2/3 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
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
            Create Account
          </button>
          <p className="mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
