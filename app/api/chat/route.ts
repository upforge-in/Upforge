import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    }

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
            content: `You are the UpForge Concierge, an elite AI for India's premier startup registry. 
            You know everything about UpForge:
            - UpForge is an independent founder registry documenting verified Indian startups.
            - Free listing; optional verification seal (one-time fee).
            - Sponsorship: Trial ₹49/day, Weekly ₹199, Monthly ₹499. Benefits: Top 10 placement, daily social posts.
            - Verification: 4-7 days, checks incorporation, founder identity, traction.
            - Trusted by investors, founders, partners.
            Always answer concisely: 10-20 words if possible, never exceed 100 words. Be human-like, friendly, and helpful.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 100, // reduced to enforce brevity
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Groq API error" },
        { status: response.status }
      );
    }

    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to fetch from Groq" }, { status: 500 });
  }
}
