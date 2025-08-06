"use client"

import React, { useState } from 'react';
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

interface FeedbackData {
    id: number;
    featureName: string;
    feedbackType: 'Positive' | 'Negative' | 'Suggestion';
    issueReported: string;
    impactOnUserExperience: string;
    timeToAddressFeed: string;
}

interface CustomerFeedbackTableProps {
    data: FeedbackData[];
}

export function CustomerFeedbackTable({ data }: CustomerFeedbackTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.featureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.feedbackType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.issueReported.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const getFeedbackTypeBadge = (type: 'Positive' | 'Negative' | 'Suggestion') => {
        switch (type) {
            case 'Positive':
                return (
                    <Badge className="bg-[rgba(0,178,144,0.08)] text-[#00B290] hover:bg-[rgba(0,178,144,0.12)] border-none">
                        Positive
                    </Badge>
                );
            case 'Negative':
                return (
                    <Badge className="bg-[rgba(247,82,74,0.08)] text-[#F7524A] hover:bg-[rgba(247,82,74,0.12)] border-none">
                        Negative
                    </Badge>
                );
            case 'Suggestion':
                return (
                    <Badge className="bg-[rgba(88,86,214,0.08)] text-[#5856D6] hover:bg-[rgba(88,86,214,0.12)] border-none">
                        Suggestion
                    </Badge>
                );
            default:
                return <Badge>{type}</Badge>;
        }
    };

    return (
        <div className="w-full">
            {/* Header with Search */}
            <CardHeader className="bg-white border-b border-[rgba(3,0,49,0.12)] px-6 py-3">
                <div className="flex items-center justify-end gap-6">
                    <div className="relative w-[220px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[rgba(3,0,49,0.6)]" />
                        <Input
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 h-10 border-[rgba(3,0,49,0.12)] text-sm"
                        />
                    </div>
                    <Button variant="outline" size="sm" className="h-10 px-4 border-[rgba(3,0,49,0.12)]">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            {/* Table */}
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white border-b border-[rgba(3,0,49,0.12)] h-[72px]">
                            <TableHead className="text-[rgba(3,0,41,0.8)] font-bold text-sm px-4">
                                <div className="flex items-center gap-2">
                                    Feature name
                                    <div className="flex flex-col">
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#8092B4]"></div>
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#8092B4] mt-[1px]"></div>
                                    </div>
                                </div>
                            </TableHead>
                            <TableHead className="text-[rgba(3,0,41,0.8)] font-bold text-sm px-4">
                                <div className="flex items-center gap-2">
                                    Feedback type
                                    <div className="flex flex-col">
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#8092B4]"></div>
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#8092B4] mt-[1px]"></div>
                                    </div>
                                </div>
                            </TableHead>
                            <TableHead className="text-[rgba(3,0,41,0.8)] font-bold text-sm px-4">
                                <div className="flex items-center gap-2">
                                    Issue reported
                                    <div className="flex flex-col">
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#8092B4]"></div>
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#8092B4] mt-[1px]"></div>
                                    </div>
                                </div>
                            </TableHead>
                            <TableHead className="text-[rgba(3,0,41,0.8)] font-bold text-sm px-4">
                                <div className="flex items-center gap-2">
                                    Impact on user experience
                                    <div className="flex flex-col">
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#8092B4]"></div>
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#8092B4] mt-[1px]"></div>
                                    </div>
                                </div>
                            </TableHead>
                            <TableHead className="text-[rgba(3,0,41,0.8)] font-bold text-sm px-4">
                                <div className="flex items-center gap-2">
                                    Time to address feed
                                    <div className="flex flex-col">
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#8092B4]"></div>
                                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#8092B4] mt-[1px]"></div>
                                    </div>
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((item) => (
                            <TableRow key={item.id} className="bg-white border-b border-[rgba(3,0,49,0.12)] h-14">
                                <TableCell className="text-[rgba(3,0,41,0.8)] text-sm px-4">
                                    {item.featureName}
                                </TableCell>
                                <TableCell className="px-4">
                                    {getFeedbackTypeBadge(item.feedbackType)}
                                </TableCell>
                                <TableCell className="text-[rgba(3,0,41,0.8)] text-sm px-4">
                                    {item.issueReported}
                                </TableCell>
                                <TableCell className="text-[rgba(3,0,41,0.8)] text-sm px-4">
                                    {item.impactOnUserExperience}
                                </TableCell>
                                <TableCell className="text-[rgba(3,0,41,0.8)] text-sm px-4">
                                    {item.timeToAddressFeed}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            {/* Footer with Pagination */}
            <div className="bg-white px-6 py-6 border-t border-[rgba(3,0,49,0.12)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[rgba(3,0,41,0.8)]">Show row:</span>
                        <div className="flex items-center gap-1 h-8 px-2 border border-[rgba(3,0,49,0.12)] rounded-md">
                            <span className="text-sm text-[rgba(3,0,41,0.8)]">10</span>
                            <ChevronRight className="h-4 w-4 text-[rgba(3,0,49,0.6)] rotate-90" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="h-8 px-3 border-[rgba(3,0,49,0.12)]"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <span className="text-sm text-[rgba(3,0,41,0.8)]">
                            {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="h-8 px-3 border-[rgba(3,0,49,0.12)]"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 