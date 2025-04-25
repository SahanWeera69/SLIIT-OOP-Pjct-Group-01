"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { Textarea } from "@/components/ui/textarea";

interface DeliveryEvent {
  id: number;
  title: string;
  date: Date;
  type: 'event' | 'order' | 'special';
  description: string;
}

export default function ScheduleDeliveriesPage() {
  const [events, setEvents] = useState<DeliveryEvent[]>([
    { id: 1, title: 'Tech Conference Delivery', date: new Date(), type: 'event', description: 'Deliver booth materials to the tech conference.' },
    { id: 2, title: 'Express Order #123', date: new Date(), type: 'order', description: 'Rush delivery for online order #123.' },
    { id: 3, title: 'VIP Client Shipment', date: new Date(), type: 'special', description: 'Special handling required for VIP client package.' },
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editEventId, setEditEventId] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<DeliveryEvent, 'id'>>({
    title: '',
    date: new Date(),
    type: 'event',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setNewEvent(prev => ({ ...prev, date: new Date(value) }));
    } else {
      setNewEvent(prev => ({ ...prev, [name]: value }));
    }
  };

  const addEvent = () => {
    const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
    setEvents(prev => [...prev, { id: newId, ...newEvent }]);
    setNewEvent({ title: '', date: new Date(), type: 'event', description: '' });
    setIsDialogOpen(false);
  };

  const editEvent = (id: number) => {
    const eventToEdit = events.find(event => event.id === id);
    if (eventToEdit) {
      setEditEventId(id);
      setNewEvent({ ...eventToEdit, date: eventToEdit.date });
      setIsDialogOpen(true);
    }
  };

  const updateEvent = () => {
    if (editEventId) {
      setEvents(events.map(event =>
        event.id === editEventId ? { ...newEvent, id: editEventId } : event
      ));
    }
    setIsDialogOpen(false);
    setEditEventId(null);
    setNewEvent({ title: '', date: new Date(), type: 'event', description: '' });
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const filteredEvents = selectedDate
    ? events.filter(event => format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Schedule Deliveries</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Delivery Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Event List for Selected Date */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Events for {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {filteredEvents.length > 0 ? (
              <ul>
                {filteredEvents.map(event => (
                  <li key={event.id} className="mb-2 p-2 border rounded-md">
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.description}</div>
                    <div className="flex justify-between mt-2">
                      <Button variant="secondary" size="sm" onClick={() => editEvent(event.id)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteEvent(event.id)}>Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted-foreground">No events for this date.</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Event Button and Dialog */}
      <Button onClick={() => setIsDialogOpen(true)}>Add New Event</Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editEventId ? 'Edit Event' : 'Add Event'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input type="text" id="title" name="title" value={newEvent.title} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input type="date" id="date" name="date" value={format(newEvent.date, 'yyyy-MM-dd')} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <select id="type" name="type" value={newEvent.type} onChange={handleInputChange} className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="event">Event</option>
                <option value="order">Order</option>
                <option value="special">Special</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" name="description" value={newEvent.description} onChange={handleInputChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={editEventId ? updateEvent : addEvent}>{editEventId ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sm:flex sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"
