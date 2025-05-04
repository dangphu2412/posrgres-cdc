"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, LayoutDashboard, PanelLeft, Workflow, FileCode } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const [workflowsOpen, setWorkflowsOpen] = useState(true)

    // Sample workflow items
    const workflows = [
        { id: 1, name: "Data Processing" },
        { id: 2, name: "Content Approval" },
        { id: 3, name: "User Onboarding" },
        { id: 4, name: "Email Campaign" },
    ]

    return (
        <div
            className={cn(
                "h-screen border-r bg-gray-50/40 transition-all duration-300 overflow-y-auto",
                collapsed ? "w-16" : "w-64",
            )}
        >
            <div className="flex h-16 items-center justify-between px-4 border-b">
                {!collapsed && (
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="font-semibold">Dashboard</span>
                    </Link>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn("ml-auto", collapsed && "mx-auto")}
                >
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
            </div>

            <div className="px-3 py-4">
                {/* Workflows Section */}
                <Collapsible
                    open={workflowsOpen && !collapsed}
                    onOpenChange={collapsed ? undefined : setWorkflowsOpen}
                    className="space-y-2"
                >
                    <CollapsibleTrigger asChild disabled={collapsed}>
                        <button
                            className={cn(
                                "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100",
                                collapsed && "justify-center",
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <Workflow className="h-5 w-5" />
                                {!collapsed && <span>Workflows</span>}
                            </div>
                            {!collapsed && (
                                <ChevronDown className={cn("h-4 w-4 transition-transform", workflowsOpen ? "rotate-180" : "")} />
                            )}
                        </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 pl-6">
                        {workflows.map((workflow) => (
                            <Link
                                key={workflow.id}
                                href={`/dashboard/workflows/${workflow.id}`}
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                            >
                                <ChevronRight className="h-4 w-4" />
                                <span>{workflow.name}</span>
                            </Link>
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                {/* Templates Section (Future Development) */}
                <div
                    className={cn(
                        "mt-4 flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100",
                        collapsed && "justify-center",
                    )}
                >
                    <div className="flex items-center gap-2">
                        <FileCode className="h-5 w-5" />
                        {!collapsed && <span>Templates</span>}
                    </div>
                    {!collapsed && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Soon</span>}
                </div>
            </div>
        </div>
    )
}
