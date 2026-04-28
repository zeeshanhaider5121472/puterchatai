"use client";

import { useAppContext } from "@/context/AppContext";
import { Bot, Check, ChevronDown, Copy, Download, User } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export default function ChatArea() {
  const { messages, isTyping } = useAppContext();

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-0 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400 dark:text-zinc-600">
            <Bot size={48} strokeWidth={1} />
            <p className="mt-4 text-xl font-light">Start a conversation</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-4 items-start ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={18} className="text-zinc-600 dark:text-zinc-300" />
              </div>
            )}
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-br-sm px-5 py-3"
                  : "bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-bl-sm"
              }`}
            >
              {msg.role === "assistant" && msg.thinkingContent && (
                <ThinkingDropdown thinking={msg.thinkingContent} />
              )}

              {msg.imageUrl && (
                <div className="mb-2">
                  <ImageWithDownload src={msg.imageUrl} alt="Generated Image" />
                </div>
              )}

              {msg.role === "user" ? (
                <div className="whitespace-pre-wrap">{msg.textPreview}</div>
              ) : (
                <article className="prose dark:prose-invert prose-sm max-w-none px-5 py-3 prose-pre:bg-[#282c34] prose-pre:p-0 prose-pre:m-0 prose-p:mb-2 prose-headings:mb-2">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        const codeString = String(children).replace(/\n$/, "");

                        return !inline && match ? (
                          <CodeBlock language={match[1]} code={codeString} />
                        ) : (
                          <code
                            className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-purple-600 dark:text-purple-400 text-xs font-mono"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {typeof msg.textPreview === "string"
                      ? msg.textPreview
                      : JSON.stringify(msg.textPreview)}
                  </ReactMarkdown>
                </article>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-1">
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

// --- THINKING DROPDOWN COMPONENT ---
function ThinkingDropdown({ thinking }: { thinking: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-700 mb-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-t-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      >
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
        View Thought Process
      </button>
      {isOpen && (
        <div className="text-xs text-zinc-600 dark:text-zinc-400 p-3 pt-0 whitespace-pre-wrap overflow-auto max-h-60 border-t border-zinc-200 dark:border-zinc-700">
          {thinking}
        </div>
      )}
    </div>
  );
}

// --- IMAGE WITH DOWNLOAD BUTTON ---
function ImageWithDownload({ src, alt }: { src: string; alt: string }) {
  const handleDownload = async () => {
    try {
      // Fetch the image as a blob to force download instead of opening in new tab
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `galaxy-ai-image-${Date.now()}.png`; // Filename for the download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback for base64 if fetch fails due to CORS (unlikely with base64 but safe fallback)
      const link = document.createElement("a");
      link.href = src;
      link.download = `galaxy-ai-image-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden inline-block max-w-full">
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto max-h-80 object-cover rounded-lg transition-opacity group-hover:opacity-90"
      />
      {/* Overlay button that appears on hover */}
      <button
        onClick={handleDownload}
        className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 backdrop-blur-sm shadow-lg"
        title="Download Image"
      >
        <Download size={18} />
      </button>
    </div>
  );
}

// --- CODE BLOCK COMPONENT WITH COPY BUTTON ---
function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden my-4 border border-zinc-700 bg-zinc-700">
      <div className="flex items-center justify-between bg-[#21252b] px-4 py-2 border-b border-zinc-700">
        <span className="text-xs text-zinc-400 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.85rem",
          background: "#282c34",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
