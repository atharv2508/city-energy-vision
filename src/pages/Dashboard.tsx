
import { Activity, BarChart2, Battery, BatteryCharging, Database, Filter, Lightbulb, RefreshCw } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { EnergyUsageChart } from "@/components/dashboard/EnergyUsageChart";
import { ConsumptionByLocation } from "@/components/dashboard/ConsumptionByLocation";
import { EnergyEfficiencyScore } from "@/components/dashboard/EnergyEfficiencyScore";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { EnergySavingTips } from "@/components/dashboard/EnergySavingTips";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("today");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const refreshData = () => {
    // In a real app, this would fetch new data
    setLastUpdated(new Date());
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Energy Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and analyze energy consumption across the city
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Consumption"
          value="452.8 MWh"
          description="Today's energy usage"
          icon={Activity}
          trend={{ value: 2.5, isPositive: false }}
          iconColor="text-primary"
        />
        <StatCard
          title="Active Power"
          value="187.3 MW"
          description="Current load"
          icon={BatteryCharging}
          trend={{ value: 1.2, isPositive: true }}
          iconColor="text-accent"
        />
        <StatCard
          title="Renewable Usage"
          value="42.3%"
          description="Of total consumption"
          icon={Battery}
          trend={{ value: 3.8, isPositive: true }}
          iconColor="text-success"
        />
        <StatCard
          title="Cost Estimate"
          value="$24,856"
          description="Based on current rates"
          icon={BarChart2}
          trend={{ value: 1.5, isPositive: false }}
          iconColor="text-warning"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <EnergyUsageChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <EnergyEfficiencyScore />
        <ConsumptionByLocation />
        <div className="space-y-4">
          <RecentAlerts />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <EnergySavingTips />
        <StatCard
          title="Estimated Annual Savings Potential"
          value="$1,245,300"
          description="Based on implementing all recommended measures"
          icon={Lightbulb}
          className="h-auto"
          iconColor="text-warning"
        />
      </div>
    </div>
  );
}
