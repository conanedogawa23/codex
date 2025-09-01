"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts"

import mockData from "@/lib/mock-data.json"

// Circular Progress Component - Matches Figma Design
function CircularProgress({ value, size = 38 }: { value: number; size?: number }) {
    const radius = (size - 6) / 2 // Adjust for stroke width
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (value / 100) * circumference
    const center = size / 2

    return (
        <div className="flex items-center gap-3">
            <div className="relative shrink-0" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#E7E8EC"
                        strokeWidth="3"
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#5856D6"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 0.3s ease-in-out'
                        }}
                    />
                </svg>
            </div>
            <div className="flex flex-col justify-center leading-none">
                <p className="text-[14px] font-['General_Sans:Regular',_sans-serif] text-[rgba(3,0,41,0.8)] leading-normal">
                    {value}%
                </p>
            </div>
        </div>
    )
}

export function ReleaseStatusReport() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10

    // Bar chart data from mock data
    const releaseMetrics = mockData.reports.releaseStatusMetrics.barChartData

    // Pie chart data from mock data
    const deploymentData = [
        {
            name: "Success Rate",
            value: mockData.reports.releaseStatusMetrics.deploymentSuccess.successRate,
            color: "#00B290"
        },
        {
            name: "Failure Rate",
            value: mockData.reports.releaseStatusMetrics.deploymentSuccess.failureRate,
            color: "#F7524A"
        }
    ]

    // Table data from mock data
    const releases = mockData.reports.releases.map(release => ({
        id: release.id,
        version: release.version,
        name: release.name,
        plannedReleaseDate: release.plannedReleaseDate,
        releaseDate: release.releaseDate,
        featuresDelivered: release.featuresDelivered,
        knownIssues: release.knownIssues,
        regressionTestingStatus: release.regressionTestingStatus,
        deploymentSuccessRate: release.deploymentSuccessRate
    }))

    const filteredReleases = releases.filter(release =>
        release.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredReleases.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentReleases = filteredReleases.slice(startIndex, endIndex)

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-foreground">Release Status Report</h1>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart Card */}
                <Card className="h-[440px]">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-[rgba(3,0,41,0.8)]">
                            Release Status Report
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 pt-2">
                        <div className="flex-1 flex items-end justify-center h-full pl-0 pr-px">
                            {/* Y-axis and Grid Container */}
                            <div className="flex items-end h-full mr-[-1px] pb-[46px]">
                                {/* Y-axis Label */}
                                <div className="flex items-center justify-center h-[78.609px] w-4">
                                    <div className="rotate-[-90deg]">
                                        <span className="text-sm font-semibold text-[rgba(3,0,49,0.8)] whitespace-nowrap leading-none">
                                            Percentages
                                        </span>
                                    </div>
                                </div>

                                {/* Y-axis Ticks */}
                                <div className="flex flex-col gap-1 h-full items-end justify-center pb-2.5 pr-3 border-r border-[rgba(3,0,49,0.12)]">
                                    <div className="flex-1 flex items-center justify-end w-[22px]">
                                        <span className="text-xs text-[rgba(3,0,49,0.8)] leading-none">30</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-end w-[22px]">
                                        <span className="text-xs text-[rgba(3,0,49,0.8)] leading-none">25</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-end w-[22px]">
                                        <span className="text-xs text-[rgba(3,0,49,0.8)] leading-none">20</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-end w-[22px]">
                                        <span className="text-xs text-[rgba(3,0,49,0.8)] leading-none">15</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-end w-[22px]">
                                        <span className="text-xs text-[rgba(3,0,49,0.8)] leading-none">10</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-end w-[19px]">
                                        <span className="text-xs text-[rgba(3,0,49,0.8)] leading-none">5</span>
                                    </div>
                                    {/* 0 label at bottom */}
                                    <div className="absolute bottom-0 right-3 translate-y-1/2">
                                        <span className="text-xs text-[rgba(3,0,49,0.8)] leading-none">0</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Area */}
                            <div className="flex-1 flex flex-col h-full items-center justify-end mr-[-1px] relative">
                                {/* Grid Lines */}
                                <div className="absolute bottom-[46.2px] left-0 right-0 top-[-0.2px] flex flex-col gap-1 items-center justify-center pb-2.5">
                                    {/* 6 Horizontal grid lines */}
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="flex-1 flex items-center justify-between w-full">
                                            <div className="w-full h-px bg-[rgba(3,0,49,0.12)]"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bars Container */}
                                <div className="flex items-end justify-center gap-4 px-4 h-full w-full relative">
                                    {/* Bar 1 - Planned Release Date (15 -> 123px height) */}
                                    <div className="flex-1 flex items-center justify-start h-full">
                                        <div className="flex-1 flex flex-col gap-1 items-center justify-end h-full rounded-sm">
                                            <div className="bg-[#5856d6] w-full rounded-sm" style={{ height: '123px' }}></div>
                                        </div>
                                    </div>

                                    {/* Bar 2 - Actual Release Date (20 -> 182px height) */}
                                    <div className="flex-1 flex items-center justify-start h-full">
                                        <div className="flex-1 flex flex-col gap-1 items-center justify-end h-full rounded-sm">
                                            <div className="bg-[#5856d6] w-full rounded-sm" style={{ height: '182px' }}></div>
                                        </div>
                                    </div>

                                    {/* Bar 3 - Features Delivered (25 -> 236px height) */}
                                    <div className="flex-1 flex items-center justify-start h-full">
                                        <div className="flex-1 flex flex-col gap-1 items-center justify-end h-full rounded-sm">
                                            <div className="bg-[#5856d6] w-full rounded-sm" style={{ height: '236px' }}></div>
                                        </div>
                                    </div>

                                    {/* Bar 4 - Known Issues (18 -> 172px height) */}
                                    <div className="flex-1 flex items-center justify-start h-full">
                                        <div className="flex-1 flex flex-col gap-1 items-center justify-end h-full rounded-sm">
                                            <div className="bg-[#5856d6] w-full rounded-sm" style={{ height: '172px' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* X-axis Labels and Metrics */}
                                <div className="flex flex-col gap-2 h-[46px] items-start justify-start pt-1.5 w-full border-t border-[rgba(3,0,49,0.12)]">
                                    {/* X-axis labels */}
                                    <div className="flex items-center justify-center px-4 w-full text-xs text-[rgba(3,0,49,0.8)] text-center leading-none">
                                        <div className="flex-1">Planned Release Date</div>
                                        <div className="flex-1">Actual Release Date</div>
                                        <div className="flex-1">Features Delivered</div>
                                        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">Knows Issues</div>
                                    </div>

                                    {/* Metrics label */}
                                    <div className="flex items-start justify-center w-full">
                                        <span className="text-sm font-semibold text-[rgba(3,0,49,0.8)] leading-none">Metrics</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Donut Chart Card */}
                <Card className="h-[440px]">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-[rgba(3,0,41,0.8)]">
                            Deployment Success Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                        <div className="flex-1 flex items-center justify-center relative">
                            {/* Donut Chart Container */}
                            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-none place-items-start relative">
                                <div className="[grid-area:1_/_1] ml-0 mt-0 relative w-[266px] h-[266px]">
                                    <ChartContainer
                                        config={{
                                            success: {
                                                label: "Success Rate",
                                                color: "#00B290",
                                            },
                                            failure: {
                                                label: "Failure Rate",
                                                color: "#F7524A",
                                            },
                                        }}
                                        className="w-full h-full"
                                    >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={deploymentData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={80}
                                                    outerRadius={133}
                                                    paddingAngle={0}
                                                    dataKey="value"
                                                    startAngle={90}
                                                    endAngle={450}
                                                >
                                                    {deploymentData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </div>
                            </div>

                            {/* Success Rate Label - Top Right */}
                            <div className="absolute top-[50.5px] left-[399.5px] flex flex-col gap-1 items-start leading-none">
                                <div className="text-base font-medium text-[rgba(0,0,0,0.8)]">
                                    80%
                                </div>
                                <div className="text-xs text-[rgba(0,0,0,0.6)]">
                                    Success Rate
                                </div>
                            </div>

                            {/* Failure Rate Label - Left */}
                            <div className="absolute top-[137.5px] left-[39px] flex flex-col gap-1 items-start leading-none">
                                <div className="text-base font-medium text-[rgba(0,0,0,0.8)]">
                                    20%
                                </div>
                                <div className="text-xs text-[rgba(0,0,0,0.6)]">
                                    Failure Rate
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-col gap-2 items-center justify-center px-0 py-4">
                            <div className="flex gap-2 items-start justify-start">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#00B290] rounded-full"></div>
                                    <span className="text-sm text-[rgba(3,0,41,0.8)] leading-none">Success Rate</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#F7524A] rounded-full"></div>
                                    <span className="text-sm text-[rgba(3,0,41,0.8)] leading-none">Failure Rate</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table Section */}
            <Card>
                <div className="flex justify-between items-center p-3 border-b">
                    <CardTitle>Release Status Report</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                className="pl-8 h-10 w-[220px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4 py-6 font-bold">Release name/version</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Planned vs. actual release date</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Features delivered</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Known issues</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Regression testing status</TableHead>
                                <TableHead className="px-4 py-6 font-bold">Deployment success rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentReleases.map((release) => (
                                <TableRow key={release.id}>
                                    <TableCell className="px-4 py-2 font-medium">{release.name}</TableCell>
                                    <TableCell className="px-4 py-2">
                                        <div>
                                            <div className="font-medium">{release.plannedReleaseDate} vs</div>
                                            <div>{release.releaseDate}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-2">{release.featuresDelivered}</TableCell>
                                    <TableCell className="px-4 py-2">{release.knownIssues}</TableCell>
                                    <TableCell className="px-4 py-2">
                                        <Badge
                                            variant={release.regressionTestingStatus === "Completed" ? "default" : "secondary"}
                                        >
                                            {release.regressionTestingStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-2">
                                        <CircularProgress value={release.deploymentSuccessRate} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
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
        </div>
    )
}
