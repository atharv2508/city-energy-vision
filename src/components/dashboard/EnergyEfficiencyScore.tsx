
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function EnergyEfficiencyScore() {
  const score = 76;
  
  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-primary";
    if (score >= 40) return "bg-warning";
    return "bg-destructive";
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Efficiency Score</CardTitle>
        <CardDescription>Overall city energy performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-muted stroke-[5]"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * score) / 100}
                strokeLinecap="round"
                className={`${getScoreColor(score)} stroke-[8]`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-bold">{score}</span>
              <span className="text-sm text-muted-foreground">out of 100</span>
            </div>
          </div>
          <div className="text-center">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              score >= 80 ? "bg-success/20 text-success" :
              score >= 60 ? "bg-primary/20 text-primary" :
              score >= 40 ? "bg-warning/20 text-warning" :
              "bg-destructive/20 text-destructive"
            }`}>
              {getScoreText(score)}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Renewable Energy Usage</span>
              <span className="text-sm font-medium">42%</span>
            </div>
            <Progress value={42} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Peak Load Optimization</span>
              <span className="text-sm font-medium">68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Energy Conservation</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
