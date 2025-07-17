"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Breadcrumb } from "@/components/ui/breadcrumbs"
import { Badge } from "@/components/ui/badge"

// Define risk status types for styling
type RiskStatus = "Open" | "Mitigated" | "Resolved"
type SeverityLevel = "High" | "Medium" | "Low" | "Critical"

// Generate mock data for the risk assessment report
const generateRiskData = () => {
    const riskStatuses: RiskStatus[] = ["Open", "Mitigated", "Resolved"]
    const severityLevels: SeverityLevel[] = ["High", "Medium", "Low", "Critical"]
    const impacts = ["High", "Very High", "Severe", "Moderate"]

    const descriptions = [
        "Server downtime due to overload",
        "Security breach from unauthorized access",
        "Data loss due to storage failure",
        "Inconsistent API response times",
        "Inadequate testing causing bugs in production",
        "Dependency on third-party libraries",
        "Resource shortages for critical tasks",
        "Regulatory compliance failure",
        "Poor user adoption of new feature",
        "Integration issues with legacy systems"
    ]

    const mitigationPlans = [
        "Scale up server instances, optimize load balancing",
        "Strengthen access controls, monitor system logs",
        "Implement daily backups, set up RAID for redundancy",
        "Optimize API endpoints, cache frequent requests",
        "Increase test coverage, conduct more regression tests",
        "Identify alternative libraries, monitor third-party updates",
        "Allocate additional resources, prioritize critical tasks",
        "Conduct compliance audits, implement required changes",
        "Improve user onboarding, gather feedback to improve usability",
        "Refactor legacy code, test integrations thoroughly"
    ]

    return Array.from({ length: 10 }, (_, i) => ({
        id: `RSK-${String(i + 1).padStart(3, '0')}`,
        description: descriptions[i],
        severityLevel: severityLevels[i % 4],
        impact: impacts[i % 4],
        mitigationPlan: mitigationPlans[i],
        status: riskStatuses[i % 3]
    }))
}

// Generate chart data for risk status distribution
const generateRiskStatusData = () => {
    return [
        { name: "Open", value: 3 },
        { name: "Mitigated", value: 4 },
        { name: "Resolved", value: 3 }
    ]
}

// Generate chart data for risk severity levels
const generateRiskSeverityData = () => {
    return [
        { name: "High", value: 40 },
        { name: "Medium", value: 20 },
        { name: "Low", value: 20 },
        { name: "Critical", value: 20 }
    ]
}

// Helper to get status variant
const getStatusVariant = (status: RiskStatus) => {
    switch (status) {
        case "Open": return "default"
        case "Mitigated": return "warning"
        case "Resolved": return "success"
    }
}

// Helper to get severity variant
const getSeverityVariant = (level: SeverityLevel) => {
    switch (level) {
        case "Critical": return "destructive"
        case "High": return "destructive"
        case "Medium": return "warning"
        case "Low": return "success"
    }
}


const breadcrumbs: Breadcrumb[] = [
    { label: "Dashboard", href: "/" },
    { label: "Reports", href: "/reports" },
    { label: "Risk Assessment", href: "/reports/risk-assessment", isCurrent: true },
]

// Main page component
export default function RiskAssessmentPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)

    // Get risk data
    const risks = generateRiskData()
    const riskStatusData = generateRiskStatusData()
    const riskSeverityData = generateRiskSeverityData()

    // Filter risks based on search query
    const filteredRisks = risks.filter(risk =>
        risk.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        risk.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Pagination calculation
    const totalPages = Math.ceil(filteredRisks.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentRisks = filteredRisks.slice(startIndex, endIndex)

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    // Render RiskStatusDistribution chart
    const RiskStatusChart = () => (
        <ChartContainer
            className="h-[300px] w-full"
            config={{
                Open: { label: "Open", color: "#6666FF" },
                Mitigated: { label: "Mitigated", color: "#4287f5" },
                Resolved: { label: "Resolved", color: "#7986cb" },
            }}
        >
            <BarChart data={riskStatusData} layout="vertical" accessibilityLayer>
                <CartesianGrid horizontal={false} />
                <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <XAxis dataKey="value" type="number" hide />
                <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="value" layout="vertical" radius={5}>
                    {riskStatusData.map((entry, index) => (
                        <Cell key={entry.name} fill={`var(--color-${entry.name})`} />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    )

    // Render RiskSeverityLevels chart
    const RiskSeverityChart = () => (
        <ChartContainer
            className="h-[300px] w-full"
            config={{
                High: { label: "High", color: "#ff4444" },
                Medium: { label: "Medium", color: "#ff9800" },
                Low: { label: "Low", color: "#4caf50" },
                Critical: { label: "Critical", color: "#f44336" },
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <ChartTooltip
                        content={<ChartTooltipContent nameKey="name" hideLabel />}
                    />
                    <Pie data={riskSeverityData} dataKey="value" nameKey="name" innerRadius={60}>
                        {riskSeverityData.map((entry, index) => (
                            <Cell
                                key={entry.name}
                                fill={`var(--color-${entry.name})`}
                            />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    )

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Risk Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RiskStatusChart />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Risk Severity Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RiskSeverityChart />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Risk Details</CardTitle>
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search risks..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Risk ID</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead>Impact</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Mitigation Plan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentRisks.map((risk) => (
                                <TableRow key={risk.id}>
                                    <TableCell>{risk.id}</TableCell>
                                    <TableCell>{risk.description}</TableCell>
                                    <TableCell>
                                        <Badge variant={getSeverityVariant(risk.severityLevel)}>{risk.severityLevel}</Badge>
                                    </TableCell>
                                    <TableCell>{risk.impact}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(risk.status)}>{risk.status}</Badge>
                                    </TableCell>
                                    <TableCell>{risk.mitigationPlan}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <div className="flex justify-end items-center gap-2 p-4 border-t">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </Card>
        </SidebarLayout>
    )
} 