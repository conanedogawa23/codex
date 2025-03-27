"use client"

import React, { useState, useEffect } from 'react'
import { Sidebar } from "@/components/ui/sidebar"
import {
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar"
import {
  Home,
  BarChart3,
  FolderOpen,
  Settings,
  Users,
  LogOut,
  CheckSquare,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  BarChart,
  Package,
  Menu,
  X,
  Building2,
  Bell,
  Plus
} from "lucide-react"
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [reportsOpen, setReportsOpen] = useState(pathname?.startsWith('/reports'))
  const [isMobileView, setIsMobileView] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [organizationsOpen, setOrganizationsOpen] = useState(false)

  useEffect(() => {
    // Check if we're in a mobile view
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setIsMobileView(isMobile)
      if (isMobile && sidebarOpen) {
        setSidebarOpen(false)
      } else if (!isMobile && !sidebarOpen) {
        setSidebarOpen(true)
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileView && sidebarOpen) {
        const sidebar = document.getElementById('mobile-sidebar')
        const toggle = document.getElementById('sidebar-toggle')
        if (sidebar && !sidebar.contains(event.target as Node) &&
          toggle && !toggle.contains(event.target as Node)) {
          setSidebarOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileView, sidebarOpen])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobileView) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobileView])

  return (
    <SidebarProvider defaultOpen={!isMobileView}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Mobile overlay - shown when sidebar is open */}
        {isMobileView && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-200"
            aria-hidden="true"
          />
        )}

        {/* Mobile header - shown only on small screens */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-30 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-md w-9 h-9 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AI</span>
            </div>
            <span className="font-semibold text-xl">Codex</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">3</Badge>
            </Button>
            <ModeToggle />
            <Button
              id="sidebar-toggle"
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-10 w-10"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar - mobile version gets absolute positioning */}
        <div
          id="mobile-sidebar"
          className={`
            fixed md:relative h-full z-50 md:z-0
            transition-transform duration-300 ease-in-out
            ${isMobileView ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
            md:translate-x-0
          `}
        >
          <Sidebar className="border-r border-border">
            <SidebarHeader className="flex items-center justify-between h-16 px-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="bg-primary rounded-md w-9 h-9 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">AI</span>
                </div>
                <span className="font-semibold text-xl">Codex</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="md:block hidden">
                  <ModeToggle />
                </div>
                {isMobileView && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="h-8 w-8 md:hidden"
                    aria-label="Close sidebar"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </SidebarHeader>

            <div className="flex flex-col flex-1 overflow-y-auto">
              {/* Organization selector */}
              <div className="px-3 py-3">
                <button
                  onClick={() => setOrganizationsOpen(!organizationsOpen)}
                  className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src="/acme-logo.png" alt="Acme Inc." />
                      <AvatarFallback className="bg-primary/10 text-primary">A</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">Acme Inc.</span>
                      <span className="text-xs text-muted-foreground">Main workspace</span>
                    </div>
                  </div>
                  {organizationsOpen ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              {organizationsOpen && (
                <div className="px-3 pb-3">
                  <div className="bg-muted/50 rounded-md p-2 space-y-1">
                    <Link href="/organization/acme" className="flex items-center gap-3 p-2 text-sm rounded-md hover:bg-background">
                      <Avatar className="h-6 w-6 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary">A</AvatarFallback>
                      </Avatar>
                      <span>Acme Inc.</span>
                    </Link>
                    <Link href="/organization/startup" className="flex items-center gap-3 p-2 text-sm rounded-md hover:bg-background">
                      <Avatar className="h-6 w-6 border border-border">
                        <AvatarFallback className="bg-green-500/10 text-green-500">S</AvatarFallback>
                      </Avatar>
                      <span>Startup LLC</span>
                    </Link>
                    <Link href="/organization/new" className="flex items-center gap-3 p-2 text-sm rounded-md text-primary hover:bg-background">
                      <div className="h-6 w-6 border border-dashed border-primary rounded-full flex items-center justify-center">
                        <Plus className="h-3 w-3" />
                      </div>
                      <span>Add organization</span>
                    </Link>
                  </div>
                </div>
              )}

              <SidebarContent className="py-4 px-3">
                <SidebarGroup>
                  <div className="mb-1 px-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2">MAIN MENU</p>
                  </div>
                  <SidebarMenu className="space-y-1.5">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/'}
                        className="group text-sm h-10 transition-colors">
                        <Link href="/" className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-5 h-5 ${pathname === '/' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            <Home className="h-5 w-5" />
                          </div>
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/tasks'}
                        className="group text-sm h-10 transition-colors">
                        <Link href="/tasks" className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-5 h-5 ${pathname === '/tasks' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            <CheckSquare className="h-5 w-5" />
                          </div>
                          <span>Tasks</span>
                          <Badge className="ml-auto bg-primary/10 text-primary hover:bg-primary/20 h-5">12</Badge>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Reports dropdown */}
                    <SidebarMenuItem>
                      <button
                        onClick={() => setReportsOpen(!reportsOpen)}
                        className={`group flex items-center justify-between w-full px-3 py-2 text-sm rounded-md hover:bg-accent/50 transition-colors ${reportsOpen ? 'bg-accent/50' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-5 h-5 ${pathname?.startsWith('/reports') ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            <TrendingUp className="h-5 w-5" />
                          </div>
                          <span>Reports</span>
                        </div>
                        <div className={`${reportsOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </button>
                    </SidebarMenuItem>

                    {reportsOpen && (
                      <div className="pl-11 space-y-1.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={pathname === '/reports/velocity'}
                            className="group text-sm h-9 transition-colors">
                            <Link href="/reports/velocity" className="flex items-center gap-3">
                              <div className={`flex items-center justify-center w-4 h-4 ${pathname === '/reports/velocity' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                <BarChart className="h-4 w-4" />
                              </div>
                              <span>Velocity</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={pathname === '/reports/releases'}
                            className="group text-sm h-9 transition-colors">
                            <Link href="/reports/releases" className="flex items-center gap-3">
                              <div className={`flex items-center justify-center w-4 h-4 ${pathname === '/reports/releases' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                <Package className="h-4 w-4" />
                              </div>
                              <span>Releases</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </div>
                    )}

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/analytics'}
                        className="group text-sm h-10 transition-colors">
                        <Link href="/analytics" className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-5 h-5 ${pathname === '/analytics' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            <BarChart3 className="h-5 w-5" />
                          </div>
                          <span>Analytics</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/projects'}
                        className="group text-sm h-10 transition-colors">
                        <Link href="/projects" className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-5 h-5 ${pathname === '/projects' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            <FolderOpen className="h-5 w-5" />
                          </div>
                          <span>Projects</span>
                          <Badge className="ml-auto bg-primary/10 text-primary hover:bg-primary/20 h-5">5</Badge>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                  <div className="mt-6 mb-1 px-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2">MANAGE</p>
                  </div>
                  <SidebarMenu className="space-y-1.5">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/users'}
                        className="group text-sm h-10 transition-colors">
                        <Link href="/users" className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-5 h-5 ${pathname === '/users' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            <Users className="h-5 w-5" />
                          </div>
                          <span>Users</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/organization'}
                        className="group text-sm h-10 transition-colors">
                        <Link href="/organization" className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-5 h-5 ${pathname === '/organization' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            <Building2 className="h-5 w-5" />
                          </div>
                          <span>Organization</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/settings'}
                        className="group text-sm h-10 transition-colors">
                        <Link href="/settings" className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-5 h-5 ${pathname === '/settings' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            <Settings className="h-5 w-5" />
                          </div>
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </div>

            <SidebarFooter className="border-t border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Bell className="h-4 w-4" />
                  <span>3 Notifications</span>
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src="/user-avatar.png" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@acme.com</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 w-full overflow-x-hidden overflow-y-auto">
          {/* Desktop header */}
          <header className="hidden md:flex h-16 items-center justify-between border-b border-border px-6 shrink-0">
            <h1 className="text-xl font-semibold">
              {pathname === '/' && 'Dashboard'}
              {pathname === '/tasks' && 'Tasks'}
              {pathname === '/projects' && 'Projects'}
              {pathname === '/analytics' && 'Analytics'}
              {pathname === '/users' && 'Users'}
              {pathname === '/settings' && 'Settings'}
              {pathname === '/reports/velocity' && 'Velocity Reports'}
              {pathname === '/reports/releases' && 'Release Reports'}
              {pathname === '/organization' && 'Organization'}
            </h1>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">3</Badge>
              </Button>
              <ModeToggle />
              <div className="flex items-center gap-3 border-l border-border pl-3 ml-1">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src="/user-avatar.png" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">John Doe</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 pt-16 md:pt-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}