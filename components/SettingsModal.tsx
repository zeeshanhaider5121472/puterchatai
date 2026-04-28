'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import ModelSelect from './ModelSelect';
import InfoPage from './InfoPage';
import { X, Sun, Moon, LogIn, Sliders, Info, Smile, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultQuickModes, aiModels } from '@/lib/models';

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { darkMode, toggleDarkMode, aiConfig, setAiConfig, loginToPuter, user, customModes, setCustomModes, systemPrompt, setSystemPrompt } = useAppContext();
  const [view, setView] = useState<'main' | 'info'>('main');

  if (!isOpen) return null;

  const handleSliderChange = (key: keyof typeof aiConfig, value: number) => setAiConfig({ ...aiConfig, [key]: value });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-black/10 dark:border-white/10">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Settings</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"><X size={24} /></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-white/50 dark:bg-black/20">
          <AnimatePresence mode="wait">
            {view === 'main' ? (
              <motion.div key="main" initial={{x: -50, opacity: 0}} animate={{x: 0, opacity: 1}} className="space-y-8">
                
                {/* Auth */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2 flex items-center gap-2"><LogIn size={16} /> Account</h3>
                  {user ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <Smile className="text-green-600 dark:text-green-400" size={24} />
                      <div><p className="font-semibold text-green-900 dark:text-green-100">{user.username}</p><p className="text-xs text-green-700 dark:text-green-300">Already signed in</p></div>
                    </div>
                  ) : <button onClick={loginToPuter} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl shadow-md">Sign in to Puter</button>}
                </div>

                {/* Model Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Default AI Model</h3>
                  <ModelSelect />
                </div>

                {/* Custom Quick Modes */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-2"><Sliders size={16} /> Quick Mode Mappings</h3>
                  <div className="space-y-3">
                    {defaultQuickModes.map(mode => (
                      <div key={mode.id} className="flex items-center gap-3">
                        <span className="text-xs font-medium w-16 text-zinc-600 dark:text-zinc-400">{mode.label}</span>
                        <select 
                          value={customModes[mode.id] || mode.modelId}
                          onChange={(e) => setCustomModes({...customModes, [mode.id]: e.target.value})}
                          className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:ring-1 focus:ring-purple-500 focus:outline-none"
                        >
                          <optgroup label="Suggested">
                            {mode.suggestedModels?.map(id => <option key={id} value={id}>{aiModels.find(m=>m.id===id)?.name}</option>)}
                          </optgroup>
                          <optgroup label="All Models">
                            {aiModels.map(m => <option key={m.id} value={m.id}>{m.provider} - {m.name}</option>)}
                          </optgroup>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Knowledge / System Prompt */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2 flex items-center gap-2"><BookOpen size={16} /> Custom Knowledge Base</h3>
                  <p className="text-xs text-zinc-500 mb-2">Force the AI to only answer based on this context. Leave empty for normal chat.</p>
                  <textarea 
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Paste your document or rules here..."
                    rows={4}
                    className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:ring-1 focus:ring-purple-500 focus:outline-none resize-none"
                  />
                </div>

                {/* AI Config Sliders */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2"><Sliders size={16} /> Model Parameters</h3>
                    <button onClick={() => setView('info')} className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-medium"><Info size={12}/> Learn More</button>
                  </div>
                  <div className="space-y-5">
                    {Object.entries(aiConfig).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-600 dark:text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-mono font-bold text-zinc-900 dark:text-white">{value}</span>
                        </div>
                        <input type="range" min={key === 'maxTokens' ? '256' : '-2'} max={key === 'maxTokens' ? '8192' : '2'} step={key === 'maxTokens' ? '256' : '0.1'} value={value} onChange={(e) => handleSliderChange(key as keyof typeof aiConfig, parseFloat(e.target.value))} className="w-full h-1.5 bg-zinc-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-400"/>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Appearance</h3>
                  <button onClick={toggleDarkMode} className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-black/5 dark:hover:bg-white/10 text-sm font-medium text-zinc-800 dark:text-white">
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />} {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="info" initial={{x: 50, opacity: 0}} animate={{x: 0, opacity: 1}}>
                <InfoPage onBack={() => setView('main')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}