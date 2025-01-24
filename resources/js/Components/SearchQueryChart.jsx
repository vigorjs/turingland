import React, { useMemo } from 'react'
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SearchQueryChart({ logs }) {
  const chartData = useMemo(() => {
    const queryCount = logs.reduce((acc, log) => {
      try {
        // Convert Eloquent ArrayObject to plain object
        const context = log.context?.storage || log.context;
        
        let query = context.query || 
                    context.location_id || 
                    context.title || 
                    context.search_term || 
                    'Unknown Query';
        
        query = query.toString();
        
        acc[query] = (acc[query] || 0) + 1;
      } catch (error) {
        console.error('Error parsing log context', log.context, error);
      }
      return acc;
    }, {});
  
    return Object.entries(queryCount)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [logs]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Searched Queries</CardTitle>
        <CardDescription>Top Search Queries</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          layout="vertical"
          margin={{
            left: 20,
            right: 20,
          }}
        >
          <XAxis type="number" hide />
          <YAxis 
            dataKey="query" 
            type="category" 
            width={150} 
          />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Search Query Insights <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total unique search queries: {chartData.length}
        </div>
      </CardFooter>
    </Card>
  )
}