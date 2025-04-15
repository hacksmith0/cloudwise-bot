
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatInterface } from "@/components/chatbot/ChatInterface";

const ChatbotPage = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-[1600px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tight">CloudWise AI</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium">Recent Chat Sessions</h3>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium">Issues Resolved</h3>
                  <p className="text-2xl font-bold">28</p>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium">AI Training Status</h3>
                  <div className="flex items-center">
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                    <p className="font-medium">Active & Learning</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Chat with CloudWise AI</h2>
                <p className="text-muted-foreground mb-4">
                  Ask questions about your infrastructure, get recommendations, or troubleshoot issues.
                </p>
                
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ChatbotPage;
