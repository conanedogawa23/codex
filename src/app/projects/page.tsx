"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, SearchIcon, Filter, ChevronDown, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function ProjectsPage() {
  const { projects: allProjects } = mockData

  // State for filters
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("all")

  // Apply filters
  const projects = allProjects.filter(project => {
    // Status filter
    if (statusFilter !== "all" && project.status !== statusFilter) {
      return false
    }

    // Priority filter
    if (priorityFilter !== "all" && project.priority !== priorityFilter) {
      return false
    }

    // Category filter
    if (categoryFilter !== "all" && project.category !== categoryFilter) {
      return false
    }

    // Search filter
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  // Get unique categories for filter
  const categories = Array.from(new Set(allProjects.map(project => project.category)))

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
      case "planned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1 hidden sm:block">Manage and track your project portfolio</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Calendar className="h-4 w-4 mr-2" />
                  {timeRange === "quarter" ? "This Quarter" :
                    timeRange === "year" ? "This Year" :
                      timeRange === "month" ? "This Month" : "All Time"}
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
                        id="month"
                        checked={timeRange === "month"}
                        onCheckedChange={() => setTimeRange("month")}
                      />
                      <Label htmlFor="month">This Month</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="quarter"
                        checked={timeRange === "quarter"}
                        onCheckedChange={() => setTimeRange("quarter")}
                      />
                      <Label htmlFor="quarter">This Quarter</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="year"
                        checked={timeRange === "year"}
                        onCheckedChange={() => setTimeRange("year")}
                      />
                      <Label htmlFor="year">This Year</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="all"
                        checked={timeRange === "all"}
                        onCheckedChange={() => setTimeRange("all")}
                      />
                      <Label htmlFor="all">All Time</Label>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <Badge className="ml-2 h-5 bg-primary text-primary-foreground">{
                    (statusFilter !== "all" ? 1 : 0) +
                    (priorityFilter !== "all" ? 1 : 0) +
                    (categoryFilter !== "all" ? 1 : 0) +
                    (searchQuery ? 1 : 0)
                  }</Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 space-y-4">
                  <h4 className="font-medium">Filter Projects</h4>
                  <Separator />
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="search-filter">Search</Label>
                      <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search-filter"
                          placeholder="Search projects..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger id="status-filter">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="priority-filter">Priority</Label>
                      <Select
                        value={priorityFilter}
                        onValueChange={setPriorityFilter}
                      >
                        <SelectTrigger id="priority-filter">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="category-filter">Category</Label>
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <SelectTrigger id="category-filter">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStatusFilter("all");
                        setPriorityFilter("all");
                        setCategoryFilter("all");
                        setSearchQuery("");
                      }}
                    >
                      Reset Filters
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        document.dispatchEvent(new Event('close-popover'));
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <div className="relative ml-2 sm:ml-0">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-9 w-full sm:w-[200px] h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button className="h-10 gap-1.5">
              <PlusIcon className="h-4 w-4" />
              <span>New Project</span>
            </Button>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3 space-y-2">
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg line-clamp-1">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-xs sm:text-sm">{project.description}</CardDescription>
                    </div>
                    <Badge className={`${getStatusBadgeColor(project.status)}`}>{project.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 py-3">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs sm:text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Tasks:</span>
                        <span className="font-medium">{project.tasks.completed}/{project.tasks.total}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Priority:</span>
                        <Badge className={getPriorityBadgeColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium truncate ml-1">{project.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span className="font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t mt-auto">
                  <Button variant="ghost" className="w-full h-9 text-sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or create a new project</p>
          </div>
        )}
      </div>
    </SidebarLayout>
  )
} 