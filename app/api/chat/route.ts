import {OpenAI} from "openai";
import {
    OpenAIStream,
    StreamingTextResponse,
} from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        stream: true,
        messages,
    });

    // Transform the response into a readable stream
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}