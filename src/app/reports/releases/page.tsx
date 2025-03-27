"use client"

import { useState } from "react"
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
  BarChart3,
  GitCommit,
  Code,
  User,
  AlignLeft,
  SearchIcon
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { formatDate } from "@/lib/utils"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function ReleasesReportPage() {
  // Get releases from mock data
  const { items: allReleases, metrics } = mockData.releases

  // State for filters
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("6months")

  // Apply filters
  const releases = allReleases.filter(release => {
    // Status filter
    if (statusFilter !== "all" && release.status !== statusFilter) {
      return false
    }

    // Type filter (simplified - in a real app would be more robust)
    if (typeFilter === "major" && !release.version.includes(".0.0")) {
      return false
    }
    if (typeFilter === "minor" && !release.version.match(/\.\d+\.0$/)) {
      return false
    }
    if (typeFilter === "patch" && !release.name.toLowerCase().includes('patch')) {
      return false
    }

    // Search filter
    if (searchQuery && !release.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !release.version.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !release.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  // Format date specifically for release dates (Month Day, Year)
  function formatReleaseDate(date: Date | string | number): string {
    const dateObj = typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date

    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

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
        return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">In Progress</Badge>;
      case 'planned':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200">Planned</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200">{status}</Badge>;
    }
  };

  // Helper to get change type badge styles
  const getChangeBadge = (type: string) => {
    switch (type) {
      case 'feature':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200">Feature</Badge>;
      case 'bugfix':
        return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">Bug Fix</Badge>;
      case 'improvement':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">Improvement</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200">{type}</Badge>;
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
      <div className="p-4 sm:p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Release Reports</h1>
            <p className="text-muted-foreground mt-1 hidden sm:block">Track and analyze your release performance and metrics</p>
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
                  Filters
                  <Badge className="ml-2 h-5 bg-primary text-primary-foreground">{
                    (statusFilter !== "all" ? 1 : 0) + (typeFilter !== "all" ? 1 : 0) + (searchQuery ? 1 : 0)
                  }</Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 space-y-4">
                  <h4 className="font-medium">Filter Releases</h4>
                  <Separator />
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="search-filter">Search</Label>
                      <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search-filter"
                          placeholder="Search by name or version..."
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
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="type-filter">Release Type</Label>
                      <Select
                        value={typeFilter}
                        onValueChange={setTypeFilter}
                      >
                        <SelectTrigger id="type-filter">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="major">Major Release</SelectItem>
                          <SelectItem value="minor">Minor Release</SelectItem>
                          <SelectItem value="patch">Patch Release</SelectItem>
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
                        setTypeFilter("all");
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

            <Button variant="outline" className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <TabsList className="bg-transparent h-10 p-0">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Timeline
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="metrics"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-10 data-[state=active]:text-foreground"
                >
                  Metrics
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6 pt-6">
            {/* Summary metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
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

              <Card className="p-6 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
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

              <Card className="p-6 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Development Efficiency</h3>
                    <div className="text-2xl font-bold mt-1">{metrics.developmentEfficiency.averageCycleTime.toFixed(1)}<span className="text-sm font-normal text-muted-foreground ml-1">days</span></div>
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

            {/* Release History Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold">Release History</h2>

              <div className="flex items-center gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="h-9 w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger className="h-9 w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="major">Major Release</SelectItem>
                    <SelectItem value="minor">Minor Release</SelectItem>
                    <SelectItem value="patch">Patch Release</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Release Cards */}
            <div className="grid grid-cols-1 gap-4">
              {releases.length > 0 ? (
                releases.map(release => {
                  const manager = getUserById(release.manager);

                  return (
                    <Card key={release.id} className="overflow-hidden border rounded-lg">
                      <div className="p-6 border-b">
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

                              <h3 className="text-xl font-bold mb-2">{release.name}</h3>
                              <p className="text-muted-foreground">{release.description}</p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center mb-1">
                              <div className="mr-8">
                                <span className="text-xs text-muted-foreground block">Release Date</span>
                                <span className="font-medium">{formatReleaseDate(release.releaseDate)}</span>
                              </div>

                              <div>
                                <span className="text-xs text-muted-foreground block">Manager</span>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={manager?.avatar} alt={manager?.name} />
                                    <AvatarFallback>{manager ? getInitials(manager.name) : 'UN'}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{manager?.name}</span>
                                </div>
                              </div>
                            </div>

                            <Button variant="ghost" size="sm" className="text-primary">
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-muted/30">
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary/5 rounded-md p-2">
                              <AlignLeft className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground block">Features</span>
                              <span className="font-medium">{release.features}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="bg-red-50 rounded-md p-2">
                              <Code className="h-4 w-4 text-red-500" />
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground block">Bug Fixes</span>
                              <span className="font-medium">{release.bugfixes}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="bg-blue-50 rounded-md p-2">
                              <GitCommit className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground block">Commits</span>
                              <span className="font-medium">{release.commits}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="bg-orange-50 rounded-md p-2">
                              <User className="h-4 w-4 text-orange-500" />
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground block">Contributors</span>
                              <span className="font-medium">{release.contributors?.length || 0}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="bg-green-50 rounded-md p-2">
                              <Clock className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground block">Dev Time</span>
                              <span className="font-medium">{release.developmentTime} days</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Notable Changes Section */}
                      {release.changes && release.changes.length > 0 && (
                        <div className="px-6 py-4 border-t">
                          <h4 className="font-medium text-sm mb-3">Notable Changes</h4>
                          <div className="space-y-2">
                            {release.changes.slice(0, 3).map((change, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                {getChangeBadge(change.type)}
                                <span>{change.title}</span>
                                <Badge variant="outline" className="ml-auto">{change.scope}</Badge>
                              </div>
                            ))}
                            {release.changes.length > 3 && (
                              <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                                View all {release.changes.length} changes
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/10">
                  <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No releases found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or time range</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="py-12 text-center">
              <h3 className="text-xl font-medium mb-2">Timeline View</h3>
              <p className="text-muted-foreground">A visual timeline of your release history will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="py-12 text-center">
              <h3 className="text-xl font-medium mb-2">Detailed Reports</h3>
              <p className="text-muted-foreground">Detailed reports and analytics will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="metrics">
            <div className="py-12 text-center">
              <h3 className="text-xl font-medium mb-2">Performance Metrics</h3>
              <p className="text-muted-foreground">Performance metrics and trend analysis will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  )
} 