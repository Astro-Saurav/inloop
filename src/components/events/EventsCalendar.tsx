
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, MapPin, Users } from "lucide-react";
import { mockEvents, type Event } from "@/utils/mockData";

export function EventsCalendar() {
  const [events] = useState<Event[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Filter events based on search query and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get events for the selected date
  const eventsOnSelectedDate = selectedDate 
    ? filteredEvents.filter(event => {
        const eventDate = parseISO(event.date);
        return eventDate.getDate() === selectedDate.getDate() &&
               eventDate.getMonth() === selectedDate.getMonth() &&
               eventDate.getFullYear() === selectedDate.getFullYear();
      })
    : [];
  
  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'workshop': return 'bg-inloop-blue text-white';
      case 'seminar': return 'bg-inloop-purple text-white';
      case 'hackathon': return 'bg-inloop-orange text-white';
      case 'cultural': return 'bg-inloop-pink text-white';
      default: return 'bg-inloop-green text-white';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Events Calendar</CardTitle>
          <CardDescription>Browse upcoming events and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="seminar">Seminars</SelectItem>
                <SelectItem value="hackathon">Hackathons</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="calendar">
            <TabsList className="mb-4">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                
                <div>
                  <h3 className="font-medium mb-3">
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                  </h3>
                  
                  {eventsOnSelectedDate.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No events on this date</p>
                  ) : (
                    <div className="space-y-3">
                      {eventsOnSelectedDate.map((event) => (
                        <Card key={event.id}>
                          <CardContent className="p-3">
                            <div className="flex items-start space-x-3">
                              <div className="bg-primary/10 rounded-md p-2">
                                <CalendarIcon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {format(parseISO(event.date), "h:mm a")}
                                </p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location}
                                </div>
                                <Badge 
                                  className={`mt-2 ${getCategoryBadgeColor(event.category)}`}
                                >
                                  {event.category}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="list">
              {filteredEvents.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">No events found</p>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="sm:flex">
                        {event.image && (
                          <div className="sm:w-1/3">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className={`p-4 sm:p-6 ${event.image ? 'sm:w-2/3' : 'w-full'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              className={getCategoryBadgeColor(event.category)}
                            >
                              {event.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {format(parseISO(event.date), "MMM d, yyyy")}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-4">{event.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{event.organizer}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{format(parseISO(event.date), "h:mm a")}</span>
                            </div>
                          </div>
                          <Button className="mt-4">View Details</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
