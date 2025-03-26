import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { 
  Download, 
  ChevronDown, 
  Filter, 
  Calendar,
  ChevronRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  BarChart,
  BarChart3,
  GitCommit,
  Code,
  User,
  AlignLeft
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function ReleasesReportPage() {
  // Get releases from mock data
  const { items: releases, metrics } = mockData.releases
  
  // Format date to human-readable
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Helper to get user by ID
  const getUserById = (userId: string) => {
    return mockData.users.find(user => user.id === userId);
  };
  
  // Helper to get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Helper to get status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'planned':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Planned</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };
  
  // Helper to get change type badge styles
  const getChangeBadge = (type: string) => {
    switch (type) {
      case 'feature':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Feature</Badge>;
      case 'bugfix':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Bug Fix</Badge>;
      case 'improvement':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Improvement</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{type}</Badge>;
    }
  };
  
  // Helper to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'planned':
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Helper to format number with + for positive values
  const formatChangeNumber = (num: number) => {
    return num > 0 ? `+${num}%` : `${num}%`;
  };
  
  // Helper to get change color
  const getChangeColor = (num: number) => {
    return num > 0 ? 'text-green-600' : 'text-red-600';
  };
  
  return (
    <SidebarLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Release Reports</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 Months
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
        <div className="overflow-auto">
          <Tabs defaultValue="overview" className="w-auto">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Summary metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Release Frequency</h3>
                <div className="text-2xl font-bold mt-1">{metrics.releaseFrequency.monthly}<span className="text-sm font-normal text-muted-foreground ml-1">per month</span></div>
              </div>
              <BarChart3 className="h-8 w-8 text-primary/20" />
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${getChangeColor(metrics.releaseFrequency.changeFromLastQuarter)}`}>
                {formatChangeNumber(metrics.releaseFrequency.changeFromLastQuarter)}
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last quarter</span>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Release Quality</h3>
                <div className="text-2xl font-bold mt-1">{(metrics.releaseQuality.defectRate * 100).toFixed(1)}%<span className="text-sm font-normal text-muted-foreground ml-1">defect rate</span></div>
              </div>
              <CheckCircle2 className="h-8 w-8 text-primary/20" />
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${getChangeColor(-metrics.releaseQuality.changeFromLastQuarter)}`}>
                {formatChangeNumber(-metrics.releaseQuality.changeFromLastQuarter)}
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last quarter</span>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Development Efficiency</h3>
                <div className="text-2xl font-bold mt-1">{metrics.developmentEfficiency.averageCycleTime}<span className="text-sm font-normal text-muted-foreground ml-1">days</span></div>
              </div>
              <Clock className="h-8 w-8 text-primary/20" />
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${getChangeColor(-metrics.developmentEfficiency.changeFromLastQuarter)}`}>
                {formatChangeNumber(-metrics.developmentEfficiency.changeFromLastQuarter)}
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last quarter</span>
            </div>
          </Card>
        </div>

        {/* Release Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold">Release History</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="all-status">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-types">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="major">Major Release</SelectItem>
                <SelectItem value="minor">Minor Release</SelectItem>
                <SelectItem value="patch">Patch Release</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Release Cards */}
        <div className="grid grid-cols-1 gap-4">
          {releases.map(release => {
            const manager = getUserById(release.manager);
            
            return (
              <Card key={release.id} className="overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3">
                        {getStatusIcon(release.status)}
                      </div>
                      
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-lg">{release.version}</span>
                          {getStatusBadge(release.status)}
                          {release.name.toLowerCase().includes('patch') && (
                            <Badge variant="outline">Patch</Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold">{release.name}</h3>
                        <p className="text-muted-foreground mt-1">{release.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-start md:justify-end items-center gap-x-6 gap-y-3 mt-2 md:mt-0">
                      <div>
                        <div className="text-sm text-muted-foreground">Release Date</div>
                        <div className="font-medium">{formatDate(release.releaseDate)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Manager</div>
                        <div className="font-medium flex items-center gap-2">
                          {manager && (
                            <>
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={manager.avatar} alt={manager.name} />
                                <AvatarFallback className="text-xs">{getInitials(manager.name)}</AvatarFallback>
                              </Avatar>
                              <span>{manager.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="ml-auto">
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-border">
                  <div className="p-4 flex items-center gap-3">
                    <div className="bg-violet-100 text-violet-800 p-2 rounded-md">
                      <BarChart className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Features</div>
                      <div className="font-medium">{release.features}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center gap-3">
                    <div className="bg-red-100 text-red-800 p-2 rounded-md">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Bug Fixes</div>
                      <div className="font-medium">{release.bugfixes}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-800 p-2 rounded-md">
                      <GitCommit className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Commits</div>
                      <div className="font-medium">{release.commits}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center gap-3">
                    <div className="bg-amber-100 text-amber-800 p-2 rounded-md">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Contributors</div>
                      <div className="font-medium">{release.contributors.length}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-800 p-2 rounded-md">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Dev Time</div>
                      <div className="font-medium">{release.developmentTime} days</div>
                    </div>
                  </div>
                </div>
                
                {release.changes && release.changes.length > 0 && (
                  <div className="px-6 py-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <AlignLeft className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-medium">Notable Changes</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {release.changes.slice(0, 4).map((change, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {getChangeBadge(change.type)}
                          <span className="text-sm">{change.title}</span>
                          <Badge variant="outline" className="ml-auto">{change.scope}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </SidebarLayout>
  )
} 