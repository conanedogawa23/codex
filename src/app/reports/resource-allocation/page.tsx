"use client"

import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { ResourceAllocationReport } from "./resource-allocation-report";

const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Reports", href: "/reports" },
    { label: "Resource Allocation", href: "/reports/resource-allocation", isCurrent: true },
]

export default function ResourceAllocationPage() {
    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <ResourceAllocationReport />
        </SidebarLayout>
    )
}
