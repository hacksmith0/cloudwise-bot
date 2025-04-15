
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OptimizationRecommendation } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Code, Lightbulb, Terminal, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";

interface RecommendationsListProps {
  recommendations: OptimizationRecommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<OptimizationRecommendation | null>(null);
  
  const getProviderBadgeStyle = (provider: string) => {
    switch (provider) {
      case 'aws':
        return 'bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900]/20';
      case 'azure':
        return 'bg-[#0072C6]/10 text-[#0072C6] hover:bg-[#0072C6]/20';
      case 'gcp':
        return 'bg-[#4285F4]/10 text-[#4285F4] hover:bg-[#4285F4]/20';
      default:
        return '';
    }
  };

  const getImpactBadgeStyle = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      default:
        return '';
    }
  };

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'cost':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'performance':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'security':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'availability':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      default:
        return '';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-cloud-yellow" />
                <span>Recommendations</span>
              </CardTitle>
              <CardDescription>AI-generated optimization opportunities</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => setSelectedRecommendation(rec)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{rec.resourceName}</h4>
                    <p className="text-sm text-muted-foreground">{rec.resourceType}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={getProviderBadgeStyle(rec.provider)}>
                      {rec.provider.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={getImpactBadgeStyle(rec.impact)}>
                      {rec.impact} impact
                    </Badge>
                    <Badge variant="outline" className={getCategoryBadgeStyle(rec.category)}>
                      {rec.category}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm mb-3">{rec.message}</p>
                
                {rec.savingsAmount && (
                  <div className="flex items-center gap-1 text-green-500 text-sm mb-2">
                    <span>Potential savings:</span>
                    <span className="font-medium">
                      ${rec.savingsAmount.toLocaleString()} ({rec.savingsPercentage}%)
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    <Check className="h-4 w-4 mr-1" /> Apply
                  </Button>
                  <Button size="sm" variant="ghost">
                    <XCircle className="h-4 w-4 mr-1" /> Dismiss
                  </Button>
                  {rec.automatable && (
                    <Button size="sm" variant="ghost">
                      <Terminal className="h-4 w-4 mr-1" /> View Terraform
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedRecommendation} onOpenChange={() => setSelectedRecommendation(null)}>
        <DialogContent className="max-w-2xl">
          {selectedRecommendation && (
            <>
              <DialogHeader>
                <DialogTitle>Recommendation Details</DialogTitle>
                <DialogDescription>
                  Review and apply this AI-generated recommendation
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{selectedRecommendation.resourceName}</h3>
                  <p className="text-muted-foreground">{selectedRecommendation.resourceType}</p>
                </div>
                
                <div className="flex gap-2">
                  <Badge variant="outline" className={getProviderBadgeStyle(selectedRecommendation.provider)}>
                    {selectedRecommendation.provider.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className={getImpactBadgeStyle(selectedRecommendation.impact)}>
                    {selectedRecommendation.impact} impact
                  </Badge>
                  <Badge variant="outline" className={getCategoryBadgeStyle(selectedRecommendation.category)}>
                    {selectedRecommendation.category}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Recommendation</h4>
                  <p>{selectedRecommendation.message}</p>
                </div>
                
                {selectedRecommendation.savingsAmount && (
                  <div>
                    <h4 className="font-medium mb-1">Potential Savings</h4>
                    <div className="flex items-center gap-1 text-green-500">
                      <span className="font-medium">
                        ${selectedRecommendation.savingsAmount.toLocaleString()} ({selectedRecommendation.savingsPercentage}%)
                      </span>
                    </div>
                  </div>
                )}
                
                {selectedRecommendation.automatable && selectedRecommendation.terraformSnippet && (
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Terraform Code
                    </h4>
                    <pre className="bg-slate-900 text-slate-50 p-4 rounded-md text-sm overflow-auto">
                      {selectedRecommendation.terraformSnippet}
                    </pre>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setSelectedRecommendation(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setSelectedRecommendation(null)}>
                    <Check className="h-4 w-4 mr-1" /> Apply Recommendation
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
