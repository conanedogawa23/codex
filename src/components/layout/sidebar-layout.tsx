"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  Home,
  BarChart,
  FolderOpen,
  Settings,
  Users,
  LogOut,
  CheckSquare,
  Menu,
  X,
  Building2,
  Bell,
  Search,
  ChevronDown,
  HelpCircle,
  Calendar,
  ChevronRight,
  Activity,
  FileText,
  GitBranch,
  Layers,
  FileCode,
  PanelLeft
} from "lucide-react"
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Import mock data
import mockData from '@/lib/mock-data.json'

// Helper to get icon by name
const getIconByName = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    Home: <Home className="h-4 w-4" />,
    CheckSquare: <CheckSquare className="h-4 w-4" />,
    FolderOpen: <FolderOpen className="h-4 w-4" />,
    FileCode: <FileCode className="h-4 w-4" />,
    BarChart: <BarChart className="h-4 w-4" />,
    Users: <Users className="h-4 w-4" />,
    Building2: <Building2 className="h-4 w-4" />,
    Settings: <Settings className="h-4 w-4" />,
    LogOut: <LogOut className="h-4 w-4" />,
    User: <Users className="h-4 w-4" />,
    FileText: <FileText className="h-4 w-4" />,
    HelpCircle: <HelpCircle className="h-4 w-4" />,
    Activity: <Activity className="h-5 w-5" />,
    GitBranch: <GitBranch className="h-4 w-4" />,
    Layers: <Layers className="h-4 w-4" />,
    Bell: <Bell className="h-4 w-4" />
  }

  return icons[iconName] || <div className="h-4 w-4" />
}

// Notification item component
interface NotificationItemProps {
  title: string
  description: string
  time: string
}

function NotificationItem({ title, description, time }: NotificationItemProps) {
  return (
    <div className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors">
      <div className="flex justify-between items-start">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground ml-2">{time}</p>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  )
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileView, setIsMobileView] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(
    pathname?.startsWith('/analytics') ? 'analytics' :
      pathname?.startsWith('/projects') ? 'projects' :
        pathname?.startsWith('/reports') ? 'reports' : null
  )

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

      // Auto-collapse sidebar on medium screens
      if (window.innerWidth < 1280 && window.innerWidth >= 768) {
        setSidebarCollapsed(true)
      } else if (window.innerWidth >= 1280) {
        setSidebarCollapsed(false)
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

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobileView) {
      setSidebarOpen(false)
    }

    // Set active dropdown based on pathname
    if (pathname?.startsWith('/analytics')) {
      setActiveDropdown('analytics')
    } else if (pathname?.startsWith('/projects')) {
      setActiveDropdown('projects')
    } else if (pathname?.startsWith('/reports')) {
      setActiveDropdown('reports')
    } else {
      setActiveDropdown(null)
    }
  }, [pathname, isMobileView])

  const { app, navigation, notifications, userMenu, usage } = mockData

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Overlay for mobile */}
      {isMobileView && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Simplified Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center px-4 md:px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle button with higher z-index */}
            <Button
              id="sidebar-toggle"
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden z-50"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/images/innovation-logo.svg"
                  alt="INNOVATION EN"
                  width={150}
                  height={36}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Search - Moved to the right side */}
            <div className="hidden md:flex relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks, projects, users..."
                  className="pl-9 w-64 h-9 bg-muted/40 border-muted focus-visible:bg-background"
                />
              </div>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9"
                >
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">{notifications.count}</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {notifications.items.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      title={notification.title}
                      description={notification.description}
                      time={notification.time}
                    />
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 rounded-full" size="sm">
                  <Avatar className="h-7 w-7 mr-2">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">{app.user.avatar.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm mr-1 hidden md:inline-block">{app.user.name}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{userMenu.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenu.items.map((item) => (
                  item.destructive ? (
                    <React.Fragment key={item.id}>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        {getIconByName(item.icon)} <span className="ml-2">{item.label}</span>
                      </DropdownMenuItem>
                    </React.Fragment>
                  ) : (
                    <DropdownMenuItem key={item.id}>
                      {getIconByName(item.icon)} <span className="ml-2">{item.label}</span>
                    </DropdownMenuItem>
                  )
                ))}
                <DropdownMenuSeparator />
                <Link href="/auth/login">
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="h-4 w-4" /> <span className="ml-2">Logout</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Enhanced Sidebar with Collapse Toggle at the Bottom */}
      <aside
        id="mobile-sidebar"
        className={`
          fixed left-0 top-0 bottom-0 bg-background border-r 
          pt-16 transition-all duration-300 ease-in-out
          ${isMobileView ? (sidebarOpen ? 'translate-x-0 z-50' : '-translate-x-full z-40') : 'translate-x-0 z-10'}
          ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'}
          md:translate-x-0 md:z-0 md:pt-16
          shadow-lg
        `}
        style={{
          width: isMobileView ? '280px' : sidebarCollapsed ? '80px' : '256px',
          overflowY: 'auto',
          height: '100vh'
        }}
      >
        <div className={`flex flex-col h-full overflow-y-auto ${sidebarCollapsed ? 'px-2' : 'px-4'} py-4`}>
          {/* Search bar on mobile */}
          {isMobileView && (
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks, projects, users..."
                className="pl-9 w-full h-9 bg-muted/40 border-muted"
              />
            </div>
          )}

          <nav className="space-y-1 overflow-y-auto">
            {/* Main Menu */}
            <div className={`mb-3 ${sidebarCollapsed ? 'pl-0 text-center' : 'pl-3'}`}>
              {!sidebarCollapsed && <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">{navigation.mainMenu.title}</p>}
              {sidebarCollapsed && <div className="h-5"></div>}
            </div>

            {/* Render main menu items */}
            {navigation.mainMenu.items.map((item) => (
              item.dropdown ? (
                <div key={item.id}>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className={`
                      flex items-center w-full gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                      ${pathname?.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground'} 
                      hover:bg-muted hover:text-foreground transition-colors
                      ${sidebarCollapsed ? 'justify-center' : 'justify-between'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0">
                        {getIconByName(item.icon)}
                      </span>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  {activeDropdown === item.id && !sidebarCollapsed && item.items && (
                    <div className="mt-1 ml-10 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-md text-sm
                            ${pathname === subItem.href ? 'text-primary font-medium' : 'text-muted-foreground'}
                            hover:bg-muted hover:text-foreground transition-colors
                          `}
                        >
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <EnhancedNavItem
                  key={item.id}
                  href={item.href}
                  icon={getIconByName(item.icon)}
                  label={item.label}
                  isActive={pathname === item.href}
                  badge={item.badge}
                  collapsed={sidebarCollapsed}
                />
              )
            ))}

            {/* Management Section */}
            <div className={`mt-6 mb-3 ${sidebarCollapsed ? 'pl-0 text-center' : 'pl-3'}`}>
              {!sidebarCollapsed && <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">{navigation.managementMenu.title}</p>}
              {sidebarCollapsed && <div className="border-t mb-6 mt-6"></div>}
            </div>

            {/* Render management menu items */}
            {navigation.managementMenu.items.map((item) => (
              <EnhancedNavItem
                key={item.id}
                href={item.href}
                icon={getIconByName(item.icon)}
                label={item.label}
                isActive={pathname === item.href}
                collapsed={sidebarCollapsed}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className={`mt-auto pt-4 border-t ${sidebarCollapsed ? 'text-center' : ''}`}>
            {!sidebarCollapsed && (
              <div className="px-3 mb-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span className="font-medium">{usage.title}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${usage.percentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {usage.percentage}% of your usage for {usage.period}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end px-3 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleSidebarCollapse}
                      className="h-9 w-9"
                    >
                      <PanelLeft className={`h-4 w-4 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{sidebarCollapsed ? 'Expand' : 'Collapse'} sidebar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`
        flex-1 overflow-auto pt-16 px-4 md:px-6 py-6 transition-all duration-300
        ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}
      `}>
        {children}
      </main>
    </div>
  )
}

// Nav item component with enhanced styling
function EnhancedNavItem({
  href,
  icon,
  label,
  isActive,
  badge,
  collapsed
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string;
  collapsed?: boolean;
}) {
  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={`
                flex items-center justify-center h-10 w-10 rounded-md mb-1 mx-auto
                ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
                transition-colors group relative
              `}
            >
              <span className="flex-shrink-0">{icon}</span>
              {badge && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  {badge}
                </Badge>
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
        ${isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }
        transition-colors
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
      {badge && (
        <Badge className="ml-auto bg-primary/10 text-primary hover:bg-primary/20 h-5 min-w-5 flex items-center justify-center">
          {badge}
        </Badge>
      )}
    </Link>
  )
}

// User icon for the dropdown
function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}