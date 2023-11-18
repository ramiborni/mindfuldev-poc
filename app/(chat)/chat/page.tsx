"use client";

import React, {useRef} from "react";
import {useChat} from "ai/react";
import clsx from "clsx";
import {BotIcon, LoadingCircle, SendIcon, UserIcon} from "@/components/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Textarea from "react-textarea-autosize";
import {toast} from "sonner";
import {useSearchParams} from "next/navigation";
import {chatPrompt} from "@/app/api/chat/prompt";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";


export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const searchParams = useSearchParams()
    const stressLevel = parseInt(searchParams.get('stress') || "0");


    const {messages, input, setInput, handleSubmit, isLoading} = useChat({
        onResponse: async (response) => {
            if (response.status === 429) {
                toast.error("You have reached your request limit for the day.");
                return;
            }
        },
        onFinish: async () => {
            const stressChecker = await axios.post(
                "/api/ai/conversation-stress",
                {
                    message: input
                }
            )
            const {isStressed} = stressChecker.data;

            if (isStressed) {
                const currentTimestamp = Math.floor(Date.now() / 1000)
                const saveStressLog = await axios.post(
                    "/api/users",
                    {
                        detectedByCodeStress: stressLevel > 50,
                        detectedByTextStress: isStressed,
                        detectedDate: currentTimestamp,
                    }
                )
            }
        },
        onError: (error) => {
            toast.error("An error occurred.");
        },
        initialMessages: [
            {
                id: "0",
                role: "system",
                content: chatPrompt
            },
            {
                id: "1",
                role: "assistant",
                content: stressLevel > 50 ? `Hi, I'm MindfulDev Assistant 😊. I'm here to help you out with your stress 😥, you may be suffering from anxiety at rate up to ${stressLevel}% according to our ai engine. You can tell me how are you feeling today?` :
                    "Hi, I'm MindfulDev Assistant 😊. I'm here to help you out with your stress, but i can help you with the coding too 💻 How can i help you today?\n You may tell me also how you feel today, and i will try to help you out with your stress?",
            }
        ]
    });


    const disabled = isLoading || input.length === 0;


    return (
        <main className="flex flex-col items-center justify-between pb-40">
            {messages.length > 0 ? (
                messages.slice(1, messages.length).map((message, i) => (
                    <div
                        key={i}
                        className={clsx(
                            "flex w-full items-center justify-center py-8",
                            message.role === "user" ? "bg-gray-600" : "bg-gray-700",
                        )}
                    >
                        <div className="flex w-full max-w-screen-md break-words items-start space-x-4 px-5 sm:px-0">
                            <div
                                className={clsx(
                                    "p-1.5 text-white",
                                    message.role === "assistant" ? "bg-green-500" : "bg-black",
                                )}
                            >
                                {message.role === "user" ? (
                                    <UserIcon className={clsx(
                                        "h-4 w-4",
                                        "text-white",
                                    )}/>
                                ) : (
                                    <BotIcon className={clsx(
                                        "h-4 w-4",
                                        "text-white",
                                    )}/>
                                )}
                            </div>
                            <ReactMarkdown
                                className="prose dark:prose-invert mt-1 max-w-screen-md w-full break-words prose-p:leading-relaxed"
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    // open links in new tab
                                    a: (props) => (
                                        <a {...props} target="_blank" rel="noopener noreferrer"/>
                                    ),
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))
            ) : (
                <div className="border-gray-200sm:mx-0 mx-5 mt-4 max-w-screen-md rounded-md border sm:w-full">
                    <div className="flex flex-col space-y-4 p-7 sm:p-10">
                        <h1 className="text-lg font-semibold text-foreground">
                            Welcome to MindfulDev Assistant!
                        </h1>
                        <p className="text-gray-500">
                            We think your stress is hitting {stressLevel}% 😥, so we&apos;re here to help you out 😊.
                        </p>
                    </div>

                </div>
            )}
            <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 p-5 pb-3 sm:px-0">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-background px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
                >
                    <Textarea
                        ref={inputRef}
                        tabIndex={0}
                        required
                        rows={1}
                        autoFocus
                        placeholder="Send a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                formRef.current?.requestSubmit();
                                e.preventDefault();
                            }
                        }}
                        spellCheck={false}
                        className="w-full pr-10 bg-background focus:outline-none"
                    />
                    <button
                        className={clsx(
                            "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
                            disabled
                                ? "cursor-not-allowed bg-white"
                                : "bg-green-500 hover:bg-green-600",
                        )}
                        disabled={disabled}
                    >
                        {isLoading ? (
                            <LoadingCircle/>
                        ) : (
                            <SendIcon
                                className={clsx(
                                    "h-4 w-4",
                                    input.length === 0 ? "text-gray-300" : "text-white",
                                )}
                            />
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}