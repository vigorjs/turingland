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

const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
];

const PropertyCategoryChart = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return null;
    }

    // Calculate percentage change
    const totalProperties = data.reduce((sum, item) => sum + item.total, 0);
    const previousTotal = 0;
    const percentageChange = (
        ((totalProperties - previousTotal) / (previousTotal || 1)) *
        100
    ).toFixed(1);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border border-border rounded-lg p-2 text-sm">
                    <p className="font-medium">{payload[0].name}</p>
                    <p className="text-muted-foreground">
                        {payload[0].value} properties (
                        {((payload[0].value / totalProperties) * 100).toFixed(
                            1
                        )}
                        %)
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom label with zero value check and label lines
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
                    className="fill-foreground text-xs"
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
                <CardTitle>Property Categories</CardTitle>
                <CardDescription>Distribution by Category</CardDescription>
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
                                outerRadius={100}
                                // label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
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

export default PropertyCategoryChart;
