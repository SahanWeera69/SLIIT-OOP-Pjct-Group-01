"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "@/lib/utils";
import { Edit, Trash, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Shipment {
  id: number;
  name: string;
  description: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'failed';
}

const ShipmentSchema = z.object({
  name: z.string().min(2, {
    message: "Shipment name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z.enum(['pending', 'in_transit', 'delivered', 'failed']),
})

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([
    { id: 1, name: 'Laptop Delivery', description: 'Sending a new laptop to the client.', status: 'in_transit' },
    { id: 2, name: 'Fragile Goods', description: 'Delivery of fragile items, handle with care.', status: 'pending' },
  ]);
  const [editShipmentId, setEditShipmentId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof ShipmentSchema>>({
    resolver: zodResolver(ShipmentSchema),
    defaultValues: {
      name: "",
      description: "",
      status: 'pending',
    },
  })

  function onSubmit(values: z.infer<typeof ShipmentSchema>) {
    // Do something with the data
    console.log(values)
    if (editShipmentId) {
      // Update existing shipment
      setShipments(shipments.map(shipment =>
        shipment.id === editShipmentId ? { ...shipment, name: values.name, description: values.description, status: values.status } : shipment
      ));
    } else {
      // Add new shipment
      const newId = shipments.length > 0 ? shipments[shipments.length - 1].id + 1 : 1;
      setShipments([...shipments, { id: newId, name: values.name, description: values.description, status: values.status }]);
    }

    setIsDialogOpen(false);
    setEditShipmentId(null);
    form.reset();
  }


  const addShipment = () => {
    setEditShipmentId(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const editShipment = (id: number) => {
    const shipmentToEdit = shipments.find(shipment => shipment.id === id);
    if (shipmentToEdit) {
      setEditShipmentId(id);
      form.setValue("name", shipmentToEdit.name);
      form.setValue("description", shipmentToEdit.description);
      form.setValue("status", shipmentToEdit.status);
      setIsDialogOpen(true);
    }
  };

  const deleteShipment = (id: number) => {
    setShipments(shipments.filter(shipment => shipment.id !== id));
  };

  const statusBadgeColor = (status: Shipment['status']) => {
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
      <h1 className="text-2xl font-semibold mb-4">Manage Shipments</h1>

      <Button onClick={addShipment}>Add New Shipment</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {shipments.map(shipment => (
          <Card key={shipment.id}>
            <CardHeader>
              <CardTitle>{shipment.name}</CardTitle>
              <CardDescription>
                <Badge className={statusBadgeColor(shipment.status)}>{shipment.status.replace('_', ' ')}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {shipment.description}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="secondary" size="sm" onClick={() => editShipment(shipment.id)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteShipment(shipment.id)}>
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editShipmentId ? 'Edit Shipment' : 'Add Shipment'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipment Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Shipment Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Shipment description" {...field} />
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
              <div className="flex justify-end">
                <Button type="submit">{editShipmentId ? 'Update' : 'Add'}</Button>
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
