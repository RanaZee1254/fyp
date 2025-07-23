import AppLayout from '@/layouts/app-layout';
import {type BreadcrumbItem} from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [ 
  { title: 'Dashboard', href: '/dashboard' },
];
interface ShopProfile {
name:string;
address:string;
shop_type:string;
}
interface SchoolProfile{
   reg_no: string;
  affiliation?: string;
  level?: string;
  address?: string;
   image: string|File;
   Contact_Number?: string;
   name:string;
}
interface User {
  name: string;
   address?: string;
   Contact_Number:string;
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
export default function Dashboard ({ auth, schools, shops }: UserData) {
  const { user } = auth;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Dashboard`} />
      <h1>Welcome {user.name}</h1>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              {user.Contact_Number}
              {schools.map((school: SchoolProfile) => (
                <div key={school.reg_no}>
                  <p>School Name: {school.name}</p>
                  <p>Registration No: {school.reg_no}</p>
                  <p>Affiliation: {school.affiliation}</p>
                  <p>Level: {school.level}</p>
                  <p>Address: {school.address}</p>
                  <p>Contact Number: {school.Contact_Number}</p>
                </div>
              ))}  
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              {shops.map((shop: ShopProfile) => (
                <div key={shop.name}>
                  <p>Shop Name: {shop.name}</p>
                  <p>Address: {shop.address}</p>
                </div>
              ))}
              </div> 
              <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              <p>Role: {user.role}</p>
               </div>
         </div>
         </div>
    </AppLayout>
  );
}