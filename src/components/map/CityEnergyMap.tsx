
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const zoneColors = {
  high: "#EF4444",
  medium: "#F97316",
  low: "#10B981"
};

const zoneData = [
  { id: 1, name: "Downtown", consumption: "High", x: 120, y: 180, radius: 25 },
  { id: 2, name: "North District", consumption: "Low", x: 120, y: 70, radius: 20 },
  { id: 3, name: "Industrial Zone", consumption: "High", x: 220, y: 120, radius: 25 },
  { id: 4, name: "West Residential", consumption: "Medium", x: 40, y: 140, radius: 20 },
  { id: 5, name: "East Residential", consumption: "Low", x: 200, y: 220, radius: 15 },
  { id: 6, name: "South Commercial", consumption: "Medium", x: 120, y: 270, radius: 18 },
  { id: 7, name: "Tech Park", consumption: "Medium", x: 240, y: 170, radius: 15 },
  { id: 8, name: "University Campus", consumption: "Low", x: 70, y: 200, radius: 15 },
];

export function CityEnergyMap() {
  const [selectedZone, setSelectedZone] = useState<typeof zoneData[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"consumption" | "outages" | "savings">("consumption");
  const [mapDimensions, setMapDimensions] = useState({ width: 300, height: 300 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 640) {
      setMapDimensions({ width: 280, height: 280 });
    } else if (windowWidth < 1024) {
      setMapDimensions({ width: 320, height: 320 });
    } else {
      setMapDimensions({ width: 360, height: 360 });
    }
  }, [windowWidth]);

  const getConsumptionColor = (consumption: string) => {
    switch (consumption) {
      case "High":
        return zoneColors.high;
      case "Medium":
        return zoneColors.medium;
      case "Low":
        return zoneColors.low;
      default:
        return "#888";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>City Energy Map</CardTitle>
        <CardDescription>Visualized energy consumption by city zones</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consumption">Consumption</TabsTrigger>
            <TabsTrigger value="outages">Outages</TabsTrigger>
            <TabsTrigger value="savings">Potential Savings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="consumption" className="space-y-4">
            <div className="relative mx-auto" style={{ width: mapDimensions.width, height: mapDimensions.height }}>
              {/* City map background - simplified */}
              <svg width={mapDimensions.width} height={mapDimensions.height} viewBox="0 0 300 300">
                {/* Background grid for the city */}
                <rect x="0" y="0" width="300" height="300" fill="#f1f5f9" rx="8" />
                
                {/* Simplified roads */}
                <line x1="50" y1="150" x2="250" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                <line x1="150" y1="50" x2="150" y2="250" stroke="#cbd5e1" strokeWidth="4" />
                <line x1="75" y1="75" x2="225" y2="225" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="75" y1="225" x2="225" y2="75" stroke="#cbd5e1" strokeWidth="2" />
                
                {/* Water body */}
                <path d="M0,230 C50,220 80,240 150,230 S250,210 300,230 L300,300 L0,300 Z" fill="#93c5fd" opacity="0.7" />
                
                {/* City zones */}
                {zoneData.map((zone) => (
                  <g key={zone.id} onClick={() => setSelectedZone(selectedZone?.id === zone.id ? null : zone)}>
                    <circle
                      cx={zone.x}
                      cy={zone.y}
                      r={zone.radius}
                      fill={getConsumptionColor(zone.consumption)}
                      opacity="0.7"
                      stroke={selectedZone?.id === zone.id ? "#000" : "none"}
                      strokeWidth="2"
                      style={{ cursor: "pointer" }}
                    />
                    <text
                      x={zone.x}
                      y={zone.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                      style={{ cursor: "pointer", pointerEvents: "none" }}
                    >
                      {zone.name.split(" ")[0]}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-2 bg-background/80 rounded-md">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zoneColors.high }}></div>
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zoneColors.medium }}></div>
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zoneColors.low }}></div>
                  <span className="text-xs">Low</span>
                </div>
              </div>
            </div>
            
            {/* Selected zone info */}
            {selectedZone && (
              <div className="p-4 border rounded-md mt-3">
                <h3 className="font-semibold">{selectedZone.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Consumption:</span>
                    <span className="ml-1 font-medium" style={{ color: getConsumptionColor(selectedZone.consumption) }}>
                      {selectedZone.consumption}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Peak Time:</span>
                    <span className="ml-1 font-medium">14:00 - 18:00</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg. Usage:</span>
                    <span className="ml-1 font-medium">
                      {selectedZone.consumption === "High" ? "35.2 MWh" : 
                       selectedZone.consumption === "Medium" ? "23.7 MWh" : "16.9 MWh"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Trend:</span>
                    <span className={`ml-1 font-medium ${
                      selectedZone.consumption === "High" ? "text-destructive" : 
                      selectedZone.consumption === "Medium" ? "text-warning" : "text-success"
                    }`}>
                      {selectedZone.consumption === "High" ? "↑ 3.2%" : 
                       selectedZone.consumption === "Medium" ? "→ 0.5%" : "↓ 4.8%"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="outages" className="flex items-center justify-center h-64">
            <div className="text-center text-muted-foreground">
              <p>Outage mapping feature coming soon</p>
              <p className="text-sm">This will display active and scheduled outages across the city</p>
            </div>
          </TabsContent>
          
          <TabsContent value="savings" className="flex items-center justify-center h-64">
            <div className="text-center text-muted-foreground">
              <p>Savings opportunity map coming soon</p>
              <p className="text-sm">Visualize areas with the highest potential for energy savings</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
