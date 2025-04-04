
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, Lightbulb, ListFilter, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample maintenance and energy events
const energyEvents = [
  { date: new Date(2025, 3, 2), type: "maintenance", title: "Substation Maintenance", location: "North District" },
  { date: new Date(2025, 3, 5), type: "peak", title: "Energy Demand Peak", location: "Downtown" },
  { date: new Date(2025, 3, 8), type: "maintenance", title: "Smart Meter Inspection", location: "Industrial Zone" },
  { date: new Date(2025, 3, 10), type: "outage", title: "Scheduled Outage", location: "Residential East" },
  { date: new Date(2025, 3, 15), type: "peak", title: "Energy Demand Peak", location: "Commercial Center" },
  { date: new Date(2025, 3, 18), type: "maintenance", title: "Grid Optimization", location: "Entire City" },
  { date: new Date(2025, 3, 22), type: "outage", title: "Power Line Work", location: "West Sector" },
  { date: new Date(2025, 3, 25), type: "maintenance", title: "Equipment Upgrade", location: "South District" },
  { date: new Date(2025, 3, 28), type: "peak", title: "Energy Demand Peak", location: "Industrial Zone" },
];

// Helper function to check if a date has events
const hasEvent = (date: Date) => {
  return energyEvents.some(event => 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );
};

// Get events for a specific date
const getEventsForDate = (date: Date) => {
  return energyEvents.filter(event => 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "day">("month");
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected);
    if (selected) {
      setSelectedEvents(getEventsForDate(selected));
    } else {
      setSelectedEvents([]);
    }
  };

  // Function to render event badge by type
  const renderEventBadge = (type: string) => {
    switch(type) {
      case "maintenance":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Maintenance</Badge>;
      case "peak":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">Peak Demand</Badge>;
      case "outage":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Outage</Badge>;
      default:
        return <Badge>Event</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Energy Calendar</h1>
          <p className="text-muted-foreground">
            Schedule of energy events, maintenance, and peak usage periods
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="peak">Peak Demand</SelectItem>
              <SelectItem value="outage">Outages</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>Energy Events Calendar</div>
              <div className="flex gap-2">
                <Button 
                  variant={view === "month" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setView("month")}
                >
                  Month
                </Button>
                <Button 
                  variant={view === "day" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setView("day")}
                >
                  Day
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Scheduled maintenance, anticipated peak usage times, and other important events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
              modifiers={{
                event: (date) => hasEvent(date)
              }}
              modifiersStyles={{
                event: {
                  fontWeight: "bold",
                  border: "2px solid #10B981",
                  backgroundColor: "rgba(16, 185, 129, 0.1)"
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {date ? (
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  {date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              ) : "Select a date"}
            </CardTitle>
            <CardDescription>
              {selectedEvents.length > 0 
                ? `${selectedEvents.length} events scheduled` 
                : "No events scheduled for this date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedEvents.length > 0 ? (
                selectedEvents
                  .filter(event => filter === "all" || event.type === filter)
                  .map((event, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{event.title}</div>
                        {renderEventBadge(event.type)}
                      </div>
                      <div className="text-sm text-muted-foreground">{event.location}</div>
                      <div className="text-sm mt-2 flex items-center gap-1">
                        {event.type === "maintenance" ? (
                          <Zap className="h-4 w-4 text-blue-500" />
                        ) : event.type === "peak" ? (
                          <Zap className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Lightbulb className="h-4 w-4 text-red-500" />
                        )}
                        {event.date.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarDays className="mx-auto h-12 w-12 mb-2 opacity-20" />
                  <p>No events for this date</p>
                  <p className="text-sm">Select a date with a highlighted border to view events</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Forecast</CardTitle>
          <CardDescription>Projected energy usage based on historical patterns and scheduled events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 text-center">
            <p className="text-lg font-medium">Energy usage forecast is being calculated</p>
            <p className="text-muted-foreground">Check back soon for detailed predictions based on scheduled events</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
