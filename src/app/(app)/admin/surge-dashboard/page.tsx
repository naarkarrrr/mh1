'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const surgePredictionData = [
  { time: '00:00', current: 40, predicted: 45 },
  { time: '04:00', current: 30, predicted: 38 },
  { time: '08:00', current: 60, predicted: 75 },
  { time: '12:00', current: 80, predicted: 95 },
  { time: '16:00', current: 70, predicted: 88 },
  { time: '20:00', current: 90, predicted: 110 },
];

const bedUsageData = [
    { name: 'ICU Beds', used: 48, total: 60 },
    { name: 'ER Beds', used: 30, total: 40 },
    { name: 'General Ward', used: 180, total: 250 },
]

const chartConfig = {
  predicted: {
    label: "Predicted",
    color: "hsl(var(--chart-1))",
  },
  current: {
    label: "Current",
    color: "hsl(var(--chart-2))",
  },
} satisfies import('@/components/ui/chart').ChartConfig

export default function SurgeDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Predictive Surge Intelligence</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Surge Prediction (Next 24h)</CardTitle>
            <CardDescription>
              Comparison of current patient load vs. AI-predicted load. Blockchain Hash: 0x1a2b...c3d4
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={surgePredictionData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar dataKey="current" fill="var(--color-current)" radius={4} />
                <Bar dataKey="predicted" fill="var(--color-predicted)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
             <Card>
                <CardHeader>
                    <CardTitle>Resource Usage Prediction</CardTitle>
                    <CardDescription>Predicted vs. available critical resources.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{ used: { label: "Used", color: "hsl(var(--chart-1))" } }} className="h-[250px] w-full">
                        <BarChart data={bedUsageData} layout="vertical" accessibilityLayer>
                            <CartesianGrid horizontal={false} />
                            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={10} />
                            <XAxis type="number" hide />
                             <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="used" fill="var(--color-used)" radius={4} layout="vertical">
                                 {bedUsageData.map((entry, index) => (
                                    <text key={`label-${index}`} x={entry.used + 10} y={index * 35 + 20} textAnchor="start" fill="hsl(var(--foreground))" fontSize={12}>
                                        {`${entry.used} / ${entry.total}`}
                                    </text>
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Influencing Factors</CardTitle>
                    <CardDescription>Data used for the current prediction model.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <p><strong>AQI Data:</strong> Moderate (AQI 78)</p>
                    <p><strong>Weather:</strong> High Pollen Count, Temp: 75°F</p>
                    <p><strong>Public Events:</strong> Downtown Marathon (15,000 attendees)</p>
                    <p><strong>Data Hash:</strong> 0xfg5h...i6j7</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
