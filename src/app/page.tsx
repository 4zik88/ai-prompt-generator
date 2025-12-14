'use client';

import { useState, useCallback, useRef } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PromptInput } from '@/components/PromptInput';
import { PromptOutput } from '@/components/PromptOutput';
import { ExamplePrompts } from '@/components/ExamplePrompts';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AbortController ref for canceling in-flight requests
  const abortControllerRef = useRef<AbortController | null>(null);
  // Ref for accumulating streamed output to reduce re-renders
  const outputRef = useRef('');

  const handleGenerate = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    // Cancel any in-flight request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setOutput('');
    outputRef.current = '';
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate prompt');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        outputRef.current += chunk;
        setOutput(outputRef.current);
      }
    } catch (err) {
      // Don't show error for aborted requests
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleExampleSelect = (prompt: string) => {
    setInput(prompt);
    setOutput('');
    setError(null);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-glow-cyan uppercase">
              <span className="inline-block">&gt;_</span> Agent Prompt Creator
            </h1>
            <p className="text-foreground-secondary text-base md:text-lg font-mono">
              <span className="text-accent">{'//'} </span>Transform your ideas into optimized prompts for AI agents
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Input Section */}
        <section className="space-y-4">
          <PromptInput
            value={input}
            onChange={setInput}
            onSubmit={handleGenerate}
            disabled={isLoading}
          />

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <ExamplePrompts
              onSelect={handleExampleSelect}
              disabled={isLoading}
            />

            <button
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="w-full sm:w-auto px-6 py-2.5 font-bold uppercase tracking-wider bg-accent text-accent-foreground hover:bg-accent-hover active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background border-2 border-accent"
              style={{ borderRadius: 0 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  [EXECUTING...]
                </span>
              ) : (
                '[EXECUTE] Generate Prompt'
              )}
            </button>
          </div>
        </section>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-error/10 border-2 border-error text-error font-mono" style={{ borderRadius: 0 }}>
            <p className="text-sm font-bold">
              <span className="text-glow">[ERROR]</span> {error}
            </p>
          </div>
        )}

        {/* Output Section */}
        <section>
          <PromptOutput content={output} isLoading={isLoading} />
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-border text-center text-sm text-foreground-tertiary font-mono">
          <p>
            <span className="text-accent">&lt;/&gt;</span> Powered by{' '}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-glow transition-all"
            >
              Google Gemini
            </a>
            {' '}<span className="text-accent">&lt;/&gt;</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
