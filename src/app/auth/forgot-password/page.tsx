"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Mail, Key, LockKeyhole, RefreshCw } from "lucide-react"
import Image from "next/image"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess(false)

        try {
            // For demo purposes, just simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Show success message
            setSuccess(true)
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

                    <h1 className="text-3xl font-bold mb-6">Password Recovery</h1>
                    <p className="text-lg mb-12 opacity-90">
                        Don't worry, we'll help you get back into your account
                    </p>

                    <div className="grid grid-cols-1 gap-6">
                        <Feature
                            icon={<Mail className="h-6 w-6" />}
                            title="Email Recovery"
                            description="We'll send instructions to your email address"
                        />
                        <Feature
                            icon={<Key className="h-6 w-6" />}
                            title="Secure Reset"
                            description="Safely reset your password with our secure process"
                        />
                        <Feature
                            icon={<LockKeyhole className="h-6 w-6" />}
                            title="Account Protection"
                            description="Your account security is our top priority"
                        />
                        <Feature
                            icon={<RefreshCw className="h-6 w-6" />}
                            title="Quick Recovery"
                            description="Get back to using your account as quickly as possible"
                        />
                    </div>
                </div>
            </div>

            {/* Right side - Forgot Password Form */}
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
                        <h2 className="text-3xl font-bold">Reset Password</h2>
                        <p className="text-muted-foreground mt-2">
                            Enter your email and we'll send you a reset link
                        </p>
                    </div>

                    <Card className="border shadow-xl">
                        <CardContent className="pt-6">
                            <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
                                <InfoIcon className="h-4 w-4 mr-2" />
                                <AlertDescription>
                                    <span className="font-semibold">Demo Application</span>
                                    <div className="mt-1">
                                        This is for demonstration purposes. No email will actually be sent.
                                    </div>
                                </AlertDescription>
                            </Alert>

                            {error && (
                                <div className="p-3 mb-4 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="p-3 mb-4 text-sm bg-green-50 border border-green-200 text-green-600 rounded-md">
                                    Password reset link sent to your email. Please check your inbox.
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

                                <Button
                                    type="submit"
                                    className="w-full h-11 mt-4"
                                    disabled={isLoading || success}
                                >
                                    {isLoading ? "Sending..." : "Send reset link"}
                                </Button>

                                <div className="text-center mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Remember your password?{" "}
                                        <Link href="/auth/login" className="text-primary font-medium hover:underline">
                                            Back to login
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