"use client"

import React, { useState, useEffect } from 'react';
import { ChartContainer } from "@/components/ui/chart";
import { ChartSkeleton } from "@/components/ui/chart-skeleton";

interface FeedbackTypeData {
    type: string;
    count: number;
}

interface ImpactLevelData {
    name: string;
    value: number;
    color: string;
}

interface CustomerFeedbackChartsProps {
    type: 'bar' | 'pie';
    data: FeedbackTypeData[] | ImpactLevelData[];
}

export function CustomerFeedbackCharts({ type, data }: CustomerFeedbackChartsProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ChartsComponents, setChartsComponents] = useState<Record<string, any> | null>(null);

    // Dynamically import Recharts components on client-side only
    useEffect(() => {
        const loadCharts = async () => {
            try {
                const recharts = await import('recharts');
                setChartsComponents(recharts);
                setIsLoaded(true);
            } catch (err) {
                console.error('Failed to load chart components:', err);
                setHasError(true);
            }
        };

        loadCharts();
    }, []);

    // Show loading state
    if (!isLoaded) {
        return <ChartSkeleton />;
    }

    // Show error state
    if (hasError) {
        return (
            <div className="flex items-center justify-center h-[350px] text-center text-destructive">
                Failed to load charts. Please refresh the page.
            </div>
        );
    }

    if (type === 'bar') {
        const { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } = ChartsComponents!;
        const feedbackData = data as FeedbackTypeData[];

        return (
            <div className="w-full h-[400px] relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
                    <div className="text-sm font-semibold text-[rgba(3,0,49,0.8)] whitespace-nowrap">
                        Number of Feedback Instances
                    </div>
                </div>

                <div className="ml-16 mr-4">
                    <ChartContainer
                        className="h-[300px] w-full"
                        config={{
                            count: {
                                label: "Feedback Count",
                                color: "#5856D6"
                            }
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={feedbackData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(3,0,49,0.12)" />
                                <XAxis
                                    dataKey="type"
                                    tick={{ fontSize: 12, fill: 'rgba(3,0,49,0.8)' }}
                                    axisLine={{ stroke: 'rgba(3,0,49,0.12)' }}
                                    tickLine={{ stroke: 'rgba(3,0,49,0.12)' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: 'rgba(3,0,49,0.8)' }}
                                    axisLine={{ stroke: 'rgba(3,0,49,0.12)' }}
                                    tickLine={{ stroke: 'rgba(3,0,49,0.12)' }}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="#5856D6"
                                    radius={[2, 2, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                    <div className="mt-2 text-center">
                        <div className="text-sm font-semibold text-[rgba(3,0,49,0.8)]">
                            Feedback Types
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'pie') {
        const { PieChart, Pie, Cell, ResponsiveContainer } = ChartsComponents!;
        const impactData = data as ImpactLevelData[];

        return (
            <div className="w-full h-[400px] flex flex-col items-center">
                <div className="relative flex-1 flex items-center justify-center">
                    <ChartContainer
                        className="h-[266px] w-[266px]"
                        config={{}}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={impactData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={53}
                                    outerRadius={133}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={450}
                                    stroke="none"
                                >
                                    {impactData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                    {/* Percentage labels positioned around the pie chart */}
                    <div className="absolute top-[50px] right-[-50px] text-center">
                        <div className="text-base font-medium text-[rgba(0,0,0,0.8)]">20%</div>
                        <div className="text-xs text-[rgba(0,0,0,0.6)]">Low Impact</div>
                    </div>

                    <div className="absolute bottom-[50px] right-[-60px] text-center">
                        <div className="text-base font-medium text-[rgba(0,0,0,0.8)]">50%</div>
                        <div className="text-xs text-[rgba(0,0,0,0.6)]">Moderate Impact</div>
                    </div>

                    <div className="absolute top-[93px] left-[-60px] text-center">
                        <div className="text-base font-medium text-[rgba(0,0,0,0.8)]">30%</div>
                        <div className="text-xs text-[rgba(0,0,0,0.6)]">High Impact</div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-4">
                    {impactData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-[rgba(3,0,41,0.8)]">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
} 