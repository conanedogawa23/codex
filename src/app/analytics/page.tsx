"use client"

import React, { Suspense, useState } from 'react'
import { SidebarLayout } from '@/components/layout/sidebar-layout'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from 'next/dynamic'
import { ChartSkeleton } from '@/components/ui/chart-skeleton'
import { Calendar, ChevronDown, Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

// Import Charts component with dynamic import to avoid SSR issues
const Charts = dynamic(() => import('@/components/analytics/charts'), {
  ssr: false,
  loading: () => <ChartSkeleton />
})

// Mock data for analytics
const analyticsData = {
  projectPerformance: [
    { month: "Jan", successRate: 85, delayRate: 15 },
    { month: "Feb", successRate: 88, delayRate: 12 },
    { month: "Mar", successRate: 90, delayRate: 10 },
    { month: "Apr", successRate: 92, delayRate: 8 },
    { month: "May", successRate: 94, delayRate: 6 },
    { month: "Jun", successRate: 96, delayRate: 4 }
  ],
  teamPerformance: [
    { team: "Design", performance: 86, projects: 12 },
    { team: "Engineering", performance: 90, projects: 18 },
    { team: "Marketing", performance: 84, projects: 8 },
    { team: "Product", performance: 92, projects: 15 }
  ],
  resourceUtilization: [
    { resource: "Compute", used: 78, available: 22 },
    { resource: "Storage", used: 65, available: 35 },
    { resource: "Network", used: 82, available: 18 },
    { resource: "Memory", used: 55, available: 45 }
  ],
  modelAccuracy: [
    { model: "Model A", accuracy: 92 },
    { model: "Model B", accuracy: 89 },
    { model: "Model C", accuracy: 94 },
    { model: "Model D", accuracy: 87 },
    { model: "Model E", accuracy: 91 }
  ]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [dataFilter, setDataFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("performance")

  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1 hidden sm:block">Track your projects and team performance metrics</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Calendar className="h-4 w-4 mr-2" />
                  {timeRange === "6months" ? "Last 6 Months" :
                    timeRange === "3months" ? "Last 3 Months" :
                      timeRange === "12months" ? "Last 12 Months" : "Custom"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-4 space-y-2">
                  <h4 className="font-medium text-sm">Time Range</h4>
                  <Separator className="my-2" />
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="3months"
                        checked={timeRange === "3months"}
                        onCheckedChange={() => setTimeRange("3months")}
                      />
                      <Label htmlFor="3months">Last 3 Months</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="6months"
                        checked={timeRange === "6months"}
                        onCheckedChange={() => setTimeRange("6months")}
                      />
                      <Label htmlFor="6months">Last 6 Months</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="12months"
                        checked={timeRange === "12months"}
                        onCheckedChange={() => setTimeRange("12months")}
                      />
                      <Label htmlFor="12months">Last 12 Months</Label>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Data Filter
                  <Badge className="ml-2 h-5 bg-primary text-primary-foreground">
                    {dataFilter !== "all" ? 1 : 0}
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-4 space-y-2">
                  <h4 className="font-medium text-sm">Data Filters</h4>
                  <Separator className="my-2" />
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="all"
                        checked={dataFilter === "all"}
                        onCheckedChange={() => setDataFilter("all")}
                      />
                      <Label htmlFor="all">All Data</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="success-only"
                        checked={dataFilter === "success-only"}
                        onCheckedChange={() => setDataFilter("success-only")}
                      />
                      <Label htmlFor="success-only">Success Metrics Only</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="top-performing"
                        checked={dataFilter === "top-performing"}
                        onCheckedChange={() => setDataFilter("top-performing")}
                      />
                      <Label htmlFor="top-performing">Top Performers</Label>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="outline" className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="performance"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <TabsList className="bg-transparent h-10 p-0">
                <TabsTrigger
                  value="performance"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Project Performance
                </TabsTrigger>
                <TabsTrigger
                  value="teams"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Team Performance
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Resource Utilization
                </TabsTrigger>
                <TabsTrigger
                  value="models"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Model Accuracy
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Chart content */}
          <div className="pt-6">
            <Suspense fallback={<ChartSkeleton />}>
              <Card className="p-6 border rounded-lg">
                <Charts analyticsData={analyticsData} />
              </Card>
            </Suspense>
          </div>
        </Tabs>
      </div>
    </SidebarLayout>
  )
} 