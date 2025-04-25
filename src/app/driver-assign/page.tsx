"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Package, User } from "lucide-react";
import { suggestDriverAssignment, SuggestDriverAssignmentInput } from "@/ai/flows/suggest-driver-assignment";

// Mock data for drivers - replace with actual data fetching later
const mockDrivers = [
  { id: 'driver-1', name: 'Alice Smith', location: { lat: 34.052235, lng: -118.243683 }, availability: 'Available' },
  { id: 'driver-2', name: 'Bob Johnson', location: { lat: 40.712776, lng: -74.005974 }, availability: 'Busy' },
];

export default function SuggestDriverAssignmentsPage() {
  const [pickupLocation, setPickupLocation] = useState({ lat: 34.052235, lng: -118.243683 });
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: 40.712776, lng: -74.005974 });
  const [packageType, setPackageType] = useState('Standard');
  const [suggestedDriver, setSuggestedDriver] = useState<{ driverId: string; reason: string; } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSuggestDriver = async () => {
    setLoading(true);
    const driverAvailability = JSON.stringify(mockDrivers); // Mock driver availability
    const input: SuggestDriverAssignmentInput = {
      packageType,
      driverAvailability,
      pickupLocation,
      deliveryLocation,
    };

    try {
      const result = await suggestDriverAssignment(input);
      setSuggestedDriver(result);
    } catch (error) {
      console.error("Error suggesting driver:", error);
      // Handle error appropriately (e.g., display an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Suggest Driver Assignments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input and Suggestion Section */}
        <Card className="bg-secondary rounded-lg p-4">
          <CardHeader>
            <CardTitle>Enter Delivery Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="pickupLat">Pickup Latitude</Label>
              <Input
                type="number"
                id="pickupLat"
                value={pickupLocation.lat}
                onChange={(e) => setPickupLocation({ ...pickupLocation, lat: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="pickupLng">Pickup Longitude</Label>
              <Input
                type="number"
                id="pickupLng"
                value={pickupLocation.lng}
                onChange={(e) => setPickupLocation({ ...pickupLocation, lng: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="deliveryLat">Delivery Latitude</Label>
              <Input
                type="number"
                id="deliveryLat"
                value={deliveryLocation.lat}
                onChange={(e) => setDeliveryLocation({ ...deliveryLocation, lat: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="deliveryLng">Delivery Longitude</Label>
              <Input
                type="number"
                id="deliveryLng"
                value={deliveryLocation.lng}
                onChange={(e) => setDeliveryLocation({ ...deliveryLocation, lng: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="packageType">Package Type</Label>
              <Input
                type="text"
                id="packageType"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
              />
            </div>
            <Button onClick={handleSuggestDriver} disabled={loading}>
              {loading ? "Suggesting..." : "Suggest Driver"}
            </Button>
            {suggestedDriver && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Suggested Driver:</h3>
                <p>Driver ID: {suggestedDriver.driverId}</p>
                <p>Reason: {suggestedDriver.reason}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Map Display - Replace with actual map component later */}
        <Card className="bg-secondary rounded-lg p-4">
          <CardHeader>
            <CardTitle>Delivery Route</CardTitle>
          </CardHeader>
          <CardContent className="h-64 bg-muted rounded-md flex items-center justify-center">
            <MapPin className="h-8 w-8 text-muted-foreground" />
            Mock Map Display
          </CardContent>
        </Card>
      </div>

      {/* Driver Details and Package Information - Replace with dynamic data later */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-secondary rounded-lg p-4">
          <CardHeader>
            <CardTitle>Driver Details</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://picsum.photos/50/50" alt="Driver Avatar" />
              <AvatarFallback><User/></AvatarFallback>
            </Avatar>
            <div>
              <Label>Name</Label>
              <p>
                {suggestedDriver?.driverId || "No driver suggested"}
              </p>
              <Label>Availability</Label>
              <p>
                {suggestedDriver ? "Available" : "Not Available"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary rounded-lg p-4">
          <CardHeader>
            <CardTitle>Package Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <Label>Type</Label>
              <p>{packageType}</p>
            </div>
            {/* Add more package details here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
