'use client';

import { useState, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import { quickModes, aiModels } from '@/lib/models';
import { Send, MessageCircle, Zap, Code2, Sparkles, Brain, Eye, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = { MessageCircle, Zap, Code2, Sparkles, Brain, Eye };

export default function ChatInput() {
  const [input, setInput] = useState('');
  const [attachment, setAttachment] = useState<{type: string, content: string, name: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, selectedModel, setQuickMode, isTyping } = useAppContext();

  const handleSend = () => {
    if (isTyping) return;
    sendMessage(input, attachment);
    setInput('');
    setAttachment(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAttachment({ type: 'image', content: ev.target?.result as string, name: file.name });
      };
      reader.readAsDataURL(file);
    } else {
      // Read plain text/code files only
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setInput(prev => `${prev}\n\n--- Content of ${file.name} ---\n${text}\n--- End of File ---`);
      };
      reader.readAsText(file);
    }
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const currentModelName = aiModels.find(m => m.id === selectedModel)?.name || selectedModel;

  return (
    <div className="p-4 md:p-0 md:pb-8">
      <div className="max-w-3xl mx-auto">
        {/* Quick Mode Selectors */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
          {quickModes.map(mode => {
            const Icon = iconMap[mode.icon];
            const isActive = selectedModel === mode.modelId;
            return (
              <div key={mode.id} className="relative group">
                <button
                  onClick={() => setQuickMode(mode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap border ${
                    isActive 
                      ? 'bg-purple-600 text-white border-transparent shadow-md' 
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-purple-400'
                  }`}
                >
                  {Icon && <Icon size={14} />}
                  {mode.label}
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-zinc-900 dark:bg-white text-white dark:text-black text-xs rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap">
                    {mode.tooltip}
                  </div>
                  <div className="w-2 h-2 bg-zinc-900 dark:bg-white rotate-45 mx-auto -mt-1"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Attachment Preview */}
        {attachment && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-2 relative inline-flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm"
          >
            <img src={attachment.content} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
            <span className="text-xs text-zinc-700 dark:text-zinc-300 max-w-[100px] truncate">{attachment.name}</span>
            <button onClick={() => setAttachment(null)} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600">
              <X size={12} />
            </button>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <div className="px-4 pt-3 text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide flex justify-between items-center">
            <span>{currentModelName.toUpperCase()}</span>
            {selectedModel.includes('vl') && <Eye size={12} className="text-purple-500" />}
          </div>
          
          <div className="flex items-end p-2 gap-1">
            {/* Plus Button */}
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                // Removed PDFs completely. Only Images and text/code files allowed
                accept="image/*,.txt,.md,.js,.ts,.py,.html,.css,.json,.xml,.yaml,.yml,.csv"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-500 dark:text-zinc-400"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 resize-none py-2.5 px-3 focus:outline-none text-sm max-h-[120px] overflow-y-auto"
            />

            {/* Send Button */}
            <div>
              <button 
                onClick={handleSend} 
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={isTyping || (!input.trim() && !attachment)}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}