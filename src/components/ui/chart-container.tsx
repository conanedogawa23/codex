import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartContainerProps {
    title: string;
    icon?: ReactNode;
    className?: string;
    contentClassName?: string;
    children: ReactNode;
}

export function CustomChartContainer({
    title,
    icon,
    className = "",
    contentClassName = "",
    children
}: ChartContainerProps) {
    return (
        <Card className={`w-full border border-[rgba(3,0,49,0.12)] shadow-sm bg-white overflow-hidden ${className}`}>
            <CardHeader className="pb-0 pt-5 px-6 border-b border-[rgba(3,0,49,0.08)]">
                <CardTitle className="text-base font-medium flex items-center text-[rgba(3,0,41,0.9)]">
                    {icon && <span className="mr-2 text-[#5856D6]">{icon}</span>}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className={`pt-4 px-6 ${contentClassName}`}>
                {children}
            </CardContent>
        </Card>
    );
} 