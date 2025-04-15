
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', aws: 4000, azure: 2400, gcp: 1400, total: 7800 },
  { name: 'Feb', aws: 3000, azure: 2210, gcp: 1290, total: 6500 },
  { name: 'Mar', aws: 2000, azure: 2290, gcp: 1300, total: 5590 },
  { name: 'Apr', aws: 2780, azure: 3090, gcp: 1320, total: 7190 },
  { name: 'May', aws: 1890, azure: 3490, gcp: 1450, total: 6830 },
  { name: 'Jun', aws: 2390, azure: 3690, gcp: 1700, total: 7780 },
];

export function CostTrendChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cost Trends</CardTitle>
        <CardDescription>Monthly cloud spending by provider</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAws" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9900" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FF9900" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAzure" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0072C6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0072C6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGcp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis 
                stroke="var(--muted-foreground)"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
                formatter={(value: number) => [`$${value}`, undefined]}
              />
              <Area
                type="monotone"
                dataKey="aws"
                name="AWS"
                stackId="1"
                stroke="#FF9900"
                fillOpacity={1}
                fill="url(#colorAws)"
              />
              <Area
                type="monotone"
                dataKey="azure"
                name="Azure"
                stackId="1"
                stroke="#0072C6"
                fillOpacity={1}
                fill="url(#colorAzure)"
              />
              <Area
                type="monotone"
                dataKey="gcp"
                name="GCP"
                stackId="1"
                stroke="#4285F4"
                fillOpacity={1}
                fill="url(#colorGcp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
