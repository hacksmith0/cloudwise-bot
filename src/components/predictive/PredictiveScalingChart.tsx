
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from "../ui/badge";
import { Brain } from "lucide-react";

const data = [
  { time: '12:00', actual: 42, predicted: null, recommended: null },
  { time: '13:00', actual: 53, predicted: null, recommended: null },
  { time: '14:00', actual: 76, predicted: null, recommended: null },
  { time: '15:00', actual: 91, predicted: null, recommended: null },
  { time: '16:00', actual: 85, predicted: null, recommended: null },
  { time: '17:00', actual: 70, predicted: null, recommended: null },
  { time: '18:00', actual: 62, predicted: null, recommended: null },
  { time: '19:00', actual: 45, predicted: 45, recommended: 3 },
  { time: '20:00', actual: null, predicted: 58, recommended: 4 },
  { time: '21:00', actual: null, predicted: 80, recommended: 6 },
  { time: '22:00', actual: null, predicted: 105, recommended: 8 },
  { time: '23:00', actual: null, predicted: 120, recommended: 10 },
  { time: '00:00', actual: null, predicted: 95, recommended: 8 },
];

export function PredictiveScalingChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <span>Predictive Auto-Scaling</span>
              <Badge className="ml-2 bg-purple-500/20 text-purple-500 hover:bg-purple-500/30">ML-powered</Badge>
            </CardTitle>
            <CardDescription>Forecasted load and resource needs</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" stroke="var(--muted-foreground)" />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="actual" 
                name="Actual Load (%)" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="predicted" 
                name="Predicted Load (%)" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="stepAfter" 
                dataKey="recommended" 
                name="Recommended Instances" 
                stroke="#10B981" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="border rounded-md p-3">
            <h4 className="text-sm font-medium mb-2">Peak Load Forecast</h4>
            <div className="text-lg font-bold text-purple-500">120%</div>
            <p className="text-xs text-muted-foreground">Expected at 23:00</p>
          </div>
          <div className="border rounded-md p-3">
            <h4 className="text-sm font-medium mb-2">Instance Recommendation</h4>
            <div className="text-lg font-bold text-green-500">10 servers</div>
            <p className="text-xs text-muted-foreground">Optimal capacity for peak</p>
          </div>
          <div className="border rounded-md p-3">
            <h4 className="text-sm font-medium mb-2">Cost Impact</h4>
            <div className="text-lg font-bold text-green-500">+$4.20/hr</div>
            <p className="text-xs text-muted-foreground">During peak hours only</p>
          </div>
          <div className="border rounded-md p-3">
            <h4 className="text-sm font-medium mb-2">Model Confidence</h4>
            <div className="text-lg font-bold text-blue-500">92%</div>
            <p className="text-xs text-muted-foreground">Based on 30-day history</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
