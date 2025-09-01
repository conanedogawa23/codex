import { cn } from "@/lib/utils"

interface ProgressRingProps {
    loggedHours: number
    estimatedHours: number
    className?: string
}

export function ProgressRing({ loggedHours, estimatedHours, className }: ProgressRingProps) {
    const percentage = Math.min((loggedHours / estimatedHours) * 100, 100)
    const circumference = 2 * Math.PI * 16 // radius of 16
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="relative h-10 w-10">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-in-out"
                    />
                </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">
                {loggedHours}/{estimatedHours}
            </span>
        </div>
    )
}
