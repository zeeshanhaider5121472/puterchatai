// export const QWEN_MODELS = [
//   "qwen/qwen3.6-max-preview",
//   "qwen/qwen3.6-plus",
//   "qwen/qwen3.6-flash",
//   "qwen/qwen3.6-27b",
//   "qwen/qwen3.6-35b-a3b",
//   "qwen/qwen3.5-plus-20260420",
//   "qwen/qwen3.5-9b",
//   "qwen/qwen3.5-122b-a10b",
//   "qwen/qwen3.5-27b",
//   "qwen/qwen3.5-35b-a3b",
//   "qwen/qwen3.5-flash-02-23",
//   "qwen/qwen3.5-397b-a17b",
//   "qwen/qwen3.5-plus-02-15",
//   "qwen/qwen3-max-thinking",
//   "qwen/qwen3-coder-next",
//   "qwen/qwen3-next-80b-a3b-instruct",
//   "qwen/qwen3-next-80b-a3b-thinking",
//   "qwen/qwen-plus-2025-07-28",
//   "qwen/qwen-plus-2025-07-28:thinking",
//   "qwen/qwen3-235b-a22b-2507",
//   "qwen/qwen3-235b-a22b-thinking-2507",
//   "qwen/qwen3-30b-a3b-instruct-2507",
//   "qwen/qwen3-30b-a3b-thinking-2507",
//   "qwen/qwen3-coder",
//   "qwen/qwen3-coder-30b-a3b-instruct",
//   "qwen/qwen3-coder-flash",
//   "qwen/qwen3-coder-plus",
//   "qwen/qwen3-vl-235b-a22b-instruct",
//   "qwen/qwen3-vl-235b-a22b-thinking",
//   "qwen/qwen3-vl-30b-a3b-instruct",
//   "qwen/qwen3-vl-30b-a3b-thinking",
//   "qwen/qwen3-vl-32b-instruct",
//   "qwen/qwen3-vl-8b-instruct",
//   "qwen/qwen3-vl-8b-thinking",
//   "qwen/qwen3-max",
//   "qwen/qwen3-14b",
//   "qwen/qwen3-235b-a22b",
//   "qwen/qwen3-30b-a3b",
//   "qwen/qwen3-32b",
//   "qwen/qwen3-8b",
//   "qwen/qwq-32b",
//   "qwen/qwen-max",
//   "qwen/qwen-plus",
//   "qwen/qwen-turbo",
//   "qwen/qwen-vl-max",
//   "qwen/qwen-vl-plus",
//   "qwen/qwen2.5-vl-72b-instruct",
//   "qwen/qwen-image",
//   "qwen/qwen-2.5-coder-32b-instruct",
//   "qwen/qwen-2.5-72b-instruct",
//   "qwen/qwen-2.5-7b-instruct",
// ];

// export interface ChatPreset {
//   id: string;
//   name: string;
//   icon: string;
//   model: string;
//   description: string;
// }

// export const PRESETS: ChatPreset[] = [
//   {
//     id: "reasoning",
//     name: "Complex Reasoning",
//     icon: "🧠",
//     model: "qwen/qwen3.6-max-preview",
//     description: "Uses Qwen3.6 Max Preview with streaming for deep reasoning.",
//   },
//   {
//     id: "coding",
//     name: "Coding",
//     icon: "💻",
//     model: "qwen/qwen3.6-max-preview",
//     description: "Write code using Qwen3.6 Max Preview via puter.ai.chat().",
//   },
//   {
//     id: "efficient",
//     name: "Efficient Chat",
//     icon: "⚡",
//     model: "qwen/qwen3.6-flash",
//     description: "Fast and efficient chat with Qwen3.6 Flash.",
//   },
//   {
//     id: "conversational",
//     name: "Conversational AI",
//     icon: "🗣️",
//     model: "qwen/qwen3.6-plus",
//     description: "Use Qwen3.6 Plus for natural conversational AI.",
//   },
//   {
//     id: "vision",
//     name: "Image Analysis",
//     icon: "👁️",
//     model: "qwen/qwen3-vl-235b-a22b-instruct",
//     description: "Analyze images with Qwen3 Vision model.",
//   },
// ];

// export interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export interface AppSettings {
//   model: string;
//   temperature: number;
//   maxTokens: number;
//   topP: number;
//   stream: boolean;
// }
