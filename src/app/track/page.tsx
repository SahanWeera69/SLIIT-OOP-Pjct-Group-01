"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface ShipmentTrack {
  id: number;
  shipmentId: string;
  deliveryPerson: {
    name: string;
    avatarUrl: string;
  };
  personInCharge: {
    name: string;
    avatarUrl: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'in_transit' | 'delivered' | 'failed';
  notes: string;
}

const ShipmentTrackSchema = z.object({
  shipmentId: z.string().min(2, {
    message: "Shipment ID must be at least 2 characters.",
  }),
  deliveryPersonName: z.string().min(2, {
    message: "Delivery Person Name must be at least 2 characters.",
  }),
  deliveryPersonAvatarUrl: z.string().url({
    message: "Invalid URL for Delivery Person Avatar.",
  }),
  personInChargeName: z.string().min(2, {
    message: "Person in Charge Name must be at least 2 characters.",
  }),
  personInChargeAvatarUrl: z.string().url({
    message: "Invalid URL for Person in Charge Avatar.",
  }),
  latitude: z.number(),
  longitude: z.number(),
  status: z.enum(['pending', 'in_transit', 'delivered', 'failed']),
  notes: z.string().optional(),
})

export default function TrackShipmentPage() {
  const [shipmentTracks, setShipmentTracks] = useState<ShipmentTrack[]>([
    {
      id: 1,
      shipmentId: 'SHIP-001',
      deliveryPerson: {
        name: 'Alice Smith',
        avatarUrl: 'https://picsum.photos/id/1027/50/50',
      },
      personInCharge: {
        name: 'Bob Johnson',
        avatarUrl: 'https://picsum.photos/id/1025/50/50',
      },
      location: {
        latitude: 34.052235,
        longitude: -118.243683,
      },
      status: 'in_transit',
      notes: 'En route to destination.',
    },
    {
      id: 2,
      shipmentId: 'SHIP-002',
      deliveryPerson: {
        name: 'Charlie Brown',
        avatarUrl: 'https://picsum.photos/id/1026/50/50',
      },
      personInCharge: {
        name: 'Diana Lee',
        avatarUrl: 'https://picsum.photos/id/1028/50/50',
      },
      location: {
        latitude: 40.712776,
        longitude: -74.005974,
      },
      status: 'pending',
      notes: 'Awaiting pickup.',
    },
  ]);
  const [editShipmentTrackId, setEditShipmentTrackId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof ShipmentTrackSchema>>({
    resolver: zodResolver(ShipmentTrackSchema),
    defaultValues: {
      shipmentId: "",
      deliveryPersonName: "",
      deliveryPersonAvatarUrl: "",
      personInChargeName: "",
      personInChargeAvatarUrl: "",
      latitude: 0,
      longitude: 0,
      status: 'pending',
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof ShipmentTrackSchema>) {
    if (editShipmentTrackId) {
      setShipmentTracks(shipmentTracks.map(shipmentTrack =>
        shipmentTrack.id === editShipmentTrackId ? {
          ...shipmentTrack,
          shipmentId: values.shipmentId,
          deliveryPerson: {
            name: values.deliveryPersonName,
            avatarUrl: values.deliveryPersonAvatarUrl,
          },
          personInCharge: {
            name: values.personInChargeName,
            avatarUrl: values.personInChargeAvatarUrl,
          },
          location: {
            latitude: values.latitude,
            longitude: values.longitude,
          },
          status: values.status,
          notes: values.notes ?? '',
        } : shipmentTrack
      ));
    } else {
      const newId = shipmentTracks.length > 0 ? shipmentTracks[shipmentTracks.length - 1].id + 1 : 1;
      setShipmentTracks([...shipmentTracks, {
        id: newId,
        shipmentId: values.shipmentId,
        deliveryPerson: {
          name: values.deliveryPersonName,
          avatarUrl: values.deliveryPersonAvatarUrl,
        },
        personInCharge: {
          name: values.personInChargeName,
          avatarUrl: values.personInChargeAvatarUrl,
        },
        location: {
          latitude: values.latitude,
          longitude: values.longitude,
        },
        status: values.status,
        notes: values.notes ?? '',
      }]);
    }

    setIsDialogOpen(false);
    setEditShipmentTrackId(null);
    form.reset();
  }

  const addShipmentTrack = () => {
    setEditShipmentTrackId(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const editShipmentTrack = (id: number) => {
    const shipmentTrackToEdit = shipmentTracks.find(shipmentTrack => shipmentTrack.id === id);
    if (shipmentTrackToEdit) {
      setEditShipmentTrackId(id);
      form.setValue("shipmentId", shipmentTrackToEdit.shipmentId);
      form.setValue("deliveryPersonName", shipmentTrackToEdit.deliveryPerson.name);
      form.setValue("deliveryPersonAvatarUrl", shipmentTrackToEdit.deliveryPerson.avatarUrl);
      form.setValue("personInChargeName", shipmentTrackToEdit.personInCharge.name);
      form.setValue("personInChargeAvatarUrl", shipmentTrackToEdit.personInCharge.avatarUrl);
      form.setValue("latitude", shipmentTrackToEdit.location.latitude);
      form.setValue("longitude", shipmentTrackToEdit.location.longitude);
      form.setValue("status", shipmentTrackToEdit.status);
      form.setValue("notes", shipmentTrackToEdit.notes ?? '');
      setIsDialogOpen(true);
    }
  };

  const deleteShipmentTrack = (id: number) => {
    setShipmentTracks(shipmentTracks.filter(shipmentTrack => shipmentTrack.id !== id));
  };

  const statusBadgeColor = (status: ShipmentTrack['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-secondary text-secondary-foreground';
      case 'in_transit':
        return 'bg-primary text-primary-foreground';
      case 'delivered':
        return 'bg-accent text-accent-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Track Shipment Progress</h1>

      <Button onClick={addShipmentTrack}>Add New Shipment Track</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {shipmentTracks.map(shipmentTrack => (
          <Card key={shipmentTrack.id}>
            <CardHeader>
              <CardTitle>Shipment ID: {shipmentTrack.shipmentId}</CardTitle>
              <CardDescription>
                Status: <span className={statusBadgeColor(shipmentTrack.status)}>{shipmentTrack.status.replace('_', ' ')}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-2">
                <Avatar>
                  <AvatarImage src={shipmentTrack.deliveryPerson.avatarUrl} alt={shipmentTrack.deliveryPerson.name} />
                  <AvatarFallback>{shipmentTrack.deliveryPerson.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <Label>Delivery Person</Label>
                  <p>{shipmentTrack.deliveryPerson.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <Avatar>
                  <AvatarImage src={shipmentTrack.personInCharge.avatarUrl} alt={shipmentTrack.personInCharge.name} />
                  <AvatarFallback>{shipmentTrack.personInCharge.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <Label>Person In Charge</Label>
                  <p>{shipmentTrack.personInCharge.name}</p>
                </div>
              </div>
              <div>
                <Label>Location</Label>
                <p>Latitude: {shipmentTrack.location.latitude}, Longitude: {shipmentTrack.location.longitude}</p>
                {/* Replace with a world map component later */}
                <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  Mock World Map
                </div>
              </div>
              {shipmentTrack.notes && (
                <div className="mt-2">
                  <Label>Notes</Label>
                  <p>{shipmentTrack.notes}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="secondary" size="sm" onClick={() => editShipmentTrack(shipmentTrack.id)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteShipmentTrack(shipmentTrack.id)}>
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editShipmentTrackId ? 'Edit Shipment Track' : 'Add Shipment Track'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="shipmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipment ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Shipment ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryPersonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Person Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Delivery Person Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryPersonAvatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Person Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Delivery Person Avatar URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personInChargeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Person In Charge Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Person In Charge Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personInChargeAvatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Person In Charge Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Person In Charge Avatar URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Latitude" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Longitude" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <select {...field} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="pending">Pending</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="failed">Failed</option>
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Notes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">{editShipmentTrackId ? 'Update' : 'Add'}</Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)} className="ml-2">Cancel</Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
