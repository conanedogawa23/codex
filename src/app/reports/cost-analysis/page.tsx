"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Breadcrumb } from "@/components/ui/breadcrumbs"

// Import mock data
import mockData from "@/lib/mock-data.json"

// Get data from mock-data.json
const costComparisonData = mockData.reports.costAnalysis.costComparison;
const reasonsForOverruns = mockData.reports.costAnalysis.overrunReasons;
const projectCostData = mockData.reports.costAnalysis.projectDetails;

const breadcrumbs: Breadcrumb[] = [
    { label: "Dashboard", href: "/" },
    { label: "Reports", href: "/reports" },
    { label: "Cost Analysis", href: "/reports/cost-analysis", isCurrent: true },
]

export default function CostAnalysisPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)

    // Filter projects based on search
    const filteredProjects = projectCostData.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Pagination calculation
    const totalPages = Math.ceil(filteredProjects.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentProjects = filteredProjects.slice(startIndex, endIndex)

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Estimated Vs. Actual Costs per Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[300px] w-full"
                            config={{
                                estimated: {
                                    label: "Estimated",
                                    color: "#6666FF",
                                },
                                actual: {
                                    label: "Actual",
                                    color: "#4287f5",
                                },
                            }}
                        >
                            <BarChart data={costComparisonData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis
                                    tickFormatter={(value) => `${value / 1000}k`}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Legend />
                                <Bar
                                    dataKey="actual"
                                    fill="var(--color-actual)"
                                    radius={8}
                                />
                                <Bar
                                    dataKey="estimated"
                                    fill="var(--color-estimated)"
                                    radius={8}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Reasons for Cost Overruns</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[300px] w-full"
                            config={{
                                "ResourceMismanagement": {
                                    label: "Resource Mismanagement",
                                    color: "#6666FF"
                                },
                                "UnexpectedDelays": {
                                    label: "Unexpected Delays",
                                    color: "#4287f5"
                                },
                                "ScopeCreep": {
                                    label: "Scope Creep",
                                    color: "#7986cb"
                                },
                                "MarketPriceChanges": {
                                    label: "Market Price Changes",
                                    color: "#4caf50"
                                },
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <ChartTooltip
                                        content={<ChartTooltipContent nameKey="name" hideLabel />}
                                    />
                                    <Pie data={reasonsForOverruns} dataKey="value" nameKey="name" innerRadius={60}>
                                        {reasonsForOverruns.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={`var(--color-${entry.name.replace(/\s/g, "")})`}
                                            />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Project Cost Details Table */}
            <Card>
                <div className="flex justify-between items-center p-3 border-b">
                    <CardTitle>Project Cost Details</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                className="pl-8 h-10 w-[220px] rounded-md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4 py-6 font-bold">Project name</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Estimated budget (KWD)</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Actual cost (KWD)</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Cost per developer/hour</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Total resources utilized</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Cost overruns and reasons</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentProjects.map((project, index) => (
                                <TableRow key={index}>
                                    <TableCell className="px-4 py-2">{project.name}</TableCell>
                                    <TableCell className="px-4 py-2">{project.estimatedBudget.toLocaleString()}</TableCell>
                                    <TableCell className="px-4 py-2">{project.actualCost.toLocaleString()}</TableCell>
                                    <TableCell className="px-4 py-2">{project.costPerHour.toLocaleString()}</TableCell>
                                    <TableCell className="px-4 py-2">{project.resourcesUtilized}</TableCell>
                                    <TableCell className="px-4 py-2">{project.costOverruns}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </SidebarLayout>
    )
} 