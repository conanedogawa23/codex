import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { 
  BarChart, LineChart, PieChart, RadarChart,
  Bar, Line, Pie, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function AnalyticsPage() {
  const { analytics } = mockData;
  const { projectPerformance, teamPerformance, resourceUtilization, modelAccuracy } = analytics;

  // Create data for resource utilization pie chart
  const resourceUtilizationData = resourceUtilization.map(item => ({
    name: item.resource,
    value: item.used
  }));

  return (
    <SidebarLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>

      <Tabs defaultValue="performance" className="mb-6">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-[400px]"
                config={{
                  successRate: { 
                    theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" } 
                  },
                  delayRate: { 
                    theme: { light: "hsl(var(--chart-2))", dark: "hsl(var(--chart-2))" } 
                  }
                }}
              >
                <LineChart data={projectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
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
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-[400px]"
                config={{
                  performance: { 
                    theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" } 
                  }
                }}
              >
                <BarChart data={teamPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="team" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="performance" 
                    name="Performance Score" 
                    barSize={50}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer 
                  className="h-[400px]"
                  config={{
                    "0": { theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" } },
                    "1": { theme: { light: "hsl(var(--chart-2))", dark: "hsl(var(--chart-2))" } },
                    "2": { theme: { light: "hsl(var(--chart-3))", dark: "hsl(var(--chart-3))" } },
                    "3": { theme: { light: "hsl(var(--chart-4))", dark: "hsl(var(--chart-4))" } }
                  }}
                >
                  <PieChart>
                    <Pie
                      data={resourceUtilizationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {resourceUtilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`var(--color-${index})`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ChartContainer>
                <div className="flex flex-col justify-center">
                  {resourceUtilization.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>{item.resource}</span>
                        <span>{item.used}% Used</span>
                      </div>
                      <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
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
        
        <TabsContent value="models" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-[400px]"
                config={{
                  accuracy: { 
                    theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" } 
                  }
                }}
              >
                <RadarChart outerRadius={150} data={modelAccuracy}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="model" />
                  <PolarRadiusAxis angle={90} domain={[75, 100]} />
                  <Radar 
                    name="Accuracy (%)" 
                    dataKey="accuracy" 
                    stroke="var(--color-accuracy)" 
                    fill="var(--color-accuracy)" 
                    fillOpacity={0.6} 
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SidebarLayout>
  )
} 