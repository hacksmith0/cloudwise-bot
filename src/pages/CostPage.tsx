
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CostTrendChart } from "@/components/dashboard/CostTrendChart";

const CostPage = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-[1600px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tight">Cost Management</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Month Cost</h3>
                  <p className="text-2xl font-bold mt-1">$12,483.56</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-red-500">↑ 8.2%</span>
                    <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground">Projected Month End</h3>
                  <p className="text-2xl font-bold mt-1">$16,750.24</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-red-500">↑ 4.8%</span>
                    <span className="text-xs text-muted-foreground ml-1">vs budget</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground">Optimization Potential</h3>
                  <p className="text-2xl font-bold mt-1">$3,462.18</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-green-500">21% savings</span>
                    <span className="text-xs text-muted-foreground ml-1">possible</span>
                  </div>
                </div>
              </div>
              
              <CostTrendChart />
              
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Cost by Service</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Service</th>
                        <th className="text-left pb-2">Provider</th>
                        <th className="text-right pb-2">Current Cost</th>
                        <th className="text-right pb-2">Previous Month</th>
                        <th className="text-right pb-2">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {service: 'Compute', provider: 'AWS', current: 4235.24, previous: 3982.67},
                        {service: 'Storage', provider: 'AWS', current: 2456.78, previous: 2234.12},
                        {service: 'Networking', provider: 'AWS', current: 1237.45, previous: 1350.89},
                        {service: 'Virtual Machines', provider: 'Azure', current: 3125.67, previous: 2987.34},
                        {service: 'Database', provider: 'GCP', current: 1428.42, previous: 1356.78},
                      ].map((item, i) => {
                        const change = ((item.current - item.previous) / item.previous) * 100;
                        return (
                          <tr key={i} className="border-b">
                            <td className="py-3">{item.service}</td>
                            <td className="py-3">{item.provider}</td>
                            <td className="py-3 text-right">${item.current.toFixed(2)}</td>
                            <td className="py-3 text-right">${item.previous.toFixed(2)}</td>
                            <td className="py-3 text-right">
                              <span className={`${change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {change > 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CostPage;
