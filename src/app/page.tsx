'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {Icons} from '@/components/icons';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Clock} from 'lucide-react';

const images = [
  'https://media.gettyimages.com/id/1177117400/photo/coworkers-rushing-to-load-packages-in-a-delivery-van.jpg?s=612x612&w=0&k=20&c=8krDiH4YSGF-koks39RregS_bt_vEutsdPsUbWFQQ7k=',
  'https://media.gettyimages.com/id/1405272497/photo/warehouse-workers-loading-van-with-boxes.jpg?s=612x612&w=0&k=20&c=m0Ua0a-7Bomn6rE6_rsVggq9UaskWVGuHzOF8-W8FBk=',
  'https://media.gettyimages.com/id/1305492370/photo/white-delivery-van-on-the-road-from-above.jpg?s=612x612&w=0&k=20&c=d5og6MAs8HhDiPmNz2xzKDLv_rTJwwLOo52w8LTYEQc=',
  'https://media.gettyimages.com/id/513367000/photo/delivery-driver-in-the-warehouse.jpg?s=612x612&w=0&k=20&c=-sgfkVX3ca4K7j4wlk_m7jcK3-ekJq2D_rSoOBph5Lg=',
  'https://media.gettyimages.com/id/1285864657/photo/overhead-view-of-female-delivery-driver-carrying-produce-box-to-front-door-of-home.jpg?s=612x612&w=0&k=20&c=j_lUDwNwObgmJLIO5hA6J6sJu_-YYtW6PZf5TuUSHV8=',
];

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {useIsMobile} from "@/hooks/use-mobile";

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h1 className="font-semibold text-lg">FastTrack Dispatch</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Features</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/shipments';
                }}>
                  <Icons.workflow />
                  <span>Manage Shipments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/personnel';
                }}>
                  <Icons.user />
                  <span>Manage Delivery Personnel</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/schedule';
                }}>
                  <Icons.calendar />
                  <span>Schedule Deliveries</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/track';
                }}>
                  <Icons.search />
                  <span>Track Shipment Progress</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/driver-assign';
                }}>
                  <Icons.shield />
                  <span>Suggest Driver Assignments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/reports';
                }}>
                  <Icons.file />
                  <span>Generate Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/customer-notifications';
                }}>
                  <Icons.mail />
                  <span>Customer Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/delivery-notifications';
                }}>
                  <Icons.mail />
                  <span>Delivery Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  window.location.href = '/feedbacks-reviews';
                }}>
                  <Icons.messageSquare />
                  <span>Feedbacks and Reviews</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <CurrentTimeDisplay/>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardContent />
        <footer className="bg-secondary text-secondary-foreground p-4 text-center mt-4 rounded-md">
          © {new Date().getFullYear()} FastTrack Dispatch. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}

function CurrentTimeDisplay() {
  const [formattedTime, setFormattedTime] = useState<string>('');

  const getCurrentTime = useCallback((): string => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  useEffect(() => {
    setFormattedTime(getCurrentTime());

    const intervalId = setInterval(() => {
      setFormattedTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [getCurrentTime]);

  return (
    <div className="p-2 flex items-center space-x-2">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <p className="text-xs">
        {formattedTime}
      </p>
    </div>
  );
}

function DashboardContent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Match the transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        {/*  <SidebarTrigger className="md:hidden" /> */}
        <h2 className="font-semibold text-lg">Dashboard</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/50/50" alt="Avatar" />
                <AvatarFallback>FS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/login')}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className="p-4">
        {/* Image Slider */}
        <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
          {images.map((image, index) => (
          <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                currentImageIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
          />
          ))}
        </div>

        {/* About Us Section */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-2">About Us</h3>
          <p className="text-muted-foreground">
            FastTrack Dispatch is a cutting-edge logistics solution designed to streamline and optimize your delivery operations.
            We leverage the latest technology to provide efficient, reliable, and transparent services.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-muted-foreground">
            To revolutionize the logistics industry by providing innovative solutions that enhance efficiency, reduce costs, and improve customer satisfaction.
            We are committed to delivering excellence in every shipment.
          </p>
        </section>

        {/* Ongoing Shipments Section */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Ongoing Shipments</h3>
          <p className="text-muted-foreground">
            Track the pulse of our operations with real-time insights into current deliveries.
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Shipment ID: SHIP-2024-001 - Status: In Transit</li>
            <li>Shipment ID: SHIP-2024-002 - Status: Pending</li>
            <li>Shipment ID: SHIP-2024-003 - Status: Delivered</li>
          </ul>
        </section>

        {/* Company Administrators Section */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Company Administrators</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Admin 1 */}
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="https://picsum.photos/id/237/50/50" alt="Admin 1" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <p className="text-sm mt-2">John Doe</p>
              <p className="text-xs text-muted-foreground">CEO</p>
            </div>

            {/* Admin 2 */}
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="https://picsum.photos/id/238/50/50" alt="Admin 2" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <p className="text-sm mt-2">Mary Smith</p>
              <p className="text-xs text-muted-foreground">COO</p>
            </div>
            {/* Admin 3 */}
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="https://picsum.photos/id/239/50/50" alt="Admin 3" />
                <AvatarFallback>BW</AvatarFallback>
              </Avatar>
              <p className="text-sm mt-2">Bob Williams</p>
              <p className="text-xs text-muted-foreground">CTO</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
