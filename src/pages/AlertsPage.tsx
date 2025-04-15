
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AlertsList } from "@/components/alerts/AlertsList";
import { mockAlerts } from "@/data/mockData";

const AlertsPage = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-[1600px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="border rounded-lg p-4 shadow-sm bg-red-50 dark:bg-red-900/20">
                  <h3 className="font-medium text-red-700 dark:text-red-400">Critical</h3>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="border rounded-lg p-4 shadow-sm bg-yellow-50 dark:bg-yellow-900/20">
                  <h3 className="font-medium text-yellow-700 dark:text-yellow-400">Warning</h3>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <div className="border rounded-lg p-4 shadow-sm bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-medium text-blue-700 dark:text-blue-400">Info</h3>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="border rounded-lg p-4 shadow-sm bg-green-50 dark:bg-green-900/20">
                  <h3 className="font-medium text-green-700 dark:text-green-400">Resolved</h3>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
              
              <AlertsList alerts={mockAlerts} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AlertsPage;
