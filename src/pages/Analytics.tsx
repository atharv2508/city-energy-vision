
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { EnergyUsageChart } from "@/components/dashboard/EnergyUsageChart";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area
} from "recharts";

// Sample data
const peakHoursData = [
  { hour: '00:00', load: 42 },
  { hour: '01:00', load: 38 },
  { hour: '02:00', load: 35 },
  { hour: '03:00', load: 33 },
  { hour: '04:00', load: 34 },
  { hour: '05:00', load: 38 },
  { hour: '06:00', load: 45 },
  { hour: '07:00', load: 55 },
  { hour: '08:00', load: 70 },
  { hour: '09:00', load: 85 },
  { hour: '10:00', load: 92 },
  { hour: '11:00', load: 96 },
  { hour: '12:00', load: 98 },
  { hour: '13:00', load: 95 },
  { hour: '14:00', load: 93 },
  { hour: '15:00', load: 90 },
  { hour: '16:00', load: 88 },
  { hour: '17:00', load: 85 },
  { hour: '18:00', load: 90 },
  { hour: '19:00', load: 94 },
  { hour: '20:00', load: 92 },
  { hour: '21:00', load: 85 },
  { hour: '22:00', load: 72 },
  { hour: '23:00', load: 58 },
];

const yearlyComparisonData = [
  { month: 'Jan', thisYear: 420, lastYear: 385, projected: 430 },
  { month: 'Feb', thisYear: 410, lastYear: 375, projected: 415 },
  { month: 'Mar', thisYear: 430, lastYear: 400, projected: 435 },
  { month: 'Apr', thisYear: 445, lastYear: 410, projected: 450 },
  { month: 'May', thisYear: 470, lastYear: 430, projected: 475 },
  { month: 'Jun', thisYear: 510, lastYear: 475, projected: 515 },
  { month: 'Jul', thisYear: 540, lastYear: 510, projected: 545 },
  { month: 'Aug', thisYear: 535, lastYear: 498, projected: 540 },
  { month: 'Sep', thisYear: 495, lastYear: 465, projected: 500 },
  { month: 'Oct', thisYear: 460, lastYear: 435, projected: 465 },
  { month: 'Nov', thisYear: 440, lastYear: 415, projected: null },
  { month: 'Dec', thisYear: null, lastYear: 430, projected: null },
];

const efficiencyData = [
  { category: "HVAC Systems", efficiency: 72, benchmark: 85, potentialSavings: "15-20%" },
  { category: "Lighting", efficiency: 81, benchmark: 90, potentialSavings: "10-12%" },
  { category: "Industrial Equipment", efficiency: 65, benchmark: 78, potentialSavings: "18-25%" },
  { category: "Office Buildings", efficiency: 78, benchmark: 82, potentialSavings: "8-10%" },
  { category: "Public Spaces", efficiency: 70, benchmark: 80, potentialSavings: "12-15%" },
];

export default function Analytics() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [compareMode, setCompareMode] = useState("year");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed energy consumption analysis and historical comparisons
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Select value={compareMode} onValueChange={setCompareMode}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Compare with" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Previous Day</SelectItem>
            <SelectItem value="week">Previous Week</SelectItem>
            <SelectItem value="month">Previous Month</SelectItem>
            <SelectItem value="year">Previous Year</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="consumption" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="peak-analysis">Peak Analysis</TabsTrigger>
          <TabsTrigger value="yearly-comparison">Yearly Comparison</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consumption" className="space-y-4">
          <EnergyUsageChart />
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Energy Used</CardTitle>
                <CardDescription>Compared to {compareMode} average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">452.8 MWh</div>
                <p className="text-sm text-destructive flex items-center mt-1">
                  <span className="mr-1">↑</span> 5.2% higher
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Peak Demand</CardTitle>
                <CardDescription>Highest recorded value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">98.4 MW</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Recorded at 12:15 PM
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Load Factor</CardTitle>
                <CardDescription>Ratio of avg to peak load</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">76.8%</div>
                <p className="text-sm text-success flex items-center mt-1">
                  <span className="mr-1">↑</span> 2.3% improved
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="peak-analysis">
          <Card>
            <CardHeader>
              <CardTitle>Peak Load Analysis</CardTitle>
              <CardDescription>Hourly energy load profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={peakHoursData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Load']} />
                    <Legend />
                    <Bar dataKey="load" name="Load % of Peak" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium">Peak Hours Analysis</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Peak demand occurs consistently between 11:00 and 14:00, with a secondary peak in the evening around 19:00-20:00.
                    Managing consumption during these hours could significantly reduce energy costs.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Recommendations</h3>
                  <ul className="mt-1 space-y-1">
                    <li className="text-sm">• Implement load shifting for industrial operations away from 11:00-14:00</li>
                    <li className="text-sm">• Adjust HVAC settings in commercial buildings during peak hours</li>
                    <li className="text-sm">• Consider time-of-use rate structures to incentivize off-peak usage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="yearly-comparison">
          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Comparison</CardTitle>
              <CardDescription>Monthly consumption compared to previous year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={yearlyComparisonData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} MWh`, null]} />
                    <Legend />
                    <Bar dataKey="lastYear" name="Last Year" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="thisYear" name="This Year" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                    <Line 
                      type="monotone" 
                      dataKey="projected" 
                      name="Projected" 
                      stroke="#F97316" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium">Annual Trends</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Energy consumption has increased by approximately 8.5% compared to the previous year.
                    The most significant increases occurred during summer months (June-August), likely due to increased cooling demands.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-muted-foreground">YTD Consumption</div>
                    <div className="text-2xl font-bold mt-1">4,705 MWh</div>
                    <div className="text-sm text-destructive mt-1">+8.5% from last year</div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-muted-foreground">Projected Annual</div>
                    <div className="text-2xl font-bold mt-1">5,635 MWh</div>
                    <div className="text-sm text-destructive mt-1">+7.2% from last year</div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-muted-foreground">Cost Impact</div>
                    <div className="text-2xl font-bold mt-1">$126,850</div>
                    <div className="text-sm text-destructive mt-1">Estimated increase</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <CardTitle>System Efficiency Analysis</CardTitle>
              <CardDescription>Current efficiency vs industry benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={efficiencyData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="category" />
                    <Tooltip formatter={(value) => [`${value}%`, null]} />
                    <Legend />
                    <Bar dataKey="efficiency" name="Current Efficiency" fill="#0EA5E9" />
                    <Bar dataKey="benchmark" name="Industry Benchmark" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium">Efficiency Comparison</h3>
                <div className="overflow-x-auto mt-2">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-medium">System</th>
                        <th className="text-center py-2 px-4 font-medium">Current</th>
                        <th className="text-center py-2 px-4 font-medium">Benchmark</th>
                        <th className="text-center py-2 px-4 font-medium">Gap</th>
                        <th className="text-right py-2 px-4 font-medium">Potential Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {efficiencyData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4 text-left">{item.category}</td>
                          <td className="py-2 px-4 text-center">{item.efficiency}%</td>
                          <td className="py-2 px-4 text-center">{item.benchmark}%</td>
                          <td className="py-2 px-4 text-center">
                            <span className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              item.benchmark - item.efficiency > 10 
                                ? "bg-destructive/20 text-destructive" 
                                : item.benchmark - item.efficiency > 5
                                  ? "bg-warning/20 text-warning"
                                  : "bg-muted"
                            )}>
                              {item.benchmark - item.efficiency}%
                            </span>
                          </td>
                          <td className="py-2 px-4 text-right text-success font-medium">{item.potentialSavings}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
