'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import ModelSelect from './ModelSelect';
import InfoPage from './InfoPage';
import { X, Sun, Moon, LogIn, Sliders, Info, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { darkMode, toggleDarkMode, aiConfig, setAiConfig, loginToPuter, user } = useAppContext();
  const [view, setView] = useState<'main' | 'info'>('main');

  if (!isOpen) return null;

  const handleSliderChange = (key: keyof typeof aiConfig, value: number) => {
    setAiConfig({ ...aiConfig, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center p-6 border-b border-black/10 dark:border-white/10 flex-shrink-0">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Settings</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"><X size={24} /></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-white/50 dark:bg-black/20">
          <AnimatePresence mode="wait">
            {view === 'main' ? (
              <motion.div key="main" initial={{x: -50, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: -50, opacity: 0}} className="space-y-8">
                
                {/* Puter Auth */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2 flex items-center gap-2"><LogIn size={16} /> Account</h3>
                  {user ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <Smile className="text-green-600 dark:text-green-400" size={24} />
                      <div>
                        <p className="font-semibold text-green-900 dark:text-green-100">{user.username}</p>
                        <p className="text-xs text-green-700 dark:text-green-300">Already signed in</p>
                      </div>
                    </div>
                  ) : (
                    <button onClick={loginToPuter} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors shadow-md">Sign in to Puter</button>
                  )}
                </div>

                {/* Model Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">AI Model</h3>
                  <ModelSelect />
                </div>

                {/* AI Config Sliders */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2"><Sliders size={16} /> Model Parameters</h3>
                    <button onClick={() => setView('info')} className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors font-medium"><Info size={12}/> Learn More</button>
                  </div>
                  <div className="space-y-5">
                    {Object.entries(aiConfig).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-600 dark:text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-mono font-bold text-zinc-900 dark:text-white">{value}</span>
                        </div>
                        <input 
                          type="range" 
                          min={key === 'maxTokens' ? '256' : '-2'} 
                          max={key === 'maxTokens' ? '8192' : '2'} 
                          step={key === 'maxTokens' ? '256' : '0.1'} 
                          value={value}
                          onChange={(e) => handleSliderChange(key as keyof typeof aiConfig, parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-zinc-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-400"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Appearance</h3>
                  <button onClick={toggleDarkMode} className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm font-medium text-zinc-800 dark:text-white">
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="info" initial={{x: 50, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: 50, opacity: 0}}>
                <InfoPage onBack={() => setView('main')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}