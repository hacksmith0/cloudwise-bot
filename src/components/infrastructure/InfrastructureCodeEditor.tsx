
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Code, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function InfrastructureCodeEditor() {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  const terraformCode = `# AWS EC2 Instance optimized for cost
resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"  # Changed from t3.medium based on AI recommendation
  
  tags = {
    Name = "AppServer"
    ManagedBy = "CloudWise"
  }
  
  # Enable detailed monitoring for better scaling insights
  monitoring = true
  
  # Use spot instances for non-critical workloads (80% cost reduction)
  spot_price = "0.0035"
  
  lifecycle {
    create_before_destroy = true
  }
}

# Auto-scaling optimized based on AI load predictions
resource "aws_autoscaling_group" "app_asg" {
  name                 = "app-asg"
  launch_configuration = aws_launch_configuration.app_lc.name
  min_size             = 2
  max_size             = 10
  
  # Dynamic scaling based on AI predictions
  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 70.0
  }
  
  tag {
    key                 = "ManagedBy"
    value               = "CloudWise"
    propagate_at_launch = true
  }
}`;

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setIsValid(true);
    }, 1500);
  };

  const resetValidation = () => {
    setIsValid(null);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-cloud-azure" />
              <span>Terraform Infrastructure</span>
            </CardTitle>
            <CardDescription>AI-optimized infrastructure as code</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleValidate}
              disabled={isValidating}
            >
              {isValidating ? (
                <>
                  <div className="h-4 w-4 mr-1 rounded-full border-2 border-t-transparent border-primary animate-spin" />
                  Validating
                </>
              ) : (
                <>Validate</>
              )}
            </Button>
            <Button size="sm" disabled={!isValid}>
              <Play className="h-4 w-4 mr-1" /> Apply
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isValid === true && (
          <div className="flex items-center gap-2 p-2 mb-3 bg-green-500/10 text-green-500 rounded-md">
            <Check className="h-4 w-4" />
            <span>Terraform configuration is valid</span>
          </div>
        )}

        {isValid === false && (
          <div className="flex items-center gap-2 p-2 mb-3 bg-red-500/10 text-red-500 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span>Validation failed. Please check your configuration.</span>
          </div>
        )}

        <div className="relative">
          <Badge className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600">
            main.tf
          </Badge>
          <pre
            className="p-4 bg-slate-900 text-slate-50 rounded-md text-sm overflow-auto whitespace-pre"
            style={{ height: "350px" }}
          >
            {terraformCode}
          </pre>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-2">CloudWise AI Recommendations</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2 border rounded-md bg-accent/20">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <div className="text-sm">
                <p>Changed instance type from <code>t3.medium</code> to <code>t3.micro</code> for cost optimization (~70% reduction)</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 border rounded-md bg-accent/20">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <div className="text-sm">
                <p>Enabled spot instances for non-critical workloads to achieve 80% cost reduction</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
