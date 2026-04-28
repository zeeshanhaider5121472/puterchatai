export interface Model {
  id: string;
  name: string;
  provider: string; // 'Qwen' or 'GLM'
}

export interface Mode {
  id: string;
  label: string;
  icon: string;
  modelId: string;
  tooltip: string;
}

export const aiModels: Model[] = [
  // --- QWEN MODELS ---
  { id: 'qwen/qwen3.6-max-preview', name: '3.6 Max Preview', provider: 'Qwen' },
  { id: 'qwen/qwen3.6-plus', name: '3.6 Plus', provider: 'Qwen' },
  { id: 'qwen/qwen3.6-flash', name: '3.6 Flash', provider: 'Qwen' },
  { id: 'qwen/qwen3.6-27b', name: '3.6 27B', provider: 'Qwen' },
  { id: 'qwen/qwen3.6-35b-a3b', name: '3.6 35B A3B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-plus-20260420', name: '3.5 Plus (Apr)', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-9b', name: '3.5 9B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-122b-a10b', name: '3.5 122B A10B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-27b', name: '3.5 27B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-35b-a3b', name: '3.5 35B A3B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-flash-02-23', name: '3.5 Flash', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-397b-a17b', name: '3.5 397B A17B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-plus-02-15', name: '3.5 Plus (Feb)', provider: 'Qwen' },
  { id: 'qwen/qwen3-max-thinking', name: '3 Max Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder-next', name: '3 Coder Next', provider: 'Qwen' },
  { id: 'qwen/qwen3-next-80b-a3b-instruct', name: '3 Next 80B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-next-80b-a3b-thinking', name: '3 Next 80B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen-plus-2025-07-28', name: 'Plus (Jul 2025)', provider: 'Qwen' },
  { id: 'qwen/qwen-plus-2025-07-28:thinking', name: 'Plus Thinking (Jul)', provider: 'Qwen' },
  { id: 'qwen/qwen3-235b-a22b-2507', name: '3 235B', provider: 'Qwen' },
  { id: 'qwen/qwen3-235b-a22b-thinking-2507', name: '3 235B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-30b-a3b-instruct-2507', name: '3 30B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-30b-a3b-thinking-2507', name: '3 30B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder', name: '3 Coder', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder-30b-a3b-instruct', name: '3 Coder 30B', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder-flash', name: '3 Coder Flash', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder-plus', name: '3 Coder Plus', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-235b-a22b-instruct', name: '3 VL 235B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-235b-a22b-thinking', name: '3 VL 235B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-30b-a3b-instruct', name: '3 VL 30B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-30b-a3b-thinking', name: '3 VL 30B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-32b-instruct', name: '3 VL 32B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-8b-instruct', name: '3 VL 8B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-8b-thinking', name: '3 VL 8B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-max', name: '3 Max', provider: 'Qwen' },
  { id: 'qwen/qwen3-14b', name: '3 14B', provider: 'Qwen' },
  { id: 'qwen/qwen3-32b', name: '3 32B', provider: 'Qwen' },
  { id: 'qwen/qwen3-8b', name: '3 8B', provider: 'Qwen' },
  { id: 'qwen/qwq-32b', name: 'QWQ 32B', provider: 'Qwen' },
  { id: 'qwen/qwen-max', name: 'Max', provider: 'Qwen' },
  { id: 'qwen/qwen-plus', name: 'Plus', provider: 'Qwen' },
  { id: 'qwen/qwen-turbo', name: 'Turbo', provider: 'Qwen' },
  { id: 'qwen/qwen-vl-max', name: 'VL Max', provider: 'Qwen' },
  { id: 'qwen/qwen-vl-plus', name: 'VL Plus', provider: 'Qwen' },
  { id: 'qwen/qwen2.5-vl-72b-instruct', name: '2.5 VL 72B', provider: 'Qwen' },
  { id: 'qwen/qwen-image', name: 'Image', provider: 'Qwen' },
  { id: 'qwen/qwen-2.5-coder-32b-instruct', name: '2.5 Coder 32B', provider: 'Qwen' },
  { id: 'qwen/qwen-2.5-72b-instruct', name: '2.5 72B', provider: 'Qwen' },
  { id: 'qwen/qwen-2.5-7b-instruct', name: '2.5 7B', provider: 'Qwen' },

  // --- GLM MODELS ---
  { id: 'z-ai/glm-5.1', name: 'GLM 5.1', provider: 'GLM' },
  { id: 'z-ai/glm-5v-turbo', name: 'GLM 5V Turbo (Vision)', provider: 'GLM' },
  { id: 'z-ai/glm-5-turbo', name: 'GLM 5 Turbo', provider: 'GLM' },
  { id: 'z-ai/glm-5', name: 'GLM 5', provider: 'GLM' },
  { id: 'z-ai/glm-4.7-flash', name: 'GLM 4.7 Flash', provider: 'GLM' },
  { id: 'z-ai/glm-4.6v', name: 'GLM 4.6V (Vision)', provider: 'GLM' },
  { id: 'z-ai/glm-4.7', name: 'GLM 4.7', provider: 'GLM' },
  { id: 'z-ai/glm-4.6', name: 'GLM 4.6', provider: 'GLM' },
  { id: 'z-ai/glm-4.5v', name: 'GLM 4.5V (Vision)', provider: 'GLM' },
  { id: 'z-ai/glm-4.5', name: 'GLM 4.5', provider: 'GLM' },
  { id: 'z-ai/glm-4.5-air', name: 'GLM 4.5 Air', provider: 'GLM' },
  { id: 'z-ai/glm-4.5-air:free', name: 'GLM 4.5 Air (Free)', provider: 'GLM' },
  { id: 'z-ai/glm-4-32b', name: 'GLM 4 32B', provider: 'GLM' },
];

export const quickModes: Mode[] = [
  { id: 'conversational', label: 'Chat', icon: 'MessageCircle', modelId: 'qwen/qwen-plus', tooltip: 'Conversational AI: Balanced, friendly, and context-aware chat.' },
  { id: 'flash', label: 'Flash', icon: 'Zap', modelId: 'qwen/qwen3.6-flash', tooltip: 'Flash: Ultra-fast responses for simple queries.' },
  { id: 'coding', label: 'Code', icon: 'Code2', modelId: 'qwen/qwen3-coder', tooltip: 'Coding: Specialized for programming and debugging.' },
  { id: 'max', label: 'Max', icon: 'Sparkles', modelId: 'qwen/qwen3.6-max-preview', tooltip: 'Max Preview: Highest capability for complex tasks.' },
  { id: 'reasoning', label: 'Think', icon: 'Brain', modelId: 'qwen/qwen3-max-thinking', tooltip: 'Complex Reasoning: Deep logic and step-by-step math/science.' },
  { id: 'vision', label: 'Vision', icon: 'Eye', modelId: 'qwen/qwen3-vl-235b-a22b-instruct', tooltip: 'Image Analysis: Understands and describes images.' },
];