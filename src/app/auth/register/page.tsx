"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import {
    AlertCircle,
    Shield,
    Lock,
    UserCheck,
    PieChart,
    Building2,
    Phone,
    Brain,
    Sparkles,
    ChevronRight,
    Bot,
    Fingerprint,
    Github,
    Zap,
    User,
    Boxes,
    LucideProps
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
    // Basic information
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Organization information
    const [orgName, setOrgName] = useState("")
    const [industry, setIndustry] = useState("")
    const [size, setSize] = useState("")
    const [phone, setPhone] = useState("")
    const [website, setWebsite] = useState("")
    const [description, setDescription] = useState("")

    // User role
    const [role, setRole] = useState("")
    const [department, setDepartment] = useState("")

    const [step, setStep] = useState(1)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [acceptDataPolicy, setAcceptDataPolicy] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [progress, setProgress] = useState(33)
    const router = useRouter()

    useEffect(() => {
        // Update progress based on current step
        setProgress(step * 33)
    }, [step])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (!acceptTerms || !acceptDataPolicy) {
            setError("You must accept the terms and data policy")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // For demo purposes, just simulate registration
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Redirect to login page after successful registration
            router.push("/auth/login?registered=true")
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const goToNextStep = () => {
        if (step === 1) {
            if (!name || !email || !password || !confirmPassword) {
                setError("Please fill in all required fields")
                return
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match")
                return
            }
            setError("")
            setStep(2)
        } else if (step === 2) {
            if (!orgName || !industry || !size) {
                setError("Please fill in all required organization fields")
                return
            }
            setError("")
            setStep(3)
        }
    }

    const goToPreviousStep = () => {
        setError("")
        setStep(step - 1)
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col items-center justify-center p-6">
            {/* Circuit pattern background */}
            <div className="absolute inset-0 z-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 z-0">
                <Particles />
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl z-0"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl z-0"></div>

            {/* Content */}
            <div className="z-10 w-full max-w-5xl">
                {/* Logo and progress */}
                <div className="mb-8 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src="/images/innovation-logo.svg"
                            alt="INNOVATION EN"
                            width={200}
                            height={48}
                            className="h-12 w-auto mb-8"
                        />
                    </motion.div>

                    <motion.div
                        className="w-full max-w-md mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Progress
                            value={progress}
                            className="h-1.5 bg-gray-800"
                            indicatorClassName="bg-gradient-to-r from-blue-500 to-violet-500"
                        />
                    </motion.div>

                    <motion.div
                        className="flex justify-between w-full max-w-md text-xs text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className={step >= 1 ? "text-blue-400" : ""}>Account</span>
                        <span className={step >= 2 ? "text-blue-400" : ""}>Organization</span>
                        <span className={step >= 3 ? "text-blue-400" : ""}>Finish</span>
                    </motion.div>
                </div>

                <motion.div
                    key={`step-${step}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    <Card className="border border-gray-800 bg-gray-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <CardHeader className="pb-4 relative">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500"></div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                                        {step === 1 && (
                                            <>
                                                <User className="w-5 h-5 text-blue-400" />
                                                <span>Account Setup</span>
                                            </>
                                        )}
                                        {step === 2 && (
                                            <>
                                                <Building2 className="w-5 h-5 text-blue-400" />
                                                <span>Organization Details</span>
                                            </>
                                        )}
                                        {step === 3 && (
                                            <>
                                                <Boxes className="w-5 h-5 text-blue-400" />
                                                <span>Additional Information</span>
                                            </>
                                        )}
                                    </CardTitle>
                                    <CardDescription className="text-gray-400 mt-1">
                                        {step === 1 && "Create your admin account to get started"}
                                        {step === 2 && "Tell us about your organization"}
                                        {step === 3 && "Just a few more details to complete setup"}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-medium">
                                    {step}/3
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    className="mt-4 p-3 text-sm border border-red-900/50 bg-red-950/50 text-red-400 rounded-lg flex gap-2 items-start"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <AlertCircle className="w-4 h-4 mt-0.5" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </CardHeader>

                        <CardContent className="pt-2 pb-6">
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                                    className="space-y-6"
                                >
                                    <Alert className="border border-blue-900/50 bg-blue-950/30 text-blue-400">
                                        <Bot className="h-4 w-4 mr-2" />
                                        <AlertDescription>
                                            This is a demo application. No account will be created.
                                        </AlertDescription>
                                    </Alert>

                                    <div className="grid gap-6">
                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                                                Full Name
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    placeholder="John Doe"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    className="h-11 bg-gray-800/50 border-gray-700 text-white pl-10 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                                                Work Email
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="name@company.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="h-11 bg-gray-800/50 border-gray-700 text-white pl-10 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <svg className="absolute left-3 top-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="h-11 bg-gray-800/50 border-gray-700 text-white pl-10 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                            </div>
                                            <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                                        </motion.div>

                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                                                Confirm Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                    className="h-11 bg-gray-800/50 border-gray-700 text-white pl-10 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <Fingerprint className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="grid gap-6">
                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Label htmlFor="orgName" className="text-sm font-medium text-gray-300">
                                                Organization Name
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="orgName"
                                                    placeholder="Acme Corporation"
                                                    value={orgName}
                                                    onChange={(e) => setOrgName(e.target.value)}
                                                    required
                                                    className="h-11 bg-gray-800/50 border-gray-700 text-white pl-10 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                            </div>
                                        </motion.div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <Label htmlFor="industry" className="text-sm font-medium text-gray-300">
                                                    Industry
                                                </Label>
                                                <Select value={industry} onValueChange={setIndustry}>
                                                    <SelectTrigger className="h-11 bg-gray-800/50 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500">
                                                        <SelectValue placeholder="Select industry" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                        <SelectItem value="technology">Technology</SelectItem>
                                                        <SelectItem value="finance">Finance</SelectItem>
                                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                                        <SelectItem value="education">Education</SelectItem>
                                                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                        <SelectItem value="retail">Retail</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </motion.div>

                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <Label htmlFor="size" className="text-sm font-medium text-gray-300">
                                                    Organization Size
                                                </Label>
                                                <Select value={size} onValueChange={setSize}>
                                                    <SelectTrigger className="h-11 bg-gray-800/50 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500">
                                                        <SelectValue placeholder="Select size" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                        <SelectItem value="1-10">1-10 employees</SelectItem>
                                                        <SelectItem value="11-50">11-50 employees</SelectItem>
                                                        <SelectItem value="51-200">51-200 employees</SelectItem>
                                                        <SelectItem value="201-500">201-500 employees</SelectItem>
                                                        <SelectItem value="500+">500+ employees</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </motion.div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                                                    Phone Number
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="+1 (555) 123-4567"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="h-11 bg-gray-800/50 border-gray-700 text-white pl-10 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <Label htmlFor="website" className="text-sm font-medium text-gray-300">
                                                    Company Website
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="website"
                                                        type="url"
                                                        placeholder="https://example.com"
                                                        value={website}
                                                        onChange={(e) => setWebsite(e.target.value)}
                                                        className="h-11 bg-gray-800/50 border-gray-700 text-white pl-10 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <svg className="absolute left-3 top-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                    </svg>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Label htmlFor="role" className="text-sm font-medium text-gray-300">
                                                Your Role
                                            </Label>
                                            <Select value={role} onValueChange={setRole}>
                                                <SelectTrigger className="h-11 bg-gray-800/50 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500">
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                    <SelectItem value="ceo">CEO / Executive</SelectItem>
                                                    <SelectItem value="manager">Manager / Team Lead</SelectItem>
                                                    <SelectItem value="it">IT / Operations</SelectItem>
                                                    <SelectItem value="product">Product</SelectItem>
                                                    <SelectItem value="engineering">Engineering</SelectItem>
                                                    <SelectItem value="design">Design</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </motion.div>

                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <Label htmlFor="department" className="text-sm font-medium text-gray-300">
                                                Department
                                            </Label>
                                            <Select value={department} onValueChange={setDepartment}>
                                                <SelectTrigger className="h-11 bg-gray-800/50 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500">
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                    <SelectItem value="executive">Executive</SelectItem>
                                                    <SelectItem value="it">IT</SelectItem>
                                                    <SelectItem value="development">Development</SelectItem>
                                                    <SelectItem value="product">Product</SelectItem>
                                                    <SelectItem value="design">Design</SelectItem>
                                                    <SelectItem value="marketing">Marketing</SelectItem>
                                                    <SelectItem value="sales">Sales</SelectItem>
                                                    <SelectItem value="hr">HR</SelectItem>
                                                    <SelectItem value="finance">Finance</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Label htmlFor="description" className="text-sm font-medium text-gray-300">
                                            Brief Organization Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Tell us a bit about your organization and how you plan to use Codex..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="min-h-[100px] bg-gray-800/50 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </motion.div>

                                    <motion.div
                                        className="space-y-4 bg-gray-800/30 border border-gray-800 rounded-lg p-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <Checkbox
                                                id="terms"
                                                checked={acceptTerms}
                                                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                                required
                                                className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <Label htmlFor="terms" className="text-sm text-gray-300 leading-tight">
                                                I agree to the{" "}
                                                <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline decoration-dotted">
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline decoration-dotted">
                                                    Privacy Policy
                                                </Link>
                                            </Label>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Checkbox
                                                id="dataPolicy"
                                                checked={acceptDataPolicy}
                                                onCheckedChange={(checked) => setAcceptDataPolicy(checked as boolean)}
                                                required
                                                className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <Label htmlFor="dataPolicy" className="text-sm text-gray-300 leading-tight">
                                                I understand that Codex will process my organization's data as described in the{" "}
                                                <Link href="/data-processing" className="text-blue-400 hover:text-blue-300 underline decoration-dotted">
                                                    Data Processing Agreement
                                                </Link>
                                            </Label>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 border-t border-gray-800 bg-gray-900/60 pt-4">
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={goToPreviousStep}
                                    className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                >
                                    Back
                                </Button>
                            )}

                            {step < 3 ? (
                                <Button
                                    onClick={goToNextStep}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white border-0 flex items-center gap-1 group"
                                >
                                    Next Step
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white border-0 flex items-center gap-1 relative overflow-hidden"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-violet-600/40 animate-pulse"></div>
                                            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Complete Registration
                                            <Sparkles className="h-4 w-4 ml-1" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* Help and links */}
                <div className="flex justify-center mt-8 text-sm text-gray-500">
                    <p>
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-blue-400 hover:text-blue-300">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="text-center mt-6 text-xs text-gray-600">
                    © {new Date().getFullYear()} Codex. All rights reserved.
                </div>

                {/* Social proof */}
                <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center"><Zap className="h-4 w-4 mr-1" /> Powered by AI</div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 border-gray-700 text-gray-300">
                                <p>Intelligent data processing</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center"><Lock className="h-4 w-4 mr-1" /> Secure by default</div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 border-gray-700 text-gray-300">
                                <p>All data is encrypted end-to-end</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center"><Github className="h-4 w-4 mr-1" /> Open source</div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 border-gray-700 text-gray-300">
                                <p>Transparent, community-driven development</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

// Animated particles component
function Particles() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
                <span
                    key={i}
                    className="absolute bg-gray-700 rounded-full pointer-events-none"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        opacity: Math.random() * 0.3 + 0.1,
                        animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                        animationDelay: `-${Math.random() * 10}s`
                    }}
                />
            ))}

            <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(30px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
        </div>
    )
}

// Update for shadcn Progress component
declare module "@/components/ui/progress" {
    interface ProgressProps {
        indicatorClassName?: string;
    }
} 