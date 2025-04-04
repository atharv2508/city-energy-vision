
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const efficiencyData = [
  { name: 'Optimized', value: 65, color: '#10b981' },
  { name: 'Moderate', value: 25, color: '#f59e0b' },
  { name: 'Inefficient', value: 10, color: '#ef4444' },
];

const opportunityData = [
  { 
    id: 1, 
    area: 'Commercial HVAC', 
    potential: 'High', 
    savings: '15-20%',
    description: 'Upgrading commercial building HVAC systems could reduce energy consumption significantly.'
  },
  { 
    id: 2, 
    area: 'Street Lighting', 
    potential: 'Medium', 
    savings: '10-15%',
    description: 'Converting remaining street lights to LED and implementing smart controls.'
  },
  { 
    id: 3, 
    area: 'Residential Insulation', 
    potential: 'High', 
    savings: '20-25%',
    description: 'Incentivize improved insulation in older residential buildings.'
  },
  { 
    id: 4, 
    area: 'Industrial Motors', 
    potential: 'Medium', 
    savings: '10-12%',
    description: 'Replace aging motors with high-efficiency models in industrial facilities.'
  },
];

const chartConfig = {
  Optimized: { 
    label: "Optimized",
    color: "#10b981" 
  },
  Moderate: { 
    label: "Moderate",
    color: "#f59e0b" 
  },
  Inefficient: { 
    label: "Inefficient",
    color: "#ef4444" 
  }
};

const Efficiency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Energy Efficiency</h1>
            <p className="text-gray-600">Identifying optimization opportunities across the city</p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Overall Efficiency Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78/100</div>
              <p className="text-sm text-green-600">↑ 5 points from previous assessment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Projected Annual Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$2.4M</div>
              <p className="text-sm text-green-600">From implementing recommended changes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Carbon Reduction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12,500 tons</div>
              <p className="text-sm text-green-600">Potential annual CO2 reduction</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>City Infrastructure Efficiency Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ChartContainer config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={efficiencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {efficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Improvement Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunityData.map((item) => (
                  <div key={item.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.area}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.potential === 'High' ? 'bg-green-100 text-green-800' : 
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {item.potential} Potential
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-sm font-medium mt-2">
                      Estimated Savings: <span className="text-green-600">{item.savings}</span>
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Efficiency;
