"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Sun,
  Moon,
  Laptop,
  Bell,
  Shield,
  Plug,
  User,
  Key,
  Save,
  Palette,
  Layout,
  UserCheck,
  Eye,
  Mail,
  Share2,
  Smartphone,
  ScreenShare,
  Plus
} from "lucide-react"

// Import mock data
import mockData from "@/data/mock-data.json"

export default function SettingsPage() {
  const { settings } = mockData;
  const { notifications, display, privacy, integrations } = settings;

  const [activeTheme, setActiveTheme] = useState(display.theme)
  const [primaryColor, setPrimaryColor] = useState("#0284c7")
  const [accentColor, setAccentColor] = useState("#f97316")
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const handleThemeChange = (value: string) => {
    setActiveTheme(value)
    setUnsavedChanges(true)
  }

  const handleColorChange = (type: 'primary' | 'accent', value: string) => {
    if (type === 'primary') {
      setPrimaryColor(value)
    } else {
      setAccentColor(value)
    }
    setUnsavedChanges(true)
  }

  const handleSwitchChange = () => {
    setUnsavedChanges(true)
  }

  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
          </div>
          <Button
            className="gap-2"
            disabled={!unsavedChanges}
            aria-disabled={!unsavedChanges}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <TabsList className="bg-transparent p-0 h-12">
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="display"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Display
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger
                  value="integrations"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                >
                  <Plug className="h-4 w-4 mr-2" />
                  Integrations
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Account Tab */}
          <TabsContent value="account" className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@acme.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="manager">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">Project Manager</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Update Profile</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Security
                  </CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Change Password</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Settings
                </CardTitle>
                <CardDescription>Customize the appearance of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Color Mode</h3>
                  <RadioGroup
                    defaultValue={display.theme}
                    value={activeTheme}
                    onValueChange={handleThemeChange}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                  >
                    <div>
                      <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                      <Label
                        htmlFor="theme-light"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sun className="h-12 w-12 mb-3 text-orange-500" />
                        <span className="font-medium">Light</span>
                        <span className="text-xs text-muted-foreground mt-1">Bright theme for day use</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                      <Label
                        htmlFor="theme-dark"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Moon className="h-12 w-12 mb-3 text-blue-600" />
                        <span className="font-medium">Dark</span>
                        <span className="text-xs text-muted-foreground mt-1">Dark theme for night use</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                      <Label
                        htmlFor="theme-system"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Laptop className="h-12 w-12 mb-3 text-gray-500" />
                        <span className="font-medium">System</span>
                        <span className="text-xs text-muted-foreground mt-1">Follow system preference</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Color Palette</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label>Primary Color</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          className="w-14 h-10 p-1"
                        />
                        <Input
                          value={primaryColor.toUpperCase()}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          className="font-mono uppercase"
                        />
                      </div>
                      <div className="h-10 rounded-md" style={{ backgroundColor: primaryColor }} />
                    </div>
                    <div className="space-y-3">
                      <Label>Accent Color</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          value={accentColor}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          className="w-14 h-10 p-1"
                        />
                        <Input
                          value={accentColor.toUpperCase()}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          className="font-mono uppercase"
                        />
                      </div>
                      <div className="h-10 rounded-md" style={{ backgroundColor: accentColor }} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">UI Density</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="font-medium">Compact</Label>
                        <p className="text-sm text-muted-foreground">Less padding, more content</p>
                      </div>
                      <Label className="font-medium">Comfortable</Label>
                    </div>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className="w-full"
                      onValueChange={() => setUnsavedChanges(true)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    Email Notifications
                  </h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Project Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified when a project is updated</p>
                      </div>
                      <Switch id="email-project-updates" defaultChecked={notifications.projectUpdates} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Task Assignments</Label>
                        <p className="text-sm text-muted-foreground">Get notified when you&apos;re assigned to a task</p>
                      </div>
                      <Switch id="email-task-assignments" defaultChecked={notifications.taskAssignments} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Deadline Reminders</Label>
                        <p className="text-sm text-muted-foreground">Get reminded about upcoming deadlines</p>
                      </div>
                      <Switch id="email-deadline-reminders" defaultChecked={notifications.deadlineReminders} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Weekly Summaries</Label>
                        <p className="text-sm text-muted-foreground">Receive a weekly activity summary</p>
                      </div>
                      <Switch id="email-weekly-summaries" defaultChecked={notifications.email} onCheckedChange={handleSwitchChange} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    Push Notifications
                  </h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Enable Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch id="push-notifications" defaultChecked={notifications.push} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Message Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified when you&apos;re receive a message</p>
                      </div>
                      <Switch id="push-messages" defaultChecked={true} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Task Status Changes</Label>
                        <p className="text-sm text-muted-foreground">Get notified when a task status changes</p>
                      </div>
                      <Switch id="push-task-status" defaultChecked={true} onCheckedChange={handleSwitchChange} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <ScreenShare className="h-5 w-5 text-muted-foreground" />
                    In-App Notifications
                  </h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Desktop Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show notifications on your desktop</p>
                      </div>
                      <Switch id="desktop-notifications" defaultChecked={notifications.desktop} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Sound Alerts</Label>
                        <p className="text-sm text-muted-foreground">Play a sound for new notifications</p>
                      </div>
                      <Switch id="sound-alerts" defaultChecked={true} onCheckedChange={handleSwitchChange} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Layout Settings
                </CardTitle>
                <CardDescription>Configure how content is displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dashboard Layout</h3>
                  <Separator />
                  <RadioGroup defaultValue={display.dashboardLayout} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <RadioGroupItem value="grid" id="layout-grid" className="peer sr-only" />
                      <Label
                        htmlFor="layout-grid"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="grid grid-cols-2 gap-2 w-full mb-3">
                          <div className="bg-muted h-8 rounded-md"></div>
                          <div className="bg-muted h-8 rounded-md"></div>
                          <div className="bg-muted h-8 rounded-md"></div>
                          <div className="bg-muted h-8 rounded-md"></div>
                        </div>
                        <span className="font-medium">Grid</span>
                        <span className="text-xs text-muted-foreground mt-1">Items arranged in a grid</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="list" id="layout-list" className="peer sr-only" />
                      <Label
                        htmlFor="layout-list"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="flex flex-col gap-2 w-full mb-3">
                          <div className="bg-muted h-5 rounded-md"></div>
                          <div className="bg-muted h-5 rounded-md"></div>
                          <div className="bg-muted h-5 rounded-md"></div>
                          <div className="bg-muted h-5 rounded-md"></div>
                        </div>
                        <span className="font-medium">List</span>
                        <span className="text-xs text-muted-foreground mt-1">Items in a vertical list</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="cards" id="layout-cards" className="peer sr-only" />
                      <Label
                        htmlFor="layout-cards"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="flex flex-col w-full mb-3">
                          <div className="bg-muted h-16 rounded-md mb-2"></div>
                          <div className="bg-muted h-16 rounded-md"></div>
                        </div>
                        <span className="font-medium">Cards</span>
                        <span className="text-xs text-muted-foreground mt-1">Items as detailed cards</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data View Preferences</h3>
                  <Separator />
                  <div className="grid gap-4 py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-completed" className="font-medium">Show Completed Items</Label>
                        <p className="text-sm text-muted-foreground">Display completed items in lists and dashboards</p>
                      </div>
                      <Switch id="show-completed" defaultChecked={display.showCompleted} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compact-view" className="font-medium">Compact View</Label>
                        <p className="text-sm text-muted-foreground">Use more condensed view for lists</p>
                      </div>
                      <Switch id="compact-view" defaultChecked={true} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-analytics" className="font-medium">Show Analytics</Label>
                        <p className="text-sm text-muted-foreground">Display analytics widgets on dashboards</p>
                      </div>
                      <Switch id="show-analytics" defaultChecked={true} onCheckedChange={handleSwitchChange} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control your privacy preferences and data sharing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-muted-foreground" />
                    Profile Visibility
                  </h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="public-profile" className="font-medium">Public Profile</Label>
                        <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                      </div>
                      <Switch id="public-profile" defaultChecked={privacy.publicProfile} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-active" className="font-medium">Show Active Status</Label>
                        <p className="text-sm text-muted-foreground">Show when you&apos;re online to others</p>
                      </div>
                      <Switch id="show-active" defaultChecked={privacy.showActiveStatus} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-email" className="font-medium">Show Email Address</Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your email</p>
                      </div>
                      <Switch id="show-email" defaultChecked={false} onCheckedChange={handleSwitchChange} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    Activity Tracking
                  </h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="activity-logs" className="font-medium">Activity Logs</Label>
                        <p className="text-sm text-muted-foreground">Track your activity in the app</p>
                      </div>
                      <Switch id="activity-logs" defaultChecked={true} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="usage-data" className="font-medium">Usage Data</Label>
                        <p className="text-sm text-muted-foreground">Collect data on how you use the app</p>
                      </div>
                      <Switch id="usage-data" defaultChecked={true} onCheckedChange={handleSwitchChange} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    Data Sharing
                  </h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="share-analytics" className="font-medium">Share Analytics</Label>
                        <p className="text-sm text-muted-foreground">Share anonymous usage data to improve the product</p>
                      </div>
                      <Switch id="share-analytics" defaultChecked={privacy.shareAnalytics} onCheckedChange={handleSwitchChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing" className="font-medium">Marketing Communications</Label>
                        <p className="text-sm text-muted-foreground">Receive marketing emails and updates</p>
                      </div>
                      <Switch id="marketing" defaultChecked={false} onCheckedChange={handleSwitchChange} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plug className="h-5 w-5" />
                  Connected Services
                </CardTitle>
                <CardDescription>Manage your connected integrations and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {integrations.map((integration, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary/10 text-primary rounded-md flex items-center justify-center font-bold">
                          {integration.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-base">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(('description' in integration && integration.description as string) ||
                              (integration.isConnected && integration.lastSynced
                                ? `Connected on ${new Date(integration.lastSynced).toLocaleDateString()}`
                                : "Not connected")
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-auto">
                        {integration.isConnected ? (
                          <>
                            <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                              Connected
                            </Badge>
                            <Button variant="outline" size="sm">Configure</Button>
                            <Button variant="ghost" size="sm">Disconnect</Button>
                          </>
                        ) : (
                          <Button>Connect</Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-dashed rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">Add New Integration</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Connect with other services and tools
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline">Browse Integrations</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  )
} 