import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, SearchIcon, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/date-utils"
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"

// Import mock data
import mockData from "@/lib/mock-data.json"

export default function UsersPage() {
  const { users } = mockData

  // Function to get user's initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Function to get project names by user role
  const getRelatedProjects = (department: string) => {
    // Filter projects by the user's department as a simple association
    return mockData.projects
      .filter(project => project.category === department || Math.random() > 0.5)
      .slice(0, 2) // Limit to 2 random projects
      .map(project => project.name);
  };

  // Function to generate user skills based on department
  const getUserSkills = (department: string, role: string) => {
    const commonSkills = ["Communication", "Teamwork"];
    const departmentSkills: Record<string, string[]> = {
      "Engineering": ["JavaScript", "React", "Node.js", "TypeScript", "API Design"],
      "Design": ["UI/UX", "Figma", "Wireframing", "Design Systems", "User Testing"],
      "Marketing": ["Content Strategy", "SEO", "Social Media", "Analytics", "Copywriting"],
      "Product": ["Roadmapping", "User Stories", "Prioritization", "Agile", "Market Research"],
    };

    // Get skills based on department or fallback to common skills
    const skills = [...commonSkills, ...(departmentSkills[department] || [])];

    // Add role-specific skills
    if (role.includes("Manager") || role.includes("Lead")) {
      skills.push("Leadership", "Strategic Planning");
    }

    // Return a random subset of skills (3-5)
    return skills.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 3);
  };

  return (
    <PageLayout
      title="Team Members"
      breadcrumbs={[
        {
          icon: BreadcrumbIcons.Dashboard,
          label: "Dashboard",
          href: "/"
        },
        {
          icon: BreadcrumbIcons.Users,
          label: "Users",
          isActive: true
        }
      ]}
    >
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage team members and their permissions</p>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user) => {
          // Generate user skills for this demo
          const skills = getUserSkills(user.department, user.role);
          // Generate related projects
          const projectNames = getRelatedProjects(user.department);

          return (
            <Card key={user.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold leading-none">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem>Manage Projects</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Department</p>
                      <p className="font-medium">{user.department}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Joined</p>
                      <p className="font-medium">{formatDate(user.joinDate)}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={user.status === "active" ? "default" : "destructive"} className="text-xs">
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Projects</p>
                    <div className="flex flex-wrap gap-1">
                      {projectNames.map((name, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </PageLayout>
  )
} 