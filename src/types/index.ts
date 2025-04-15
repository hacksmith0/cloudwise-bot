
export interface CloudProvider {
  id: string;
  name: 'AWS' | 'Azure' | 'GCP';
  icon: string;
  color: string;
  enabled: boolean;
}

export interface ResourceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
}

export interface CloudResource {
  id: string;
  name: string;
  type: string;
  provider: CloudProvider['id'];
  region: string;
  metrics: ResourceMetric[];
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  cost: {
    current: number;
    projected: number;
    anomaly: boolean;
  };
}

export interface AnomalyAlert {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  provider: CloudProvider['id'];
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  detectedAt: string;
  status: 'new' | 'acknowledged' | 'resolved';
  type: 'cost' | 'performance' | 'security' | 'availability';
}

export interface OptimizationRecommendation {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  provider: CloudProvider['id'];
  impact: 'low' | 'medium' | 'high';
  savingsAmount?: number;
  savingsPercentage?: number;
  message: string;
  category: 'cost' | 'performance' | 'security' | 'availability';
  automatable: boolean;
  terraformSnippet?: string;
}

export interface PredictiveScaling {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  provider: CloudProvider['id'];
  currentCapacity: number;
  recommendedCapacity: number;
  predictedLoad: number;
  timeWindow: string;
  confidence: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
  attachments?: {
    type: 'recommendation' | 'alert' | 'resource' | 'terraform' | 'chart';
    data: any;
  }[];
}

export interface DashboardSummary {
  totalResources: number;
  resourcesByStatus: {
    healthy: number;
    warning: number;
    critical: number;
    unknown: number;
  };
  totalCost: {
    current: number;
    projected: number;
    trend: number;
  };
  activeAlerts: number;
  pendingRecommendations: number;
  predictiveInsights: number;
}
