
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for energy usage
const hourlyData = [
  { time: "00:00", residential: 220, commercial: 180, industrial: 320, streetLights: 90 },
  { time: "01:00", residential: 190, commercial: 170, industrial: 310, streetLights: 90 },
  { time: "02:00", residential: 180, commercial: 160, industrial: 300, streetLights: 90 },
  { time: "03:00", residential: 170, commercial: 155, industrial: 290, streetLights: 90 },
  { time: "04:00", residential: 190, commercial: 160, industrial: 300, streetLights: 90 },
  { time: "05:00", residential: 220, commercial: 170, industrial: 310, streetLights: 85 },
  { time: "06:00", residential: 270, commercial: 190, industrial: 330, streetLights: 80 },
  { time: "07:00", residential: 350, commercial: 240, industrial: 360, streetLights: 70 },
  { time: "08:00", residential: 400, commercial: 350, industrial: 410, streetLights: 60 },
  { time: "09:00", residential: 420, commercial: 430, industrial: 450, streetLights: 50 },
  { time: "10:00", residential: 420, commercial: 470, industrial: 470, streetLights: 50 },
  { time: "11:00", residential: 410, commercial: 480, industrial: 480, streetLights: 50 },
  { time: "12:00", residential: 400, commercial: 490, industrial: 480, streetLights: 50 },
  { time: "13:00", residential: 410, commercial: 490, industrial: 490, streetLights: 50 },
  { time: "14:00", residential: 420, commercial: 480, industrial: 490, streetLights: 50 },
  { time: "15:00", residential: 440, commercial: 470, industrial: 480, streetLights: 50 },
  { time: "16:00", residential: 450, commercial: 460, industrial: 470, streetLights: 50 },
  { time: "17:00", residential: 470, commercial: 440, industrial: 450, streetLights: 55 },
  { time: "18:00", residential: 490, commercial: 410, industrial: 430, streetLights: 70 },
  { time: "19:00", residential: 510, commercial: 380, industrial: 410, streetLights: 85 },
  { time: "20:00", residential: 520, commercial: 330, industrial: 390, streetLights: 90 },
  { time: "21:00", residential: 500, commercial: 290, industrial: 370, streetLights: 90 },
  { time: "22:00", residential: 450, commercial: 240, industrial: 350, streetLights: 90 },
  { time: "23:00", residential: 350, commercial: 200, industrial: 330, streetLights: 90 },
];

const dailyData = [
  { date: "Mon", residential: 8500, commercial: 7200, industrial: 9800, streetLights: 1800 },
  { date: "Tue", residential: 8700, commercial: 7400, industrial: 9900, streetLights: 1800 },
  { date: "Wed", residential: 9000, commercial: 7600, industrial: 10100, streetLights: 1800 },
  { date: "Thu", residential: 8900, commercial: 7500, industrial: 10000, streetLights: 1800 },
  { date: "Fri", residential: 9100, commercial: 7700, industrial: 10200, streetLights: 1800 },
  { date: "Sat", residential: 7900, commercial: 5500, industrial: 8600, streetLights: 1800 },
  { date: "Sun", residential: 7500, commercial: 5100, industrial: 8200, streetLights: 1800 },
];

const monthlyData = [
  { month: "Jan", residential: 260000, commercial: 220000, industrial: 310000, streetLights: 55000 },
  { month: "Feb", residential: 240000, commercial: 210000, industrial: 305000, streetLights: 50000 },
  { month: "Mar", residential: 255000, commercial: 215000, industrial: 308000, streetLights: 52000 },
  { month: "Apr", residential: 265000, commercial: 225000, industrial: 315000, streetLights: 54000 },
  { month: "May", residential: 270000, commercial: 230000, industrial: 320000, streetLights: 56000 },
  { month: "Jun", residential: 290000, commercial: 245000, industrial: 335000, streetLights: 58000 },
  { month: "Jul", residential: 310000, commercial: 260000, industrial: 350000, streetLights: 60000 },
  { month: "Aug", residential: 305000, commercial: 255000, industrial: 345000, streetLights: 59000 },
  { month: "Sep", residential: 285000, commercial: 240000, industrial: 330000, streetLights: 57000 },
  { month: "Oct", residential: 275000, commercial: 235000, industrial: 325000, streetLights: 56000 },
  { month: "Nov", residential: 265000, commercial: 225000, industrial: 315000, streetLights: 54000 },
  { month: "Dec", residential: 280000, commercial: 240000, industrial: 330000, streetLights: 57000 },
];

type ChartType = "line" | "area" | "bar";
type TimeFrame = "hourly" | "daily" | "monthly";

export function EnergyUsageChart() {
  const [chartType, setChartType] = useState<ChartType>("line");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("hourly");

  const getDataByTimeFrame = () => {
    switch (timeFrame) {
      case "hourly":
        return hourlyData;
      case "daily":
        return dailyData;
      case "monthly":
        return monthlyData;
    }
  };

  const getXAxisKey = () => {
    switch (timeFrame) {
      case "hourly":
        return "time";
      case "daily":
        return "date";
      case "monthly":
        return "month";
    }
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value;
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Energy Consumption</CardTitle>
          <CardDescription>Breakdown by sector</CardDescription>
        </div>
        <div className="flex gap-2">
          <Select
            value={timeFrame}
            onValueChange={(value) => setTimeFrame(value as TimeFrame)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="TimeFrame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={chartType}
            onValueChange={(value) => setChartType(value as ChartType)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="area">Area</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] p-6">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart
                data={getDataByTimeFrame()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getXAxisKey()} />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip formatter={(value) => [`${value} kWh`, null]} />
                <Legend />
                <Line type="monotone" dataKey="residential" stroke="#0EA5E9" strokeWidth={2} />
                <Line type="monotone" dataKey="commercial" stroke="#6366F1" strokeWidth={2} />
                <Line type="monotone" dataKey="industrial" stroke="#F97316" strokeWidth={2} />
                <Line type="monotone" dataKey="streetLights" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            ) : chartType === "area" ? (
              <AreaChart
                data={getDataByTimeFrame()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getXAxisKey()} />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip formatter={(value) => [`${value} kWh`, null]} />
                <Legend />
                <Area type="monotone" dataKey="residential" stackId="1" stroke="#0EA5E9" fill="#0EA5E9" />
                <Area type="monotone" dataKey="commercial" stackId="1" stroke="#6366F1" fill="#6366F1" />
                <Area type="monotone" dataKey="industrial" stackId="1" stroke="#F97316" fill="#F97316" />
                <Area type="monotone" dataKey="streetLights" stackId="1" stroke="#10B981" fill="#10B981" />
              </AreaChart>
            ) : (
              <BarChart
                data={getDataByTimeFrame()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getXAxisKey()} />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip formatter={(value) => [`${value} kWh`, null]} />
                <Legend />
                <Bar dataKey="residential" fill="#0EA5E9" />
                <Bar dataKey="commercial" fill="#6366F1" />
                <Bar dataKey="industrial" fill="#F97316" />
                <Bar dataKey="streetLights" fill="#10B981" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          Updated: Just now
        </div>
        <Button variant="outline" size="sm">
          Download Report
        </Button>
      </CardFooter>
    </Card>
  );
}
