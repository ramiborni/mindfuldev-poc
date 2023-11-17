"use client"
import {title} from "@/components/primitives";
import StressDetectorInputs from "@/components/stress-detector-inputs/stress-detector-inputs.component";
import {useState} from "react";
import Chat from "@/components/chat/chat.component";


export default function Home() {
    const [stressLevel, setStressLevel] = useState(0);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StressDetectorInputs setStressLevel={setStressLevel}/>
            {
                stressLevel>0 ? <Chat stressLevel={stressLevel}/> : <></>
            }
        </div>
    );
}
