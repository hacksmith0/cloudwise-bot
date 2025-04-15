
import { DashboardSummary } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, CloudCog, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";

interface OverviewStatsProps {
  data: DashboardSummary;
}

export function OverviewStats({ data }: OverviewStatsProps) {
  const cards = [
    {
      title: "Total Resources",
      value: data.totalResources,
      description: (
        <div className="flex items-center gap-2">
          <span className={cn("flex items-center text-sm",
            data.resourcesByStatus.critical > 0 ? "text-red-500" : "text-green-500"
          )}>
            {data.resourcesByStatus.critical > 0 ? (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                {data.resourcesByStatus.critical} critical
              </>
            ) : (
              <>
                <ArrowUp className="h-3 w-3 mr-1" />
                All healthy
              </>
            )}
          </span>
        </div>
      ),
      icon: CloudCog,
      color: "bg-blue-500"
    },
    {
      title: "Monthly Cost",
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.totalCost.current),
      description: (
        <div className="flex items-center gap-2">
          <span className={cn("flex items-center text-sm",
            data.totalCost.trend > 0 ? "text-red-500" : "text-green-500"
          )}>
            {data.totalCost.trend > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 mr-1" />
                {Math.abs(data.totalCost.trend)}% increase
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 mr-1" />
                {Math.abs(data.totalCost.trend)}% decrease
              </>
            )}
          </span>
        </div>
      ),
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      title: "Active Alerts",
      value: data.activeAlerts,
      description: (
        <div className="flex items-center gap-2">
          <span className={cn("text-sm",
            data.activeAlerts > 5 ? "text-red-500" : "text-amber-500"
          )}>
            Requires attention
          </span>
        </div>
      ),
      icon: AlertTriangle,
      color: "bg-amber-500"
    },
    {
      title: "Optimization Opportunities",
      value: data.pendingRecommendations,
      description: (
        <div className="flex items-center gap-2">
          <span className="flex items-center text-sm text-blue-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            {data.predictiveInsights} predictive insights
          </span>
        </div>
      ),
      icon: TrendingUp,
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <Card key={i} className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 -mt-4 -mr-4 rounded-full bg-opacity-10 flex items-center justify-center">
            <card.icon className="h-6 w-6 text-muted-foreground/30" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <CardDescription className="mt-1">
              {card.description}
            </CardDescription>
          </CardContent>
          <div className={cn("h-1", card.color)} />
        </Card>
      ))}
    </div>
  );
}
