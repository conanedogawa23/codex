"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, BarChart, Users, CheckCircle, LineChart } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
    const searchParams = useSearchParams()
    const registered = searchParams.get("registered")
    const [email, setEmail] = useState("admin@example.com")
    const [password, setPassword] = useState("password")
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            // For demo purposes, just simulate a login
            // In a real app, you'd make an API call here
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Normally you'd check credentials with an API
            if (email === "admin@example.com" && password === "password") {
                // Redirect to dashboard on successful login
                router.push("/")
            } else {
                setError("Invalid email or password")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900">
            {/* Left side - Brand & Features */}
            <div className="hidden lg:flex flex-col w-1/2 bg-primary p-12 text-white items-center justify-center">
                <div className="max-w-md mx-auto">
                    <Image
                        src="/images/innovation-logo.svg"
                        alt="INNOVATION EN"
                        width={200}
                        height={48}
                        className="h-12 w-auto mb-12"
                    />

                    <h1 className="text-3xl font-bold mb-6">Welcome to Codex</h1>
                    <p className="text-lg mb-12 opacity-90">
                        The complete project management solution for modern teams
                    </p>

                    <div className="grid grid-cols-1 gap-6">
                        <Feature
                            icon={<BarChart className="h-6 w-6" />}
                            title="Real-time Analytics"
                            description="Get insights into your project performance"
                        />
                        <Feature
                            icon={<Users className="h-6 w-6" />}
                            title="Team Collaboration"
                            description="Seamlessly work together with your team"
                        />
                        <Feature
                            icon={<CheckCircle className="h-6 w-6" />}
                            title="Task Management"
                            description="Keep track of all your tasks in one place"
                        />
                        <Feature
                            icon={<LineChart className="h-6 w-6" />}
                            title="Sprint Planning"
                            description="Plan and execute sprints efficiently"
                        />
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="lg:hidden mb-6">
                            <Image
                                src="/images/innovation-logo.svg"
                                alt="INNOVATION EN"
                                width={200}
                                height={48}
                                className="h-10 w-auto mx-auto"
                            />
                        </div>
                        <h2 className="text-3xl font-bold">Sign in</h2>
                        <p className="text-muted-foreground mt-2">
                            Welcome back! Please enter your credentials
                        </p>
                    </div>

                    <Card className="border shadow-xl">
                        <CardContent className="pt-6">
                            {registered && (
                                <Alert className="mb-4 bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                    <AlertDescription>
                                        Account successfully created! You can now login.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
                                <InfoIcon className="h-4 w-4 mr-2" />
                                <AlertDescription>
                                    <span className="font-semibold">Demo Credentials</span>
                                    <div className="mt-1">
                                        Email: admin@example.com<br />
                                        Password: password
                                    </div>
                                </AlertDescription>
                            </Alert>

                            {error && (
                                <div className="p-3 mb-4 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            href="/auth/forgot-password"
                                            className="text-sm text-primary hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                    />
                                    <Label htmlFor="remember" className="text-sm">
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 mt-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </Button>

                                <div className="text-center mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Don't have an account?{" "}
                                        <Link href="/auth/register" className="text-primary font-medium hover:underline">
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// Feature component for the left panel
function Feature({ icon, title, description }: {
    icon: React.ReactNode,
    title: string,
    description: string
}) {
    return (
        <div className="flex items-start space-x-4">
            <div className="bg-white/10 p-3 rounded-lg flex-shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="font-medium text-lg">{title}</h3>
                <p className="text-sm text-white/80">{description}</p>
            </div>
        </div>
    );
} 