
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function ApiKeyInput() {
  const [key, setKey] = useState(localStorage.getItem("openai_key") || "");
  const { toast } = useToast();

  const handleSave = () => {
    if (!key.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("openai_key", key.trim());
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
  };

  return (
    <div className="p-4 border rounded-lg mb-4 bg-accent/50">
      <h3 className="text-sm font-medium mb-2">OpenAI API Key</h3>
      <div className="flex gap-2">
        <Input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          className="flex-1"
        />
        <Button onClick={handleSave} size="sm">
          Save Key
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Your API key is stored locally and never sent to our servers.
      </p>
    </div>
  );
}
