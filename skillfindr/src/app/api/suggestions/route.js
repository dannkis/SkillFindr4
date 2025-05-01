import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { messages } = body;
  const lastMessage = messages[messages.length - 1]?.content || '';
  const suggestionPrompt = `You are a helpful assistant. Based on this chatbot message:
"${lastMessage}"

Suggest 1 to 4 very short follow-up tags a user might click on next.
Respond ONLY with a JSON array of 1 to 4 strings, where each string can have numbers, text, and emojis (cannot be just emojis).`;
  try {
    const response = await fetch(process.env.OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL,
        messages: [{ role: 'user', content: suggestionPrompt }],
        stream: false,
      }),
    });

    const data = await response.json();
    const text = data?.message?.content?.trim() || '[]';

    let tags = [];
    try {
      tags = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse suggestion tags:', text);
    }

    return NextResponse.json({ tags });
  } catch (err) {
    console.error('Ollama error:', err);
    return NextResponse.json({ tags: [] }, { status: 500 });
  }
}
