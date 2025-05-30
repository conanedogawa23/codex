"use client"

import { ThemeProvider } from "@/components/theme-provider"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main>{children}</main>
        </ThemeProvider>
    )
} 