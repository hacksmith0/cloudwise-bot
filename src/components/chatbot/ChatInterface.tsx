
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, Bot, Code, FileText, BarChart, CircleDot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/types";

interface ChatInterfaceProps {
  className?: string;
}

export function ChatInterface({ className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      content: "Hello! I'm CloudWise AI, your DevOps assistant. How can I help you optimize your cloud infrastructure today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot response with a recommendation
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        content: "I've analyzed your AWS EC2 instances and detected potential cost savings. You have several underutilized instances that could be downsized or switched to Spot instances.",
        timestamp: new Date().toISOString(),
        attachments: [
          {
            type: "recommendation",
            data: {
              title: "EC2 Optimization",
              description: "Based on the last 30 days of usage patterns, you could save $432/month by resizing these instances:",
              items: [
                "i-0a73b82f1c5de3a7b: m5.xlarge → m5.large (50% cheaper)",
                "i-0b94c7d8e5f6a7b8c: c5.2xlarge → c5.xlarge (50% cheaper)"
              ],
              savings: 432,
            }
          }
        ]
      };
      
      setMessages((prev) => [...prev, botResponse]);
      
      // Scroll to bottom
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>CloudWise AI Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col h-[500px]">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {message.attachments?.map((attachment, i) => {
                      if (attachment.type === "recommendation") {
                        const data = attachment.data;
                        return (
                          <div key={i} className="mt-3 border rounded-md p-3 bg-accent/50 text-accent-foreground">
                            <div className="flex items-center gap-2 font-medium mb-1">
                              <CircleDot className="h-4 w-4 text-green-500" />
                              {data.title}
                            </div>
                            <p className="text-sm mb-2">{data.description}</p>
                            <ul className="text-sm list-disc pl-5 mb-2 space-y-1">
                              {data.items.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                            <div className="text-green-500 text-sm font-medium">
                              Potential monthly savings: ${data.savings}
                            </div>
                          </div>
                        );
                      } else if (attachment.type === "terraform") {
                        return (
                          <div key={i} className="mt-3 border rounded-md p-3 bg-slate-900 text-slate-50">
                            <pre className="text-xs overflow-auto">{attachment.data.code}</pre>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your cloud infrastructure..."
                  className="pr-10"
                />
                <div className="absolute right-1 top-1 opacity-70">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                  >
                    <ArrowUpCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Code className="h-3 w-3 mr-1" />
                Generate Terraform
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <BarChart className="h-3 w-3 mr-1" />
                Analyze costs
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Explain logs
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
