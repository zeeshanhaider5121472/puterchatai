'use client';

import { ArrowLeft } from 'lucide-react';

const infoData = [
  {
    name: 'Temperature',
    recommended: '0.7',
    description: 'Controls randomness. Lower values make the model more focused and deterministic, while higher values make it more creative and unpredictable.',
    useCase: 'Use 0.2 for coding/data extraction, 0.7 for general chat, 1.5+ for brainstorming.'
  },
  {
    name: 'Max Tokens',
    recommended: '2048',
    description: 'The maximum number of tokens (words/pieces of words) the AI will generate in a single response.',
    useCase: 'Use 256 for quick Q&A, 2048 for standard chat, 4096+ for long-form content or coding.'
  },
  {
    name: 'Frequency Penalty',
    recommended: '0.0',
    description: 'Penalizes the model for repeating the same words. Higher values decrease the likelihood of repeating the exact same text.',
    useCase: 'Increase to 0.5 - 1.0 if the AI gets stuck in loops or repeats itself too often.'
  },
  {
    name: 'Presence Penalty',
    recommended: '0.0',
    description: 'Increases the model\'s likelihood to talk about new topics. Higher values make the model more likely to introduce new concepts instead of sticking to the current context.',
    useCase: 'Increase to 0.5 - 1.0 for brainstorming or when you want the AI to change the subject dynamically.'
  }
];

// ... same imports

export default function InfoPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-colors text-zinc-800 dark:text-white"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-500 text-transparent bg-clip-text">AI Parameters Guide</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {infoData.map(item => (
          <div key={item.name} className="p-5 rounded-2xl space-y-3 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{item.name}</h3>
              <span className="text-xs font-mono px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 rounded-lg">Rec: {item.recommended}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>
            <div className="bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-zinc-200 dark:border-white/5">
              <p className="text-xs text-blue-600 dark:text-blue-300"><span className="font-bold">Use Case:</span> {item.useCase}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}