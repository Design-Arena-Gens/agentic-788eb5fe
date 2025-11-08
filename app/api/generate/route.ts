import { NextResponse } from "next/server";
import { generateAgentResponse, type AgentRequest } from "@/lib/agent";

const requiredFields: (keyof AgentRequest)[] = ["topic", "goal", "audience", "tone", "offer", "platform"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AgentRequest>;

    for (const field of requiredFields) {
      if (!body[field] || typeof body[field] !== "string") {
        return NextResponse.json(
          { error: `Missing or invalid field: ${field}` },
          { status: 400 }
        );
      }
    }

    const response = generateAgentResponse(body as AgentRequest);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Agent generation failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
