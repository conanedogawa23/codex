import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PriorityIndicatorProps {
    priority: "high" | "medium" | "low"
    className?: string
}

const priorityConfig = {
    high: {
        label: "High",
        color: "text-red-500",
        bgColor: "bg-red-100"
    },
    medium: {
        label: "Medium",
        color: "text-yellow-500",
        bgColor: "bg-yellow-100"
    },
    low: {
        label: "Low",
        color: "text-green-500",
        bgColor: "bg-green-100"
    }
}

export function PriorityIndicator({ priority, className }: PriorityIndicatorProps) {
    const config = priorityConfig[priority]

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className={cn("rounded-full p-1", config.bgColor)}>
                <Circle className={cn("h-3 w-3 fill-current", config.color)} />
            </div>
            <span className="text-sm font-medium text-gray-700">
                {config.label}
            </span>
        </div>
    )
}
