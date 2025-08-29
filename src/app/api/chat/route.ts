import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { openai } from "@/lib/openai";
import { z } from "zod";

export const runtime = "nodejs"; // Prisma requires Node runtime 

const ParsedAISchema = z.object({ 
  reply: z.string(),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  keywords: z.array(z.string()).default([]),
  actions: z
    .array(z.object({ type: z.string(), value: z.string().optional() }))
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();

    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json({ error: "userInput is required" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Always reply ONLY with minified JSON in this exact shape: " +
            `{"reply": string, "sentiment": "positive"|"neutral"|"negative", "keywords": string[], "actions"?: [{"type": string, "value"?: string}]}.` +
            " No extra text. No markdown. No explanations.",
        },
        { role: "user", content: userInput },
      ],
      temperature: 0.3,
    });

    const raw = completion.choices?.[0]?.message?.content?.trim() ?? "{}";

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { reply: raw, sentiment: "neutral", keywords: [] };
    }

    const aiJson = ParsedAISchema.parse(parsed);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _saved = await prisma.chatRecord.create({
      data: {
        userInput,
        aiJson,
        model: completion.model,
      },
    });

    //  return only reply (frontend expects this)
    return NextResponse.json({ reply: aiJson.reply }, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  // list last 20 for debugging / demo
  const rows = await prisma.chatRecord.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json(rows);
}
