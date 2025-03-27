"use client"

import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-1 sm:pb-2">
        <CardTitle className="text-lg sm:text-xl">
          <Skeleton className="h-6 w-32 sm:w-48" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 sm:pt-2">
        <div className="h-[250px] xs:h-[300px] sm:h-[400px] w-full flex items-center justify-center flex-col gap-4">
          <div className="w-full h-full rounded-md bg-secondary/40 flex items-center justify-center flex-col gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 