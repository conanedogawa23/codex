"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ChartLoading({ height = "h-[400px]" }: { height?: string }) {
  return (
    <div className={`w-full ${height} flex flex-col gap-4`}>
      <Skeleton className="h-5 w-32" />
      <div className="flex-1 flex items-center justify-center">
        <Skeleton className="h-4/5 w-full rounded-lg" />
      </div>
    </div>
  )
} 