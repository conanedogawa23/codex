import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function SettingsPage() {
  const { settings } = mockData;
  const { notifications, display, privacy, integrations } = settings;

  return (
    <SidebarLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="notifications" className="mb-6">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Channels</h3>
                <Separator />
                <div className="grid gap-4 py-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch id="email-notifications" defaultChecked={notifications.email} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch id="push-notifications" defaultChecked={notifications.push} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                    <Switch id="desktop-notifications" defaultChecked={notifications.desktop} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Events</h3>
                <Separator />
                <div className="grid gap-4 py-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="project-updates">Project Updates</Label>
                    <Switch id="project-updates" defaultChecked={notifications.projectUpdates} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="task-assignments">Task Assignments</Label>
                    <Switch id="task-assignments" defaultChecked={notifications.taskAssignments} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="deadline-reminders">Deadline Reminders</Label>
                    <Switch id="deadline-reminders" defaultChecked={notifications.deadlineReminders} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="display" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize how the interface looks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Theme</h3>
                <Separator />
                <RadioGroup defaultValue={display.theme} className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                    <Label
                      htmlFor="theme-light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Light</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                    <Label
                      htmlFor="theme-dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-950 text-white p-4 hover:bg-gray-900 hover:text-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Dark</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                    <Label
                      htmlFor="theme-system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-br from-white to-gray-900 p-4 hover:bg-gray-100 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>System</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Dashboard Layout</h3>
                <Separator />
                <RadioGroup defaultValue={display.dashboardLayout} className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <RadioGroupItem value="grid" id="layout-grid" className="peer sr-only" />
                    <Label
                      htmlFor="layout-grid"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Grid</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="list" id="layout-list" className="peer sr-only" />
                    <Label
                      htmlFor="layout-list"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>List</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Other Preferences</h3>
                <Separator />
                <div className="grid gap-4 py-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-completed">Show Completed Items</Label>
                    <Switch id="show-completed" defaultChecked={display.showCompleted} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Data Sharing</h3>
                <Separator />
                <div className="grid gap-4 py-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="share-analytics">Share Analytics</Label>
                    <Switch id="share-analytics" defaultChecked={privacy.shareAnalytics} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="public-profile">Public Profile</Label>
                    <Switch id="public-profile" defaultChecked={privacy.publicProfile} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-active">Show Active Status</Label>
                    <Switch id="show-active" defaultChecked={privacy.showActiveStatus} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage your connected integrations and services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-secondary rounded-md flex items-center justify-center">
                        {integration.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        {integration.lastSynced && (
                          <p className="text-sm text-muted-foreground">
                            Last synced: {new Date(integration.lastSynced).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {integration.isConnected ? (
                        <>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Connected
                          </Badge>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </>
                      ) : (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SidebarLayout>
  )
} 