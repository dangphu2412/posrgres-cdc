"use client";
import {useSession} from "next-auth/react";
import {WorkflowHeader} from "@/features/workflow/WorkflowHeader";

export default function WorkflowPage() {
    const {status} = useSession();

    if (status === "unauthenticated") {
        return <>Please login to access this page</>
    }

    return <>
        <WorkflowHeader />
        <div className="flex-1 p-6">
            <div className="h-full w-full rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                <p className="text-muted-foreground">Blank canvas area for future development</p>
            </div>
        </div>
    </>
}
