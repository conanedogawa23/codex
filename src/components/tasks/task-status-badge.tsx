import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TaskStatusBadgeProps {
    status: "to-do" | "in-progress" | "completed" | "blocked"
    className?: string
}

const statusConfig = {
    "to-do": {
        label: "To Do",
        className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50"
    },
    "in-progress": {
        label: "In Progress",
        className: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50"
    },
    "completed": {
        label: "Completed",
        className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
    },
    "blocked": {
        label: "Blocked",
        className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
    }
}

export function TaskStatusBadge({ status, className }: TaskStatusBadgeProps) {
    const config = statusConfig[status]

    return (
        <Badge
            variant="outline"
            className={cn(config.className, className)}
        >
            {config.label}
        </Badge>
    )
}
