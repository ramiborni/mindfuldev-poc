import React from "react";
import {Card, CardBody} from "@nextui-org/card";

interface ChatProps {
    stressLevel: number;

}

const Chat = ({stressLevel}: ChatProps) => {

    return (
        <Card>
            <CardBody className="p-0">
                <embed
                    className="min-h-full min-w-full p-0 rounded-xl overflow-hidden" src={`/chat?stress=${stressLevel}`}

                />
            </CardBody>
        </Card>
    )
}

export default Chat;