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
  const { selectedModel, user, signOutPuter, openSidebar } = useAppContext();
  const currentModel = aiModels.find((m) => m.id === selectedModel);

  return (
    <main className="flex h-[100dvh] relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-purple-50 dark:from-[#050510] dark:via-[#0a0a2a] dark:to-[#150525] transition-colors duration-500">
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex flex-col relative z-10 flex-1 min-w-0 h-full md:max-w-4xl md:mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 shrink-0 border-b border-white/20 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md z-10"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={openSidebar}
              className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl text-zinc-800 dark:text-zinc-200 shrink-0"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-500 text-transparent bg-clip-text shrink-0">
              Shia AI
            </h1>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs shrink-0">
              <Cpu
                size={12}
                className="text-purple-600 dark:text-purple-400 shrink-0"
              />
              <span className="font-medium text-zinc-800 dark:text-zinc-300 truncate max-w-[120px] md:max-w-[180px]">
                {currentModel?.name || "Select Model"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Mobile model indicator */}
            <div className="sm:hidden flex items-center gap-1 px-2 py-1 rounded-full glass text-[10px]">
              <Cpu
                size={10}
                className="text-purple-600 dark:text-purple-400 shrink-0"
              />
              <span className="font-medium text-zinc-800 dark:text-zinc-300 truncate max-w-[80px]">
                {currentModel?.name || "Model"}
              </span>
            </div>

            {user && (
              <button
                onClick={signOutPuter}
                className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 shrink-0"
                title="Sign Out"
                aria-label="Sign out"
              >
                <LogOut size={20} />
              </button>
            )}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 text-zinc-800 dark:text-zinc-300 shrink-0"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </motion.header>

        {/* Chat area — takes remaining space and scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ChatArea />
        </div>

        {/* Chat input — pinned to bottom */}
        <div className="shrink-0">
          <ChatInput />
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </main>
  );
}