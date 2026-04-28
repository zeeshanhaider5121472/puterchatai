"use client";

import ChatArea from "@/components/ChatArea";
import SettingsModal from "@/components/SettingsModal";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import { aiModels } from "@/lib/models";
import { motion } from "framer-motion";
import { Cpu, LogOut, Menu, Settings } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
const ChatInput = dynamic(() => import("@/components/ChatInput"), {
  ssr: false,
});

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { selectedModel, user, signOutPuter } = useAppContext();

  const currentModel = aiModels.find((m) => m.id === selectedModel);

  return (
    <main className="flex max-h-[calc(100vh-64px)] h-[calc(100vh-64px)] relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-purple-50 dark:from-[#050510] dark:via-[#0a0a2a] dark:to-[#150525] transition-colors duration-500">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 w-full max-w-full md:max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex items-center justify-between px-4 md:px-6 py-4 
             rounded-xl 
             border border-white/20 dark:border-white/10 
             bg-white/30 dark:bg-white/5 
             backdrop-blur-md 
             shadow-lg 
             z-10"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-colors text-zinc-800 dark:text-zinc-200"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-500 text-transparent bg-clip-text">
              Galaxy AI
            </h1>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs">
              <Cpu size={12} className="text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-zinc-800 dark:text-zinc-300 max-w-[150px] truncate">
                {currentModel?.name || "Select Model"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={signOutPuter}
                className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            )}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-zinc-800 dark:text-zinc-300"
            >
              <Settings size={20} />
            </button>
          </div>
        </motion.header>

        {/* Chat Body */}
        <ChatArea />

        {/* Chat Input */}
        <ChatInput />
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </main>
  );
}
