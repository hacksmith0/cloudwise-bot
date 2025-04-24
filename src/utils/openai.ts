
import { ChatMessage } from "@/types";

const SYSTEM_PROMPTS = {
  general: "You are a helpful AI assistant that can answer general questions and provide assistance on various topics.",
  devops: "You are a cloud computing and DevOps expert. You can help with questions about Kubernetes, cloud platforms (AWS, GCP, Azure), infrastructure, and deployment strategies. Be specific and technical in your responses when appropriate."
};

export async function getAIResponse(messages: ChatMessage[], mode: "general" | "devops") {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("openai_key")}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[mode] },
          ...messages.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.content
          }))
        ],
        temperature: mode === "devops" ? 0.3 : 0.7, // Lower temperature for more precise technical responses
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw error;
  }
}
