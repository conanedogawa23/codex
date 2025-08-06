import React from 'react';
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { Breadcrumb } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerFeedbackCharts } from "@/components/analytics/customer-feedback/charts";
import { CustomerFeedbackTable } from "@/components/analytics/customer-feedback/table";

// Mock data for the charts and table
const mockFeedbackData = {
    feedbackTypes: [
        { type: 'Positive', count: 30 },
        { type: 'Negative', count: 40 },
        { type: 'Suggestion', count: 50 }
    ],
    impactLevels: [
        { name: 'High Impact', value: 30, color: '#F7524A' },
        { name: 'Moderate Impact', value: 50, color: '#5856D6' },
        { name: 'Low Impact', value: 20, color: '#00B290' }
    ]
};

const mockTableData = [
    {
        id: 1,
        featureName: 'Payment Gateway',
        feedbackType: 'Positive',
        issueReported: 'Transaction failure on retry',
        impactOnUserExperience: 'High - Unable to complete payments',
        timeToAddressFeed: '5'
    },
    {
        id: 2,
        featureName: 'Dashboard UI',
        feedbackType: 'Positive',
        issueReported: 'Add a dark mode option',
        impactOnUserExperience: 'Medium - User preference',
        timeToAddressFeed: '5'
    },
    {
        id: 3,
        featureName: 'Chat Module',
        feedbackType: 'Suggestion',
        issueReported: 'Easy and intuitive to use',
        impactOnUserExperience: 'High - Improved user satisfaction',
        timeToAddressFeed: '5'
    },
    {
        id: 4,
        featureName: 'Notification System',
        feedbackType: 'Positive',
        issueReported: 'Delay in receiving notifications',
        impactOnUserExperience: 'Medium - User preference',
        timeToAddressFeed: '5'
    },
    {
        id: 5,
        featureName: 'ConnectX',
        feedbackType: 'Suggestion',
        issueReported: 'Quick and secure login',
        impactOnUserExperience: 'High - Improved user satisfaction',
        timeToAddressFeed: 'N/A'
    },
    {
        id: 6,
        featureName: 'User Authentication',
        feedbackType: 'Suggestion',
        issueReported: 'Add export to Excel feature',
        impactOnUserExperience: 'High - Improved user satisfaction',
        timeToAddressFeed: '5'
    },
    {
        id: 7,
        featureName: 'Analytics Dashboard',
        feedbackType: 'Negative',
        issueReported: 'Delay in receiving notifications',
        impactOnUserExperience: 'High - Improved user satisfaction',
        timeToAddressFeed: 'N/A'
    },
    {
        id: 8,
        featureName: 'Analytics Dashboard',
        feedbackType: 'Suggestion',
        issueReported: 'Add a dark mode option',
        impactOnUserExperience: 'Medium - User preference',
        timeToAddressFeed: '5'
    },
    {
        id: 9,
        featureName: 'User Authentication',
        feedbackType: 'Negative',
        issueReported: 'Transaction failure on retry',
        impactOnUserExperience: 'High - Improved user satisfaction',
        timeToAddressFeed: 'N/A'
    },
    {
        id: 10,
        featureName: 'Notification System',
        feedbackType: 'Positive',
        issueReported: 'Transaction failure on retry',
        impactOnUserExperience: 'High - Improved user satisfaction',
        timeToAddressFeed: '5'
    }
];

export default function CustomerFeedbackReport() {
    const breadcrumbs: Breadcrumb[] = [
        { label: "Dashboard", href: "/" },
        { label: "Reports", href: "/reports" },
        { label: "Customer Experience", href: "/reports" },
        { label: "Customer Feedback", href: "/reports/customer-feedback", isCurrent: true },
    ];

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                {/* Page Title */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-foreground">Customer Feedback Report</h1>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium text-[rgba(3,0,41,0.8)]">
                                Hours Logged By Resource
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CustomerFeedbackCharts
                                type="bar"
                                data={mockFeedbackData.feedbackTypes}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium text-[rgba(3,0,41,0.8)]">
                                Resource Allocation Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CustomerFeedbackCharts
                                type="pie"
                                data={mockFeedbackData.impactLevels}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Table Section */}
                <Card className="bg-[#F4F8FD] overflow-hidden">
                    <CustomerFeedbackTable data={mockTableData} />
                </Card>
            </div>
        </SidebarLayout>
    );
} 