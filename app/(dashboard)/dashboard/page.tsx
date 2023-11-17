import StressChart from "@/components/dashboard/chart.component";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 gap-x-8">
            <StressChart/>
        </div>
    )
}