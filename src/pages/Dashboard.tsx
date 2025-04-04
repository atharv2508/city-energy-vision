
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AreaChart, Area, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', residential: 4000, commercial: 2400, industrial: 2400 },
  { month: 'Feb', residential: 3000, commercial: 1398, industrial: 2210 },
  { month: 'Mar', residential: 2000, commercial: 9800, industrial: 2290 },
  { month: 'Apr', residential: 2780, commercial: 3908, industrial: 2000 },
  { month: 'May', residential: 1890, commercial: 4800, industrial: 2181 },
  { month: 'Jun', residential: 2390, commercial: 3800, industrial: 2500 },
  { month: 'Jul', residential: 3490, commercial: 4300, industrial: 2100 },
];

const districtData = [
  { name: 'Downtown', usage: 4000, efficiency: 80 },
  { name: 'Midtown', usage: 3000, efficiency: 70 },
  { name: 'Westside', usage: 2000, efficiency: 90 },
  { name: 'Eastside', usage: 2780, efficiency: 85 },
  { name: 'Northside', usage: 1890, efficiency: 65 },
  { name: 'Southside', usage: 2390, efficiency: 75 },
];

const chartConfig = {
  residential: { 
    label: "Residential",
    color: "#4f46e5" 
  },
  commercial: { 
    label: "Commercial",
    color: "#10b981" 
  },
  industrial: { 
    label: "Industrial",
    color: "#f59e0b" 
  }
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Energy Dashboard</h1>
            <p className="text-gray-600">Comprehensive overview of city energy consumption</p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/efficiency">Efficiency</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42,890 MWh</div>
              <p className="text-sm text-green-600">↓ 12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78%</div>
              <p className="text-sm text-green-600">↑ 5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Peak Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8,245 MW</div>
              <p className="text-sm text-red-600">↑ 2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Energy Consumption by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={chartConfig}>
                  <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="residential" fill="#4f46e5" />
                    <Bar dataKey="commercial" fill="#10b981" />
                    <Bar dataKey="industrial" fill="#f59e0b" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer config={chartConfig}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="residential" fill="#4f46e5" stroke="#4f46e5" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="commercial" fill="#10b981" stroke="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>District Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>District</TableHead>
                      <TableHead>Usage (MWh)</TableHead>
                      <TableHead>Efficiency (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {districtData.map((district) => (
                      <TableRow key={district.name}>
                        <TableCell>{district.name}</TableCell>
                        <TableCell>{district.usage}</TableCell>
                        <TableCell>
                          <span 
                            className={district.efficiency >= 80 ? 'text-green-600' : 
                                      district.efficiency >= 70 ? 'text-amber-600' : 'text-red-600'}
                          >
                            {district.efficiency}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
