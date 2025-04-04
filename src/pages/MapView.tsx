
import { CityEnergyMap } from "@/components/map/CityEnergyMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConsumptionByLocation } from "@/components/dashboard/ConsumptionByLocation";
import { StatCard } from "@/components/dashboard/StatCard";
import { Map, ArrowUp, ArrowDown, Activity, AlertTriangle } from "lucide-react";

export default function MapView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">City Energy Map</h1>
        <p className="text-muted-foreground">
          Geographical view of energy consumption and infrastructure
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Downtown"
          value="134.5 MWh"
          description="Highest consumption area"
          icon={Map}
          trend={{ value: 2.8, isPositive: false }}
          iconColor="text-destructive"
        />
        <StatCard
          title="North District"
          value="87.2 MWh"
          description="Most improved area"
          icon={ArrowDown}
          trend={{ value: 4.2, isPositive: true }}
          iconColor="text-success"
        />
        <StatCard
          title="Industrial Zone"
          value="128.9 MWh"
          description="Highest load density"
          icon={Activity}
          trend={{ value: 1.5, isPositive: false }}
          iconColor="text-warning"
        />
        <StatCard
          title="Infrastructure"
          value="98.5%"
          description="Overall system uptime"
          icon={AlertTriangle}
          trend={{ value: 0.5, isPositive: true }}
          iconColor="text-primary"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <CityEnergyMap />
        
        <div className="space-y-6">
          <ConsumptionByLocation />
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Zone-Based Insights</CardTitle>
              <CardDescription>
                Energy trends by city region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="downtown">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="downtown">Downtown</TabsTrigger>
                  <TabsTrigger value="north">North</TabsTrigger>
                  <TabsTrigger value="industrial">Industrial</TabsTrigger>
                  <TabsTrigger value="residential">Residential</TabsTrigger>
                </TabsList>
                
                <TabsContent value="downtown" className="mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Peak Time</div>
                        <div className="text-lg font-semibold mt-1">12:00 - 14:00</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Power Quality</div>
                        <div className="text-lg font-semibold mt-1">96.8%</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Issues</h4>
                      <ul className="space-y-1">
                        <li className="text-sm">• Office buildings show 12% higher consumption than benchmark</li>
                        <li className="text-sm">• Reactive power compensation needed at Commerce Street substation</li>
                        <li className="text-sm">• Peak demand exceeds planned capacity during summer months</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Opportunities</h4>
                      <ul className="space-y-1">
                        <li className="text-sm">• Smart building integration could reduce consumption by up to 15%</li>
                        <li className="text-sm">• Demand response program particularly effective in this zone</li>
                        <li className="text-sm">• Rooftop solar potential on 8 major buildings</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="north" className="mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Peak Time</div>
                        <div className="text-lg font-semibold mt-1">18:00 - 20:00</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Power Quality</div>
                        <div className="text-lg font-semibold mt-1">98.2%</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Issues</h4>
                      <ul className="space-y-1">
                        <li className="text-sm">• Evening residential peak causing load balancing challenges</li>
                        <li className="text-sm">• Street lighting energy efficiency below target</li>
                        <li className="text-sm">• Distribution losses higher than other zones (7.2%)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Opportunities</h4>
                      <ul className="space-y-1">
                        <li className="text-sm">• Residential energy management systems pilot program</li>
                        <li className="text-sm">• LED street lighting upgrade would reduce consumption by 65%</li>
                        <li className="text-sm">• Distribution network optimization could save 4% energy</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="industrial" className="mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Peak Time</div>
                        <div className="text-lg font-semibold mt-1">10:00 - 16:00</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Power Quality</div>
                        <div className="text-lg font-semibold mt-1">94.5%</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Issues</h4>
                      <ul className="space-y-1">
                        <li className="text-sm">• Power factor correction needed at multiple facilities</li>
                        <li className="text-sm">• High harmonic distortion affecting grid reliability</li>
                        <li className="text-sm">• Motors and compressors account for 65% of total load</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Opportunities</h4>
                      <ul className="space-y-1">
                        <li className="text-sm">• Motor efficiency upgrade program (18-22% potential savings)</li>
                        <li className="text-sm">• Waste heat recovery systems for process heating</li>
                        <li className="text-sm">• Load shifting to off-peak hours (15% cost reduction)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="residential" className="mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Peak Time</div>
                        <div className="text-lg font-semibold mt-1">17:00 - 21:00</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Power Quality</div>
                        <div className="text-lg font-semibold mt-1">97.5%</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Issues</h4>
                      <ul className="space-y-1">
                        <li className="text-sm">• Evening peak more pronounced in winter months</li>
                        <li className="text-sm">• Growing EV adoption increasing evening load</li>
                        <li className="text-sm">• HVAC systems account for 42% of residential usage</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Opportunities</h4>
                      <ul className="space-y-1">
                        <li className="text-sm">• Smart home integration and time-of-use rate structures</li>
                        <li className="text-sm">• Community solar program for rooftop-restricted units</li>
                        <li className="text-sm">• Energy efficiency retrofit program (potential 25% reduction)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
