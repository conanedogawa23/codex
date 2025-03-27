"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Edit,
  AlertCircle,
  Calendar,
  ChevronDown
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function TasksPage() {
  const { tasks: allTasks, users, projects } = mockData

  // State for filters
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [projectFilter, setProjectFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [timeRange, setTimeRange] = useState("30days")

  // Apply filters
  const tasks = allTasks.filter(task => {
    // Status filter
    if (statusFilter === "completed" && task.status !== "completed") return false
    if (statusFilter === "in-progress" && task.status !== "in-progress") return false
    if (statusFilter === "todo" && task.status !== "todo") return false

    // Priority filter
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false

    // Project filter
    if (projectFilter !== "all" && task.projectId !== projectFilter) return false

    // Assignee filter
    if (assigneeFilter !== "all" && task.assignedTo !== assigneeFilter) return false

    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  // Function to get user info by ID
  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  // Function to get project info by ID
  const getProjectById = (projectId: string) => {
    return projects.find(project => project.id === projectId);
  };

  // Function to get user's initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      case 'in-progress':
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
      case 'todo':
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'todo':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  // Function to get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
      case 'medium':
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
      case 'low':
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
    }
  };

  // Format date to human-readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Check if date is past due
  const isPastDue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today && new Date(dateString).setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1 hidden sm:block">Manage and track your tasks and assignments</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Calendar className="h-4 w-4 mr-2" />
                  {timeRange === "30days" ? "Last 30 Days" :
                    timeRange === "14days" ? "Last 14 Days" :
                      timeRange === "7days" ? "Last 7 Days" : "All Time"}
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
                        id="7days"
                        checked={timeRange === "7days"}
                        onCheckedChange={() => setTimeRange("7days")}
                      />
                      <Label htmlFor="7days">Last 7 Days</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="14days"
                        checked={timeRange === "14days"}
                        onCheckedChange={() => setTimeRange("14days")}
                      />
                      <Label htmlFor="14days">Last 14 Days</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="30days"
                        checked={timeRange === "30days"}
                        onCheckedChange={() => setTimeRange("30days")}
                      />
                      <Label htmlFor="30days">Last 30 Days</Label>
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
                    (projectFilter !== "all" ? 1 : 0) +
                    (assigneeFilter !== "all" ? 1 : 0) +
                    (searchQuery ? 1 : 0)
                  }</Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 space-y-4">
                  <h4 className="font-medium">Filter Tasks</h4>
                  <Separator />
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="search-filter">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search-filter"
                          placeholder="Search tasks..."
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
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
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
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="project-filter">Project</Label>
                      <Select
                        value={projectFilter}
                        onValueChange={setProjectFilter}
                      >
                        <SelectTrigger id="project-filter">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Projects</SelectItem>
                          {projects.map(project => (
                            <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="assignee-filter">Assignee</Label>
                      <Select
                        value={assigneeFilter}
                        onValueChange={setAssigneeFilter}
                      >
                        <SelectTrigger id="assignee-filter">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Assignees</SelectItem>
                          {users.map(user => (
                            <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
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
                        setProjectFilter("all");
                        setAssigneeFilter("all");
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

            <Button className="h-10 gap-1.5">
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <TabsList className="bg-transparent h-10 p-0">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  All Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="my"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  My Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Pending
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="all" className="pt-6">
            {/* Task Listing */}
            <Card className="border rounded-lg overflow-hidden shadow-sm">
              {/* Table header - visible only on larger screens */}
              <div className="bg-muted/50 py-3 px-4 hidden md:grid md:grid-cols-12 text-sm font-medium text-muted-foreground border-b">
                <div className="col-span-5">Task</div>
                <div className="col-span-2">Project</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-2">Assignee</div>
                <div className="col-span-1">Due Date</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              <div>
                {tasks.length > 0 ? (
                  tasks.map((task, index) => {
                    const assignedUser = getUserById(task.assignedTo);
                    const project = getProjectById(task.projectId);

                    return (
                      <div key={task.id}>
                        {index > 0 && <Separator />}
                        {/* Mobile view */}
                        <div className="block md:hidden p-4">
                          <div className="flex justify-between items-start mb-3 gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="mt-1 shrink-0">
                                {getStatusIcon(task.status)}
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-sm sm:text-base line-clamp-1">{task.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-2 mt-1">{task.description}</div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div>
                              <span className="text-xs text-muted-foreground">Project</span>
                              <div className="font-medium truncate">{project?.name}</div>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Assignee</span>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={assignedUser?.avatar} />
                                  <AvatarFallback className="text-[10px]">{assignedUser ? getInitials(assignedUser.name) : 'UN'}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium truncate">{assignedUser?.name}</span>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <span className="text-xs text-muted-foreground">Due Date</span>
                              <div className={`font-medium ${isPastDue(task.dueDate) ? 'text-red-600' : ''}`}>{formatDate(task.dueDate)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Desktop view */}
                        <div className="hidden md:grid md:grid-cols-12 md:items-center py-3 px-4">
                          <div className="col-span-5 flex items-center gap-3 min-w-0">
                            <div>
                              {getStatusIcon(task.status)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium line-clamp-1">{task.title}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{task.description}</div>
                            </div>
                          </div>
                          <div className="col-span-2 truncate">
                            <span className="text-sm font-medium">{project?.name}</span>
                          </div>
                          <div className="col-span-1">
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={assignedUser?.avatar} />
                                <AvatarFallback>{assignedUser ? getInitials(assignedUser.name) : 'UN'}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium truncate">{assignedUser?.name}</span>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <span className={`text-sm ${isPastDue(task.dueDate) ? 'text-red-600 font-medium' : ''}`}>{formatDate(task.dueDate)}</span>
                          </div>
                          <div className="col-span-1 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-12 border-t">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or create a new task</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Placeholder content for other tabs */}
          <TabsContent value="my">
            <div className="pt-6">
              <Card className="border rounded-lg overflow-hidden shadow-sm">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">My Assigned Tasks</h3>
                  <p className="text-muted-foreground">Tasks specifically assigned to you will appear here</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="pt-6">
              <Card className="border rounded-lg overflow-hidden shadow-sm">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Completed Tasks</h3>
                  <p className="text-muted-foreground">Tasks that have been completed will appear here</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="pt-6">
              <Card className="border rounded-lg overflow-hidden shadow-sm">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Pending Tasks</h3>
                  <p className="text-muted-foreground">Tasks that are pending review or approval will appear here</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  )
} 