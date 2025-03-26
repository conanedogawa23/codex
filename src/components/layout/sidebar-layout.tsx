"use client"

import React, { useState } from 'react'
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
  Package
} from "lucide-react"
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { usePathname } from 'next/navigation'

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [reportsOpen, setReportsOpen] = useState(pathname?.startsWith('/reports'))

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between h-14 px-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
                <span className="text-primary-foreground font-bold">AI</span>
              </div>
              <span className="font-semibold">AI Project</span>
            </div>
            <ModeToggle />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/'}>
                    <Link href="/" className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/tasks'}>
                    <Link href="/tasks" className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5" />
                      <span>Tasks</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {/* Reports dropdown */}
                <SidebarMenuItem>
                  <button 
                    onClick={() => setReportsOpen(!reportsOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md hover:bg-accent"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Reports</span>
                    </div>
                    {reportsOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </SidebarMenuItem>
                
                {reportsOpen && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/reports/velocity'}>
                        <Link href="/reports/velocity" className="flex items-center gap-2 pl-9">
                          <BarChart className="h-4 w-4" />
                          <span>Velocity</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/reports/releases'}>
                        <Link href="/reports/releases" className="flex items-center gap-2 pl-9">
                          <Package className="h-4 w-4" />
                          <span>Releases</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/analytics'}>
                    <Link href="/analytics" className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/projects'}>
                    <Link href="/projects" className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      <span>Projects</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/users'}>
                    <Link href="/users" className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/settings'}>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border p-4">
            <SidebarMenuButton className="w-full">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1 overflow-auto">
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
} 