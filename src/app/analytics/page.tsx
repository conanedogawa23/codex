"use client"

import { Suspense } from "react"
import { Activity, BarChart3, LineChart, PieChart } from "lucide-react"
import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"
import { ChartSkeleton } from "@/components/ui/chart-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomChartContainer } from "@/components/ui/chart-container"
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

// Import mock data
import mockData from "@/lib/mock-data.json"

const COLORS = ['#5856D6', '#FF6B6B', '#4CAF50', '#FF9800', '#2196F3', '#673AB7'];

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
  const timeUtilizationData = Object.entries(analytics.overview.timeTracking).map(([key, value], index) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value as number,
    fill: COLORS[index % COLORS.length]
  }));

  const taskDistributionData = Object.entries(analytics.overview.taskDistribution).map(([key, value], index) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value as number,
    fill: COLORS[index % COLORS.length]
  }));

  // Format team performance data for bar chart
  const formattedTeamData = teamPerformanceData.map(team => ({
    name: team.name,
    completed: team.completed,
    pending: team.tasks - team.completed
  }));

  return (
    <PageLayout
      title="Analytics Dashboard"
      breadcrumbs={[
        {
          icon: BreadcrumbIcons.Dashboard,
          label: "Dashboard",
          href: "/"
        },
        {
          icon: BreadcrumbIcons.Charts,
          label: "Analytics",
          isActive: true
        }
      ]}
    >
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
                    <CustomChartContainer
                      title="Project Completion Rate Over Time"
                      icon={<LineChart className="h-4 w-4" />}
                    >
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={projectCompletionData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                          >
                            <defs>
                              <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#5856D6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#5856D6" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
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
                            <Tooltip
                              formatter={(value) => [`${value}%`, 'Completion Rate']}
                              labelFormatter={(label) => `Month: ${label}`}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="value"
                              name="Completion Rate"
                              stroke="#5856D6"
                              fillOpacity={1}
                              fill="url(#colorCompletion)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CustomChartContainer>
                  </TabsContent>

                  <TabsContent value="teamPerformance" className="space-y-4">
                    <CustomChartContainer
                      title="Team Performance Analysis"
                      icon={<BarChart3 className="h-4 w-4" />}
                    >
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
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
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="completed" name="Completed Tasks" stackId="a" fill="#5856D6" />
                            <Bar dataKey="pending" name="Pending Tasks" stackId="a" fill="#CCCCF6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CustomChartContainer>
                  </TabsContent>
                </Tabs>
              </Card>
            </Suspense>
          </div>
        </Tabs>

        {/* Resource Utilization and Task Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomChartContainer
            title="Time Utilization"
            icon={<PieChart className="h-4 w-4" />}
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={timeUtilizationData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {timeUtilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} hours`} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CustomChartContainer>

          <CustomChartContainer
            title="Task Distribution"
            icon={<Activity className="h-4 w-4" />}
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={taskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CustomChartContainer>
        </div>
      </div>
    </PageLayout>
  )
} 