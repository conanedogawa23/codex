# Page Layout Usage Guide

This guide explains how to use the `PageLayout` component to maintain consistent styling and breadcrumb navigation across all pages in the application.

## Basic Usage

```tsx
"use client"

import { useState } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { BreadcrumbIcons } from "@/components/ui/custom-breadcrumb"

export default function YourPage() {
  // Your component state and logic

  return (
    <PageLayout 
      title="Your Page Title"
      breadcrumbs={[
        {
          icon: BreadcrumbIcons.Dashboard,
          label: "Dashboard",
          href: "/"
        },
        {
          icon: BreadcrumbIcons.Reports,
          label: "Your Section",
          href: "/your-section"
        },
        {
          icon: BreadcrumbIcons.Project,
          label: "Current Page",
          isActive: true
        }
      ]}
    >
      {/* Your page content goes here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cards, tables, or other content */}
      </div>
    </PageLayout>
  )
}
```

## Available Icons

The `BreadcrumbIcons` object provides several common icons for navigation:

- `BreadcrumbIcons.Dashboard` - Home/Dashboard icon
- `BreadcrumbIcons.Project` - Project/Chart icon
- `BreadcrumbIcons.Time` - Clock/Time icon
- `BreadcrumbIcons.Reports` - Document/Reports icon
- `BreadcrumbIcons.Users` - Users/Team icon

## Breadcrumb Structure

Each breadcrumb item has the following structure:

```tsx
type BreadcrumbItem = {
  icon: React.ReactNode; // The icon to display
  label: string; // The text to display
  href?: string; // Optional link (if not provided, item won't be clickable)
  isActive?: boolean; // Optional flag to indicate current page
};
```

## Example for Different Pages

### Users Page Example

```tsx
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
      label: "Team Members",
      isActive: true
    }
  ]}
>
  {/* User list content */}
</PageLayout>
```

### Settings Page Example

```tsx
<PageLayout 
  title="Account Settings"
  breadcrumbs={[
    {
      icon: BreadcrumbIcons.Dashboard,
      label: "Dashboard",
      href: "/"
    },
    {
      icon: BreadcrumbIcons.Users,
      label: "Profile",
      href: "/profile"
    },
    {
      icon: BreadcrumbIcons.Reports,
      label: "Account Settings",
      isActive: true
    }
  ]}
>
  {/* Settings content */}
</PageLayout>
```

## Benefits

Using the `PageLayout` component provides several benefits:

1. **Consistent Spacing**: All pages will have the same padding, margins, and layout structure
2. **Standardized Navigation**: Breadcrumb navigation is consistently formatted across the application
3. **Maintainability**: Changes to the global layout can be made in one place
4. **Reduced Boilerplate**: Less code duplication in page components 