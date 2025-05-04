import type React from "react"
import {Sidebar} from "@/features/workflow/WorkflowSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 flex flex-col">{children}</main>
            </div>
        </div>
    )
}
