export interface Model {
  id: string;
  name: string;
  provider: string;
  isImageGen?: boolean; // New flag for image generation models
}

export interface Mode {
  id: string;
  label: string;
  icon: string;
  modelId: string;
  tooltip: string;
  suggestedModels?: string[]; // Suggested models for quick modes
}

export const aiModels: Model[] = [
  // --- QWEN MODELS ---
  { id: 'qwen/qwen3.6-max-preview', name: 'Qwen 3.6 Max Preview', provider: 'Qwen' },
  { id: 'qwen/qwen3.6-plus', name: 'Qwen 3.6 Plus', provider: 'Qwen' },
  { id: 'qwen/qwen3.6-flash', name: 'Qwen 3.6 Flash', provider: 'Qwen' },
  { id: 'qwen/qwen3.6-27b', name: 'Qwen 3.6 27B', provider: 'Qwen' },
  { id: 'qwen/qwen3.6-35b-a3b', name: 'Qwen 3.6 35B A3B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-plus-20260420', name: 'Qwen 3.5 Plus (Apr)', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-9b', name: 'Qwen 3.5 9B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-122b-a10b', name: 'Qwen 3.5 122B A10B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-27b', name: 'Qwen 3.5 27B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-35b-a3b', name: 'Qwen 3.5 35B A3B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-flash-02-23', name: 'Qwen 3.5 Flash', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-397b-a17b', name: 'Qwen 3.5 397B A17B', provider: 'Qwen' },
  { id: 'qwen/qwen3.5-plus-02-15', name: 'Qwen 3.5 Plus (Feb)', provider: 'Qwen' },
  { id: 'qwen/qwen3-max-thinking', name: 'Qwen 3 Max Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder-next', name: 'Qwen 3 Coder Next', provider: 'Qwen' },
  { id: 'qwen/qwen3-next-80b-a3b-instruct', name: 'Qwen 3 Next 80B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-next-80b-a3b-thinking', name: 'Qwen 3 Next 80B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen-plus-2025-07-28', name: 'Qwen Plus (Jul 2025)', provider: 'Qwen' },
  { id: 'qwen/qwen-plus-2025-07-28:thinking', name: 'Qwen Plus Thinking (Jul)', provider: 'Qwen' },
  { id: 'qwen/qwen3-235b-a22b-2507', name: 'Qwen 3 235B', provider: 'Qwen' },
  { id: 'qwen/qwen3-235b-a22b-thinking-2507', name: 'Qwen 3 235B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-30b-a3b-instruct-2507', name: 'Qwen 3 30B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-30b-a3b-thinking-2507', name: 'Qwen 3 30B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder', name: 'Qwen 3 Coder', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder-30b-a3b-instruct', name: 'Qwen 3 Coder 30B', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder-flash', name: 'Qwen 3 Coder Flash', provider: 'Qwen' },
  { id: 'qwen/qwen3-coder-plus', name: 'Qwen 3 Coder Plus', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-235b-a22b-instruct', name: 'Qwen 3 VL 235B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-235b-a22b-thinking', name: 'Qwen 3 VL 235B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-30b-a3b-instruct', name: 'Qwen 3 VL 30B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-30b-a3b-thinking', name: 'Qwen 3 VL 30B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-32b-instruct', name: 'Qwen 3 VL 32B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-8b-instruct', name: 'Qwen 3 VL 8B Instruct', provider: 'Qwen' },
  { id: 'qwen/qwen3-vl-8b-thinking', name: 'Qwen 3 VL 8B Thinking', provider: 'Qwen' },
  { id: 'qwen/qwen3-max', name: 'Qwen 3 Max', provider: 'Qwen' },
  { id: 'qwen/qwen3-14b', name: 'Qwen 3 14B', provider: 'Qwen' },
  { id: 'qwen/qwen3-32b', name: 'Qwen 3 32B', provider: 'Qwen' },
  { id: 'qwen/qwen3-8b', name: 'Qwen 3 8B', provider: 'Qwen' },
  { id: 'qwen/qwq-32b', name: 'Qwen QWQ 32B', provider: 'Qwen' },
  { id: 'qwen/qwen-max', name: 'Qwen Max', provider: 'Qwen' },
  { id: 'qwen/qwen-plus', name: 'Qwen Plus', provider: 'Qwen' },
  { id: 'qwen/qwen-turbo', name: 'Qwen Turbo', provider: 'Qwen' },
  { id: 'qwen/qwen-vl-max', name: 'Qwen VL Max', provider: 'Qwen' },
  { id: 'qwen/qwen-vl-plus', name: 'Qwen VL Plus', provider: 'Qwen' },
  { id: 'qwen/qwen2.5-vl-72b-instruct', name: 'Qwen 2.5 VL 72B', provider: 'Qwen' },
  { id: 'qwen/qwen-image', name: 'Qwen Image Generator', provider: 'Qwen', isImageGen: true }, // Image Gen
  { id: 'qwen/qwen-2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder 32B', provider: 'Qwen' },
  { id: 'qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', provider: 'Qwen' },
  { id: 'qwen/qwen-2.5-7b-instruct', name: 'Qwen 2.5 7B', provider: 'Qwen' },

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

  // --- CLAUDE MODELS ---
  { id: 'claude-opus-4-7', name: 'Claude Opus 4.7', provider: 'Claude' },
  { id: 'claude-opus-4.6-fast', name: 'Claude Opus 4.6 Fast', provider: 'Claude' },
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Claude' },
  { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', provider: 'Claude' },
  { id: 'claude-opus-4-5', name: 'Claude Opus 4.5', provider: 'Claude' },
  { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', provider: 'Claude' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', provider: 'Claude' },
  { id: 'claude-opus-4-1', name: 'Claude Opus 4.1', provider: 'Claude' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Claude' },
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Claude' },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Claude' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Claude' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Claude' },
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

// Helper to get model name easily
export const getModelName = (id: string) => aiModels.find(m => m.id === id)?.name || id;