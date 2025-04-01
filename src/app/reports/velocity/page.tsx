"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Download,
  ChevronDown,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/date-utils"
import { PageLayout } from "@/components/layout/page-layout"
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Import mock data
import mockData from "@/lib/mock-data.json"

export default function VelocityReportPage() {
  // State for filtering
  const [sprintCount, setSprintCount] = useState<string>("6")

  // Get sprint velocity data from mock data
  const sprints = mockData.reports?.velocity?.sprints || []

  // Get the number of sprints to display
  const sprintsToDisplay = sprintCount === "all"
    ? sprints
    : sprints.slice(0, parseInt(sprintCount))

  // Calculate average velocity and other metrics
  const avgCommitted = Math.round(sprints.reduce((sum, sprint) => sum + sprint.committedPoints, 0) / sprints.length)
  const avgCompleted = Math.round(sprints.reduce((sum, sprint) => sum + sprint.completedPoints, 0) / sprints.length)
  const completionRate = Math.round((avgCompleted / avgCommitted) * 100)

  // Calculate trend based on last 3 sprints
  const last3Sprints = sprints.slice(0, 3)
  const completionTrend = last3Sprints.length > 1
    ? last3Sprints[0].completedPoints > last3Sprints[1].completedPoints ? "up" :
      last3Sprints[0].completedPoints < last3Sprints[1].completedPoints ? "down" : "stable"
    : "stable"

  // Calculate the max value for chart scaling
  const maxValue = Math.max(...sprints.map(sprint => Math.max(sprint.committedPoints, sprint.completedPoints)))

  // Format data for Recharts
  const chartData = [...sprints].reverse().slice(0, 6).map(sprint => ({
    name: sprint.name,
    committed: sprint.committedPoints,
    completed: sprint.completedPoints
  }))

  return (
    <PageLayout
      title="Sprint Velocity"
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
          icon: BreadcrumbIcons.Time,
          label: "Sprint Velocity",
          isActive: true
        }
      ]}
    >
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground mt-1">Track team performance across sprints</p>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 90 Days
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Report tabs */}
        <Tabs defaultValue="velocity" className="w-full">
          <TabsList>
            <TabsTrigger value="velocity">Velocity</TabsTrigger>
            <TabsTrigger value="burndown">Burndown</TabsTrigger>
            <TabsTrigger value="cumulative">Cumulative Flow</TabsTrigger>
            <TabsTrigger value="cycle">Cycle Time</TabsTrigger>
          </TabsList>

          <TabsContent value="velocity" className="mt-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Committed</h3>
                <div className="text-3xl font-bold">{avgCommitted} <span className="text-sm font-normal text-muted-foreground">story points</span></div>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Completed</h3>
                <div className="text-3xl font-bold">{avgCompleted} <span className="text-sm font-normal text-muted-foreground">story points</span></div>
                <div className="flex items-center mt-2">
                  {completionTrend === "up" && (
                    <div className="text-green-600 flex items-center text-sm">
                      <ArrowUp className="h-3 w-3 mr-1" /> Trending up
                    </div>
                  )}
                  {completionTrend === "down" && (
                    <div className="text-red-600 flex items-center text-sm">
                      <ArrowDown className="h-3 w-3 mr-1" /> Trending down
                    </div>
                  )}
                  {completionTrend === "stable" && (
                    <div className="text-gray-600 flex items-center text-sm">
                      <Minus className="h-3 w-3 mr-1" /> Stable
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Completion Rate</h3>
                <div className="text-3xl font-bold">{completionRate}%</div>
              </Card>
            </div>

            {/* Sprint Velocity Chart */}
            <Card className="p-6 mb-6">
              <h3 className="font-medium mb-4">Sprint Velocity Chart</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      domain={[0, Math.ceil(maxValue * 1.1)]}
                      label={{
                        value: 'Story Points',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }}
                    />
                    <Tooltip
                      formatter={(value) => [`${value} points`, '']}
                      labelFormatter={(label) => `Sprint: ${label}`}
                    />
                    <Legend />
                    <Bar
                      dataKey="committed"
                      name="Committed Points"
                      fill="#93c5fd"
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                    <Bar
                      dataKey="completed"
                      name="Completed Points"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Sprint selection */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sprint Details</h2>

              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {mockData.projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={sprintCount}
                  onValueChange={setSprintCount}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sprint Count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Last 3 sprints</SelectItem>
                    <SelectItem value="6">Last 6 sprints</SelectItem>
                    <SelectItem value="all">All sprints</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sprint details */}
            <Card className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {sprintsToDisplay.map(sprint => (
                  <div key={sprint.id} className="p-4 border rounded">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold">{sprint.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Committed</p>
                        <p className="font-medium">{sprint.committedPoints} points</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="font-medium">{sprint.completedPoints} points</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                        <p className="font-medium">{Math.round((sprint.completedPoints / sprint.committedPoints) * 100)}%</p>
                      </div>

                      {/* Simple progress bar */}
                      <div className="flex-1 ml-4">
                        <div className="w-full bg-gray-100 rounded-full h-4">
                          <div
                            className="bg-blue-600 h-4 rounded-full"
                            style={{ width: `${(sprint.completedPoints / sprint.committedPoints) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="burndown">
            <div className="py-10 text-center">
              <h3 className="text-xl font-medium">Burndown Charts</h3>
              <p className="text-muted-foreground mt-2">Sprint burndown charts will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="cumulative">
            <div className="py-10 text-center">
              <h3 className="text-xl font-medium">Cumulative Flow</h3>
              <p className="text-muted-foreground mt-2">Cumulative flow diagrams will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="cycle">
            <div className="py-10 text-center">
              <h3 className="text-xl font-medium">Cycle Time</h3>
              <p className="text-muted-foreground mt-2">Cycle time analytics will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
} 