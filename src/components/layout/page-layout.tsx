import React from 'react';
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { CustomBreadcrumb, BreadcrumbItem } from "@/components/ui/custom-breadcrumb";

interface PageLayoutProps {
    children: React.ReactNode;
    title: string;
    breadcrumbs: BreadcrumbItem[];
}

export function PageLayout({ children, title, breadcrumbs }: PageLayoutProps) {
    return (
        <SidebarLayout>
            <div className="min-h-screen flex flex-col bg-[#F6F6FB]">
                <div className="w-full max-w-[1600px] mx-auto px-6 py-6">
                    {/* Breadcrumb navigation */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <div className="mb-4">
                            <CustomBreadcrumb items={breadcrumbs} />
                        </div>
                    )}

                    {/* Page title */}
                    <h1 className="text-xl sm:text-2xl md:text-[28px] font-medium text-[rgba(3,0,41,0.9)] mb-6">{title}</h1>

                    {/* Page content */}
                    {children}
                </div>
            </div>
        </SidebarLayout>
    );
} 