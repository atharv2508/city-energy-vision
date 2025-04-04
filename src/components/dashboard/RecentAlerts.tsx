
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertTriangle, BellRing, Info } from "lucide-react";

type AlertSeverity = "critical" | "warning" | "info";

interface Alert {
  id: string;
  message: string;
  time: string;
  location: string;
  severity: AlertSeverity;
}

const alerts: Alert[] = [
  {
    id: "1",
    message: "High energy consumption detected in Downtown Office Buildings",
    time: "10 minutes ago",
    location: "Downtown",
    severity: "critical",
  },
  {
    id: "2",
    message: "Power fluctuations in Industrial Zone substation",
    time: "1 hour ago",
    location: "Industrial Zone",
    severity: "warning",
  },
  {
    id: "3",
    message: "North District street lights operating during daylight",
    time: "3 hours ago",
    location: "North District",
    severity: "warning",
  },
  {
    id: "4",
    message: "Maintenance completed on East Residential substation",
    time: "2 days ago",
    location: "Residential East",
    severity: "info",
  },
];

export function RecentAlerts() {
  const getSeverityIcon = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />;
      case "warning":
        return <BellRing className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "info":
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Issues that need your attention</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[320px] overflow-auto">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex gap-3 p-3 rounded-lg border"
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                getSeverityColor(alert.severity)
              )}>
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="outline" className="rounded-sm">
                    {alert.location}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {alert.time}
                  </span>
                </div>
                <p className="text-sm">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
