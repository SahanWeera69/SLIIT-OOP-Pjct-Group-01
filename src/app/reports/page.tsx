'use client';

import {useState} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {format} from 'date-fns';
import {cn} from '@/lib/utils';

interface ShipmentData {
  month: Date;
  succeeded: number;
  failed: number;
  returned: number;
  deliverers: number;
}

const dummyShipmentData: ShipmentData[] = [
  {
    month: new Date(2024, 0, 1), // January 2024
    succeeded: 120,
    failed: 5,
    returned: 2,
    deliverers: 15,
  },
  {
    month: new Date(2024, 1, 1), // February 2024
    succeeded: 110,
    failed: 3,
    returned: 1,
    deliverers: 14,
  },
  {
    month: new Date(2024, 2, 1), // March 2024
    succeeded: 130,
    failed: 4,
    returned: 3,
    deliverers: 16,
  },
  {
    month: new Date(2024, 3, 1), // April 2024
    succeeded: 140,
    failed: 2,
    returned: 0,
    deliverers: 17,
  },
  {
    month: new Date(2024, 4, 1), // May 2024
    succeeded: 150,
    failed: 1,
    returned: 1,
    deliverers: 18,
  },
  {
    month: new Date(2024, 5, 1), // June 2024
    succeeded: 160,
    failed: 0,
    returned: 2,
    deliverers: 19,
  },
  {
    month: new Date(2024, 6, 1), // July 2024
    succeeded: 170,
    failed: 3,
    returned: 1,
    deliverers: 20,
  },
  {
    month: new Date(2024, 7, 1), // August 2024
    succeeded: 180,
    failed: 2,
    returned: 0,
    deliverers: 21,
  },
  {
    month: new Date(2024, 8, 1), // September 2024
    succeeded: 190,
    failed: 1,
    returned: 1,
    deliverers: 22,
  },
  {
    month: new Date(2024, 9, 1), // October 2024
    succeeded: 200,
    failed: 0,
    returned: 2,
    deliverers: 23,
  },
  {
    month: new Date(2024, 10, 1), // November 2024
    succeeded: 210,
    failed: 3,
    returned: 1,
    deliverers: 24,
  },
  {
    month: new Date(2024, 11, 1), // December 2024
    succeeded: 220,
    failed: 2,
    returned: 0,
    deliverers: 25,
  },
];

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const getShipmentDataForYear = (year: number) => {
    return dummyShipmentData.filter(data => data.month.getFullYear() === year);
  };

  const shipmentData = getShipmentDataForYear(selectedYear);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Shipment Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              defaultMonth={new Date(selectedYear, 0)}
              onSelect={date => {
                if (date) {
                  setSelectedYear(date.getFullYear());
                }
              }}
              className="rounded-md border"
              showOutsideDays={false}
              //captionLayout="year"
            />
          </CardContent>
        </Card>

        {/* Shipment Data */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Shipment Details for {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {shipmentData.length > 0 ? (
              <ul>
                {shipmentData.map((data, index) => (
                  <li key={index} className="mb-4 p-4 border rounded-md">
                    <div className="font-semibold">{format(data.month, 'MMMM')}</div>
                    <div className="text-sm text-muted-foreground">
                      Succeeded: {data.succeeded}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Failed: {data.failed}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Returned: {data.returned}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Deliverers: {data.deliverers}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted-foreground">No data for this year.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
