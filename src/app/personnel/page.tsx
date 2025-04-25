"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DeliveryPersonnel {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export default function DeliveryPersonnelPage() {
  const [personnelList, setPersonnelList] = useState<DeliveryPersonnel[]>([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', status: 'inactive' },
  ]);
  const [newPersonnel, setNewPersonnel] = useState<Omit<DeliveryPersonnel, 'id'>>({
    name: '',
    email: '',
    phone: '',
    status: 'active',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPersonnel(prev => ({ ...prev, [name]: value }));
  };

  const addPersonnel = () => {
    const newId = personnelList.length > 0 ? personnelList[personnelList.length - 1].id + 1 : 1;
    setPersonnelList(prev => [...prev, { id: newId, ...newPersonnel }]);
    setNewPersonnel({ name: '', email: '', phone: '', status: 'active' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Delivery Personnel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add Personnel Form */}
        <div className="bg-secondary rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Add New Personnel</h2>
          <div className="grid gap-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" value={newPersonnel.name} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" value={newPersonnel.email} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input type="tel" id="phone" name="phone" value={newPersonnel.phone} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select id="status" name="status" value={newPersonnel.status} onChange={handleInputChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <Button onClick={addPersonnel}>Add Personnel</Button>
          </div>
        </div>

        {/* Personnel List */}
        <div className="bg-secondary rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Current Personnel</h2>
          <ul>
            {personnelList.map(personnel => (
              <li key={personnel.id} className="py-2">
                {personnel.name} - {personnel.email} ({personnel.status})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
