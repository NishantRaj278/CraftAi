import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";
// Types for session store
interface GeneratedData {
  _id: string;
  message: string;
  generatedCode: string;
}

interface Session {
  _id: string;
  title: string;
  chats: GeneratedData[];
  createdAt?: string;
}

interface SessionStore {
  sessions: Session[];
  loading: boolean;
  error: string | null;
  sessionId: string | null;
  currentSession: Session | null;
  getSessions: () => Promise<void>;
  getSessionById: (sessionId: string) => Promise<void>;
  createSession: (title: string) => Promise<void>;
  addChatToSession: (sessionId: string, chatId: string) => Promise<void>;
}

const useSessionStore = create<SessionStore>((set) => ({
  sessions: [],
  loading: false,
  error: null,
  sessionId: null,
  currentSession: null,

  getSessions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/sessions/user-session");
      set({ sessions: response.data, loading: false });
    } catch (error) {
      const errorMsg =
        typeof error === "object" && error && "message" in error
          ? (error as { message: string }).message
          : String(error);
      set({ error: errorMsg, loading: false });
    }
  },

  getSessionById: async (sessionId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/sessions/${sessionId}`);
      set({ currentSession: response.data, loading: false });
    } catch (error) {
      const errorMsg =
        typeof error === "object" && error && "message" in error
          ? (error as { message: string }).message
          : String(error);
      set({ error: errorMsg, loading: false });
      set({ currentSession: null });
    }
  },

  createSession: async (title: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/sessions/new-session", {
        title,
      });
      set((state) => ({
        sessions: [...state.sessions, response.data],
        loading: false,
      }));
    } catch (error) {
      const errorMsg =
        typeof error === "object" && error && "message" in error
          ? (error as { message: string }).message
          : String(error);
      set({ error: errorMsg, loading: false });
    }
  },

  addChatToSession: async (sessionId, chatId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/sessions/add-chat`, {
        chatId,
        sessionId,
      });
      set((state) => ({
        sessions: state.sessions.map((session) =>
          session._id === sessionId ? response.data : session
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMsg =
        typeof error === "object" && error && "message" in error
          ? (error as { message: string }).message
          : String(error);
      set({ error: errorMsg, loading: false });
    }
  },
}));

export default useSessionStore;
