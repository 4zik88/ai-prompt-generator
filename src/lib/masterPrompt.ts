export const MASTER_PROMPT = `You are an expert prompt engineer specializing in creating concise, effective prompts for AI agents. Your task is to transform user descriptions into well-structured agent prompts.

## Guidelines

1. **Be Concise**: Generate the shortest possible prompt that captures all requirements. Avoid unnecessary words.

2. **Structure**: Use this format:
   - **Role**: One sentence defining the agent's identity
   - **Task**: Clear, specific instructions (2-4 sentences max)
   - **Constraints**: Key limitations or rules (bullet points)
   - **Output Format**: Expected response structure (if applicable)

3. **Quality Principles**:
   - Use imperative mood ("Analyze...", "Generate...", "Review...")
   - Be specific, not vague ("Check for SQL injection" not "Check for security issues")
   - Include success criteria when relevant
   - Avoid meta-instructions about being an AI

4. **Keep It Short**:
   - Total prompt should be under 300 words
   - Prefer bullet points over paragraphs
   - Remove filler words and redundancies

## Output Format

Return ONLY the generated prompt in markdown format. Do not include explanations, commentary, or meta-text about the prompt itself. The output should be ready to copy and use directly.

---

User Request:
`;

export const EXAMPLE_PROMPTS = {
  coding: [
    {
      title: "React TypeScript Migration",
      description: "Convert React components to TypeScript with strict mode",
      prompt: "I need an agent that converts JavaScript React components to TypeScript with strict mode enabled, adding proper type annotations and interfaces"
    },
    {
      title: "Code Review Agent",
      description: "Review code for security vulnerabilities",
      prompt: "An agent that reviews code for security vulnerabilities like SQL injection, XSS, and authentication issues, providing specific fix suggestions"
    },
    {
      title: "Unit Test Generator",
      description: "Generate comprehensive unit tests",
      prompt: "An agent that generates unit tests for functions, covering edge cases, error handling, and achieving high code coverage"
    },
    {
      title: "Refactoring Assistant",
      description: "Refactor class components to hooks",
      prompt: "An agent that refactors React class components to functional components with hooks while preserving all functionality"
    }
  ],
  writing: [
    {
      title: "Meeting Notes Processor",
      description: "Convert meeting notes to action items",
      prompt: "An agent that converts raw meeting notes into structured summaries with action items, owners, and deadlines"
    },
    {
      title: "Documentation Writer",
      description: "Generate technical docs from code",
      prompt: "An agent that generates clear technical documentation from code comments and function signatures, following standard formats"
    },
    {
      title: "Email Drafter",
      description: "Draft professional emails from bullet points",
      prompt: "An agent that transforms bullet points into professional emails with appropriate tone, maintaining clarity and brevity"
    },
    {
      title: "Blog Outline Creator",
      description: "Create blog post outlines from topics",
      prompt: "An agent that creates detailed blog post outlines from topic keywords, including introduction hooks, main sections, and conclusion"
    }
  ]
};
