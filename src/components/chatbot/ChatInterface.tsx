import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, Bot, Code, FileText, BarChart, CircleDot, MessageSquare, Cloud } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage } from "@/types";
import { getAIResponse } from "@/utils/openai";

interface ChatInterfaceProps {
  className?: string;
}

export function ChatInterface({ className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      content: "Hello! I'm CloudWise AI, your intelligent assistant. I can help with both general questions and DevOps tasks. How can I assist you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"general" | "devops">("general");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const aiResponse = await getAIResponse(
        [...messages, userMessage],
        mode
      );

      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      
      // Scroll to bottom
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const switchMode = (newMode: "general" | "devops") => {
    setMode(newMode);
    toast({
      title: `Switched to ${newMode === "devops" ? "DevOps" : "General"} Mode`,
      description: newMode === "devops" 
        ? "Now focusing on infrastructure and cloud operations."
        : "Now available for general assistance.",
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>CloudWise AI Assistant</span>
          <div className="flex gap-2 ml-auto">
            <Button
              variant={mode === "general" ? "default" : "outline"}
              size="sm"
              onClick={() => switchMode("general")}
              className="text-xs"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              General Chat
            </Button>
            <Button
              variant={mode === "devops" ? "default" : "outline"}
              size="sm"
              onClick={() => switchMode("devops")}
              className="text-xs"
            >
              <Cloud className="h-4 w-4 mr-1" />
              DevOps Mode
            </Button>
          </div>
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
                            {data.savings && (
                              <div className="text-green-500 text-sm font-medium">
                                Potential monthly savings: ${data.savings}
                              </div>
                            )}
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
                  placeholder={mode === "devops" 
                    ? "Ask about your cloud infrastructure..."
                    : "Ask me anything..."
                  }
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
            
            {mode === "devops" && (
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
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
