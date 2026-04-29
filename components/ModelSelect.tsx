'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { ChevronDown, Search } from 'lucide-react';

export default function ModelSelect() {
  const { selectedModel, setSelectedModel, visibleModels, activeBackend } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentModel = visibleModels.find(m => m.id === selectedModel);

  // Dynamically generate tabs based on available models for the active backend
  const availableProviders = [...new Set(visibleModels.map(m => m.provider))];

  useEffect(() => {
    if (availableProviders.length > 0 && !availableProviders.includes(activeTab)) {
      setActiveTab(availableProviders[0]);
    }
  }, [availableProviders, activeTab]);

  const filteredModels = visibleModels.filter(m => 
    m.provider === activeTab && 
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (currentModel) setActiveTab(currentModel.provider);
  }, [currentModel]);

  const accentColor = activeBackend === 'nvidia' ? 'text-green-600 dark:text-green-400 border-green-600 dark:border-green-400' : 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400';

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors text-sm text-left">
        <div className="truncate">
          <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold mr-2">{currentModel?.provider}</span>
          <span className="text-zinc-900 dark:text-white font-medium">{currentModel?.name || 'Select Model'}</span>
        </div>
        <ChevronDown size={16} className="text-zinc-400 ml-2 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            {availableProviders.map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setSearch(''); }} className={`flex-1 py-2.5 text-xs font-medium transition-colors ${activeTab === tab ? `${accentColor} border-b-2` : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" placeholder={`Search ${activeTab} models...`} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-8 pr-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-zinc-900 dark:text-white placeholder-zinc-500" autoFocus />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto p-2 space-y-1">
            {filteredModels.map(model => (
              <button key={model.id} onClick={() => { setSelectedModel(model.id); setIsOpen(false); setSearch(''); }} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedModel === model.id ? 'bg-purple-600 text-white font-medium' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>
                {model.name}
              </button>
            ))}
            {filteredModels.length === 0 && <p className="text-sm text-zinc-500 text-center py-4">No models found.</p>}
          </div>
        </div>
      )}
    </div>
  );
}