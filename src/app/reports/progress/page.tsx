"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

// Sample data for the charts
const projectCompletionData = [
    { name: "Milestone 1", percentage: 20 },
    { name: "Milestone 2", percentage: 25 },
    { name: "Milestone 3", percentage: 34 },
    { name: "Milestone 4", percentage: 45 },
    { name: "Milestone 5", percentage: 50 },
]

const timeComparisonData = [
    { name: "Task 1", estimated: 20, actual: 25 },
    { name: "Task 2", estimated: 15, actual: 22 },
    { name: "Task 3", estimated: 25, actual: 20 },
    { name: "Task 4", estimated: 18, actual: 26 },
    { name: "Task 5", estimated: 15, actual: 10 },
]

// Sample data for the table
const projectTableData = [
    {
        name: "Casheer",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "PlatfromX",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "Platform Payment",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "Platform Voucher",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "ConnectX",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "Digimenu",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "Marketing",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "HR",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "Legal Services",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
    {
        name: "Apolo",
        dates: "12/09/2024\n31/12/2024",
        completion: "43%",
        milestones: "4/12",
        tasks: "5",
        members: "12",
        timeComparison: "4/12"
    },
]

// Custom components for the charts
const MilestoneIndicator = ({ milestones, completion }: { milestones: string, completion: string }) => (
    <div className="flex items-center gap-2">
        <div className="relative h-5 w-5 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#D8D8E4]"></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#5856D6]"></div>
        </div>
        <span>{milestones}</span>
    </div>
)

export default function ProjectProgressPage() {
    const [searchQuery, setSearchQuery] = useState("")

    // Filter projects based on search
    const filteredProjects = projectTableData.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <SidebarLayout>
            <div className="flex flex-col space-y-6 p-4 sm:p-6 md:p-8">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight mb-6">Project Progress Report</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Project Completion Progress Chart */}
                        <Card className="w-full">
                            <CardHeader className="pb-0">
                                <CardTitle className="text-base font-medium">Project Completion Progress</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="h-[300px] mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={projectCompletionData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                                                domain={[0, 100]}
                                                tickCount={11}
                                                tickFormatter={(value) => `${value}`}
                                                label={{ value: 'Completion Percentage (%)', angle: -90, position: 'insideLeft', offset: 0, style: { textAnchor: 'middle', fontSize: '12px', fill: 'rgba(3, 0, 41, 0.8)' } }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'white',
                                                    border: '1px solid rgba(3, 0, 49, 0.12)',
                                                    borderRadius: '6px',
                                                    fontSize: '12px'
                                                }}
                                                formatter={(value) => [`${value}%`, 'Completion']}
                                            />
                                            <Bar dataKey="percentage" fill="#5856D6" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Estimated vs. Actual Time Chart */}
                        <Card className="w-full">
                            <CardHeader className="pb-0">
                                <CardTitle className="text-base font-medium">Estimated Vs. Actual Time</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="h-[300px] mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={timeComparisonData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                                                label={{ value: 'Time (Hours)', angle: -90, position: 'insideLeft', offset: 0, style: { textAnchor: 'middle', fontSize: '12px', fill: 'rgba(3, 0, 49, 0.8)' } }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'white',
                                                    border: '1px solid rgba(3, 0, 49, 0.12)',
                                                    borderRadius: '6px',
                                                    fontSize: '12px'
                                                }}
                                                formatter={(value) => [`${value} hours`, '']}
                                            />
                                            <Bar dataKey="estimated" name="Estimated Time" fill="#5856D6" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="actual" name="Actual Time" fill="#3835B9" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex items-center justify-center gap-6 mt-2 bg-white border border-gray-200 p-2 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-[#5856D6] rounded-full"></div>
                                        <span className="text-xs text-gray-700">Estimated Time</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-[#3835B9] rounded-full"></div>
                                        <span className="text-xs text-gray-700">Actual Time</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Project Progress Table */}
                    <Card className="w-full bg-[#F4F8FD]">
                        <div className="flex items-center justify-between p-4 md:p-6">
                            <div className="relative max-w-sm">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search"
                                    className="pl-9 h-9 bg-white w-[220px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="h-9 w-9">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>
                        <Separator className="bg-[#E7E8EC]" />

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white border-b border-[rgba(3,0,49,0.12)]">
                                        <TableHead className="font-bold">Project Name</TableHead>
                                        <TableHead className="font-bold">Start date and end date</TableHead>
                                        <TableHead className="font-bold">Completion percentage</TableHead>
                                        <TableHead className="font-bold">Milestones achieved</TableHead>
                                        <TableHead className="font-bold">Remaining tasks</TableHead>
                                        <TableHead className="font-bold">Assigned team member</TableHead>
                                        <TableHead className="font-bold">Estimated vs. actual time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProjects.map((project, index) => (
                                        <TableRow key={index} className="border-b border-[rgba(3,0,49,0.12)]">
                                            <TableCell className="font-normal">{project.name}</TableCell>
                                            <TableCell className="font-normal whitespace-pre-line">{project.dates}</TableCell>
                                            <TableCell className="font-normal">{project.completion}</TableCell>
                                            <TableCell>
                                                <MilestoneIndicator
                                                    milestones={project.milestones}
                                                    completion={project.completion}
                                                />
                                            </TableCell>
                                            <TableCell className="font-normal">{project.tasks}</TableCell>
                                            <TableCell className="font-normal">{project.members}</TableCell>
                                            <TableCell>
                                                <MilestoneIndicator
                                                    milestones={project.timeComparison}
                                                    completion={project.completion}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="p-4 md:p-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Show row:</span>
                                <Input className="w-12 h-8" value="10" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm">1-10 of 23</span>
                                <Button variant="outline" size="icon" className="h-8 w-8 rotate-180">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </SidebarLayout>
    )
} 