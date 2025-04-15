
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { ResourceHealthChart } from "@/components/dashboard/ResourceHealthChart";
import { CostTrendChart } from "@/components/dashboard/CostTrendChart";
import { AlertsList } from "@/components/alerts/AlertsList";
import { RecommendationsList } from "@/components/recommendations/RecommendationsList";
import { ChatInterface } from "@/components/chatbot/ChatInterface";
import { PredictiveScalingChart } from "@/components/predictive/PredictiveScalingChart";
import { InfrastructureCodeEditor } from "@/components/infrastructure/InfrastructureCodeEditor";
import { dashboardSummary, mockAlerts, mockRecommendations } from "@/data/mockData";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  // Ensure theme effect runs after hydration to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-[1600px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              
              {/* Stats Overview */}
              <OverviewStats data={dashboardSummary} />
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceHealthChart data={dashboardSummary.resourcesByStatus} />
                <CostTrendChart />
              </div>
              
              {/* Alerts and Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlertsList alerts={mockAlerts} />
                <RecommendationsList recommendations={mockRecommendations} />
              </div>
              
              {/* Predictive Scaling and Infrastructure */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PredictiveScalingChart />
                <InfrastructureCodeEditor />
              </div>
              
              {/* Chat Interface */}
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
