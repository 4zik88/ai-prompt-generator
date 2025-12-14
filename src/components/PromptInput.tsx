'use client';

import { useRef, useEffect } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = "Describe what you want your AI agent to do...",
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSubmit();
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 400)}px`;
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="relative border-glow">
        <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-mono text-accent uppercase tracking-wider">
          [INPUT]
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          aria-label="Agent description"
          className="w-full min-h-[160px] p-4 bg-background border-2 border-border hover:border-border-hover focus:border-accent transition-all duration-200 resize-none text-base leading-relaxed placeholder:text-foreground-tertiary disabled:opacity-50 disabled:cursor-not-allowed outline-none font-mono"
          style={{ borderRadius: 0 }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-foreground-tertiary font-mono">
        <span className="text-accent">[{value.length} chars]</span>
        <span className="hidden sm:inline">
          Press <kbd className="px-1.5 py-0.5 bg-background-tertiary border border-border font-mono text-xs">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-background-tertiary border border-border font-mono text-xs">Enter</kbd> to execute
        </span>
      </div>
    </div>
  );
}
