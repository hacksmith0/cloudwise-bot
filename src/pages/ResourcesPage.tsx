
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const ResourcesPage = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-[1600px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['AWS', 'Azure', 'GCP'].map((provider) => (
                  <div key={provider} className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold mb-3">{provider}</h2>
                    <p className="text-muted-foreground mb-2">Active Resources: {Math.floor(Math.random() * 50) + 10}</p>
                    <div className="flex justify-between">
                      <span className="text-sm">CPU: {Math.floor(Math.random() * 60) + 20}%</span>
                      <span className="text-sm">Memory: {Math.floor(Math.random() * 60) + 20}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Resource List</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Name</th>
                        <th className="text-left pb-2">Type</th>
                        <th className="text-left pb-2">Provider</th>
                        <th className="text-left pb-2">Region</th>
                        <th className="text-left pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(8)].map((_, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3">resource-{i+1}</td>
                          <td className="py-3">{['EC2', 'S3', 'Lambda', 'VM', 'Storage', 'Function'][i % 6]}</td>
                          <td className="py-3">{['AWS', 'Azure', 'GCP'][i % 3]}</td>
                          <td className="py-3">{['us-east-1', 'eu-west-1', 'asia-east1'][i % 3]}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              i % 3 === 0 ? 'bg-green-100 text-green-800' : 
                              i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {i % 3 === 0 ? 'Running' : i % 3 === 1 ? 'Warning' : 'Error'}
                            </span>
                          </td>
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

export default ResourcesPage;
