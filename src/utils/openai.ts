
import { ChatMessage } from "@/types";

const SYSTEM_PROMPTS = {
  general: "You are a helpful AI assistant that can answer general questions and provide assistance on various topics.",
  devops: "You are a cloud computing and DevOps expert. You can help with questions about Kubernetes, cloud platforms (AWS, GCP, Azure), infrastructure, and deployment strategies. Be specific and technical in your responses when appropriate."
};

// Mock responses for when the API fails
const MOCK_RESPONSES = {
  general: {
    "cloud computing": "Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ('the cloud') to offer faster innovation, flexible resources, and economies of scale.",
    "difference between iaas paas saas": "IaaS (Infrastructure as a Service) provides virtualized computing resources over the internet. PaaS (Platform as a Service) provides hardware and software tools over the internet, typically for application development. SaaS (Software as a Service) delivers software applications over the internet, on-demand and typically on a subscription basis.",
    "benefits of cloud storage": "Benefits of cloud storage include: accessibility from anywhere with internet, cost-efficiency without hardware investments, scalability to adjust capacity as needed, automatic backups, and disaster recovery options.",
    "improve application security": "To improve application security: implement strong authentication, use encryption for data in transit and at rest, regularly update and patch software, conduct security testing, implement proper access controls, and monitor for suspicious activities."
  },
  devops: {
    "auto-scaling aws": "To set up auto-scaling in AWS:\n1. Create an Amazon Machine Image (AMI) of your instance\n2. Create a Launch Configuration/Template with that AMI\n3. Create an Auto Scaling Group using that Launch Configuration\n4. Define scaling policies based on metrics like CPU utilization or network traffic\n5. Configure Auto Scaling Group settings (min/max size, desired capacity)\n6. Optionally, set up notifications for scaling events",
    "kubernetes pod lifecycle": "Kubernetes pod lifecycle phases include:\n1. Pending: Pod accepted but containers not yet running\n2. Running: At least one container still running\n3. Succeeded: All containers terminated successfully\n4. Failed: At least one container terminated with non-zero exit code\n5. Unknown: Pod state cannot be determined\n\nAdditional states include ContainerCreating, CrashLoopBackOff, and Terminating.",
    "ci cd best practices": "CI/CD pipeline best practices:\n1. Automate everything - builds, tests, deployments\n2. Build only once and promote same artifact through environments\n3. Make pipelines fast with parallel execution where possible\n4. Include security scanning and code quality checks\n5. Implement comprehensive automated testing\n6. Use feature flags for safer deployments\n7. Implement monitoring and rollback mechanisms\n8. Keep configuration separate from code",
    "optimize cloud costs": "To optimize cloud costs:\n1. Right-size your instances based on actual utilization\n2. Use auto-scaling for variable workloads\n3. Utilize spot/preemptible instances for non-critical workloads\n4. Implement lifecycle policies for storage\n5. Delete unused resources (volumes, IPs, etc.)\n6. Reserve instances for predictable workloads\n7. Use cost allocation tags\n8. Set up budgets and alerts"
  }
};

export async function getAIResponse(messages: ChatMessage[], mode: "general" | "devops") {
  try {
    // Get the last message text to determine response
    const lastUserMessage = messages.filter(msg => msg.sender === "user").pop()?.content.toLowerCase() || "";
    
    // Try the Hugging Face API first (even without authentication for public models)
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
      // Set a timeout to avoid hanging for too long
      signal: AbortSignal.timeout(5000)
    });

    // If API call was successful, return the result
    if (response.ok) {
      const data = await response.json();
      return data[0].generated_text;
    }
    
    // If API call failed, use mock responses
    // Find a matching mock response based on keywords
    const mockResponses = MOCK_RESPONSES[mode];
    const matchingKeyword = Object.keys(mockResponses).find(key => 
      lastUserMessage.includes(key)
    );
    
    if (matchingKeyword) {
      return mockResponses[matchingKeyword];
    }
    
    // Default response if no matching keyword
    return mode === "general" 
      ? "I'm sorry, I don't have specific information on that topic. Could you try rephrasing your question?"
      : "I don't have specific DevOps information on that topic. Could you provide more details about what you're trying to accomplish?";
  } catch (error) {
    console.error("Error getting AI response:", error);
    
    // Return a friendly error message
    return "I'm experiencing some technical difficulties right now. Here are some resources you might find helpful:\n\n" +
      "- For AWS: https://docs.aws.amazon.com\n" +
      "- For Kubernetes: https://kubernetes.io/docs\n" +
      "- For CI/CD: https://www.atlassian.com/continuous-delivery";
  }
}
