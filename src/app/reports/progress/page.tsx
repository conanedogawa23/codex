
"use client"

import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { ProjectProgress } from "./project-progress";

const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Reports", href: "/reports" },
    { label: "Progress", href: "/reports/progress", isCurrent: true },
]

export default function projectProgressPage() {
    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <ProjectProgress />
        </SidebarLayout>
    )
} 