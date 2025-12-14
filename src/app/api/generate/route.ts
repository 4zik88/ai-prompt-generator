import { genAI, MODEL_ID, generationConfig } from '@/lib/gemini';
import { MASTER_PROMPT } from '@/lib/masterPrompt';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fullPrompt = MASTER_PROMPT + prompt;

    const response = await genAI.models.generateContentStream({
      model: MODEL_ID,
      contents: fullPrompt,
      config: generationConfig,
    });

    // Create a readable stream from the Gemini response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate prompt' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
