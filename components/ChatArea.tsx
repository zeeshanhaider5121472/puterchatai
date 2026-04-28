'use client';

import { useAppContext } from '@/context/AppContext';
import { User, Bot } from 'lucide-react';

export default function ChatArea() {
  const { messages, isTyping } = useAppContext();

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-0 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400 dark:text-zinc-600">
            <Bot size={48} strokeWidth={1} />
            <p className="mt-4 text-xl font-light">Start a conversation with Qwen</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 items-start ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-zinc-600 dark:text-zinc-300" />
              </div>
            )}
            <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
              msg.role === 'user' 
                ? 'bg-purple-600 text-white rounded-br-sm' 
                : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700 rounded-bl-sm'
            }`}>
              {/* Render Image if exists */}
              {msg.imageUrl && (
                <img src={msg.imageUrl} alt="User upload" className="max-w-full h-auto rounded-lg mb-2 max-h-60 object-cover" />
              )}
              {/* Render Text */}
              <div>{msg.textPreview}</div>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-zinc-600 dark:text-zinc-300" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <Bot size={18} className="text-zinc-600 dark:text-zinc-300" />
            </div>
            <div className="bg-white dark:bg-zinc-800 px-5 py-3 rounded-2xl rounded-bl-sm text-zinc-500 animate-pulse border border-zinc-100 dark:border-zinc-700">
              Thinking...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}