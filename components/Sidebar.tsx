'use client';

import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { MessageSquare, X, Trash2, User, Plus } from 'lucide-react';
import { getModelName } from '@/lib/models';

export default function Sidebar() {
  const { chats, activeChatId, setActiveChatId, startNewChat, deleteChat, user, isSidebarOpen, closeSidebar, selectedModel } = useAppContext();

  // Group chats by modelId
  const groupedChats = chats.reduce((acc, chat) => {
    const modelName = getModelName(chat.modelId);
    if (!acc[modelName]) acc[modelName] = [];
    acc[modelName].push(chat);
    return acc;
  }, {} as Record<string, typeof chats>);

  return (
    <>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30" onClick={closeSidebar} />}
      
      <motion.div 
        className="fixed top-0 left-0 h-full w-80 glass z-40 flex flex-col shadow-2xl"
        initial={{ x: -320 }}
        animate={{ x: isSidebarOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-4 flex justify-between items-center border-b border-black/10 dark:border-white/10">
          <h2 className="font-bold text-lg bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text">Chats</h2>
          <button onClick={closeSidebar} className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-zinc-600 dark:text-zinc-300"><X size={20} /></button>
        </div>

        <div className="p-4">
          <button 
            onClick={() => startNewChat(selectedModel)}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all active:scale-95"
          >
            <Plus size={18} /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(groupedChats).map(([modelName, modelChats]) => (
            <div key={modelName}>
              <h4 className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider px-2">{modelName}</h4>
              <div className="space-y-2">
                {modelChats.map(chat => (
                  <div key={chat.id} className="group relative">
                    <button
                      onClick={() => { setActiveChatId(chat.id); closeSidebar(); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
                        activeChatId === chat.id 
                          ? 'bg-purple-100 dark:bg-white/20 font-semibold text-purple-900 dark:text-white' 
                          : 'hover:bg-black/5 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <MessageSquare size={16} className="flex-shrink-0" />
                      <span className="truncate">{chat.title}</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white dark:bg-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 shadow-sm"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-zinc-900 dark:text-white truncate">{user ? user.username : 'Guest'}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{user ? 'Puter Account' : 'Sign in to save'}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}