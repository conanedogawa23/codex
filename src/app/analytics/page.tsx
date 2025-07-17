"use client"

import { Suspense } from "react"
import { Activity, BarChart3, LineChart, PieChart } from "lucide-react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartSkeleton } from "@/components/ui/chart-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Breadcrumb } from "@/components/ui/breadcrumbs"

// Import mock data
import mockData from "@/lib/mock-data.json"

const breadcrumbs: Breadcrumb[] = [
  { label: "Dashboard", href: "/" },
  { label: "Analytics", href: "/analytics", isCurrent: true },
]

export default function AnalyticsPage() {
  const { analytics, projects, users, tasks } = mockData

  // Calculate project completion growth
  const projectCompletionData = analytics.overview.projectCompletion;
  const currentCompletion = projectCompletionData[projectCompletionData.length - 1].value;
  const previousCompletion = projectCompletionData[projectCompletionData.length - 2].value;
  const completionChange = currentCompletion - previousCompletion;

  // Calculate average team performance
  const teamPerformanceData = analytics.overview.teamPerformance;
  const avgTaskCompletion = Math.round(
    teamPerformanceData.reduce((acc: number, team: any) => acc + (team.completed / team.tasks * 100), 0) /
    teamPerformanceData.length
  );

  // Calculate total tasks
  const totalTasks = teamPerformanceData.reduce((acc: number, team: any) => acc + team.tasks, 0);
  const completedTasks = teamPerformanceData.reduce((acc: number, team: any) => acc + team.completed, 0);

  // Calculate resource utilization - convert timeTracking to percentage
  const timeTrackingData = analytics.overview.timeTracking;
  const totalTime = Object.values(timeTrackingData).reduce((sum: number, time: any) => sum + time, 0);
  const developmentPercentage = Math.round((timeTrackingData.development / totalTime) * 100);

  // Calculate task distribution
  const taskDistribution = analytics.overview.taskDistribution;
  const developmentTasks = taskDistribution.development;

  // Format pie chart data
  const timeUtilizationData = Object.entries(analytics.overview.timeTracking).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value as number
  }));

  const taskDistributionData = Object.entries(analytics.overview.taskDistribution).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value as number
  }));

  // Format team performance data for bar chart
  const formattedTeamData = teamPerformanceData.map(team => ({
    name: team.name,
    completed: team.completed,
    pending: team.tasks - team.completed
  }));

  return (
    <SidebarLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Project Completion
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentCompletion}%</div>
              <p className="text-xs text-muted-foreground">
                +{completionChange}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Team Efficiency
              </CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {avgTaskCompletion}%
              </div>
              <p className="text-xs text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Development Time
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {developmentPercentage}%
              </div>
              <p className="text-xs text-muted-foreground">
                of total tracked time
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Development Tasks
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {developmentTasks}%
              </div>
              <p className="text-xs text-muted-foreground">
                of total tasks by type
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Content */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <div className="pt-6">
            <Suspense fallback={<ChartSkeleton />}>
              <Card className="p-6 border rounded-lg">
                <Tabs defaultValue="projectCompletion" className="space-y-4">
                  <TabsList className="grid grid-cols-2 w-[400px]">
                    <TabsTrigger value="projectCompletion">Project Completion</TabsTrigger>
                    <TabsTrigger value="teamPerformance">Team Performance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="projectCompletion" className="space-y-4">
                    <ChartContainer
                      className="h-[350px] w-full"
                      config={{
                        value: {
                          label: "Completion Rate",
                          color: "#6666FF",
                        },
                      }}
                    >
                      <AreaChart
                        data={projectCompletionData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 12 }}
                          padding={{ left: 10, right: 10 }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tickFormatter={(value) => `${value}%`}
                          tick={{ fontSize: 12 }}
                        />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="value"
                          fill="var(--color-value)"
                          stroke="var(--color-value)"
                          fillOpacity={0.4}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </TabsContent>

                  <TabsContent value="teamPerformance" className="space-y-4">
                    <ChartContainer
                      className="h-[350px] w-full"
                      config={{
                        completed: {
                          label: "Completed Tasks",
                          color: "#6666FF",
                        },
                        pending: {
                          label: "Pending Tasks",
                          color: "#4287f5",
                        },
                      }}
                    >
                      <BarChart
                        data={formattedTeamData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          tick={{ fontSize: 12 }}
                        />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" />
                        <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" />
                      </BarChart>
                    </ChartContainer>
                  </TabsContent>
                </Tabs>
              </Card>
            </Suspense>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Time Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[300px] w-full"
                config={{
                  Development: { label: "Development", color: "#6666FF" },
                  Meetings: { label: "Meetings", color: "#4287f5" },
                  Planning: { label: "Planning", color: "#7986cb" },
                  Research: { label: "Research", color: "#4caf50" },
                  Other: { label: "Other", color: "#ff9800" },
                }}
              >
                <RechartsPieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie data={timeUtilizationData} dataKey="value" nameKey="name">
                    {timeUtilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                    ))}
                  </Pie>
                  <Legend />
                </RechartsPieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[300px] w-full"
                config={{
                  Development: { label: "Development", color: "#6666FF" },
                  Design: { label: "Design", color: "#4287f5" },
                  Marketing: { label: "Marketing", color: "#7986cb" },
                  Research: { label: "Research", color: "#4caf50" },
                  Other: { label: "Other", color: "#ff9800" },
                }}
              >
                <RechartsPieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie data={taskDistributionData} dataKey="value" nameKey="name">
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                    ))}
                  </Pie>
                  <Legend />
                </RechartsPieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  )
} 