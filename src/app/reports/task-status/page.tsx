"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, User } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Breadcrumb } from "@/components/ui/breadcrumbs"
import { TaskStatusBadge } from "@/components/tasks/task-status-badge"
import { PriorityIndicator } from "@/components/tasks/priority-indicator"
import { ProgressRing } from "@/components/tasks/progress-ring"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Import mock data
import mockData from "@/lib/mock-data.json"

// Get data from mock-data.json
const taskStatusOverview = mockData.reports.taskStatus.overview
const taskStatusDistribution = mockData.reports.taskStatus.distribution
const tasksData = mockData.tasks

const breadcrumbs: Breadcrumb[] = [
    { label: "Dashboard", href: "/" },
    { label: "Reports", href: "/reports" },
    { label: "Task Status", href: "/reports/task-status", isCurrent: true },
]

export default function TaskStatusPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // Filter tasks based on search
    const filteredTasks = tasksData.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Pagination calculation
    const totalPages = Math.ceil(filteredTasks.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentTasks = filteredTasks.slice(startIndex, endIndex)

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Task Status Overview Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Task Status Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[300px] w-full"
                            config={{
                                "To DO": {
                                    label: "To DO",
                                    color: "#5856D6"
                                },
                                "In Progress": {
                                    label: "In Progress",
                                    color: "#FE9802"
                                },
                                "Completed": {
                                    label: "Completed",
                                    color: "#00B290"
                                },
                                "Blocked": {
                                    label: "Blocked",
                                    color: "#F7524A"
                                },
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={taskStatusOverview}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="status"
                                        tick={{ fontSize: 12 }}
                                        interval={0}
                                    />
                                    <YAxis
                                        label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft' }}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent nameKey="status" />}
                                    />
                                    <Bar
                                        dataKey="count"
                                        fill="#5856D6"
                                        radius={[2, 2, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Task Status Distribution Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Task Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[300px] w-full"
                            config={{
                                "To do": {
                                    label: "To do",
                                    color: "#5856D6"
                                },
                                "In Progress": {
                                    label: "In Progress",
                                    color: "#FE9802"
                                },
                                "Completed": {
                                    label: "Completed",
                                    color: "#00B290"
                                },
                                "Blocked": {
                                    label: "Blocked",
                                    color: "#F7524A"
                                },
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <ChartTooltip
                                        content={<ChartTooltipContent nameKey="name" hideLabel />}
                                    />
                                    <Pie
                                        data={taskStatusDistribution}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                    >
                                        {taskStatusDistribution.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Task Details Table */}
            <Card>
                <div className="flex justify-between items-center p-3 border-b">
                    <CardTitle>Task Details</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                            <Input
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 w-[300px]"
                            />
                        </div>
                    </div>
                </div>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    <div className="flex items-center gap-2">
                                        Task ID/Name
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-2">
                                        Assigned Developer
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-2">
                                        Status
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-2">
                                        Priority Level
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-2">
                                        Estimated vs. Logged Hours
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-2">
                                        Dependencies
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentTasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">
                                        <div>
                                            <div className="font-semibold">{task.taskNumber} {task.title}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-xs">
                                                    <User className="h-3 w-3" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{task.assignee.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <TaskStatusBadge status={task.status as "to-do" | "in-progress" | "completed" | "blocked"} />
                                    </TableCell>
                                    <TableCell>
                                        <PriorityIndicator priority={task.priority as "high" | "medium" | "low"} />
                                    </TableCell>
                                    <TableCell>
                                        <ProgressRing
                                            loggedHours={task.loggedHours}
                                            estimatedHours={task.estimatedHours}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">{task.dependencies}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Show row:</span>
                        <Select value={rowsPerPage.toString()} onValueChange={(value) => {
                            setRowsPerPage(Number(value))
                            setCurrentPage(1)
                        }}>
                            <SelectTrigger className="w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            {startIndex + 1}-{Math.min(endIndex, filteredTasks.length)} of {filteredTasks.length}
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
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
                </div>
            </Card>
        </SidebarLayout>
    )
}
