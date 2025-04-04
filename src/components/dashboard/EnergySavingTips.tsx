
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, Timer, Gauge, ThermometerSnowflake } from "lucide-react";
import { cn } from "@/lib/utils";

interface SavingTip {
  id: string;
  title: string;
  description: string;
  potentialSaving: string;
  icon: React.ElementType;
  color: string;
}

const savingTips: SavingTip[] = [
  {
    id: "1",
    title: "Optimize Street Lighting",
    description: "Adjust street light timing based on traffic patterns and natural light conditions.",
    potentialSaving: "15-20% energy saving",
    icon: Lightbulb,
    color: "text-primary",
  },
  {
    id: "2",
    title: "Peak Load Shifting",
    description: "Schedule high-energy operations during off-peak hours to reduce strain and costs.",
    potentialSaving: "10-15% cost reduction",
    icon: Timer,
    color: "text-warning",
  },
  {
    id: "3",
    title: "HVAC System Optimization",
    description: "Adjust temperature settings in public buildings based on occupancy and weather.",
    potentialSaving: "12-18% energy saving",
    icon: ThermometerSnowflake,
    color: "text-success",
  },
  {
    id: "4",
    title: "Equipment Maintenance",
    description: "Regular maintenance of industrial equipment to ensure optimal efficiency.",
    potentialSaving: "8-12% energy saving",
    icon: Gauge,
    color: "text-accent",
  },
];

export function EnergySavingTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Saving Recommendations</CardTitle>
        <CardDescription>
          Smart suggestions to reduce consumption
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 max-h-[320px] overflow-auto">
        {savingTips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.id} className="flex gap-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                tip.color.replace("text-", "bg-") + "/20"
              )}>
                <Icon className={cn("h-5 w-5", tip.color)} />
              </div>
              <div className="space-y-1">
                <div className="font-medium">{tip.title}</div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
                <div className="text-xs font-medium text-success">
                  {tip.potentialSaving}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
