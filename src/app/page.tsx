"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, DownloadIcon, CheckCircleIcon, Clock, BarChart4, Users } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDate } from "@/lib/date-utils"
import { cn } from "@/lib/utils"

// Import mock data
import mockData from "@/lib/mock-data.json"
import { Breadcrumb } from "@/components/ui/breadcrumbs"

const breadcrumbs: Breadcrumb[] = [
  { label: "Dashboard", href: "/", isCurrent: true },
]

export default function Home() {
  // Use the mock data from our JSON file
  const { dashboard, projects, tasks, analytics } = mockData
  const { stats, projectStatus, tasksOverview } = dashboard

  // Get active projects sorted by progress
  const activeProjects = projects
    .filter(project => project.status === "active")
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  // Get top tasks sorted by priority
  const priorityTasks = tasks
    .filter(task => task.status !== "completed")
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    })
    .slice(0, 5);

  return (
    <SidebarLayout breadcrumbs={breadcrumbs}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's a quick overview of your projects.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
              <BarChart4 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">+{stats.totalProjectsChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">+{stats.activeProjectsChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">+{stats.teamMembersChange} new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
              <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">+{stats.completionRateChange}% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[300px] w-full"
              config={{
                completed: {
                  label: "Completed",
                  color: "#4287f5",
                },
                inProgress: {
                  label: "In Progress",
                  color: "#6666FF",
                },
              }}
            >
              <BarChart data={projectStatus} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar
                  dataKey="completed"
                  fill="var(--color-completed)"
                  radius={8}
                />
                <Bar
                  dataKey="inProgress"
                  fill="var(--color-inProgress)"
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[300px] w-full"
              config={{
                completed: { label: "Completed", color: "#6666FF" },
                inprogress: { label: "In Progress", color: "#4287f5" },
                pending: { label: "Pending", color: "#7986cb" },
                overdue: { label: "Overdue", color: "#4caf50" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="name" hideLabel />}
                  />
                  <Pie data={tasksOverview} dataKey="value" nameKey="name" innerRadius={60}>
                    {tasksOverview.map((entry, index) => {
                      const colorKey = entry.name.toLowerCase().replace(/\s+/g, "");
                      return (
                        <Cell
                          key={entry.name}
                          fill={`var(--color-${colorKey})`}
                        />
                      );
                    })}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{project.name}</div>
                      <Badge variant={
                        project.priority === "high"
                          ? "destructive"
                          : project.priority === "medium"
                            ? "warning"
                            : "default"
                      }>
                        {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{project.description}</div>
                    <div className="w-full bg-muted h-2 rounded-full mt-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-1">
                      <span>Progress: {project.progress}%</span>
                      <span>Deadline: {formatDate(project.deadline)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Priority Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3">
                  <div className={cn("w-2 h-2 mt-1.5 rounded-full",
                    task.priority === "high" && "bg-destructive",
                    task.priority === "medium" && "bg-warning",
                    task.priority === "low" && "bg-primary"
                  )}></div>
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{task.description}</div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {task.project}
                        </Badge>
                        <Badge variant="outline" className={cn(
                          task.status === "in-progress" && "bg-blue-100 text-blue-800 border-blue-200"
                        )}>
                          {task.status === "in-progress" ? "In Progress" : "To Do"}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-primary/10">
                            {task.assignee.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}
