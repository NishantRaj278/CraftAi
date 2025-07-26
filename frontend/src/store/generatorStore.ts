import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

interface GeneratedData {
  _id: string;
  message: string;
  generatedCode: string;
}

interface GeneratorStoreState {
  isGenerating: boolean;
  chats: GeneratedData[];
  getData: () => Promise<void>;
  sendPrompt: (data: string) => Promise<void>;
}

const useGeneratorStore = create<GeneratorStoreState>((set, get) => ({
  isGenerating: false,
  chats: [],

  getData: async () => {
    try {
      const response = await axiosInstance.get("/messages/allMessages");
      set({ chats: response.data });
    } catch (error) {
      console.error("Error generating data:", error);
      throw error;
    } finally {
      set({ isGenerating: false });
    }
  },

  sendPrompt: async (data: string) => {
    set({ isGenerating: true });
    try {
      const response = await axiosInstance.post("/messages/createMessage", {
        prompt: data,
      });
      set({ chats: [...get().chats, response.data] });
    } catch (error) {
      console.error("Error sending prompt:", error);
      throw error;
    } finally {
      set({ isGenerating: false });
    }
  },
}));

export default useGeneratorStore;
