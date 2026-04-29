export interface Model {
  id: string;
  name: string;
  provider: string; // For UI grouping (Qwen, GLM, Claude, DeepSeek, Meta)
  backend: 'puter' | 'nvidia'; // For API routing
  isImageGen?: boolean;
}

export interface Mode {
  id: string;
  label: string;
  icon: string;
  modelId: string;
  tooltip: string;
  suggestedModels?: string[];
}

export const aiModels: Model[] = [
  // --- QWEN MODELS (Puter) ---
  { id: 'qwen/qwen3.6-max-preview', name: '3.6 Max Preview', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.6-plus', name: '3.6 Plus', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.6-flash', name: '3.6 Flash', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.6-27b', name: '3.6 27B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.6-35b-a3b', name: '3.6 35B A3B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.5-plus-20260420', name: '3.5 Plus (Apr)', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.5-9b', name: '3.5 9B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.5-122b-a10b', name: '3.5 122B A10B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.5-27b', name: '3.5 27B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.5-35b-a3b', name: '3.5 35B A3B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.5-flash-02-23', name: '3.5 Flash', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.5-397b-a17b', name: '3.5 397B A17B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3.5-plus-02-15', name: '3.5 Plus (Feb)', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-max-thinking', name: '3 Max Thinking', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-coder-next', name: '3 Coder Next', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-next-80b-a3b-instruct', name: '3 Next 80B Instruct', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-next-80b-a3b-thinking', name: '3 Next 80B Thinking', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-plus-2025-07-28', name: 'Plus (Jul 2025)', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-plus-2025-07-28:thinking', name: 'Plus Thinking (Jul)', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-235b-a22b-2507', name: '3 235B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-235b-a22b-thinking-2507', name: '3 235B Thinking', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-30b-a3b-instruct-2507', name: '3 30B Instruct', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-30b-a3b-thinking-2507', name: '3 30B Thinking', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-coder', name: '3 Coder', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-coder-30b-a3b-instruct', name: '3 Coder 30B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-coder-flash', name: '3 Coder Flash', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-coder-plus', name: '3 Coder Plus', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-vl-235b-a22b-instruct', name: '3 VL 235B Instruct', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-vl-235b-a22b-thinking', name: '3 VL 235B Thinking', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-vl-30b-a3b-instruct', name: '3 VL 30B Instruct', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-vl-30b-a3b-thinking', name: '3 VL 30B Thinking', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-vl-32b-instruct', name: '3 VL 32B Instruct', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-vl-8b-instruct', name: '3 VL 8B Instruct', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-vl-8b-thinking', name: '3 VL 8B Thinking', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-max', name: '3 Max', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-14b', name: '3 14B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-32b', name: '3 32B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen3-8b', name: '3 8B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwq-32b', name: 'QWQ 32B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-max', name: 'Max', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-plus', name: 'Plus', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-turbo', name: 'Turbo', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-vl-max', name: 'VL Max', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-vl-plus', name: 'VL Plus', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen2.5-vl-72b-instruct', name: '2.5 VL 72B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-image', name: 'Image Generator', provider: 'Qwen', backend: 'puter', isImageGen: true },
  { id: 'qwen/qwen-2.5-coder-32b-instruct', name: '2.5 Coder 32B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-2.5-72b-instruct', name: '2.5 72B', provider: 'Qwen', backend: 'puter' },
  { id: 'qwen/qwen-2.5-7b-instruct', name: '2.5 7B', provider: 'Qwen', backend: 'puter' },

  // --- GLM MODELS (Puter) ---
  { id: 'z-ai/glm-5.1', name: 'GLM 5.1', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-5v-turbo', name: 'GLM 5V Turbo (Vision)', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-5-turbo', name: 'GLM 5 Turbo', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-5', name: 'GLM 5', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4.7-flash', name: 'GLM 4.7 Flash', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4.6v', name: 'GLM 4.6V (Vision)', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4.7', name: 'GLM 4.7', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4.6', name: 'GLM 4.6', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4.5v', name: 'GLM 4.5V (Vision)', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4.5', name: 'GLM 4.5', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4.5-air', name: 'GLM 4.5 Air', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4.5-air:free', name: 'GLM 4.5 Air (Free)', provider: 'GLM', backend: 'puter' },
  { id: 'z-ai/glm-4-32b', name: 'GLM 4 32B', provider: 'GLM', backend: 'puter' },

  // --- CLAUDE MODELS (Puter) ---
  { id: 'claude-opus-4-7', name: 'Claude Opus 4.7', provider: 'Claude', backend: 'puter' },
  { id: 'claude-opus-4.6-fast', name: 'Claude Opus 4.6 Fast', provider: 'Claude', backend: 'puter' },
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Claude', backend: 'puter' },
  { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', provider: 'Claude', backend: 'puter' },
  { id: 'claude-opus-4-5', name: 'Claude Opus 4.5', provider: 'Claude', backend: 'puter' },
  { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', provider: 'Claude', backend: 'puter' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', provider: 'Claude', backend: 'puter' },
  { id: 'claude-opus-4-1', name: 'Claude Opus 4.1', provider: 'Claude', backend: 'puter' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Claude', backend: 'puter' },
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Claude', backend: 'puter' },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Claude', backend: 'puter' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Claude', backend: 'puter' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Claude', backend: 'puter' },
  
  { id: 'deepseek-ai/deepseek-v4-pro', name: 'DeepSeek V4 Pro', provider: 'DeepSeek', backend: 'puter' },
  { id: 'deepseek-ai/deepseek-v4-flash', name: 'DeepSeek V3 Chat', provider: 'DeepSeek', backend: 'puter' },



  // --- DEEPSEEK MODELS (NVIDIA) ---
  { id: 'deepseek-ai/deepseek-v4-pro', name: 'DeepSeek V4 Pro', provider: 'DeepSeek', backend: 'nvidia' },
  { id: 'deepseek-ai/deepseek-v4-flash', name: 'DeepSeek V3 Chat', provider: 'DeepSeek', backend: 'nvidia' },
  { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning', name: 'Nvidia nemo-3-nano (Reasoning)', provider: 'Nvidia', backend: 'nvidia' },
  { id: 'minimax/minimax-m2.7', name: 'minimax-m2.7', provider: 'minimax', backend: 'nvidia' },
  { id: 'z-ai/glm-5.1', name: 'Nvidia GLM 5.1', provider: 'GLM', backend: 'nvidia' },
  
  // --- META LLAMA MODELS (NVIDIA) ---
  { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B', provider: 'Meta', backend: 'nvidia' },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', provider: 'Meta', backend: 'nvidia' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', provider: 'Meta', backend: 'nvidia' },
  { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', provider: 'Meta', backend: 'nvidia' },
];

export const defaultQuickModes: Mode[] = [
  { id: 'conversational', label: 'Chat', icon: 'MessageCircle', modelId: 'qwen/qwen-plus', suggestedModels: ['qwen/qwen-plus', 'claude-3-5-sonnet', 'z-ai/glm-5-turbo'], tooltip: 'General Chat' },
  { id: 'flash', label: 'Flash', icon: 'Zap', modelId: 'qwen/qwen3.6-flash', suggestedModels: ['qwen/qwen3.6-flash', 'z-ai/glm-4.7-flash', 'claude-3-haiku'], tooltip: 'Fast Responses' },
  { id: 'coding', label: 'Code', icon: 'Code2', modelId: 'qwen/qwen3-coder', suggestedModels: ['qwen/qwen3-coder', 'claude-sonnet-4-5', 'z-ai/glm-5.1'], tooltip: 'Coding & Debugging' },
  { id: 'max', label: 'Max', icon: 'Sparkles', modelId: 'qwen/qwen3.6-max-preview', suggestedModels: ['qwen/qwen3.6-max-preview', 'claude-opus-4-7', 'z-ai/glm-5.1'], tooltip: 'Max Capability' },
  { id: 'reasoning', label: 'Think', icon: 'Brain', modelId: 'qwen/qwen3-max-thinking', suggestedModels: ['qwen/qwen3-max-thinking', 'qwen/qwq-32b'], tooltip: 'Deep Reasoning' },
  { id: 'vision', label: 'Vision', icon: 'Eye', modelId: 'qwen/qwen3-vl-235b-a22b-instruct', suggestedModels: ['qwen/qwen3-vl-235b-a22b-instruct', 'z-ai/glm-5v-turbo'], tooltip: 'Image Analysis' },
  { id: 'image', label: 'Image', icon: 'Image', modelId: 'qwen/qwen-image', suggestedModels: ['qwen/qwen-image'], tooltip: 'Generate Images' }, 
];

export const getModelName = (id: string) => aiModels.find(m => m.id === id)?.name || id;