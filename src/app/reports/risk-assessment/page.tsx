"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ChartContainer } from "@/components/ui/chart"
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
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"
import { PageLayout } from "@/components/layout/page-layout"
import { formatDate } from "@/lib/date-utils"

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
        { name: "Open", value: 3, color: "#5856D6" },
        { name: "Mitigated", value: 4, color: "#FE9802" },
        { name: "Resolved", value: 3, color: "#00B290" }
    ]
}

// Generate chart data for risk severity levels
const generateRiskSeverityData = () => {
    return [
        { name: "High", value: 40, color: "#5856D6" },
        { name: "Medium", value: 20, color: "#FE9802" },
        { name: "Low", value: 20, color: "#00B290" },
        { name: "Critical", value: 20, color: "#F7524A" }
    ]
}

// Component for rendering risk status badges
const RiskStatusBadge = ({ status }: { status: RiskStatus }) => {
    const statusStyles = {
        Open: "bg-[rgba(88,86,214,0.08)] text-[#5856D6]",
        Mitigated: "bg-[rgba(254,152,2,0.08)] text-[#FE9802]",
        Resolved: "bg-[rgba(0,178,144,0.08)] text-[#00B290]"
    }

    return (
        <div className={`px-2 py-1 rounded text-xs font-medium inline-flex items-center ${statusStyles[status]}`}>
            {status}
        </div>
    )
}

// Component for rendering severity level badges
const SeverityLevelBadge = ({ level }: { level: SeverityLevel }) => {
    const levelStyles = {
        High: "bg-[rgba(88,86,214,0.08)] text-[#5856D6]",
        Medium: "bg-[rgba(254,152,2,0.08)] text-[#FE9802]",
        Low: "bg-[rgba(0,178,144,0.08)] text-[#00B290]",
        Critical: "bg-[rgba(247,82,74,0.08)] text-[#F7524A]"
    }

    return (
        <div className={`px-2 py-1 rounded text-xs font-medium inline-flex items-center ${levelStyles[level]}`}>
            {level}
        </div>
    )
}

// Main page component
export default function RiskAssessmentPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

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
        <div className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={riskStatusData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 60]} tickCount={7} />
                    <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="value"
                        name="Number of Risks"
                        radius={[0, 4, 4, 0]}
                    >
                        {riskStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )

    // Render RiskSeverityLevels chart
    const RiskSeverityChart = () => (
        <div className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={riskSeverityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {riskSeverityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )

    return (
        <PageLayout
            title="Risk Assessment Report"
            breadcrumbs={[
                {
                    icon: BreadcrumbIcons.Dashboard,
                    label: "Dashboard",
                    href: "/"
                },
                {
                    icon: BreadcrumbIcons.Reports,
                    label: "Risk Management",
                    href: "/reports"
                },
                {
                    icon: BreadcrumbIcons.Project,
                    label: "Risk Assessment Report",
                    isActive: true
                }
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Risk Status Distribution Chart */}
                <Card className="w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-0 pt-5 px-6 border-b border-[rgba(3,0,49,0.08)]">
                        <CardTitle className="text-base font-medium flex items-center text-[rgba(3,0,41,0.9)]">
                            Risk Status Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <RiskStatusChart />
                    </CardContent>
                </Card>

                {/* Risk Severity Levels Chart */}
                <Card className="w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-0 pt-5 px-6 border-b border-[rgba(3,0,49,0.08)]">
                        <CardTitle className="text-base font-medium flex items-center text-[rgba(3,0,41,0.9)]">
                            Risk Severity Levels
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <RiskSeverityChart />
                    </CardContent>
                </Card>
            </div>

            {/* Risk Data Table */}
            <Card className="w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-[rgba(3,0,49,0.12)]">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                            placeholder="Search"
                            className="pl-9 pr-4 py-2 h-10 rounded-md border border-[rgba(3,0,49,0.12)]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-10 px-4 border border-[rgba(3,0,49,0.12)]"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>

                <div className="border-t border-[rgba(3,0,49,0.12)]"></div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">Risk ID</TableHead>
                                <TableHead className="font-bold">Description</TableHead>
                                <TableHead className="font-bold">Severity Level</TableHead>
                                <TableHead className="font-bold">Impact</TableHead>
                                <TableHead className="font-bold">Mitigation Plan</TableHead>
                                <TableHead className="font-bold">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentRisks.map((risk, index) => (
                                <TableRow key={risk.id} className="border-b border-[rgba(3,0,49,0.12)]">
                                    <TableCell className="font-medium">{risk.id}</TableCell>
                                    <TableCell>{risk.description}</TableCell>
                                    <TableCell>
                                        <SeverityLevelBadge level={risk.severityLevel as SeverityLevel} />
                                    </TableCell>
                                    <TableCell>{risk.impact}</TableCell>
                                    <TableCell>{risk.mitigationPlan}</TableCell>
                                    <TableCell>
                                        <RiskStatusBadge status={risk.status as RiskStatus} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between p-6 border-t border-[rgba(3,0,49,0.12)]">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[rgba(3,0,49,0.8)]">Show row:</span>
                        <select
                            className="h-8 w-16 rounded-md border border-[rgba(3,0,49,0.12)] text-sm px-2"
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border border-[rgba(3,0,49,0.12)]"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-[rgba(3,0,49,0.8)]">
                            {`${startIndex + 1}-${Math.min(endIndex, filteredRisks.length)} of ${filteredRisks.length}`}
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border border-[rgba(3,0,49,0.12)]"
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </PageLayout>
    )
} 