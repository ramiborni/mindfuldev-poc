import { NextResponse } from "next/server";
import OpenAI from 'openai';
import {stressDetectPrompt} from "@/app/api/ai/prompt";

export async function POST(request: Request){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || ""
    });
    const stressDetectResult = await openai.chat.completions.create(
        {
            messages: [
                {
                    role: "system",
                    content: stressDetectPrompt
                },
                {
                    role: "user",
                    content: JSON.stringify(await request.json())
                }
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: {
                type: "json_object"
            }
        }
    )

    return NextResponse.json(JSON.parse(stressDetectResult.choices[0].message.content || ""));
}