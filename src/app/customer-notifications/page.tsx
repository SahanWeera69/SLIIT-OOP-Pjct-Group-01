"use client";

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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

interface Notification {
  id: number;
  adminName: string;
  adminId: string;
  adminContact: string;
  customerName: string;
  customerId: string;
  customerContact: string;
  shipmentId: string;
  message: string;
}

const NotificationSchema = z.object({
  adminName: z.string().min(2, {
    message: "Admin name must be at least 2 characters.",
  }),
  adminId: z.string().min(2, {
    message: "Admin ID must be at least 2 characters.",
  }),
  adminContact: z.string().min(8, {
    message: "Admin contact must be at least 8 characters.",
  }),
  customerName: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  customerId: z.string().min(2, {
    message: "Customer ID must be at least 2 characters.",
  }),
  customerContact:  z.string().min(8, {
    message: "Customer contact must be at least 8 characters.",
  }),
  shipmentId: z.string().min(2, {
    message: "Shipment ID must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    adminName: "John Doe",
    adminId: "admin001",
    adminContact: "123-456-7890",
    customerName: "Alice Smith",
    customerId: "cust001",
    customerContact: "987-654-3210",
    shipmentId: "SHIP-001",
    message: "Your shipment is on the way!",
  },
  {
    id: 2,
    adminName: "Jane Smith",
    adminId: "admin002",
    adminContact: "111-222-3333",
    customerName: "Bob Johnson",
    customerId: "cust002",
    customerContact: "444-555-6666",
    shipmentId: "SHIP-002",
    message: "There has been a delay in your delivery.",
  },
];

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editNotificationId, setEditNotificationId] = useState<number | null>(null);

   const form = useForm<z.infer<typeof NotificationSchema>>({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      adminName: "",
      adminId: "",
      adminContact: "",
      customerName: "",
      customerId: "",
      customerContact: "",
      shipmentId: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof NotificationSchema>) {
    if (editNotificationId) {
      // Update existing notification
      setNotifications(notifications.map(notification =>
        notification.id === editNotificationId ? { ...notification,
          adminName: values.adminName,
          adminId: values.adminId,
          adminContact: values.adminContact,
          customerName: values.customerName,
          customerId: values.customerId,
          customerContact: values.customerContact,
          shipmentId: values.shipmentId,
          message: values.message
        } : notification
      ));
    } else {
      // Add new notification
      const newId = notifications.length > 0 ? notifications[notifications.length - 1].id + 1 : 1;
      setNotifications([...notifications, { id: newId, ...values }]);
    }

    setIsDialogOpen(false);
    setEditNotificationId(null);
    form.reset();
  }

  const addNotification = () => {
    setEditNotificationId(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const editNotification = (id: number) => {
    const notificationToEdit = notifications.find(notification => notification.id === id);
    if (notificationToEdit) {
      setEditNotificationId(id);
      form.setValue("adminName", notificationToEdit.adminName);
      form.setValue("adminId", notificationToEdit.adminId);
      form.setValue("adminContact", notificationToEdit.adminContact);
      form.setValue("customerName", notificationToEdit.customerName);
      form.setValue("customerId", notificationToEdit.customerId);
      form.setValue("customerContact", notificationToEdit.customerContact);
      form.setValue("shipmentId", notificationToEdit.shipmentId);
      form.setValue("message", notificationToEdit.message);
      setIsDialogOpen(true);
    }
  };


  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Customer Notifications</h1>

       <Button onClick={addNotification}>Add New Notification</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <CardHeader>
              <CardTitle>Notification ID: {notification.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                Admin: {notification.adminName} (ID: {notification.adminId}, Contact: {notification.adminContact})
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Customer: {notification.customerName} (ID: {notification.customerId}, Contact: {notification.customerContact})
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Shipment ID: {notification.shipmentId}
              </div>
              <div>
                <Label className="text-xs">Message:</Label>
                <p className="text-sm">{notification.message}</p>
              </div>
            </CardContent>
             <div className="flex justify-between p-4">
              <Button variant="secondary" size="sm" onClick={() => editNotification(notification.id)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteNotification(notification.id)}>
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editNotificationId ? 'Edit Notification' : 'Add Notification'}</DialogTitle>
          </DialogHeader>
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="adminName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adminId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="adminContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin Contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="customerContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer Contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">{editNotificationId ? 'Update' : 'Add'}</Button>
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

