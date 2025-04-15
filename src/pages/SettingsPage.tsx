
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-[1200px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="api">API Keys</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                      <CardDescription>
                        Configure your CloudWise account settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">User Interface</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="theme-toggle" className="font-medium">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Toggle between light and dark themes
                            </p>
                          </div>
                          <Switch id="theme-toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="analytics" className="font-medium">Analytics Dashboard</Label>
                            <p className="text-sm text-muted-foreground">
                              Set as default landing page
                            </p>
                          </div>
                          <Switch id="analytics" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="refresh" className="font-medium">Auto-refresh</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically refresh dashboard data
                            </p>
                          </div>
                          <Switch id="refresh" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-medium">Account</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Admin User" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="admin@cloudwise.dev" />
                          </div>
                        </div>
                        <Button>Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="integrations">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cloud Provider Integrations</CardTitle>
                      <CardDescription>
                        Manage your connections to cloud providers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {['AWS', 'Azure', 'GCP'].map((provider) => (
                        <div key={provider} className="flex items-center justify-between py-4 border-b">
                          <div>
                            <h3 className="font-medium">{provider}</h3>
                            <p className="text-sm text-muted-foreground">
                              {provider === 'AWS' ? 'Connected via IAM Role' : provider === 'Azure' ? 'Connected via Service Principal' : 'Connected via Service Account'}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                            <span className="text-sm text-muted-foreground mr-4">Active</span>
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>
                      ))}
                      <Button className="mt-4">Add New Integration</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how you receive alerts and notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: 'Critical Alerts', desc: 'For severe issues requiring immediate attention' },
                          { name: 'Cost Anomalies', desc: 'When unusual spending is detected' },
                          { name: 'Performance Issues', desc: 'For resource performance degradation' },
                          { name: 'Security Alerts', desc: 'For potential security vulnerabilities' },
                          { name: 'Maintenance Updates', desc: 'Scheduled maintenance information' }
                        ].map((item) => (
                          <div key={item.name} className="flex items-center justify-between py-4 border-b">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Switch id={`email-${item.name}`} defaultChecked={item.name === 'Critical Alerts' || item.name === 'Cost Anomalies'} />
                                <Label htmlFor={`email-${item.name}`} className="text-sm">Email</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch id={`slack-${item.name}`} defaultChecked={item.name === 'Critical Alerts'} />
                                <Label htmlFor={`slack-${item.name}`} className="text-sm">Slack</Label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="api">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Keys</CardTitle>
                      <CardDescription>
                        Manage API keys for programmatic access
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-4 border-b">
                          <div>
                            <h3 className="font-medium">Production API Key</h3>
                            <p className="text-sm text-muted-foreground">Created on April 10, 2025</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="bg-muted px-3 py-1.5 rounded text-sm font-mono">
                              •••••••••••••••••
                            </div>
                            <Button variant="outline" size="sm">Reveal</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Revoke</Button>
                          </div>
                        </div>
                        <Button>Generate New API Key</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SettingsPage;
