"use client"

import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, DownloadIcon } from "lucide-react"
import { ChartContainer } from "@/components/ui/chart"
import { BarChart, PieChart, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts"

// Import mock data
import mockData from "@/lib/mock-data.json"

export default function Home() {
  // Use the mock data from our JSON file
  const { dashboard } = mockData
  const { stats, projectStatus, tasksOverview } = dashboard

  return (
    <SidebarLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">+{stats.totalProjectsChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">+{stats.activeProjectsChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">+{stats.teamMembersChange} new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">+{stats.completionRateChange}% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[300px]"
              config={{
                completed: {
                  theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" }
                },
                inProgress: {
                  theme: { light: "hsl(var(--chart-2))", dark: "hsl(var(--chart-2))" }
                }
              }}
            >
              <BarChart data={projectStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Completed" />
                <Bar dataKey="inProgress" name="In Progress" />
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
                "0": { theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" } },
                "1": { theme: { light: "hsl(var(--chart-2))", dark: "hsl(var(--chart-2))" } },
                "2": { theme: { light: "hsl(var(--chart-3))", dark: "hsl(var(--chart-3))" } },
                "3": { theme: { light: "hsl(var(--chart-4))", dark: "hsl(var(--chart-4))" } }
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
                  {tasksOverview.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`var(--color-${index})`} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}
