import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.HUGGING_FACE_API_URL);

export async function POST(req: NextRequest) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400, headers }
      );
    }

    let out = "";

    const stream = client.chatCompletionStream({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      messages: [{ role: "user", content: message }],
      max_tokens: 500,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent;
      }
    }

    return NextResponse.json({ generated_text: out }, { headers });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Server error occurred." },
      { status: 500, headers }
    );
  }
}
