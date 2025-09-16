"use client"

import { useState } from "react"
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
  ChevronDown,
  CheckSquare,
  Code2
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
import { formatDateWithOptions, cn } from "@/lib/utils"
import { SidebarLayout } from "@/components/layout/sidebar-layout"

// Import mock data
import mockData from "@/lib/mock-data.json"

// Helper to get status variant
const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success"
    case "in-progress":
      return "default"
    case "todo":
      return "secondary"
    default:
      return "secondary"
  }
}

// Helper to get priority variant
const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "warning"
    case "low":
      return "success"
    default:
      return "secondary"
  }
}

const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Tasks", href: "/tasks", isCurrent: true },
]

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
    if (statusFilter === "todo" && task.status !== "to-do") return false

    // Priority filter
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false

    // Project filter
    if (projectFilter !== "all" && task.project !== projectFilter) return false

    // Assignee filter
    if (assigneeFilter !== "all" && task.assignee.name !== assigneeFilter) return false

    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  // Function to get user info by ID
  const getUserById = (userId: string) => {
    return users.find(user => user.name === userId);
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

  // Format date specifically for task dates (Month Day, Year)
  function formatTaskDate(date: Date | string | number): string {
    return formatDateWithOptions(date, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Function to open Kiro IDE for a specific task
  const openInKiro = (taskId: string, taskTitle: string) => {
    const projectPath = "/Users/saran/codex_proj/codex_plugin_v2";

    try {
      // Try using Kiro's URL scheme with the specific project path
      const kiroUrl = `kiro://open?path=${encodeURIComponent(projectPath)}`;
      window.location.href = kiroUrl;
    } catch (error) {
      console.warn('Failed to open Kiro via URL scheme, trying alternative method', error);

      // Fallback: Show instructions with the specific project path
      const message = `To open this task in Kiro IDE:

1. Open Terminal/Command Line
2. Run: kiro "${projectPath}"

Task: ${taskTitle} (${taskId})

This will open the codex_plugin_v2 project where you can work on the task.`;

      // Create a more user-friendly dialog with copy option
      const shouldCopy = confirm(message + '\n\nWould you like to copy the command to your clipboard?');

      if (shouldCopy) {
        const commandToCopy = `kiro "${projectPath}"`;

        try {
          navigator.clipboard.writeText(commandToCopy);
          alert(`Command copied to clipboard: ${commandToCopy}\n\nPaste it in your terminal.`);
        } catch (clipboardError) {
          console.error('Failed to copy to clipboard:', clipboardError);
          alert(`Please manually copy this command:\n${commandToCopy}`);
        }
      }
    }
  };

  return (
    <SidebarLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Tasks</h1>
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
              <PopoverContent className="w-80 p-4" align="end">
                <h4 className="font-medium text-sm">Filter Tasks</h4>
                <Separator className="my-2" />
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="todo">To-do</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Priority</Label>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by priority" />
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
                    <Label>Project</Label>
                    <Select value={projectFilter} onValueChange={setProjectFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by project" />
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
                    <Label>Assignee</Label>
                    <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Assignees</SelectItem>
                        {users.map(user => (
                          <SelectItem key={user.name} value={user.name}>{user.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-10 h-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button className="h-10">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Tasks <Badge className="ml-2">{tasks.length}</Badge></TabsTrigger>
            <TabsTrigger value="todo">To-do <Badge variant="secondary" className="ml-2">{tasks.filter(t => t.status === 'to-do').length}</Badge></TabsTrigger>
            <TabsTrigger value="in-progress">In Progress <Badge variant="default" className="ml-2">{tasks.filter(t => t.status === 'in-progress').length}</Badge></TabsTrigger>
            <TabsTrigger value="completed">Completed <Badge variant="success" className="ml-2">{tasks.filter(t => t.status === 'completed').length}</Badge></TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <TaskListView tasks={tasks} onOpenInKiro={openInKiro} />
          </TabsContent>
          <TabsContent value="todo" className="mt-4">
            <TaskListView tasks={tasks.filter(task => task.status === 'to-do')} onOpenInKiro={openInKiro} />
          </TabsContent>
          <TabsContent value="in-progress" className="mt-4">
            <TaskListView tasks={tasks.filter(task => task.status === 'in-progress')} onOpenInKiro={openInKiro} />
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <TaskListView tasks={tasks.filter(task => task.status === 'completed')} onOpenInKiro={openInKiro} />
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
}

const TaskListView = ({
  tasks,
  onOpenInKiro
}: {
  tasks: typeof mockData.tasks,
  onOpenInKiro: (taskId: string, taskTitle: string) => void
}) => {
  const isPastDue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    // Compare dates at midnight to avoid time-of-day issues
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <Card>
      <div className="divide-y divide-border">
        {tasks.map((task) => {
          const project = mockData.projects.find(p => p.id === task.project);
          const assignee = mockData.users.find(u => u.name === task.assignee.name);

          return (
            <div key={task.id} className="p-4 flex items-start gap-4 hover:bg-muted/50">
              <Checkbox className="mt-1" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{project?.name}</span>
                      <Separator orientation="vertical" className="h-4" />
                      <span>Task ID: {task.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                    <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onOpenInKiro(task.id, task.title)}
                      title="Open in Kiro IDE"
                    >
                      <Code2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-2">{task.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={assignee?.avatar} />
                      <AvatarFallback>{assignee?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{assignee?.name}</span>
                  </div>
                  <div className={cn("text-sm flex items-center gap-2", isPastDue(task.dueDate) && "text-destructive")}>
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateWithOptions(task.dueDate, { month: 'short', day: 'numeric' })}</span>
                    {isPastDue(task.dueDate) && <Badge variant="destructive">Past Due</Badge>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}; 