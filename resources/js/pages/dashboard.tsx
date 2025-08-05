import AppLayout from '@/layouts/app-layout';
import {type BreadcrumbItem} from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [ 
  { title: 'Dashboard', href: '/dashboard' },
];
interface ShopProfile {
  email: string;
  name:string;
  address:string;
  shop_type:string;
  id:number;
  contact_number?: string;
image: string|File;
}
interface SchoolProfile{
  reg_no: string;
  email: string;
  affiliation?: string;
  level?: string;
  address?: string;
  image: string|File;
  contact_number?: string;
  name:string;
  id: number;
}
interface User {
  name: string;
  address?: string;
  contact_number:string;
  image:string;
  role: 'school' | 'shopkeeper';
  ShopProfile?: ShopProfile;
  SchoolProfile?:SchoolProfile;
}
interface UserData {
  auth: {
  user: User;
  };
  schools: SchoolProfile[];
  shops: ShopProfile[];
}
export default function Dashboard({ auth, schools, shops }: UserData) {
  const { user } = auth;
  //  if (!auth?.user) return <div>Please log in to view your dashboard.</div>;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Dashboard`} />
      <h1>Welcome {user?.name}</h1>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              {schools.map((school: SchoolProfile) => {
                return (
                  <div key={school.email}>
                    <p>School Name: {school.name}</p>
                    <p>Address: {school.address}</p>
                    <p>Contact Number: {school.contact_number}</p>
                  </div>
                );
              })}
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              {shops.map((shop: ShopProfile) => {
                return (
                  <div key={shop.email}>
                    <p>Shop Name: {shop.name}</p>
                    <p>Address: {shop.address}</p>
                    <p>{shop.name}</p>
                    <p>Contact Number: {shop.contact_number}</p>
                  </div>
                );
              })}
            </div>
         </div>
         </div>
    </AppLayout>
);
}