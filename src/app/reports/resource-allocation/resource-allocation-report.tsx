"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, ChevronLeft, ChevronRight, BarChart as BarChartIcon, PieChart as PieChartIcon } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts"

import mockData from "@/lib/mock-data.json"

export function ResourceAllocationReport() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)

    const resourceData = mockData.reports.resourceAllocation

    // Prepare chart data
    const hoursLoggedData = resourceData.hoursLoggedByResource
    const allocationStatusData = resourceData.allocationStatus

    // Filter resources based on search
    const filteredResources = resourceData.resources.filter(resource =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.taskAllocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Pagination
    const totalPages = Math.ceil(filteredResources.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentResources = filteredResources.slice(startIndex, endIndex)

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'under-utilised':
                return (
                    <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                        Under-utilised
                    </Badge>
                )
            case 'over-allocated':
                return (
                    <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">
                        Over-allocated
                    </Badge>
                )
            case 'optimally-allocated':
                return (
                    <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                        Optimally Allocated
                    </Badge>
                )
            default:
                return (
                    <Badge variant="outline">
                        {status}
                    </Badge>
                )
        }
    }

    const renderCustomLabel = (entry: any) => {
        return `${entry.value}%`
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Resource Allocation Report</h1>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hours Logged By Resource Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BarChartIcon className="mr-2 h-5 w-5 text-primary" />
                            Hours Logged By Resource
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[320px] w-full"
                            config={{
                                hours: {
                                    label: "Hours Logged",
                                    color: "#5856d6",
                                },
                            }}
                        >
                            <BarChart data={hoursLoggedData} accessibilityLayer margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 12 }}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="hours"
                                    fill="var(--color-hours)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Resource Allocation Status Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
                            Resource Allocation Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[320px] w-full"
                            config={{
                                "optimally-allocated": {
                                    label: "Optimally Allocated",
                                    color: "#5856d6",
                                },
                                "under-utilised": {
                                    label: "Under-utilised",
                                    color: "#00b290",
                                },
                                "over-allocated": {
                                    label: "Over allocated",
                                    color: "#f7524a",
                                },
                            }}
                        >
                            <PieChart accessibilityLayer>
                                <Pie
                                    data={allocationStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={renderCustomLabel}
                                    labelLine={false}
                                >
                                    {allocationStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <ChartTooltip
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <ChartLegend
                                    content={<ChartLegendContent />}
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Resource Allocation Details</CardTitle>
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
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
                                <TableHead>Developer/Resource name</TableHead>
                                <TableHead>Task allocation</TableHead>
                                <TableHead>Hours logged</TableHead>
                                <TableHead>Availability percentage</TableHead>
                                <TableHead>Over-allocated/Under-utilized</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentResources.map((resource) => (
                                <TableRow key={resource.id}>
                                    <TableCell>
                                        <div className="font-medium">{resource.type}</div>
                                        <div className="text-sm text-muted-foreground">{resource.name}</div>
                                    </TableCell>
                                    <TableCell className="max-w-xs">
                                        <div className="truncate">{resource.taskAllocation}</div>
                                    </TableCell>
                                    <TableCell>{resource.hoursLogged}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Progress 
                                                value={resource.availabilityPercentage} 
                                                className="w-16 h-2"
                                                indicatorClassName={
                                                    resource.availabilityPercentage >= 80 ? "bg-green-500" :
                                                    resource.availabilityPercentage >= 50 ? "bg-yellow-500" :
                                                    "bg-red-500"
                                                }
                                            />
                                            <span className="text-sm font-medium">{resource.availabilityPercentage}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(resource.status)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <div className="flex justify-between items-center gap-2 p-4 border-t">
                    <div className="text-sm text-muted-foreground">
                        Show row: 10
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
                        <span className="text-sm text-muted-foreground">
                            {startIndex + 1}-{Math.min(endIndex, filteredResources.length)} of {filteredResources.length}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
