'use client';

import { EXAMPLE_PROMPTS } from '@/lib/masterPrompt';

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export function ExamplePrompts({ onSelect, disabled }: ExamplePromptsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-foreground-secondary font-mono uppercase tracking-wider">
        <span className="text-accent">&gt;&gt;</span> Quick Load
      </h3>

      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-bold text-accent mb-2 uppercase tracking-widest font-mono">
            [Coding]
          </h4>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.coding.map((example) => (
              <button
                key={example.title}
                onClick={() => onSelect(example.prompt)}
                disabled={disabled}
                className="px-3 py-1.5 text-xs font-mono uppercase bg-background-secondary border border-border hover:border-accent hover:bg-background-tertiary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ borderRadius: 0 }}
                title={example.description}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-accent mb-2 uppercase tracking-widest font-mono">
            [Writing]
          </h4>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.writing.map((example) => (
              <button
                key={example.title}
                onClick={() => onSelect(example.prompt)}
                disabled={disabled}
                className="px-3 py-1.5 text-xs font-mono uppercase bg-background-secondary border border-border hover:border-accent hover:bg-background-tertiary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ borderRadius: 0 }}
                title={example.description}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
