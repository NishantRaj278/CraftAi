import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

interface GeneratorStoreState {
  isGenerating: boolean;
  sendPrompt: (data: string) => Promise<void>;
}

const useGeneratorStore = create<GeneratorStoreState>((set) => ({
  isGenerating: false,

  sendPrompt: async (data: string) => {
    set({ isGenerating: true });
    try {
      const response = await axiosInstance.post("/messages/createMessage", {
        prompt: data,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending prompt:", error);
      throw error;
    } finally {
      set({ isGenerating: false });
    }
  },
}));

export default useGeneratorStore;
