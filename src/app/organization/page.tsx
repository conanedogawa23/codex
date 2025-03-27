"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Building2,
    Users,
    CreditCard,
    Plug,
    Settings,
    Globe,
    Mail,
    Phone,
    MapPin,
    Calendar,
    PlusCircle,
    Search,
    Trash2,
    Edit,
    Download,
    AlertCircle,
    Save,
    UserPlus,
    ShieldCheck,
    Lock
} from "lucide-react"
import { formatDate } from "@/lib/utils"

// Import mock data - we'll adapt this for organizations
import mockData from "@/data/mock-data.json"

// Organization type (would typically come from an API)
type Organization = {
    id: string;
    name: string;
    logo?: string;
    domain: string;
    plan: string;
    status: "active" | "inactive" | "pending";
    createdAt: string;
    members: number;
    usedStorage: number;
    totalStorage: number;
    billingCycle: "monthly" | "yearly";
    nextBillingDate: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
    contactEmail?: string;
    contactPhone?: string;
    website?: string;
};

// Mock organizations data
const organizations: Organization[] = [
    {
        id: "org-001",
        name: "Acme Inc.",
        domain: "acme.com",
        plan: "Enterprise",
        status: "active",
        createdAt: "2021-06-15",
        members: 48,
        usedStorage: 75,
        totalStorage: 100,
        billingCycle: "yearly",
        nextBillingDate: "2023-06-15",
        address: {
            street: "123 Main St",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "USA"
        },
        contactEmail: "admin@acme.com",
        contactPhone: "+1 (555) 123-4567",
        website: "https://acme.com"
    },
    {
        id: "org-002",
        name: "Startup LLC",
        domain: "startup.io",
        plan: "Pro",
        status: "active",
        createdAt: "2022-03-10",
        members: 12,
        usedStorage: 18,
        totalStorage: 50,
        billingCycle: "monthly",
        nextBillingDate: "2023-07-10",
        address: {
            street: "456 Innovation Way",
            city: "Austin",
            state: "TX",
            zip: "78701",
            country: "USA"
        },
        contactEmail: "hello@startup.io",
        contactPhone: "+1 (555) 987-6543",
        website: "https://startup.io"
    }
];

// Mock members data
const members = [
    { id: 1, name: "John Doe", email: "john@acme.com", role: "Admin", status: "active", lastActive: "Today" },
    { id: 2, name: "Jane Smith", email: "jane@acme.com", role: "Member", status: "active", lastActive: "Yesterday" },
    { id: 3, name: "Robert Johnson", email: "robert@acme.com", role: "Member", status: "active", lastActive: "3 days ago" },
    { id: 4, name: "Emily Davis", email: "emily@acme.com", role: "Owner", status: "active", lastActive: "Today" },
    { id: 5, name: "Michael Brown", email: "michael@acme.com", role: "Member", status: "inactive", lastActive: "2 weeks ago" }
];

// Billing history mock data
const billingHistory = [
    { id: "INV-001", date: "Jun 1, 2023", amount: "$599.00", status: "Paid", plan: "Enterprise (Yearly)" },
    { id: "INV-002", date: "May 1, 2023", amount: "$599.00", status: "Paid", plan: "Enterprise (Yearly)" },
    { id: "INV-003", date: "Apr 1, 2023", amount: "$599.00", status: "Paid", plan: "Enterprise (Yearly)" },
    { id: "INV-004", date: "Mar 1, 2023", amount: "$599.00", status: "Paid", plan: "Enterprise (Yearly)" },
    { id: "INV-005", date: "Feb 1, 2023", amount: "$499.00", status: "Paid", plan: "Pro (Yearly)" }
];

export default function OrganizationPage() {
    const [currentOrg, setCurrentOrg] = useState<Organization>(organizations[0]);
    const [orgName, setOrgName] = useState(currentOrg.name);
    const [orgEmail, setOrgEmail] = useState(currentOrg.contactEmail || "");
    const [orgPhone, setOrgPhone] = useState(currentOrg.contactPhone || "");
    const [orgWebsite, setOrgWebsite] = useState(currentOrg.website || "");
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        setUnsavedChanges(true);
    };

    return (
        <SidebarLayout>
            <div className="flex flex-col space-y-6 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Organization Settings</h1>
                        <p className="text-muted-foreground mt-1">Manage your organization&apos;s settings and members</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select
                            defaultValue={currentOrg.id}
                            onValueChange={(value) => {
                                const newOrg = organizations.find(org => org.id === value);
                                if (newOrg) {
                                    setCurrentOrg(newOrg);
                                    setOrgName(newOrg.name);
                                    setOrgEmail(newOrg.contactEmail || "");
                                    setOrgPhone(newOrg.contactPhone || "");
                                    setOrgWebsite(newOrg.website || "");
                                    setUnsavedChanges(false);
                                }
                            }}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select organization" />
                            </SelectTrigger>
                            <SelectContent>
                                {organizations.map(org => (
                                    <SelectItem key={org.id} value={org.id}>
                                        <div className="flex items-center gap-2">
                                            <span>{org.name}</span>
                                            <Badge variant="outline" className="ml-2 text-xs">
                                                {org.plan}
                                            </Badge>
                                        </div>
                                    </SelectItem>
                                ))}
                                <SelectItem value="new">
                                    <div className="flex items-center gap-2 text-primary">
                                        <PlusCircle className="h-4 w-4" />
                                        <span>Create New Organization</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            className="gap-2"
                            disabled={!unsavedChanges}
                        >
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="general" className="w-full">
                    <div className="border-b">
                        <div className="flex overflow-x-auto">
                            <TabsList className="bg-transparent p-0 h-12">
                                <TabsTrigger
                                    value="general"
                                    className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                                >
                                    <Building2 className="h-4 w-4 mr-2" />
                                    General
                                </TabsTrigger>
                                <TabsTrigger
                                    value="members"
                                    className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                                >
                                    <Users className="h-4 w-4 mr-2" />
                                    Members
                                </TabsTrigger>
                                <TabsTrigger
                                    value="billing"
                                    className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                                >
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Billing
                                </TabsTrigger>
                                <TabsTrigger
                                    value="integrations"
                                    className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                                >
                                    <Plug className="h-4 w-4 mr-2" />
                                    Integrations
                                </TabsTrigger>
                                <TabsTrigger
                                    value="security"
                                    className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none px-4 h-12 data-[state=active]:text-foreground"
                                >
                                    <Lock className="h-4 w-4 mr-2" />
                                    Security
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    {/* General Tab */}
                    <TabsContent value="general" className="pt-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5" />
                                        Organization Profile
                                    </CardTitle>
                                    <CardDescription>Basic information about your organization</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                                        <div className="flex-shrink-0">
                                            <Avatar className="h-20 w-20">
                                                <AvatarImage src="/acme-logo.png" alt={currentOrg.name} />
                                                <AvatarFallback className="text-2xl">{currentOrg.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <h3 className="font-medium text-sm text-muted-foreground">Company Logo</h3>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <Button variant="outline" size="sm">
                                                    Upload New Logo
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    Remove
                                                </Button>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Recommended: 128x128px PNG or JPG
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="org-name">Organization Name</Label>
                                            <Input
                                                id="org-name"
                                                value={orgName}
                                                onChange={handleInputChange(setOrgName)}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="org-website">Website</Label>
                                            <div className="flex">
                                                <div className="flex items-center justify-center bg-muted px-3 rounded-l-md border border-r-0 border-input">
                                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <Input
                                                    id="org-website"
                                                    className="rounded-l-none"
                                                    value={orgWebsite}
                                                    onChange={handleInputChange(setOrgWebsite)}
                                                    placeholder="https://example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Contact Information
                                    </CardTitle>
                                    <CardDescription>How to reach your organization</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="org-email">Email Address</Label>
                                        <div className="flex">
                                            <div className="flex items-center justify-center bg-muted px-3 rounded-l-md border border-r-0 border-input">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <Input
                                                id="org-email"
                                                className="rounded-l-none"
                                                value={orgEmail}
                                                onChange={handleInputChange(setOrgEmail)}
                                                type="email"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="org-phone">Phone Number</Label>
                                        <div className="flex">
                                            <div className="flex items-center justify-center bg-muted px-3 rounded-l-md border border-r-0 border-input">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <Input
                                                id="org-phone"
                                                className="rounded-l-none"
                                                value={orgPhone}
                                                onChange={handleInputChange(setOrgPhone)}
                                                type="tel"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="org-address">Address</Label>
                                        <Textarea
                                            id="org-address"
                                            value={[
                                                currentOrg.address?.street,
                                                currentOrg.address?.city,
                                                `${currentOrg.address?.state} ${currentOrg.address?.zip}`,
                                                currentOrg.address?.country
                                            ].filter(Boolean).join("\n")}
                                            onChange={() => {
                                                setUnsavedChanges(true);
                                            }}
                                            rows={4}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="h-5 w-5" />
                                        Organization Settings
                                    </CardTitle>
                                    <CardDescription>Configure organization-wide settings</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h3 className="text-base font-medium">Domain Settings</h3>
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label>Domain Verification</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Current verified domain: {currentOrg.domain}
                                                    </p>
                                                </div>
                                                <Button variant="outline">Manage Domains</Button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-base font-medium">Access Controls</h3>
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label htmlFor="sso-toggle">Single Sign-On (SSO)</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Enable SSO for your organization
                                                    </p>
                                                </div>
                                                <Switch
                                                    id="sso-toggle"
                                                    onCheckedChange={() => setUnsavedChanges(true)}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label htmlFor="mfa-toggle">Require MFA</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Enforce multi-factor authentication
                                                    </p>
                                                </div>
                                                <Switch
                                                    id="mfa-toggle"
                                                    defaultChecked
                                                    onCheckedChange={() => setUnsavedChanges(true)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Members Tab */}
                    <TabsContent value="members" className="pt-6">
                        <Card>
                            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Team Members
                                    </CardTitle>
                                    <CardDescription>Manage members of your organization</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    <div className="relative w-full sm:w-auto">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Search members..."
                                            className="pl-8 w-full sm:w-[250px]"
                                        />
                                    </div>
                                    <Button className="gap-2 w-full sm:w-auto">
                                        <UserPlus className="h-4 w-4" />
                                        Add Member
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Last Active</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {members.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        {member.name}
                                                        {member.role === "Owner" && (
                                                            <Badge variant="outline" className="ml-2">Owner</Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{member.email}</TableCell>
                                                <TableCell>
                                                    <Select defaultValue={member.role.toLowerCase()}>
                                                        <SelectTrigger className="w-[110px]">
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="owner">Owner</SelectItem>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                            <SelectItem value="member">Member</SelectItem>
                                                            <SelectItem value="guest">Guest</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={member.status === "active" ? "default" : "secondary"}
                                                        className={member.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                                                    >
                                                        {member.status === "active" ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{member.lastActive}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" disabled={member.role === "Owner"}>
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Delete</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing {members.length} of {currentOrg.members} members
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" disabled>Previous</Button>
                                    <Button variant="outline" size="sm" disabled>Next</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing" className="pt-6">
                        <div className="grid gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />
                                        Subscription Plan
                                    </CardTitle>
                                    <CardDescription>Manage your subscription and billing preferences</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1 border rounded-lg p-4 bg-primary/5">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-medium">{currentOrg.plan}</h3>
                                                    <p className="text-sm text-muted-foreground">Current Plan</p>
                                                </div>
                                                <Badge variant="default">Active</Badge>
                                            </div>
                                            <div className="mt-6 grid gap-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Billing Cycle</span>
                                                    <span className="text-sm font-medium capitalize">{currentOrg.billingCycle}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Next Billing Date</span>
                                                    <span className="text-sm font-medium">{currentOrg.nextBillingDate}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Storage</span>
                                                    <span className="text-sm font-medium">{currentOrg.usedStorage}GB / {currentOrg.totalStorage}GB</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                                <Button variant="outline" className="flex-1">Change Plan</Button>
                                                <Button variant="outline" className="flex-1">Cancel Subscription</Button>
                                            </div>
                                        </div>

                                        <div className="flex-1 border rounded-lg p-4">
                                            <h3 className="text-lg font-medium">Payment Method</h3>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                                                        <span className="font-semibold">VISA</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">•••• 4242</p>
                                                        <p className="text-xs text-muted-foreground">Expires 12/24</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">Change</Button>
                                            </div>
                                            <div className="mt-4 text-sm text-muted-foreground">
                                                <p>Billing address:</p>
                                                <p>{currentOrg.address?.street}</p>
                                                <p>{currentOrg.address?.city}, {currentOrg.address?.state} {currentOrg.address?.zip}</p>
                                                <p>{currentOrg.address?.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Billing History
                                    </CardTitle>
                                    <CardDescription>View and download your invoices</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Invoice</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Plan</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {billingHistory.map((invoice) => (
                                                <TableRow key={invoice.id}>
                                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                                    <TableCell>{invoice.date}</TableCell>
                                                    <TableCell>{invoice.amount}</TableCell>
                                                    <TableCell>{invoice.plan}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className={invoice.status === "Paid" ? "bg-green-100 text-green-800 hover:bg-green-100 border-0" : ""}
                                                        >
                                                            {invoice.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm">
                                                            <Download className="h-4 w-4" />
                                                            <span className="sr-only">Download</span>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Integrations Tab */}
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
                                    {mockData.settings.integrations.map((integration, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-primary/10 text-primary rounded-md flex items-center justify-center font-bold">
                                                    {integration.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-base">{integration.name}</h4>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {(integration.isConnected && integration.lastSynced)
                                                            ? `Connected on ${formatDate(integration.lastSynced)}`
                                                            : "Not connected"
                                                        }
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
                                                <PlusCircle className="h-6 w-6 text-muted-foreground" />
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

                    {/* Security Tab */}
                    <TabsContent value="security" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lock className="h-5 w-5" />
                                    Security Settings
                                </CardTitle>
                                <CardDescription>Configure your organization&apos;s security settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium flex items-center gap-2">
                                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                                        Authentication
                                    </h3>
                                    <Separator />
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="font-medium">Enforce Password Policy</Label>
                                                <p className="text-sm text-muted-foreground">Require strong passwords for all members</p>
                                            </div>
                                            <Switch defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="font-medium">Password Rotation</Label>
                                                <p className="text-sm text-muted-foreground">Require password changes every 90 days</p>
                                            </div>
                                            <Switch onCheckedChange={() => setUnsavedChanges(true)} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="font-medium">Require MFA for Admins</Label>
                                                <p className="text-sm text-muted-foreground">Enforce multi-factor authentication for administrators</p>
                                            </div>
                                            <Switch defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-muted-foreground" />
                                        Security Alerts
                                    </h3>
                                    <Separator />
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="font-medium">Suspicious Activity Alerts</Label>
                                                <p className="text-sm text-muted-foreground">Notify admins of suspicious login attempts</p>
                                            </div>
                                            <Switch defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="font-medium">Failed Login Notifications</Label>
                                                <p className="text-sm text-muted-foreground">Send alerts after multiple failed login attempts</p>
                                            </div>
                                            <Switch defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">API Access</h3>
                                    <Separator />
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="font-medium">API Key Management</Label>
                                                <p className="text-sm text-muted-foreground">Allow API key creation and management</p>
                                            </div>
                                            <Switch defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="font-medium">Restrict API Access</Label>
                                                <p className="text-sm text-muted-foreground">Limit API access to specific IP addresses</p>
                                            </div>
                                            <Switch onCheckedChange={() => setUnsavedChanges(true)} />
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