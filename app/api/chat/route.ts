import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are the UpForge Concierge, an AI for India's premier startup registry. You are professional, elite, and high-trust. Guide users on verified startups, sponsorship, and registry criteria. Keep responses concise."
          },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from Groq" }, { status: 500 });
  }
}
