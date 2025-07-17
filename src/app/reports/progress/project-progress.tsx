
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight, BarChart as BarChartIcon, Clock } from "lucide-react"
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
    Legend
} from "recharts"

import { formatDate } from "@/lib/date-utils"
import mockData from "@/lib/mock-data.json"

export function ProjectProgress() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)

    const projects = mockData.projects || []

    const projectCompletionData = projects
        .filter(project => project.status !== "completed")
        .slice(0, 5)
        .map(project => ({
            name: project.name.length > 10 ? `${project.name.substring(0, 10)}...` : project.name,
            percentage: project.progress
        }))

    const timeComparisonData = mockData.tasks
        .slice(0, 5)
        .map(task => ({
            name: task.title.length > 15 ? `${task.title.substring(0, 15)}...` : task.title,
            estimated: 20,
            actual: Math.floor(Math.random() * 30) + 5
        }))

    const projectTableData = projects.map(project => {
        const projectTasks = mockData.tasks.filter(task => task.project === project.name)
        return {
            id: project.id,
            name: project.name,
            dates: formatDate(project.deadline),
            completion: `${project.progress}%`,
            milestones: `${project.tasks.completed}/${project.tasks.total}`,
            tasks: projectTasks.length.toString(),
            members: "3",
            timeComparison: `${project.tasks.completed}/${project.tasks.total}`
        }
    })

    const filteredProjects = projectTableData.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BarChartIcon className="mr-2 h-5 w-5 text-primary" />
                            Project Completion Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[300px] w-full"
                            config={{
                                percentage: {
                                    label: "Completion",
                                    color: "hsl(var(--primary))",
                                },
                            }}
                        >
                            <BarChart data={projectCompletionData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis
                                    tickFormatter={(value) => `${value}%`}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="percentage"
                                    fill="var(--color-percentage)"
                                    radius={8}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-primary" />
                            Estimated vs. Actual Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[300px] w-full"
                            config={{
                                estimated: {
                                    label: "Estimated",
                                    color: "hsl(var(--primary) / 0.5)",
                                },
                                actual: {
                                    label: "Actual",
                                    color: "hsl(var(--primary))",
                                },
                            }}
                        >
                            <BarChart data={timeComparisonData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis
                                    tickFormatter={(value) => `${value}h`}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Legend />
                                <Bar
                                    dataKey="estimated"
                                    fill="var(--color-estimated)"
                                    radius={8}
                                />
                                <Bar
                                    dataKey="actual"
                                    fill="var(--color-actual)"
                                    radius={8}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>All Projects</CardTitle>
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search projects..."
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
                                <TableHead>Project Name</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Completion</TableHead>
                                <TableHead>Milestones</TableHead>
                                <TableHead>Tasks</TableHead>
                                <TableHead>Team</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentProjects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell>{project.dates}</TableCell>
                                    <TableCell>{project.completion}</TableCell>
                                    <TableCell>{project.milestones}</TableCell>
                                    <TableCell>{project.tasks}</TableCell>
                                    <TableCell>{project.members}</TableCell>
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
        </>
    )
} 