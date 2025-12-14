# Agent Prompt Creator

A web service that generates optimized prompts for AI agents using Google Gemini. Describe your agent needs in plain language, and get well-structured, production-ready prompts.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-4285F4)

## Features

- **Intelligent Prompt Generation** - Transform natural language descriptions into structured AI agent prompts
- **Real-time Streaming** - Watch prompts generate live with streaming responses
- **Example Library** - Pre-built prompts for coding and writing tasks to learn from
- **Export Options** - Copy to clipboard or download as `.md` / `.txt`
- **Dark/Light Theme** - Cyberpunk-inspired design with theme toggle
- **Keyboard Shortcuts** - `Cmd/Ctrl + Enter` to generate

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Google Gemini API (gemini-2.5-flash) |
| Markdown | react-markdown + remark-gfm |

## Getting Started

### Prerequisites

- Node.js 18+
- Google Gemini API key ([Get one free](https://ai.google.dev))

### Installation

```bash
# Install dependencies
npm install
```

### Environment Setup

Create `.env.local` in the project root:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/generate/route.ts   # Streaming Gemini API endpoint
│   ├── page.tsx                # Main page component
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Theme & global styles
├── components/
│   ├── PromptInput.tsx         # Auto-resize textarea input
│   ├── PromptOutput.tsx        # Markdown output with actions
│   ├── ExamplePrompts.tsx      # Clickable example chips
│   ├── ThemeToggle.tsx         # Dark/light mode switch
│   └── Providers.tsx           # Theme context provider
├── lib/
│   ├── gemini.ts               # Gemini client configuration
│   └── masterPrompt.ts         # System prompt & examples
└── hooks/
    └── useTheme.tsx            # Theme state management
```

## Commands

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run start     # Run production server
npm run lint      # Run ESLint
```

## How It Works

1. **User Input** - Describe your agent needs in plain language
2. **Master Prompt** - Your description is enhanced with prompt engineering best practices
3. **Streaming Generation** - Gemini processes and streams the response
4. **Structured Output** - Receive a well-formatted prompt with Role, Task, Constraints, and Output sections

## Example Prompts

**Coding:**
- React TypeScript Migration Assistant
- Code Review Security Agent
- Unit Test Generator
- Refactoring Assistant

**Writing:**
- Meeting Notes Processor
- Documentation Writer
- Email Drafter
- Blog Outline Creator

## Deployment

Compatible with:
- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- Docker
- Any Node.js hosting

Set the `GOOGLE_GEMINI_API_KEY` environment variable in your deployment platform.

## License

MIT
