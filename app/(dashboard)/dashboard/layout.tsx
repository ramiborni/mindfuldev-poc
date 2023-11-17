import {Navbar} from "@/components/navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({
                                       children
                                   }: DashboardLayoutProps) {
    return (
        <main className="relative flex flex-col h-screen">
            <Navbar/>
            <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
            </div>
        </main>
    )
}