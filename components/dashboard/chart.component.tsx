"use client"

import {Card, CardBody} from "@nextui-org/card";
import {title} from "../primitives";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {useEffect, useState} from "react";
import axios from "axios";
import User, {IStressLog, IUser} from "@/models/userModel";
import {Line} from "react-chartjs-2";
import {chartDate} from "@/helpers/getDate.helper";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const labels = chartDate();

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};


const StressChart = () => {

    const [user, setUser] = useState<IUser | undefined>();

    const [stressData, setStressData] = useState(
        {
            labels,
            datasets: [
                {
                    label: 'Stress',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],

        }
    );

    function calculateStressByDay(stressLogs: IStressLog[]): number[] {
        const stressByDay: number[] = [];
        const currentDate = new Date();

        for (let i = 0; i <= 30; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);

            const formattedDate = date.toISOString().substr(0, 10);

            const logsForDay = stressLogs.filter(
                (log) => new Date(log.detectedDate * 1000).toISOString().substr(0, 10) === formattedDate
            );

            const totalStressForDay = logsForDay.reduce(
                (total, log) => total + (log.detectedByCodeStress && log.detectedByTextStress ? 1 : 0),
                0
            );

            stressByDay.push(totalStressForDay);
        }

        return stressByDay.reverse(); // Reverse the array to have the oldest first, newest last
    }


    useEffect(() => {
        const fetchStressLogs = async () => {
            const response = await axios.get(
                "/api/users/"
            )
            setUser(response.data);
            setStressData({
                ...stressData,
                datasets: [
                    {
                        ...stressData.datasets[0],
                        data: calculateStressByDay(response.data[0].stressLog)
                    }
                ]
            });

        }
        fetchStressLogs();
    }, []);


    return (
        <Card>
            <CardBody className="flex flex-col gap-y-4">
                <p className={title({
                    size: "sm",
                })}>
                    Stress Chart
                </p>

                <Line data={stressData} options={options}/>

            </CardBody>
        </Card>
    )
}

export default StressChart