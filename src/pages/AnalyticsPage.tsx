
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ResourceHealthChart } from "@/components/dashboard/ResourceHealthChart";
import { CostTrendChart } from "@/components/dashboard/CostTrendChart";
import { dashboardSummary } from "@/data/mockData";

const AnalyticsPage = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-[1600px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceHealthChart data={dashboardSummary.resourcesByStatus} />
                <CostTrendChart />
              </div>
              
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['API Response Time', 'Database Latency', 'Network Throughput'].map((metric) => (
                    <div key={metric} className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">{metric}</h3>
                      <p className="text-2xl font-bold mt-1">
                        {Math.floor(Math.random() * 100) + 10}
                        <span className="text-sm ml-1 font-normal text-muted-foreground">
                          {metric.includes('Time') || metric.includes('Latency') ? 'ms' : 'Mbps'}
                        </span>
                      </p>
                      <div className="flex items-center mt-2">
                        <span className={`text-xs ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                          {Math.random() > 0.5 ? '↓' : '↑'} {Math.floor(Math.random() * 10) + 1}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">vs last week</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AnalyticsPage;
