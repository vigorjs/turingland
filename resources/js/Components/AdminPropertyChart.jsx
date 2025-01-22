import React from "react";
import { TrendingUp } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

const chartConfig = {
    created: {
        label: "Properties Created",
        color: "hsl(var(--chart-1))",
    },
    sold: {
        label: "Properties Sold",
        color: "hsl(var(--chart-2))",
    },
};

const AdminPropertyChart = ({ data }) => {
    // Transform the data to match the chart format
    const chartData = data.map((item) => ({
        month: item.month,
        created: item.created,
        sold: item.sold,
    }));

    // Calculate percentage change from previous month
    const currentMonth = chartData[chartData.length - 1]?.created || 0;
    const prevMonth = chartData[chartData.length - 2]?.created || 0;
    const percentageChange =
        prevMonth !== 0
            ? (((currentMonth - prevMonth) / prevMonth) * 100).toFixed(1)
            : 0;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Property Statistics</CardTitle>
                <CardDescription>
                    {`January - December ${new Date().getFullYear()}`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <Tooltip
                                cursor={false}
                                contentStyle={{
                                    background: "hsl(var(--background))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "4px",
                                    padding: "8px",
                                }}
                            />
                            <Bar
                                dataKey="created"
                                name="Created"
                                fill="hsl(var(--chart-1))"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="sold"
                                name="Sold"
                                fill="hsl(var(--chart-2))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {percentageChange > 0 ? "Trending up" : "Trending down"} by{" "}
                    {Math.abs(percentageChange)}% this month
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing property statistics for the last 12 months
                </div>
            </CardFooter>
        </Card>
    );
};

export default AdminPropertyChart;
