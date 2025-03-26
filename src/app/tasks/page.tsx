import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Clock, 
  Filter, 
  ListFilter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2,
  Edit,
  AlertCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function TasksPage() {
  const { tasks, users, projects } = mockData

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
        return "bg-green-100 text-green-800 border-green-200";
      case 'in-progress':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'todo':
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
        return "bg-red-100 text-red-800 border-red-200";
      case 'medium':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'low':
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Filters and search */}
        <div className="flex justify-between items-center">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="my">My Tasks</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-9 w-[250px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Task Listing */}
        <Card className="border rounded-lg overflow-hidden">
          <div className="bg-muted py-3 px-4 grid grid-cols-12 text-sm font-medium text-muted-foreground">
            <div className="col-span-5">Task</div>
            <div className="col-span-2">Project</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-1">Due Date</div>
            <div className="col-span-1">Actions</div>
          </div>
          
          <div>
            {tasks.map((task, index) => {
              const assignedUser = getUserById(task.assignedTo);
              const project = getProjectById(task.projectId);
              
              return (
                <div key={task.id}>
                  {index > 0 && <Separator />}
                  <div className="py-3 px-4 grid grid-cols-12 items-center hover:bg-muted/50 transition-colors">
                    {/* Task Info */}
                    <div className="col-span-5 flex items-start gap-3">
                      <div className="mt-1">
                        {getStatusIcon(task.status)}
                      </div>
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(task.status)}
                          >
                            {task.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {task.completionPercentage}% complete
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project */}
                    <div className="col-span-2">
                      <div className="text-sm font-medium">{project?.name}</div>
                    </div>
                    
                    {/* Priority */}
                    <div className="col-span-1">
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(task.priority)}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    
                    {/* Assignee */}
                    <div className="col-span-2 flex items-center gap-2">
                      {assignedUser && (
                        <>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={assignedUser.avatar} alt={assignedUser.name} />
                            <AvatarFallback className="text-xs">{getInitials(assignedUser.name)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{assignedUser.name}</span>
                        </>
                      )}
                    </div>
                    
                    {/* Due Date */}
                    <div className="col-span-1 text-sm">
                      <span className={isPastDue(task.dueDate) && task.status !== 'completed' ? 'text-red-600 font-medium' : ''}>
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                    
                    {/* Actions */}
                    <div className="col-span-1 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </SidebarLayout>
  )
} 