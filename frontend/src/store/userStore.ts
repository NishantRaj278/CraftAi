import axiosInstance from "@/utils/axiosInstance";
import { create } from "zustand";

interface RegisterData {
  email: string;
  name: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface UserStoreState {
  authUser: User | null;
  isLoggingIn: boolean;
  isRegistering: boolean;
  getUser: () => Promise<void>;
  loginUser: (data: LoginData) => Promise<{ success: boolean }>;
  registerUser: (data: RegisterData) => Promise<{ success: boolean }>;
  logoutUser: () => Promise<void>;
}

const useUserStore = create<UserStoreState>((set) => ({
  authUser: null,
  isLoggingIn: false,
  isRegistering: false,

  getUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  },

  loginUser: async (data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.user });
      return { success: true };
    } catch (error) {
      console.log("Login failed:", error);
      return { success: false };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  registerUser: async (data: RegisterData) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      set({ authUser: response.data.user });
      return { success: true };
    } catch (error) {
      console.log("Registration failed:", error);
      return { success: false };
    } finally {
      set({ isRegistering: false });
    }
  },

  logoutUser: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("Logout failed:", error);
    }
  },
}));

export default useUserStore;
