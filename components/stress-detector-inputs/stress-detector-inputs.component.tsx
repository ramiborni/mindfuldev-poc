"use client";
import {title} from "@/components/primitives";
import {Input} from "@nextui-org/input";
import React, {Dispatch, SetStateAction, useState} from "react";
import {ClockIcon, CodeBracketSquareIcon, ExclamationCircleIcon, PauseCircleIcon} from "@heroicons/react/24/solid";
import {IDetectStress} from "@/interfaces/detect-stress.interface";
import {Button} from "@nextui-org/button";
import axios from "axios";

interface StressDetectorInputsProps {
    setStressLevel: Dispatch<SetStateAction<number>>
}

const StressDetectorInputs = ({
                                  setStressLevel
                              }: StressDetectorInputsProps) => {
    const [formFields, setFormFields] = useState<IDetectStress>({
        codeLines: 0,
        errors: 0,
        breaks: 0,
        codingDuration: 0,
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: parseInt(value)});
    }
    const detectStress = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "/api/ai/stress",
                formFields
            )
            console.log(response.data);
            setStressLevel(response.data.stressPercentage);

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-y-8">
            <h1 className={title()}>
                Stress Detector
            </h1>
            <form onSubmit={detectStress} className="flex flex-col gap-y-4">
                <Input
                    name="codeLines"
                    label="Lines of code"
                    startContent={
                        <CodeBracketSquareIcon className="h-5 w-5"/>
                    }
                    onChange={handleChange}
                    placeholder="Write number lines of code"
                    type="number"
                    required
                />
                <Input
                    name="errors"
                    label="Number of errors"
                    startContent={
                        <ExclamationCircleIcon className="h-5 w-5"/>
                    }
                    onChange={handleChange}
                    placeholder="Write number of errors"
                    required
                />
                <Input
                    name="breaks"
                    label="Number of breaks"
                    type="number"
                    startContent={
                        <PauseCircleIcon className="h-5 w-5"/>
                    }
                    onChange={handleChange}
                    placeholder="Write number of breaks"
                    required
                />
                <Input
                    name="codingDuration"
                    label="Coding duration"
                    type="number"
                    startContent={
                        <ClockIcon className="h-5 w-5"/>
                    }
                    onChange={handleChange}
                    placeholder="Write time in minutes"
                    required
                />
                <div className="flex flex-row justify-end">
                    <Button variant="shadow" color="primary" type="submit" isLoading={loading}>
                        Detect stress
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default StressDetectorInputs;