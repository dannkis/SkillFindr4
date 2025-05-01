import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { messages } = body;

  try {
    const response = await fetch(process.env.OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL,
        messages,
        stream: false,
      }),
    });

    const data = await response.json();
    const reply = data?.message?.content?.trim() || 'No response.';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Ollama error:', err);
    return NextResponse.json(
      { reply: 'Ollama server error.' },
      { status: 500 }
    );
  }
}
