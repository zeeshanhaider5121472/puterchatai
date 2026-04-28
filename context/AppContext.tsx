"use client";

import { aiModels, defaultQuickModes } from "@/lib/models";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface MessageContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string | MessageContent[];
  textPreview: string;
  imageUrl?: string;
  thinkingContent?: string | null; // For thinking models
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  modelId: string; // Tracks which model this chat belongs to
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
  stopGeneration: () => void;
  setQuickMode: (modeId: string) => void;
  loginToPuter: () => void;
  signOutPuter: () => void;
  startNewChat: (modelId: string) => void;
  deleteChat: (id: string) => void;
  robotMood: string;
  user: User | null;
  closeSidebar: () => void;
  openSidebar: () => void;
  isSidebarOpen: boolean;
  customModes: Record<string, string>;
  setCustomModes: (modes: Record<string, string>) => void;
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const modelDefaults: Record<string, Partial<AIConfig>> = {
  "qwen/qwen3-max-thinking": { temperature: 0.6 },
  "claude-3-5-sonnet": { temperature: 0.7, maxTokens: 4096 },
  "qwen/qwen-image": { temperature: 0.9 },
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [customModes, setCustomModes] = useState<Record<string, string>>({});
  const [systemPrompt, setSystemPrompt] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  // Auto-adjust params when model changes
  useEffect(() => {
    const defaults = modelDefaults[selectedModel];
    if (defaults) setAiConfig((prev) => ({ ...prev, ...defaults }));
  }, [selectedModel]);

  const saveChats = useCallback(
    async (chatsData: Chat[], activeId: string | null) => {
      const strippedChats = chatsData.map((chat) => ({
        ...chat,
        messages: chat.messages.map((msg) => {
          if (msg.imageUrl)
            return {
              ...msg,
              imageUrl: undefined,
              content: `[Image uploaded] ${msg.textPreview}`,
            };
          return msg;
        }),
      }));
      const dataToSave = JSON.stringify({
        chats: strippedChats,
        activeChatId: activeId,
      });
      try {
        localStorage.setItem("galaxy-chats", dataToSave);
        if (user && (window as any).puter) {
          try {
            await (window as any).puter.kv.set("galaxy_chats_data", dataToSave);
          } catch (e) {}
        }
      } catch (e) {
        console.error("Save failed", e);
      }
    },
    [user],
  );

  const loadChats = useCallback(async () => {
    let loadedData = null;
    if (user && (window as any).puter) {
      try {
        const cloudData = await (window as any).puter.kv.get(
          "galaxy_chats_data",
        );
        if (cloudData) loadedData = JSON.parse(cloudData);
      } catch (e) {}
    }
    if (!loadedData) {
      const localData = localStorage.getItem("galaxy-chats");
      if (localData) loadedData = JSON.parse(localData);
    }
    if (loadedData?.chats?.length > 0) {
      setChats(loadedData.chats);
      setActiveChatId(loadedData.activeChatId || loadedData.chats[0].id);
    } else {
      startNewChat(selectedModel);
    }
  }, [user, selectedModel]);

  const checkAuth = async () => {
    if (typeof window !== "undefined" && (window as any).puter) {
      try {
        const currentUser = await (window as any).puter.auth.getUser();
        if (currentUser?.username) setUser({ username: currentUser.username });
        else setUser(null);
      } catch (e) {
        setUser(null);
      }
    }
  };

  const loginToPuter = async () => {
    if ((window as any).puter) {
      try {
        const userData = await (window as any).puter.ui.authenticateWithPuter();
        if (userData?.username) setUser({ username: userData.username });
        else await checkAuth();
      } catch (e) {}
    }
  };
  const signOutPuter = async () => {
    if ((window as any).puter) {
      try {
        await (window as any).puter.auth.signOut();
        setUser(null);
      } catch (e) {}
    }
  };

  useEffect(() => {
    const init = async () => {
      const sTheme = localStorage.getItem("galaxy-theme");
      if (sTheme) setDarkMode(sTheme === "dark");
      const sModel = localStorage.getItem("galaxy-model");
      if (sModel) setSelectedModel(sModel);
      const sConfig = localStorage.getItem("galaxy-ai-config");
      if (sConfig) setAiConfig(JSON.parse(sConfig));
      const sModes = localStorage.getItem("galaxy-custom-modes");
      if (sModes) setCustomModes(JSON.parse(sModes));
      const sPrompt = localStorage.getItem("galaxy-system-prompt");
      if (sPrompt) setSystemPrompt(sPrompt);
      await checkAuth();
      setIsHydrated(true);
    };
    init();
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
  useEffect(() => {
    localStorage.setItem("galaxy-custom-modes", JSON.stringify(customModes));
  }, [customModes]);
  useEffect(() => {
    localStorage.setItem("galaxy-system-prompt", systemPrompt);
  }, [systemPrompt]);

  // sync MODEL: When user clicks a chat in the sidebar, change the active model to match that chat
  useEffect(() => {
    if (activeChatId && chats.length > 0) {
      const activeChat = chats.find((c) => c.id === activeChatId);
      if (activeChat && activeChat.modelId !== selectedModel) {
        setSelectedModel(activeChat.modelId);
      }
    }
  }, [activeChatId, chats]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  const setQuickMode = (modeId: string) => {
    const modeModel =
      customModes[modeId] ||
      defaultQuickModes.find((m) => m.id === modeId)?.modelId;
    if (modeModel) setSelectedModel(modeModel);
  };

  const startNewChat = (modelForChat: string) => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      modelId: modelForChat,
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    closeSidebar();
  };

  const deleteChat = (id: string) => {
    setChats((prev) => {
      const updated = prev.filter((c) => c.id !== id);

      if (updated.length === 0) {
        // If we deleted the last chat, create a fresh one directly inside the state update
        const freshChat: Chat = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
          modelId: selectedModel,
        };
        setActiveChatId(freshChat.id);
        return [freshChat]; // Return the array with the new chat directly
      } else {
        // If we still have chats, just update the active ID if we deleted the active one
        if (activeChatId === id) {
          setActiveChatId(updated[0].id);
        }
        return updated;
      }
    });
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsTyping(false);
    }
  };

  const sendMessage = useCallback(
    async (
      text: string,
      attachment?: { type: string; content: string } | null,
    ) => {
      if ((!text.trim() && !attachment) || isTyping) return;

      // FIX: Calculate the target chat ID synchronously to prevent race conditions
      let targetChatId = activeChatId;
      const currentActiveChat = chats.find((c) => c.id === activeChatId);

      // If the model has changed or no active chat exists, create a new chat inline
      if (
        !targetChatId ||
        (currentActiveChat && currentActiveChat.modelId !== selectedModel)
      ) {
        const newId = crypto.randomUUID();
        const newChat: Chat = {
          id: newId,
          title: "New Chat",
          messages: [],
          modelId: selectedModel,
        };
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(newId);
        targetChatId = newId; // Use the new ID immediately for the rest of this function!
      }

      const isImageGen = aiModels.find(
        (m) => m.id === selectedModel,
      )?.isImageGen;

      setRobotMood("idle");
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
          text || (attachment?.type === "image" ? "Uploaded an image" : ""),
        imageUrl: attachment?.type === "image" ? attachment.content : undefined,
      };

      // Update the correct chat using targetChatId
      setChats((prev) =>
        prev.map((c) =>
          c.id === targetChatId
            ? {
                ...c,
                messages: [...c.messages, userMessage],
                title:
                  c.messages.length === 0
                    ? (text || "Image Chat").slice(0, 20)
                    : c.title,
              }
            : c,
        ),
      );
      setIsTyping(true);

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
        const puter = (window as any).puter;
        if (!puter) throw new Error("Puter.js not loaded");

        let aiResponseText = "";
        let thinkingText = "";

        if (isImageGen) {
          // Image Generation Logic
          const imageResponse = await puter.ai.txt2img(text, {
            model: selectedModel,
          });
          if (signal.aborted) return;

          let imageUrl = "";

          // FIX: Handle Puter's Image Object, HTML string, or Base64
          if (typeof imageResponse === "string") {
            if (
              imageResponse.startsWith("http") ||
              imageResponse.startsWith("data:")
            ) {
              imageUrl = imageResponse;
            } else if (
              imageResponse.includes("<img") &&
              imageResponse.includes('src="')
            ) {
              // If it returned an HTML string, extract the src
              const match = imageResponse.match(/src="([^"]+)"/);
              imageUrl = match ? match[1] : "";
            } else {
              // Assume raw base64
              imageUrl = `data:image/png;base64,${imageResponse}`;
            }
          } else if (imageResponse instanceof Blob) {
            imageUrl = URL.createObjectURL(imageResponse);
          } else if (imageResponse?.src) {
            // FIX: Puter.js often returns an HTMLImageElement or Object with a .src property
            imageUrl = imageResponse.src;
          } else if (imageResponse?.url) {
            imageUrl = imageResponse.url;
          } else {
            console.error(
              "Unexpected image generation response:",
              imageResponse,
            );
          }

          const aiMessage: Message = {
            role: "assistant",
            content: "Generated Image",
            textPreview: "Generated Image",
            imageUrl: imageUrl,
          };
          setChats((prev) =>
            prev.map((c) =>
              c.id === targetChatId
                ? { ...c, messages: [...c.messages, aiMessage] }
                : c,
            ),
          );
          return; // Stop here for image gen
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;
        const errMsg = error.message || "Error processing request.";
        const aiMessage: Message = {
          role: "assistant",
          content: errMsg,
          textPreview: errMsg,
        };
        setChats((prev) =>
          prev.map((c) =>
            c.id === targetChatId
              ? {
                  ...c,
                  messages: [
                    ...c.messages.filter(
                      (m) => m.textPreview !== "Thinking...",
                    ),
                    aiMessage,
                  ],
                }
              : c,
          ),
        );
      } finally {
        setIsTyping(false);
        abortControllerRef.current = null;
      }
    },
    [activeChatId, chats, selectedModel, isTyping, aiConfig, systemPrompt],
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
        stopGeneration,
        setQuickMode,
        loginToPuter,
        signOutPuter,
        startNewChat,
        deleteChat,
        robotMood,
        user,
        isSidebarOpen,
        closeSidebar,
        openSidebar,
        customModes,
        setCustomModes,
        systemPrompt,
        setSystemPrompt,
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
