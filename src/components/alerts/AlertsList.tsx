
import { AnomalyAlert } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronRight, Clock } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Button } from "../ui/button";

interface AlertsListProps {
  alerts: AnomalyAlert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  const getSeverityBadgeStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'high':
        return 'bg-orange-500 text-white hover:bg-orange-600';
      case 'medium':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'low':
        return 'bg-blue-500 text-white hover:bg-blue-600';
      default:
        return '';
    }
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'cost':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'performance':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'security':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'availability':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      default:
        return '';
    }
  };

  const getProviderBadgeStyle = (provider: string) => {
    switch (provider) {
      case 'aws':
        return 'bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900]/20';
      case 'azure':
        return 'bg-[#0072C6]/10 text-[#0072C6] hover:bg-[#0072C6]/20';
      case 'gcp':
        return 'bg-[#4285F4]/10 text-[#4285F4] hover:bg-[#4285F4]/20';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Active Alerts</span>
            </CardTitle>
            <CardDescription>Detected anomalies and issues</CardDescription>
          </div>
          <Button size="sm" variant="outline">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium">{alert.resourceName}</h4>
                  <p className="text-sm text-muted-foreground">{alert.resourceType}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getSeverityBadgeStyle(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline" className={getTypeBadgeStyle(alert.type)}>
                    {alert.type}
                  </Badge>
                  <Badge variant="outline" className={getProviderBadgeStyle(alert.provider)}>
                    {alert.provider.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm mb-3">{alert.message}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatDistanceToNow(parseISO(alert.detectedAt))} ago</span>
                </div>
                <div>
                  <Button size="sm" variant="outline">
                    Investigate <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
