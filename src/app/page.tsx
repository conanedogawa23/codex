"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, DownloadIcon, CheckCircleIcon, Clock, BarChart4, Users } from "lucide-react"
import { ChartContainer } from "@/components/ui/chart"
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts"
import { PageLayout } from "@/components/layout/page-layout"
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CustomChartContainer } from "@/components/ui/chart-container"
import { formatDate } from "@/lib/date-utils"

// Import mock data
import mockData from "@/lib/mock-data.json"

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
    <PageLayout
      title="Dashboard"
      breadcrumbs={[
        {
          icon: BreadcrumbIcons.Dashboard,
          label: "Dashboard",
          isActive: true
        }
      ]}
    >
      <div className="flex justify-between items-center mb-6">
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
              className="h-[300px]"
              config={{
                completed: {
                  theme: { light: "#4ade80", dark: "#4ade80" }
                },
                inProgress: {
                  theme: { light: "#60a5fa", dark: "#60a5fa" }
                }
              }}
            >
              <BarChart data={projectStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Completed" fill="#4ade80" />
                <Bar dataKey="inProgress" name="In Progress" fill="#60a5fa" />
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
              className="h-[300px]"
              config={{
                "0": { theme: { light: "#4ade80", dark: "#4ade80" } },
                "1": { theme: { light: "#60a5fa", dark: "#60a5fa" } },
                "2": { theme: { light: "#f472b6", dark: "#f472b6" } },
                "3": { theme: { light: "#fb923c", dark: "#fb923c" } }
              }}
            >
              <PieChart>
                <Pie
                  data={tasksOverview}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {tasksOverview.map((entry, index) => {
                    const colors = ["#4ade80", "#60a5fa", "#f472b6", "#fb923c"];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomChartContainer
          title="Active Projects"
          className="col-span-1"
        >
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="flex items-center">
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{project.name}</div>
                    <Badge className={
                      project.priority === "high"
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : project.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
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
        </CustomChartContainer>

        <CustomChartContainer
          title="Priority Tasks"
          className="col-span-1"
        >
          <div className="space-y-4">
            {priorityTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 mt-1.5 rounded-full ${task.priority === "high"
                  ? "bg-red-500"
                  : task.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                  }`}></div>
                <div className="flex-1 space-y-1">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{task.description}</div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {task.project}
                      </Badge>
                      <Badge variant="outline" className={
                        task.status === "in-progress"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }>
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
        </CustomChartContainer>
      </div>
    </PageLayout>
  )
}
