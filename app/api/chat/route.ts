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
            - Startups can get listed for free; optional verification seal has a one-time fee.
            - Sponsorship: Trial (₹49/day), Weekly (₹199), Monthly (₹499). Benefits include Top 10 placement, daily social media posts.
            - Verification process: 4-7 business days, checks incorporation, founder identity, traction.
            - The registry is trusted by investors, founders, and partners.
            Answer concisely (under 100 words), professionally, and always guide users to the right resource (apply, sponsor, etc.).`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 150,
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
