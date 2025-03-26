import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { 
  Download, 
  ChevronDown, 
  Filter, 
  Calendar
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function VelocityReportPage() {
  // Get sprint velocity data from mock data
  const sprintVelocity = mockData.sprints.velocity
  
  // Calculate average velocity and other metrics
  const avgPlanned = Math.round(sprintVelocity.reduce((sum, sprint) => sum + sprint.planned, 0) / sprintVelocity.length)
  const avgCompleted = Math.round(sprintVelocity.reduce((sum, sprint) => sum + sprint.completed, 0) / sprintVelocity.length)
  const completionRate = Math.round((avgCompleted / avgPlanned) * 100)
  
  // Calculate the max value for chart scaling
  const maxValue = Math.max(...sprintVelocity.map(sprint => Math.max(sprint.planned, sprint.completed)))
  
  return (
    <SidebarLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sprint Velocity</h1>
        
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
        <div>
          <Tabs defaultValue="velocity" className="w-auto">
            <TabsList>
              <TabsTrigger value="velocity">Velocity</TabsTrigger>
              <TabsTrigger value="burndown">Burndown</TabsTrigger>
              <TabsTrigger value="cumulative">Cumulative Flow</TabsTrigger>
              <TabsTrigger value="cycle">Cycle Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Planned</h3>
            <div className="text-3xl font-bold">{avgPlanned} <span className="text-sm font-normal text-muted-foreground">story points</span></div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Completed</h3>
            <div className="text-3xl font-bold">{avgCompleted} <span className="text-sm font-normal text-muted-foreground">story points</span></div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Completion Rate</h3>
            <div className="text-3xl font-bold">{completionRate}%</div>
          </Card>
        </div>

        {/* Sprint selection */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sprint Performance</h2>
          
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
            
            <Select defaultValue="8">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sprint Count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">Last 4 sprints</SelectItem>
                <SelectItem value="8">Last 8 sprints</SelectItem>
                <SelectItem value="12">Last 12 sprints</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chart */}
        <Card className="p-6">
          <div className="flex flex-col h-full">
            {/* Chart container */}
            <div className="relative h-[350px] mt-6">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    {Math.round(maxValue - (maxValue / 5) * i)}
                  </div>
                ))}
              </div>
              
              {/* Chart area */}
              <div className="absolute left-14 right-0 top-0 bottom-10 border-l border-b border-border">
                {/* Horizontal grid lines */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-full border-t border-border border-dashed" 
                    style={{ top: `${(i * 100) / 5}%` }}
                  />
                ))}
                
                {/* Bars */}
                <div className="absolute inset-0 flex items-end pt-1">
                  {sprintVelocity.map((sprint) => {
                    const barWidth = `${100 / sprintVelocity.length / 2}%`
                    const spacing = `${100 / sprintVelocity.length}%`
                    const plannedHeight = `${(sprint.planned / maxValue) * 100}%`
                    const completedHeight = `${(sprint.completed / maxValue) * 100}%`
                    
                    return (
                      <div 
                        key={sprint.sprint} 
                        className="relative h-full flex items-end justify-center"
                        style={{ width: spacing }}
                      >
                        {/* Planned bar */}
                        <div 
                          className="absolute bg-blue-200 rounded-sm"
                          style={{ 
                            height: plannedHeight, 
                            width: barWidth,
                            left: `${parseInt(barWidth) / 2}%`,
                          }}
                        />
                        
                        {/* Completed bar */}
                        <div 
                          className="absolute bg-blue-600 rounded-sm"
                          style={{ 
                            height: completedHeight, 
                            width: barWidth,
                            left: `calc(50% + ${parseInt(barWidth) / 2}%)`,
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute left-14 right-0 bottom-0 h-10 flex">
                {sprintVelocity.map((sprint) => (
                  <div 
                    key={sprint.sprint} 
                    className="flex-1 text-center text-xs text-muted-foreground"
                  >
                    {sprint.sprint}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-8 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 rounded-sm" />
                <span className="text-sm text-muted-foreground">Planned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                <span className="text-sm text-muted-foreground">Completed</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Table */}
        <Card className="overflow-hidden border rounded-lg">
          <div className="bg-muted py-3 px-4 grid grid-cols-5 text-sm font-medium text-muted-foreground">
            <div>Sprint</div>
            <div>Planned Points</div>
            <div>Completed Points</div>
            <div>Completion Rate</div>
            <div>Trend</div>
          </div>
          
          <div>
            {sprintVelocity.map((sprint, index) => {
              const rate = Math.round((sprint.completed / sprint.planned) * 100)
              const prevRate = index > 0 
                ? Math.round((sprintVelocity[index-1].completed / sprintVelocity[index-1].planned) * 100) 
                : null
              
              // Determine trend
              let trend = null
              if (prevRate !== null) {
                if (rate > prevRate) trend = "up"
                else if (rate < prevRate) trend = "down"
                else trend = "same"
              }
              
              return (
                <div key={sprint.sprint} className="py-3 px-4 grid grid-cols-5 items-center border-t border-border">
                  <div className="font-medium">{sprint.sprint}</div>
                  <div>{sprint.planned} points</div>
                  <div>{sprint.completed} points</div>
                  <div>{rate}%</div>
                  <div>
                    {trend === "up" && <span className="text-green-600">↑</span>}
                    {trend === "down" && <span className="text-red-600">↓</span>}
                    {trend === "same" && <span className="text-gray-400">→</span>}
                    {trend === null && "-"}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </SidebarLayout>
  )
} 