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
} from "recharts"
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"
import { PageLayout } from "@/components/layout/page-layout"
import { formatDate } from "@/lib/date-utils"

// Import mock data
import mockData from "@/lib/mock-data.json"

// Custom components for the charts
const MilestoneIndicator = ({ milestones, completion }: { milestones: string, completion: string }) => (
    <div className="flex items-center gap-2">
        <div className="relative h-5 w-5 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#D8D8E4]"></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#5856D6]"></div>
        </div>
        <span className="text-xs sm:text-sm">{milestones}</span>
    </div>
)

export default function ProjectProgressPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // Get projects from mock data
    const projects = mockData.projects || []

    // Generate project completion data from mock projects
    const projectCompletionData = projects
        .filter(project => project.status !== "completed")
        .slice(0, 5)
        .map(project => ({
            name: project.name.length > 10 ? project.name.substring(0, 10) + '...' : project.name,
            percentage: project.progress
        }))

    // Generate time comparison data from tasks
    const timeComparisonData = mockData.tasks
        .slice(0, 5)
        .map(task => ({
            name: task.title.length > 15 ? task.title.substring(0, 15) + '...' : task.title,
            estimated: 20, // Using a placeholder since mock data doesn't have estimated time
            actual: Math.floor(Math.random() * 30) + 5 // Using random values for demonstration
        }))

    // Generate project table data from mock projects
    const projectTableData = projects.map(project => {
        const projectTasks = mockData.tasks.filter(task => task.project === project.name)
        return {
            id: project.id,
            name: project.name,
            dates: `${formatDate(project.deadline)}`,
            completion: `${project.progress}%`,
            milestones: `${project.tasks.completed}/${project.tasks.total}`,
            tasks: projectTasks.length.toString(),
            members: "3", // Placeholder as mock data doesn't specify project members
            timeComparison: `${project.tasks.completed}/${project.tasks.total}`
        }
    })

    // Filter projects based on search
    const filteredProjects = projectTableData.filter(project =>
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
            title="Project Progress Report"
            breadcrumbs={[
                {
                    icon: BreadcrumbIcons.Dashboard,
                    label: "Dashboard",
                    href: "/"
                },
                {
                    icon: BreadcrumbIcons.Reports,
                    label: "Reports",
                    href: "/reports"
                },
                {
                    icon: BreadcrumbIcons.Project,
                    label: "Project Progress",
                    isActive: true
                }
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Project Completion Progress Chart */}
                <Card className="w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-0 pt-5 px-6 border-b border-[rgba(3,0,49,0.08)]">
                        <CardTitle className="text-base font-medium flex items-center text-[rgba(3,0,41,0.9)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#5856D6]">
                                <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Project Completion Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <ChartContainer
                            className="h-[220px] sm:h-[300px] w-full"
                            config={{
                                percentage: {
                                    theme: { light: "#5856D6", dark: "#5856D6" }
                                }
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={projectCompletionData}
                                    margin={{
                                        top: 20,
                                        right: 10,
                                        left: 0,
                                        bottom: 30
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(3, 0, 49, 0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, width: 50 }}
                                        dy={10}
                                        height={50}
                                        interval={0}
                                        tickFormatter={(value) => {
                                            return window.innerWidth < 640 && value.length > 10
                                                ? value.substring(0, 8) + '...'
                                                : value
                                        }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10 }}
                                        domain={[0, 100]}
                                        tickCount={5}
                                        tickFormatter={(value) => `${value}`}
                                        label={{
                                            value: 'Completion %',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: 0,
                                            style: {
                                                textAnchor: 'middle',
                                                fontSize: '10px',
                                                fill: 'rgba(3, 0, 41, 0.8)'
                                            }
                                        }}
                                    />
                                    <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                                    <Bar
                                        dataKey="percentage"
                                        fill="#5856D6"
                                        radius={[4, 4, 0, 0]}
                                        barSize={30}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Time Comparison Chart */}
                <Card className="w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-0 pt-5 px-6 border-b border-[rgba(3,0,49,0.08)]">
                        <CardTitle className="text-base font-medium flex items-center text-[rgba(3,0,41,0.9)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#5856D6]">
                                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Estimated vs. Actual Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <ChartContainer
                            className="h-[220px] sm:h-[300px] w-full"
                            config={{
                                estimated: {
                                    theme: { light: "#5856D6", dark: "#5856D6" }
                                },
                                actual: {
                                    theme: { light: "#FF9500", dark: "#FF9500" }
                                }
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={timeComparisonData}
                                    margin={{
                                        top: 20,
                                        right: 10,
                                        left: 0,
                                        bottom: 30
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(3, 0, 49, 0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, width: 50 }}
                                        dy={10}
                                        height={50}
                                        interval={0}
                                        tickFormatter={(value) => {
                                            return window.innerWidth < 640 && value.length > 10
                                                ? value.substring(0, 8) + '...'
                                                : value
                                        }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10 }}
                                        tickFormatter={(value) => `${value}h`}
                                        label={{
                                            value: 'Hours',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: 0,
                                            style: {
                                                textAnchor: 'middle',
                                                fontSize: '10px',
                                                fill: 'rgba(3, 0, 41, 0.8)'
                                            }
                                        }}
                                    />
                                    <Tooltip formatter={(value) => [`${value} hours`, '']} />
                                    <Bar
                                        dataKey="estimated"
                                        fill="#5856D6"
                                        name="Estimated Time"
                                        barSize={15}
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="actual"
                                        fill="#FF9500"
                                        name="Actual Time"
                                        barSize={15}
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                        <div className="flex items-center justify-center gap-6 mt-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#5856D6] rounded-sm"></div>
                                <span className="text-sm text-muted-foreground">Estimated</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#FF9500] rounded-sm"></div>
                                <span className="text-sm text-muted-foreground">Actual</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Projects table */}
            <Card className="w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden">
                <CardHeader className="pb-0 pt-5 px-6 border-b border-[rgba(3,0,49,0.08)]">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <CardTitle className="text-base font-medium flex items-center text-[rgba(3,0,41,0.9)]">
                            Projects
                        </CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search projects..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[rgba(3,0,49,0.02)] border-y border-[rgba(3,0,49,0.08)]">
                                    <TableHead className="py-2 px-4 text-xs font-medium text-[rgba(3,0,41,0.6)]">Project</TableHead>
                                    <TableHead className="py-2 px-4 text-xs font-medium text-[rgba(3,0,41,0.6)]">Deadline</TableHead>
                                    <TableHead className="py-2 px-4 text-xs font-medium text-[rgba(3,0,41,0.6)]">Completion</TableHead>
                                    <TableHead className="py-2 px-4 text-xs font-medium text-[rgba(3,0,41,0.6)]">Tasks</TableHead>
                                    <TableHead className="py-2 px-4 text-xs font-medium text-[rgba(3,0,41,0.6)]">Team</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentProjects.length > 0 ? (
                                    currentProjects.map((project) => (
                                        <TableRow key={project.id} className="border-b border-[rgba(3,0,49,0.08)] hover:bg-[rgba(3,0,49,0.02)]">
                                            <TableCell className="py-3 px-4 font-medium text-sm text-[rgba(3,0,41,0.9)]">
                                                {project.name}
                                            </TableCell>
                                            <TableCell className="py-3 px-4 text-sm text-[rgba(3,0,41,0.6)]">
                                                {project.dates}
                                            </TableCell>
                                            <TableCell className="py-3 px-4 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-1.5 w-24 bg-[#D8D8E4] rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-[#5856D6] rounded-full"
                                                            style={{ width: project.completion }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs font-medium text-[rgba(3,0,41,0.6)]">
                                                        {project.completion}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-3 px-4 text-sm">
                                                <MilestoneIndicator milestones={project.milestones} completion={project.completion} />
                                            </TableCell>
                                            <TableCell className="py-3 px-4 text-sm text-[rgba(3,0,41,0.6)]">
                                                {project.members}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No projects found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-4 border-t border-[rgba(3,0,49,0.08)]">
                        <div className="text-sm text-[rgba(3,0,41,0.6)]">
                            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredProjects.length)}</span> of <span className="font-medium">{filteredProjects.length}</span> projects
                        </div>
                        <div className="flex gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="h-8 w-8"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="h-8 w-8"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </PageLayout>
    )
} 