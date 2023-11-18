import { NextResponse } from "next/server";
import OpenAI from 'openai';
import {stressDetectFromConversationPrompt, stressDetectPrompt} from "@/app/api/ai/prompt";

export async function POST(request: Request){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || ""
    });

    const body = await request.json();

    const stressDetectResult = await openai.chat.completions.create(
        {
            messages: [
                {
                    role: "system",
                    content: stressDetectFromConversationPrompt
                },
                {
                    role: "user",
                    content: body.message
                }
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: {
                type: "json_object"
            }
        }
    )

    const isStressed : boolean = JSON.parse(stressDetectResult.choices[0].message.content!).isStressed

    return NextResponse.json({
        isStressed
    });
}