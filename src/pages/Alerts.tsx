
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Bell, 
  BellOff, 
  Filter, 
  Info, 
  Settings, 
  CheckCircle, 
  X,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { StatCard } from "@/components/dashboard/StatCard";
import { cn } from "@/lib/utils";

type AlertSeverity = "critical" | "warning" | "info";
type AlertStatus = "active" | "acknowledged" | "resolved";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  location: string;
  timestamp: string;
  system: string;
  impact: string;
}

const alertsData: Alert[] = [
  {
    id: "1",
    title: "High energy consumption detected",
    description: "Downtown office buildings showing 25% higher than expected consumption",
    severity: "critical",
    status: "active",
    location: "Downtown",
    timestamp: "2025-04-04T10:15:00",
    system: "Commercial Buildings",
    impact: "Potential overload on substation DB-3"
  },
  {
    id: "2",
    title: "Power factor below threshold",
    description: "Industrial zone substation showing power factor of 0.82, below the 0.9 threshold",
    severity: "warning",
    status: "acknowledged",
    location: "Industrial Zone",
    timestamp: "2025-04-04T09:30:00",
    system: "Power Distribution",
    impact: "Increased distribution losses"
  },
  {
    id: "3",
    title: "Street lighting malfunction",
    description: "Lights operating during daylight hours in North District",
    severity: "warning",
    status: "active",
    location: "North District",
    timestamp: "2025-04-04T08:45:00",
    system: "Street Lighting",
    impact: "Increased energy waste"
  },
  {
    id: "4",
    title: "Voltage fluctuation detected",
    description: "Voltage fluctuations observed at East Residential substation",
    severity: "warning",
    status: "resolved",
    location: "Residential East",
    timestamp: "2025-04-03T14:20:00",
    system: "Power Quality",
    impact: "Potential damage to sensitive equipment"
  },
  {
    id: "5",
    title: "Transformer maintenance completed",
    description: "Scheduled maintenance completed for West Zone transformer",
    severity: "info",
    status: "resolved",
    location: "West Zone",
    timestamp: "2025-04-03T11:45:00",
    system: "Grid Infrastructure",
    impact: "None"
  },
  {
    id: "6",
    title: "Peak demand threshold reached",
    description: "City-wide demand approaching 95% of capacity",
    severity: "critical",
    status: "acknowledged",
    location: "City-wide",
    timestamp: "2025-04-03T15:30:00",
    system: "Load Management",
    impact: "Potential for load shedding"
  },
  {
    id: "7",
    title: "Backup generator test successful",
    description: "Monthly test of emergency backup systems completed successfully",
    severity: "info",
    status: "resolved",
    location: "Critical Infrastructure",
    timestamp: "2025-04-02T09:00:00",
    system: "Emergency Systems",
    impact: "None"
  },
  {
    id: "8",
    title: "Communication failure with sensors",
    description: "Unable to collect data from smart meters in Tech Park area",
    severity: "warning",
    status: "active",
    location: "Tech Park",
    timestamp: "2025-04-04T07:15:00",
    system: "Monitoring Infrastructure",
    impact: "Limited visibility of consumption data"
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(alertsData);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    critical: true,
    warning: true,
    info: false
  });

  const getSeverityIcon = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5" />;
      case "warning":
        return <AlertCircle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      case "info":
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Active</Badge>;
      case "acknowledged":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Acknowledged</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Resolved</Badge>;
    }
  };

  const updateAlertStatus = (id: string, newStatus: AlertStatus) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: newStatus } : alert
    ));
  };

  const getActiveCount = (severity: AlertSeverity) => {
    return alerts.filter(alert => alert.severity === severity && alert.status === "active").length;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alerts & Notifications</h1>
        <p className="text-muted-foreground">
          Monitor system alerts and manage notification preferences
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Critical Alerts"
          value={getActiveCount("critical").toString()}
          description="Active critical issues"
          icon={AlertTriangle}
          iconColor="text-destructive"
        />
        <StatCard
          title="Warnings"
          value={getActiveCount("warning").toString()}
          description="Active warnings"
          icon={AlertCircle}
          iconColor="text-warning"
        />
        <StatCard
          title="Notifications"
          value={getActiveCount("info").toString()}
          description="Informational alerts"
          icon={Info}
          iconColor="text-primary"
        />
        <StatCard
          title="Total Alerts"
          value={alerts.filter(a => a.status === "active").length.toString()}
          description="All active alerts"
          icon={Bell}
          iconColor="text-accent"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All Alerts</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="acknowledged">Acknowledged</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter Alerts</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                        <span>Critical only</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertCircle className="mr-2 h-4 w-4 text-warning" />
                        <span>Warnings only</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <span>Last 24 hours</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Last 7 days</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="all">
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-4 p-6">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={cn(
                          "p-4 border rounded-md",
                          getSeverityColor(alert.severity)
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                              alert.severity === "critical" ? "bg-destructive text-destructive-foreground" :
                              alert.severity === "warning" ? "bg-warning text-warning-foreground" :
                              "bg-primary text-primary-foreground"
                            )}>
                              {getSeverityIcon(alert.severity)}
                            </div>
                            <div className="space-y-1">
                              <div className="font-medium flex items-center flex-wrap gap-2">
                                {alert.title}
                                {getStatusBadge(alert.status)}
                              </div>
                              <p className="text-sm">{alert.description}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                <span><strong>Location:</strong> {alert.location}</span>
                                <span><strong>System:</strong> {alert.system}</span>
                                <span><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          {alert.status !== "resolved" && (
                            <div className="flex gap-2 flex-shrink-0">
                              {alert.status === "active" && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => updateAlertStatus(alert.id, "acknowledged")}
                                >
                                  Acknowledge
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => updateAlertStatus(alert.id, "resolved")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolve
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="active">
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-4 p-6">
                    {alerts.filter(alert => alert.status === "active").map((alert) => (
                      <div
                        key={alert.id}
                        className={cn(
                          "p-4 border rounded-md",
                          getSeverityColor(alert.severity)
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                              alert.severity === "critical" ? "bg-destructive text-destructive-foreground" :
                              alert.severity === "warning" ? "bg-warning text-warning-foreground" :
                              "bg-primary text-primary-foreground"
                            )}>
                              {getSeverityIcon(alert.severity)}
                            </div>
                            <div className="space-y-1">
                              <div className="font-medium flex items-center flex-wrap gap-2">
                                {alert.title}
                                {getStatusBadge(alert.status)}
                              </div>
                              <p className="text-sm">{alert.description}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                <span><strong>Location:</strong> {alert.location}</span>
                                <span><strong>System:</strong> {alert.system}</span>
                                <span><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => updateAlertStatus(alert.id, "acknowledged")}
                            >
                              Acknowledge
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => updateAlertStatus(alert.id, "resolved")}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {alerts.filter(alert => alert.status === "active").length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 mx-auto text-success" />
                        <h3 className="mt-2 text-lg font-medium">All Clear!</h3>
                        <p className="text-muted-foreground">There are no active alerts at this time.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="acknowledged">
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-4 p-6">
                    {alerts.filter(alert => alert.status === "acknowledged").map((alert) => (
                      <div
                        key={alert.id}
                        className={cn(
                          "p-4 border rounded-md",
                          getSeverityColor(alert.severity)
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                              alert.severity === "critical" ? "bg-destructive text-destructive-foreground" :
                              alert.severity === "warning" ? "bg-warning text-warning-foreground" :
                              "bg-primary text-primary-foreground"
                            )}>
                              {getSeverityIcon(alert.severity)}
                            </div>
                            <div className="space-y-1">
                              <div className="font-medium flex items-center flex-wrap gap-2">
                                {alert.title}
                                {getStatusBadge(alert.status)}
                              </div>
                              <p className="text-sm">{alert.description}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                <span><strong>Location:</strong> {alert.location}</span>
                                <span><strong>System:</strong> {alert.system}</span>
                                <span><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => updateAlertStatus(alert.id, "resolved")}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {alerts.filter(alert => alert.status === "acknowledged").length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 mx-auto text-muted" />
                        <h3 className="mt-2 text-lg font-medium">No Acknowledged Alerts</h3>
                        <p className="text-muted-foreground">There are no acknowledged alerts at this time.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resolved">
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-4 p-6">
                    {alerts.filter(alert => alert.status === "resolved").map((alert) => (
                      <div
                        key={alert.id}
                        className="p-4 border rounded-md"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                              {getSeverityIcon(alert.severity)}
                            </div>
                            <div className="space-y-1">
                              <div className="font-medium flex items-center flex-wrap gap-2">
                                {alert.title}
                                {getStatusBadge(alert.status)}
                              </div>
                              <p className="text-sm">{alert.description}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                <span><strong>Location:</strong> {alert.location}</span>
                                <span><strong>System:</strong> {alert.system}</span>
                                <span><strong>Resolved:</strong> {new Date(alert.timestamp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Notification Methods</h3>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm">Email Notifications</span>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm">SMS Alerts</span>
                  </div>
                  <Switch 
                    checked={notifications.sms} 
                    onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm">Push Notifications</span>
                  </div>
                  <Switch 
                    checked={notifications.push} 
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Alert Level</h3>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm">Critical Alerts</span>
                  </div>
                  <Switch 
                    checked={notifications.critical} 
                    onCheckedChange={(checked) => setNotifications({...notifications, critical: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <span className="text-sm">Warnings</span>
                  </div>
                  <Switch 
                    checked={notifications.warning} 
                    onCheckedChange={(checked) => setNotifications({...notifications, warning: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <span className="text-sm">Informational</span>
                  </div>
                  <Switch 
                    checked={notifications.info} 
                    onCheckedChange={(checked) => setNotifications({...notifications, info: checked})}
                  />
                </div>
              </div>
              
              <Button className="w-full">Save Settings</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alert Statistics</CardTitle>
              <CardDescription>
                Alert history and patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm">Distribution by severity</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-destructive h-2.5 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-xs">35% Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-warning h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-xs">45% Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-xs">20% Info</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-sm mb-2">Common alert causes</div>
                <ul className="space-y-1">
                  <li className="text-xs flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-destructive"></span>
                    High consumption events (24%)
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-warning"></span>
                    Power quality issues (18%)
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    Equipment maintenance (16%)
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted"></span>
                    Other causes (42%)
                  </li>
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>Total alerts this month:</div>
                  <div className="font-medium">146</div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>Average resolution time:</div>
                  <div className="font-medium">3.4 hours</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
