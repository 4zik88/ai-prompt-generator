'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PromptOutputProps {
  content: string;
  isLoading?: boolean;
}

export function PromptOutput({ content, isLoading }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  const handleDownload = (format: 'txt' | 'md') => {
    const mimeType = format === 'md' ? 'text/markdown' : 'text/plain';
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-prompt.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!content && !isLoading) {
    return (
      <div className="p-8 border-2 border-dashed border-border bg-background-secondary/50 text-center" style={{ borderRadius: 0 }}>
        <div className="text-foreground-tertiary font-mono">
          <div className="mb-4 text-4xl text-accent opacity-50">
            &gt;_
          </div>
          <p className="text-sm uppercase tracking-wider">
            [AWAITING OUTPUT...]
          </p>
          <p className="text-xs mt-2 text-foreground-tertiary">
            Your generated prompt will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative border-2 border-border bg-background-secondary overflow-hidden border-glow" style={{ borderRadius: 0 }}>
      {/* Terminal-style header bar */}
      <div className="absolute top-0 left-0 right-0 bg-background-tertiary border-b-2 border-border px-4 py-2 flex items-center justify-between">
        <div className="text-xs font-mono text-accent uppercase tracking-wider">
          [OUTPUT]
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={isLoading || !content}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase bg-background border border-border hover:border-accent transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Copy to clipboard"
            style={{ borderRadius: 0 }}
          >
            {copied ? (
              <>
                <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>[OK]</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>

          <div className="flex items-center border border-border overflow-hidden" style={{ borderRadius: 0 }}>
            <button
              onClick={() => handleDownload('md')}
              disabled={isLoading || !content}
              className="px-2.5 py-1 text-xs font-mono uppercase bg-background hover:bg-background-tertiary transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed border-r border-border"
              aria-label="Download as Markdown"
            >
              .md
            </button>
            <button
              onClick={() => handleDownload('txt')}
              disabled={isLoading || !content}
              className="px-2.5 py-1 text-xs font-mono uppercase bg-background hover:bg-background-tertiary transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Download as text"
            >
              .txt
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-14 min-h-[200px] font-mono">
        {isLoading && !content ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <span className="cursor-blink">&gt;</span>
              <div className="h-4 bg-accent/20 w-3/4 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <span className="cursor-blink">&gt;</span>
              <div className="h-4 bg-accent/20 w-full animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <span className="cursor-blink">&gt;</span>
              <div className="h-4 bg-accent/20 w-5/6 animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="prose-output">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
            {isLoading && (
              <span className="inline-block w-2 h-5 bg-accent cursor-blink ml-0.5" style={{ borderRadius: 0 }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
