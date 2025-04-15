
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { InfrastructureCodeEditor } from "@/components/infrastructure/InfrastructureCodeEditor";

const InfrastructurePage = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-[1600px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tight">Infrastructure as Code</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium">Terraform Modules</h3>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium">Deployed Resources</h3>
                  <p className="text-2xl font-bold">128</p>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium">Last Deployment</h3>
                  <p className="text-lg font-medium">2 hours ago</p>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium">Drift Detected</h3>
                  <p className="text-2xl font-bold text-yellow-500">3</p>
                </div>
              </div>
              
              <InfrastructureCodeEditor />
              
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Recent Deployments</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Deployment ID</th>
                        <th className="text-left pb-2">User</th>
                        <th className="text-left pb-2">Environment</th>
                        <th className="text-left pb-2">Status</th>
                        <th className="text-left pb-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3">depl-{Math.random().toString(36).substring(2, 8)}</td>
                          <td className="py-3">user{i+1}@cloudwise.dev</td>
                          <td className="py-3">{['Production', 'Staging', 'Development'][i % 3]}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              i === 0 ? 'bg-blue-100 text-blue-800' : 
                              i === 4 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {i === 0 ? 'In Progress' : i === 4 ? 'Warning' : 'Success'}
                            </span>
                          </td>
                          <td className="py-3">{i * 3 + 2} hours ago</td>
                        </tr>
                      ))}
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

export default InfrastructurePage;
