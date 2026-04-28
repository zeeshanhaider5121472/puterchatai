"use client";

import { Mode } from "@/lib/models";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface MessageContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
}

interface Message {
  role: "user" | "assistant";
  content: string | MessageContent[];
  textPreview: string; // For UI display
  imageUrl?: string; // For UI display
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  isTemp?: boolean;
}

interface AIConfig {
  temperature: number;
  maxTokens: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface User {
  username: string;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  aiConfig: AIConfig;
  setAiConfig: (config: AIConfig) => void;
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  messages: Message[];
  isTyping: boolean;
  sendMessage: (
    text: string,
    attachment?: { type: string; content: string } | null,
  ) => Promise<void>;
  setQuickMode: (mode: Mode) => void;
  loginToPuter: () => void;
  signOutPuter: () => void;
  startNewChat: (isTemp?: boolean) => void;
  deleteChat: (id: string) => void;
  robotMood: string;
  user: User | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false); // Default to Light Mode
  const [selectedModel, setSelectedModel] = useState("qwen/qwen-plus");
  const [isTyping, setIsTyping] = useState(false);
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    temperature: 0.7,
    maxTokens: 2048,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });

  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [robotMood, setRobotMood] = useState("idle");
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  // --- PERSISTENCE LAYER (Cloud + Local) ---

  const saveChats = useCallback(
    async (chatsData: Chat[], activeId: string | null) => {
      // CRITICAL FIX: Strip Base64 images before saving to prevent QuotaExceededError
      const strippedChats = chatsData.map((chat) => ({
        ...chat,
        messages: chat.messages.map((msg) => {
          if (msg.imageUrl) {
            // Remove the massive base64 string, keep the text
            return {
              ...msg,
              imageUrl: undefined,
              content: `[Image uploaded] ${msg.textPreview}`,
            };
          }
          return msg;
        }),
      }));

      const dataToSave = JSON.stringify({
        chats: strippedChats,
        activeChatId: activeId,
      });

      try {
        // Always save to localStorage as a fallback
        localStorage.setItem("galaxy-chats", dataToSave);

        // If logged in, sync to Puter Cloud (KV)
        if (user && (window as any).puter) {
          try {
            await (window as any).puter.kv.set("galaxy_chats_data", dataToSave);
          } catch (e) {
            console.error("Failed to sync to Puter Cloud:", e);
          }
        }
      } catch (e) {
        console.error("Failed to save chats locally:", e);
      }
    },
    [user],
  );

  const loadChats = useCallback(async () => {
    let loadedData = null;

    // 1. Try loading from Puter Cloud if logged in
    if (user && (window as any).puter) {
      try {
        const cloudData = await (window as any).puter.kv.get(
          "galaxy_chats_data",
        );
        if (cloudData) loadedData = JSON.parse(cloudData);
      } catch (e) {
        console.error(
          "Failed to load from Puter Cloud, falling back to local.",
          e,
        );
      }
    }

    // 2. Fallback to localStorage if no cloud data or not logged in
    if (!loadedData) {
      const localData = localStorage.getItem("galaxy-chats");
      if (localData) loadedData = JSON.parse(localData);
    }

    // 3. Apply loaded data or initialize
    if (loadedData?.chats?.length > 0) {
      setChats(loadedData.chats);
      setActiveChatId(loadedData.activeChatId || loadedData.chats[0].id);
    } else {
      const firstChat = {
        id: Date.now().toString(),
        title: "First Chat",
        messages: [],
      };
      setChats([firstChat]);
      setActiveChatId(firstChat.id);
    }
  }, [user]);

  // --- AUTH LOGIC ---

  const checkAuth = async () => {
    if (typeof window !== "undefined" && (window as any).puter) {
      try {
        const currentUser = await (window as any).puter.auth.getUser();
        if (currentUser?.username) {
          setUser({ username: currentUser.username });
        } else {
          setUser(null);
        }
      } catch (e) {
        // Puter throws an error if not logged in. This is expected!
        setUser(null);
      }
    }
  };

  const loginToPuter = async () => {
    if (typeof window !== "undefined" && (window as any).puter) {
      try {
        const userData = await (window as any).puter.ui.authenticateWithPuter();
        if (userData?.username) {
          setUser({ username: userData.username });
        } else {
          await checkAuth(); // Fallback
        }
      } catch (e) {
        console.error("Auth failed or cancelled", e);
      }
    }
  };

  const signOutPuter = async () => {
    if (typeof window !== "undefined" && (window as any).puter) {
      try {
        await (window as any).puter.auth.signOut();
        setUser(null);
      } catch (e) {
        console.error("Sign out failed", e);
      }
    }
  };

  // --- INITIALIZATION ---

  useEffect(() => {
    const initializeApp = async () => {
      const savedTheme = localStorage.getItem("galaxy-theme");
      if (savedTheme) setDarkMode(savedTheme === "dark");

      const savedModel = localStorage.getItem("galaxy-model");
      if (savedModel) setSelectedModel(savedModel);

      const savedConfig = localStorage.getItem("galaxy-ai-config");
      if (savedConfig) setAiConfig(JSON.parse(savedConfig));

      await checkAuth();
      setIsHydrated(true);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (isHydrated) loadChats();
  }, [isHydrated, user]);

  useEffect(() => {
    if (isHydrated && chats.length > 0) saveChats(chats, activeChatId);
  }, [chats, activeChatId, isHydrated, saveChats]);

  useEffect(() => {
    if (isHydrated) localStorage.setItem("galaxy-model", selectedModel);
  }, [selectedModel, isHydrated]);
  useEffect(() => {
    if (isHydrated)
      localStorage.setItem("galaxy-ai-config", JSON.stringify(aiConfig));
  }, [aiConfig, isHydrated]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("galaxy-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // --- CHAT ACTIONS ---

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const setQuickMode = (mode: Mode) => setSelectedModel(mode.modelId);

  const startNewChat = (isTemp = false) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: isTemp ? "Temp Chat" : "New Chat",
      messages: [],
      isTemp,
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id: string) => {
    setChats((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      if (activeChatId === id)
        setActiveChatId(updated.length > 0 ? updated[0].id : null);
      if (updated.length === 0) {
        const firstChat = {
          id: Date.now().toString(),
          title: "New Chat",
          messages: [],
        };
        setActiveChatId(firstChat.id);
        return [firstChat];
      }
      return updated;
    });
  };

  const sendMessage = useCallback(
    async (
      text: string,
      attachment?: { type: string; content: string } | null,
    ) => {
      if ((!text.trim() && !attachment) || isTyping || !activeChatId) return;

      // User chooses the model manually. No forced auto-switch.
      let currentModel = selectedModel;

      const lowerContent = text.toLowerCase();
      if (lowerContent.includes("sleep") || lowerContent.includes("tired"))
        setRobotMood("sleeping");
      else if (lowerContent.includes("laugh") || lowerContent.includes("joke"))
        setRobotMood("laughing");
      else if (
        lowerContent.includes("jump") ||
        lowerContent.includes("excited")
      )
        setRobotMood("jumping");
      else setRobotMood("idle");

      // Format message content
      let messageContent: string | MessageContent[];
      if (attachment?.type === "image") {
        messageContent = [
          { type: "text", text: text || "What is in this image?" },
          { type: "image_url", image_url: { url: attachment.content } },
        ];
      } else {
        messageContent = text;
      }

      const userMessage: Message = {
        role: "user",
        content: messageContent,
        textPreview:
          text ||
          (attachment?.type === "image"
            ? "Uploaded an image"
            : "Uploaded a file"),
        imageUrl: attachment?.type === "image" ? attachment.content : undefined,
      };

      const newMessages: Message[] = [...messages, userMessage];
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? {
                ...c,
                messages: newMessages,
                title:
                  c.messages.length === 0
                    ? (text || "Image Chat").slice(0, 20)
                    : c.title,
              }
            : c,
        ),
      );
      setIsTyping(true);

      try {
        const puter = (window as any).puter;
        if (!puter) throw new Error("Puter.js not loaded");

        const apiMessages = newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        let response;

        // FIX: Puter.js requires different call formats for Vision vs Text
        if (attachment?.type === "image") {
          // For images, pass the array of messages as the FIRST argument
          response = await puter.ai.chat(apiMessages, {
            model: currentModel,
            temperature: aiConfig.temperature,
            max_tokens: aiConfig.maxTokens,
            frequency_penalty: aiConfig.frequencyPenalty,
            presence_penalty: aiConfig.presencePenalty,
          });
        } else {
          // For text, pass the string prompt as the first argument, and history in options
          response = await puter.ai.chat(text, {
            model: currentModel,
            messages: apiMessages,
            temperature: aiConfig.temperature,
            max_tokens: aiConfig.maxTokens,
            frequency_penalty: aiConfig.frequencyPenalty,
            presence_penalty: aiConfig.presencePenalty,
          });
        }

        const aiContent =
          typeof response === "string" ? response : response?.message?.content;
        const aiMessage: Message = {
          role: "assistant",
          content: aiContent || "No response.",
          textPreview: aiContent || "No response.",
        };
        setChats((prev) =>
          prev.map((c) =>
            c.id === activeChatId
              ? { ...c, messages: [...newMessages, aiMessage] }
              : c,
          ),
        );
      } catch (error: any) {
        const errMsg = error.message || "Error processing request.";
        const aiMessage: Message = {
          role: "assistant",
          content: errMsg,
          textPreview: errMsg,
        };
        setChats((prev) =>
          prev.map((c) =>
            c.id === activeChatId
              ? { ...c, messages: [...newMessages, aiMessage] }
              : c,
          ),
        );
      } finally {
        setIsTyping(false);
      }
    },
    [messages, selectedModel, isTyping, aiConfig, activeChatId],
  );

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        selectedModel,
        setSelectedModel,
        aiConfig,
        setAiConfig,
        chats,
        activeChatId,
        setActiveChatId,
        messages,
        isTyping,
        sendMessage,
        setQuickMode,
        loginToPuter,
        signOutPuter,
        startNewChat,
        deleteChat,
        robotMood,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
