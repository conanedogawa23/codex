"use client"

import React, { useState, useEffect } from 'react'
import { ChartSkeleton } from "@/components/ui/chart-skeleton"
import { TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

type AnalyticsData = {
  projectPerformance: {
    month: string;
    successRate: number;
    delayRate: number;
  }[];
  teamPerformance: {
    team: string;
    performance: number;
    projects: number;
  }[];
  resourceUtilization: {
    resource: string;
    used: number;
    available: number;
  }[];
  modelAccuracy: {
    model: string;
    accuracy: number;
  }[];
}

// Interface for pie chart label
interface PieChartLabelProps {
  name: string;
  percent: number;
}

export default function Charts({ analyticsData }: { analyticsData: AnalyticsData }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ChartsComponents, setChartsComponents] = useState<Record<string, any> | null>(null);

  // Dynamically import Recharts components on client-side only
  useEffect(() => {
    const loadCharts = async () => {
      try {
        const recharts = await import('recharts');
        setChartsComponents(recharts);
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to load chart components:', err);
        setHasError(true);
      }
    };

    loadCharts();
  }, []);

  // Show loading state
  if (!isLoaded) {
    return (
      <>
        <TabsContent value="performance" className="pt-3 sm:pt-4">
          <ChartSkeleton />
        </TabsContent>
        <TabsContent value="teams" className="pt-3 sm:pt-4">
          <ChartSkeleton />
        </TabsContent>
        <TabsContent value="resources" className="pt-3 sm:pt-4">
          <ChartSkeleton />
        </TabsContent>
        <TabsContent value="models" className="pt-3 sm:pt-4">
          <ChartSkeleton />
        </TabsContent>
      </>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <>
        <TabsContent value="performance" className="pt-3 sm:pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-destructive">
                Failed to load charts. Please refresh the page.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </>
    );
  }

  // Create destructured variables for easier use

  const {
    LineChart, BarChart, PieChart, RadarChart,
    Line, Bar, Pie, Radar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
    PolarGrid, PolarAngleAxis, PolarRadiusAxis
  } = ChartsComponents!;

  const { projectPerformance, teamPerformance, resourceUtilization, modelAccuracy } = analyticsData;

  // Create data for resource utilization pie chart
  const resourceUtilizationData = resourceUtilization.map(item => ({
    name: item.resource,
    value: item.used
  }));

  return (
    <>
      <TabsContent value="performance" className="pt-3 sm:pt-4">
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-lg sm:text-xl">Project Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 sm:pt-2">
            <ChartContainer
              className="h-[250px] xs:h-[300px] sm:h-[400px] w-full max-w-full overflow-hidden"
              config={{
                successRate: {
                  theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" }
                },
                delayRate: {
                  theme: { light: "hsl(var(--chart-2))", dark: "hsl(var(--chart-2))" }
                }
              }}
            >
              { }
              <LineChart data={projectPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="successRate"
                  name="Success Rate (%)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="delayRate"
                  name="Delay Rate (%)"
                  strokeWidth={2}
                />
              </LineChart>
              { }
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="teams" className="pt-3 sm:pt-4">
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-lg sm:text-xl">Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 sm:pt-2">
            <ChartContainer
              className="h-[250px] xs:h-[300px] sm:h-[400px] w-full max-w-full overflow-hidden"
              config={{
                performance: {
                  theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" }
                }
              }}
            >
              { }
              <BarChart data={teamPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar
                  dataKey="performance"
                  name="Performance Score"
                  barSize={50}
                />
              </BarChart>
              { }
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="resources" className="pt-3 sm:pt-4">
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-lg sm:text-xl">Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 sm:pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <ChartContainer
                className="h-[250px] xs:h-[300px] sm:h-[400px] w-full max-w-full overflow-hidden"
                config={{
                  "0": { theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" } },
                  "1": { theme: { light: "hsl(var(--chart-2))", dark: "hsl(var(--chart-2))" } },
                  "2": { theme: { light: "hsl(var(--chart-3))", dark: "hsl(var(--chart-3))" } },
                  "3": { theme: { light: "hsl(var(--chart-4))", dark: "hsl(var(--chart-4))" } }
                }}
              >
                { }
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={resourceUtilizationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={0}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }: PieChartLabelProps) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {resourceUtilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-${index})`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                </PieChart>
                { }
              </ChartContainer>
              <div className="flex flex-col justify-center p-2 sm:p-4">
                {resourceUtilization.map((item, index) => (
                  <div key={index} className="mb-3 sm:mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm sm:text-base">{item.resource}</span>
                      <span className="text-sm sm:text-base font-medium">{item.used}% Used</span>
                    </div>
                    <div className="w-full bg-secondary h-2 sm:h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full"
                        style={{ width: `${item.used}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="models" className="pt-3 sm:pt-4">
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-lg sm:text-xl">Model Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 sm:pt-2">
            <ChartContainer
              className="h-[250px] xs:h-[300px] sm:h-[400px] w-full max-w-full overflow-hidden"
              config={{
                accuracy: {
                  theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" }
                }
              }}
            >
              { }
              <RadarChart outerRadius={100} data={modelAccuracy} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="model" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[75, 100]} tick={{ fontSize: 12 }} />
                <Radar
                  name="Accuracy (%)"
                  dataKey="accuracy"
                  stroke="var(--color-accuracy)"
                  fill="var(--color-accuracy)"
                  fillOpacity={0.6}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip />
              </RadarChart>
              { }
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  )
} 