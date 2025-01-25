import React, { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function SearchQueryChart({ logs }) {
    const chartData = useMemo(() => {
        const queryCount = {};

        logs.forEach((log) => {
            try {
                // Safely extract context
                const context = log.context || {};

                // Extract query with multiple fallback strategies
                let query = "Unknown Query";

                // Check for qu (from your specific log example)
                if (context.qu) {
                    query = context.qu;
                } else if (context.location) {
                    query = context.location;
                } else if (context.title) {
                    query = context.title;
                } else if (context.area) {
                    query = context.area;
                } else if (context.category) {
                    query = context.category;
                } else if (context.min_price) {
                    query = context.min_price;
                } else if (context.max_price) {
                    query = context.max_price;
                } else if (context.t) {
                    query = context.t;
                } else if (context.orderAdsFil) {
                    query = context.orderAdsFil;
                }

                // Ensure query is a string and truncate if too long
                query = String(query).trim().substring(0, 50);

                // Count occurrences
                queryCount[query] = (queryCount[query] || 0) + 1;
            } catch (error) {
                console.error("Error parsing log context", log, error);
            }
        });

        // Convert to sorted array, limited to top 5
        return Object.entries(queryCount)
            .map(([query, count]) => ({ query, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [logs]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Most Searched Queries</CardTitle>
                <CardDescription>Top Search Queries</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 20,
                            right: 20,
                            top: 10,
                            bottom: 10,
                        }}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="query"
                            type="category"
                            width={150}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(0,0,0,0.1)" }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white p-4 shadow-lg rounded-md">
                                            <p className="font-bold">
                                                {data.query}
                                            </p>
                                            <p>Searches: {data.count}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="count"
                            fill="#8884d8"
                            radius={[0, 5, 5, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Search Query Insights <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Total unique search queries: {chartData.length}
                </div>
            </CardFooter>
        </Card>
    );
}
