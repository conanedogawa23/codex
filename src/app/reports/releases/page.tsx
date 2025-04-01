"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Download,
  ChevronDown,
  Filter,
  Calendar,
  BarChart3,
  CheckCircle2,
  Clock,
  CheckSquare
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDate } from "@/lib/date-utils"
import { PageLayout } from "@/components/layout/page-layout"
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"

// Import mock data
import mockData from "@/lib/mock-data.json"

export default function ReleasesReportPage() {
  // State for filters
  const [statusFilter, setStatusFilter] = useState("all")

  // Get releases from mock data
  const { reports } = mockData
  const releases = reports?.releases || []
  const metrics = reports?.metrics || {}

  // Filter releases based on status
  const filteredReleases = releases.filter(release => {
    if (statusFilter !== "all" && release.status !== statusFilter) {
      return false
    }
    return true
  })

  // Format change number with + for positive values
  const formatChangeNumber = (num: number) => {
    return num > 0 ? `+${num}%` : `${num}%`
  }

  // Get change color
  const getChangeColor = (num: number) => {
    return num > 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <PageLayout
      title="Release Reports"
      breadcrumbs={[
        {
          icon: BreadcrumbIcons.Dashboard,
          label: "Dashboard",
          href: "/"
        },
        {
          icon: BreadcrumbIcons.Reports,
          label: "Reports",
          href: "/reports"
        },
        {
          icon: BreadcrumbIcons.Time,
          label: "Releases",
          isActive: true
        }
      ]}
    >
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground mt-1">Track and analyze your release performance</p>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 90 Days
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b mb-6">
          <TabsList className="bg-transparent">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          {/* Summary metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-6 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Release Frequency</h3>
                  <div className="text-2xl font-bold mt-1">{metrics.releaseFrequency?.monthly}<span className="text-sm font-normal text-muted-foreground ml-1">per month</span></div>
                </div>
                <BarChart3 className="h-8 w-8 text-primary/20" />
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${getChangeColor(metrics.releaseFrequency?.changeFromLastQuarter || 0)}`}>
                  {formatChangeNumber(metrics.releaseFrequency?.changeFromLastQuarter || 0)}
                </span>
                <span className="text-xs text-muted-foreground ml-2">vs last quarter</span>
              </div>
            </Card>

            <Card className="p-6 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Release Quality</h3>
                  <div className="text-2xl font-bold mt-1">{metrics.releaseQuality?.defectRate ? (metrics.releaseQuality.defectRate * 100).toFixed(1) : "0"}%<span className="text-sm font-normal text-muted-foreground ml-1">defect rate</span></div>
                </div>
                <CheckCircle2 className="h-8 w-8 text-primary/20" />
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${getChangeColor(-(metrics.releaseQuality?.changeFromLastQuarter || 0))}`}>
                  {formatChangeNumber(-(metrics.releaseQuality?.changeFromLastQuarter || 0))}
                </span>
                <span className="text-xs text-muted-foreground ml-2">vs last quarter</span>
              </div>
            </Card>

            <Card className="p-6 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Development Efficiency</h3>
                  <div className="text-2xl font-bold mt-1">{metrics.developmentEfficiency?.averageCycleTime?.toFixed(1)}<span className="text-sm font-normal text-muted-foreground ml-1">days</span></div>
                </div>
                <Clock className="h-8 w-8 text-primary/20" />
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${getChangeColor(-(metrics.developmentEfficiency?.changeFromLastQuarter || 0))}`}>
                  {formatChangeNumber(-(metrics.developmentEfficiency?.changeFromLastQuarter || 0))}
                </span>
                <span className="text-xs text-muted-foreground ml-2">vs last quarter</span>
              </div>
            </Card>
          </div>

          {/* Release list */}
          <div className="grid gap-4">
            {filteredReleases.length > 0 ? (
              filteredReleases.map(release => (
                <div key={release.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{release.name}</h2>
                      <div className="flex items-center gap-2 my-1">
                        <Badge variant={release.status === "completed" ? "default" : "outline"}>
                          {release.status === "completed" ? "Completed" : release.status === "in-progress" ? "In Progress" : "Planned"}
                        </Badge>
                        <span className="text-muted-foreground">{release.version}</span>
                      </div>
                      <p className="text-muted-foreground mt-1">{release.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Release Date</p>
                      <p className="font-medium">{formatDate(release.releaseDate)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Features</p>
                      <p className="font-medium">{release.features}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bug Fixes</p>
                      <p className="font-medium">{release.bugfixes}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Commits</p>
                      <p className="font-medium">{release.commits}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contributors</p>
                      <p className="font-medium">{release.contributors?.length || 0}</p>
                    </div>
                  </div>

                  {release.changes && release.changes.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Notable Changes</h3>
                      <ul className="space-y-1">
                        {release.changes.map((change, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Badge variant="outline">{change.type}</Badge>
                            <span>{change.title}</span>
                            <Badge variant="secondary" className="ml-auto">{change.scope}</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <CheckSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                <h3 className="mt-4 text-lg font-medium">No releases found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="py-10 text-center">
            <h3 className="text-xl font-medium">Detailed Reports</h3>
            <p className="text-muted-foreground mt-2">Detailed reports will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="py-10 text-center">
            <h3 className="text-xl font-medium">Performance Metrics</h3>
            <p className="text-muted-foreground mt-2">Performance metrics will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
} 