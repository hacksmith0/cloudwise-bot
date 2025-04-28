
import { ChatMessage } from "@/types";

const SYSTEM_PROMPTS = {
  general: "You are a helpful AI assistant that can answer general questions and provide assistance on various topics.",
  devops: "You are a cloud computing and DevOps expert. You can help with questions about Kubernetes, cloud platforms (AWS, GCP, Azure), infrastructure, and deployment strategies. Be specific and technical in your responses when appropriate."
};

export async function getAIResponse(messages: ChatMessage[], mode: "general" | "devops") {
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: SYSTEM_PROMPTS[mode] + " " + messages.map(msg => msg.content).join(" "),
        parameters: {
          max_new_tokens: 250,
          temperature: mode === "devops" ? 0.3 : 0.7,
        }
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw error;
  }
}
