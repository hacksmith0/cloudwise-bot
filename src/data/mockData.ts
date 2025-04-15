
import { AnomalyAlert, CloudProvider, CloudResource, DashboardSummary, OptimizationRecommendation } from "@/types";

export const cloudProviders: CloudProvider[] = [
  {
    id: "aws",
    name: "AWS",
    icon: "aws",
    color: "#FF9900",
    enabled: true
  },
  {
    id: "azure",
    name: "Azure",
    icon: "azure",
    color: "#0072C6",
    enabled: true
  },
  {
    id: "gcp",
    name: "GCP",
    icon: "gcp",
    color: "#4285F4",
    enabled: true
  }
];

export const mockResources: CloudResource[] = [
  {
    id: "aws-ec2-1",
    name: "web-server-prod-1",
    type: "EC2 Instance",
    provider: "aws",
    region: "us-east-1",
    metrics: [
      {
        id: "cpu",
        name: "CPU Utilization",
        value: 42,
        unit: "%",
        trend: "down",
        changePercentage: -8
      },
      {
        id: "memory",
        name: "Memory Usage",
        value: 65,
        unit: "%",
        trend: "stable",
        changePercentage: 0
      }
    ],
    status: "healthy",
    cost: {
      current: 125.40,
      projected: 130.20,
      anomaly: false
    }
  },
  {
    id: "aws-s3-1",
    name: "app-assets-bucket",
    type: "S3 Bucket",
    provider: "aws",
    region: "us-east-1",
    metrics: [
      {
        id: "storage",
        name: "Storage Usage",
        value: 256,
        unit: "GB",
        trend: "up",
        changePercentage: 15
      }
    ],
    status: "warning",
    cost: {
      current: 52.30,
      projected: 68.40,
      anomaly: true
    }
  },
  {
    id: "azure-vm-1",
    name: "app-server-eastus",
    type: "Virtual Machine",
    provider: "azure",
    region: "eastus",
    metrics: [
      {
        id: "cpu",
        name: "CPU Utilization",
        value: 12,
        unit: "%",
        trend: "down",
        changePercentage: -25
      }
    ],
    status: "healthy",
    cost: {
      current: 142.50,
      projected: 140.20,
      anomaly: false
    }
  },
  {
    id: "gcp-instance-1",
    name: "ml-training-instance",
    type: "Compute Instance",
    provider: "gcp",
    region: "us-central1",
    metrics: [
      {
        id: "cpu",
        name: "CPU Utilization",
        value: 92,
        unit: "%",
        trend: "up",
        changePercentage: 23
      }
    ],
    status: "critical",
    cost: {
      current: 215.80,
      projected: 230.40,
      anomaly: false
    }
  }
];

export const mockAlerts: AnomalyAlert[] = [
  {
    id: "alert-1",
    resourceId: "aws-s3-1",
    resourceName: "app-assets-bucket",
    resourceType: "S3 Bucket",
    provider: "aws",
    severity: "medium",
    message: "Cost anomaly detected: Storage cost increased by 15% compared to previous period",
    detectedAt: "2025-04-15T08:23:15Z",
    status: "new",
    type: "cost"
  },
  {
    id: "alert-2",
    resourceId: "gcp-instance-1",
    resourceName: "ml-training-instance",
    resourceType: "Compute Instance",
    provider: "gcp",
    severity: "critical",
    message: "High CPU utilization (92%) sustained for over 30 minutes",
    detectedAt: "2025-04-15T09:12:45Z",
    status: "new",
    type: "performance"
  },
  {
    id: "alert-3",
    resourceId: "azure-security-1",
    resourceName: "app-security-group",
    resourceType: "Network Security Group",
    provider: "azure",
    severity: "high",
    message: "Open security group rule detected: port 22 exposed to public internet",
    detectedAt: "2025-04-14T23:45:22Z",
    status: "acknowledged",
    type: "security"
  }
];

export const mockRecommendations: OptimizationRecommendation[] = [
  {
    id: "rec-1",
    resourceId: "azure-vm-1",
    resourceName: "app-server-eastus",
    resourceType: "Virtual Machine",
    provider: "azure",
    impact: "high",
    savingsAmount: 86.50,
    savingsPercentage: 60,
    message: "Downsize VM from Standard_D4s_v3 to Standard_D2s_v3. Current CPU utilization is consistently under 15%.",
    category: "cost",
    automatable: true,
    terraformSnippet: `resource "azurerm_linux_virtual_machine" "app_server" {
  name                = "app-server-eastus"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  size                = "Standard_D2s_v3" # Changed from Standard_D4s_v3
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.example.id,
  ]

  # Remaining configuration...
}`
  },
  {
    id: "rec-2",
    resourceId: "aws-ec2-1",
    resourceName: "web-server-prod-1",
    resourceType: "EC2 Instance",
    provider: "aws",
    impact: "medium",
    savingsAmount: 42.30,
    savingsPercentage: 35,
    message: "Convert to Spot Instance. Based on usage patterns, this non-critical workload could use spot instances with 60-80% cost saving.",
    category: "cost",
    automatable: true,
    terraformSnippet: `resource "aws_spot_instance_request" "web_server" {
  ami                    = "ami-0c55b159cbfafe1f0"
  instance_type          = "t3.medium"
  spot_price             = "0.046"
  wait_for_fulfillment   = true
  
  tags = {
    Name = "web-server-prod-1"
  }

  # Remaining configuration...
}`
  },
  {
    id: "rec-3",
    resourceId: "gcp-instance-1",
    resourceName: "ml-training-instance",
    resourceType: "Compute Instance",
    provider: "gcp",
    impact: "high",
    message: "Scale up instance or enable autoscaling. CPU utilization consistently exceeds 90% leading to potential performance issues.",
    category: "performance",
    automatable: false
  }
];

export const dashboardSummary: DashboardSummary = {
  totalResources: 42,
  resourcesByStatus: {
    healthy: 35,
    warning: 5,
    critical: 2,
    unknown: 0
  },
  totalCost: {
    current: 18456.30,
    projected: 19250.80,
    trend: 4.3
  },
  activeAlerts: 7,
  pendingRecommendations: 12,
  predictiveInsights: 5
};
