import React from "react";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

const COLORS = {
    Sale: "hsl(var(--chart-1))",
    Rent: "hsl(var(--chart-2))",
};

const PropertyTypeChart = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return null;
    }

    // Calculate total properties
    const totalProperties = data.reduce((sum, item) => sum + item.total, 0);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="bg-background border border-border rounded-lg p-2 text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">
                        {item.total} properties (
                        {((item.total / totalProperties) * 100).toFixed(1)}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom label with connecting lines
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
        name,
        value,
    }) => {
        if (value === 0) {
            return null;
        }

        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 30; // Increased radius for label position
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        // Calculate line points
        const innerPoint = {
            x: cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN),
            y: cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN),
        };

        const outerPoint = {
            x: cx + (outerRadius + 25) * Math.cos(-midAngle * RADIAN),
            y: cy + (outerRadius + 25) * Math.sin(-midAngle * RADIAN),
        };

        const textAnchor = x > cx ? "start" : "end";
        const finalX = x > cx ? x + 5 : x - 5;

        return (
            <g>
                {/* First line - from pie to outer area */}
                <path
                    d={`M ${cx + outerRadius * Math.cos(-midAngle * RADIAN)},${
                        cy + outerRadius * Math.sin(-midAngle * RADIAN)
                    } L ${innerPoint.x},${innerPoint.y}`}
                    stroke="hsl(var(--muted-foreground))"
                    fill="none"
                    strokeWidth={1}
                />
                {/* Second line - horizontal */}
                <path
                    d={`M ${innerPoint.x},${innerPoint.y} L ${finalX},${y}`}
                    stroke="hsl(var(--muted-foreground))"
                    fill="none"
                    strokeWidth={1}
                />
                <text
                    x={finalX}
                    y={y}
                    className="fill-foreground text-sm font-medium"
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                >
                    {name} ({(percent * 100).toFixed(0)}%)
                </text>
            </g>
        );
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Property Types</CardTitle>
                <CardDescription>Sale vs Rent Distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="mx-auto aspect-square h-[300px]">
                    {" "}
                    {/* Increased height for labels */}
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="total"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                // label={renderCustomizedLabel}
                                labelLine={false}
                                innerRadius="40%"
                                outerRadius="80%"
                            >
                                {data.map((entry) => (
                                    <Cell
                                        key={`cell-${entry.name}`}
                                        fill={COLORS[entry.name]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default PropertyTypeChart;
