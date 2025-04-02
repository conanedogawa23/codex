"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ChartContainer } from "@/components/ui/chart"
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
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"
import { PageLayout } from "@/components/layout/page-layout"

// Import mock data
import mockData from "@/lib/mock-data.json"

// Get data from mock-data.json
const costComparisonData = mockData.reports.costAnalysis.costComparison;
const reasonsForOverruns = mockData.reports.costAnalysis.overrunReasons;
const projectCostData = mockData.reports.costAnalysis.projectDetails;

const COLORS = ["#5856D6", "#00B290", "#FF9500", "#F7524A"];

export default function CostAnalysisPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

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
        <PageLayout
            title="Cost Analysis Report"
            breadcrumbs={[
                {
                    icon: BreadcrumbIcons.Dashboard,
                    label: "Dashboard",
                    href: "/"
                },
                {
                    icon: BreadcrumbIcons.Reports,
                    label: "Project Delivery Speed",
                    href: "/reports"
                },
                {
                    icon: BreadcrumbIcons.Project,
                    label: "Cost Analysis",
                    isActive: true
                }
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Estimated vs. Actual Costs Chart */}
                <Card className="w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-0 pt-5 px-6 border-b border-[rgba(3,0,49,0.08)]">
                        <CardTitle className="text-base font-medium flex items-center text-[rgba(3,0,41,0.9)]">
                            Estimated Vs. Actual Costs per Project
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <ChartContainer
                            className="h-[250px] sm:h-[300px] w-full"
                            config={{
                                estimated: {
                                    theme: { light: "#5856D6", dark: "#5856D6" }
                                },
                                actual: {
                                    theme: { light: "#00B290", dark: "#00B290" }
                                }
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={costComparisonData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 30
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(3, 0, 49, 0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                        label={{
                                            value: 'Cost (KWD)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: 0,
                                            style: { textAnchor: 'middle', fontSize: '12px', fill: 'rgba(3, 0, 49, 0.8)' }
                                        }}
                                    />
                                    <Tooltip formatter={(value) => [`${value.toLocaleString()} KWD`, '']} />
                                    <Legend
                                        verticalAlign="bottom"
                                        wrapperStyle={{ paddingTop: "20px" }}
                                    />
                                    <Bar
                                        dataKey="actual"
                                        name="Actual Cost"
                                        fill="#00B290"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                    <Bar
                                        dataKey="estimated"
                                        name="Estimated Cost"
                                        fill="#5856D6"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Reasons for Cost Overruns Chart */}
                <Card className="w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-0 pt-5 px-6 border-b border-[rgba(3,0,49,0.08)]">
                        <CardTitle className="text-base font-medium flex items-center text-[rgba(3,0,41,0.9)]">
                            Reasons for Cost Overrunns
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <ChartContainer
                            className="h-[250px] sm:h-[300px] w-full"
                            config={{
                                mismanagement: {
                                    theme: { light: "#5856D6", dark: "#5856D6" }
                                },
                                delays: {
                                    theme: { light: "#00B290", dark: "#00B290" }
                                },
                                price: {
                                    theme: { light: "#FF9500", dark: "#FF9500" }
                                },
                                scope: {
                                    theme: { light: "#F7524A", dark: "#F7524A" }
                                }
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={reasonsForOverruns}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {reasonsForOverruns.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend
                                        verticalAlign="bottom"
                                        wrapperStyle={{
                                            paddingTop: "20px",
                                            fontSize: "12px"
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Project Cost Details Table */}
            <Card className="bg-[#F4F8FD] rounded-lg mb-6">
                <div className="flex justify-between items-center p-3 border-b border-[rgba(3,0,49,0.12)]">
                    <div></div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-500" />
                            <Input
                                placeholder="Search"
                                className="pl-8 h-10 w-[220px] rounded-md border-[rgba(3,0,49,0.12)]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-[rgba(3,0,49,0.12)]"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="border-b border-[rgba(3,0,49,0.12)]"></div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-[rgba(3,0,49,0.12)]">
                                <TableHead className="px-4 py-6 font-bold text-[rgba(3,0,41,0.8)]">Project name</TableHead>
                                <TableHead className="px-4 py-6 font-bold text-[rgba(3,0,41,0.8)]">Estimated budget (KWD)</TableHead>
                                <TableHead className="px-4 py-6 font-bold text-[rgba(3,0,41,0.8)]">Actual cost (KWD)</TableHead>
                                <TableHead className="px-4 py-6 font-bold text-[rgba(3,0,41,0.8)]">Cost per developer/hour</TableHead>
                                <TableHead className="px-4 py-6 font-bold text-[rgba(3,0,41,0.8)]">Total resources utilized</TableHead>
                                <TableHead className="px-4 py-6 font-bold text-[rgba(3,0,41,0.8)]">Cost overruns and reasons</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentProjects.map((project, index) => (
                                <TableRow
                                    key={`${project.name}-${index}`}
                                    className="border-b border-[rgba(3,0,49,0.12)]"
                                >
                                    <TableCell className="px-4 py-4 font-medium text-[rgba(3,0,49,0.8)]">
                                        {project.name}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 text-[rgba(3,0,49,0.8)]">
                                        {project.estimatedBudget}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 text-[rgba(3,0,49,0.8)]">
                                        {project.actualCost}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 text-[rgba(3,0,49,0.8)]">
                                        {project.costPerHour}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 text-[rgba(3,0,49,0.8)]">
                                        {project.resourcesUtilized}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 text-[rgba(3,0,49,0.8)]">
                                        {project.costOverruns}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-between items-center p-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[rgba(3,0,49,0.8)]">Show row:</span>
                        <Input
                            className="w-16 h-8"
                            type="number"
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(parseInt(e.target.value) || 10)}
                            min={1}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-[rgba(3,0,49,0.8)]">
                            {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
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