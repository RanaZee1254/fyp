import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];
interface ShopProfile {
  email: string;
  shop_name: string;
  address: string;
  shop_type: string;
  id: number;
  contact_number?: string;
  image: string | File;
}
interface SchoolProfile {
  reg_no: string;
  email: string;
  affiliation?: string;
  level?: string;
  address?: string;
  image: string | File;
  contact_number?: string;
  school_name: string;
  id: number;
}
interface User {
  name: string;
  address?: string;
  contact_number: string;
  image: string;
  role: 'school' | 'shopkeeper';
  ShopProfile?: ShopProfile;
  SchoolProfile?: SchoolProfile;
}
interface UserData {
  auth: {
    user: User;
  };
  schools: SchoolProfile[];
  shops: ShopProfile[];
}
export default function Dashboard({ auth, schools, shops}: UserData) {
  const { user } = auth; 
  console.log(user.role);
  const addDetailsLink =
    user.role === 'school'
      ? { href: 'details?role=school', label: 'Add School' }
      : { href: 'details?role=shop', label: 'Add Shop' };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Welcome{user.name}</h1>
        {
          (user.role === 'school' || user.role === 'shopkeeper') && 
          <Link
            href={addDetailsLink.href}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {addDetailsLink.label}
          </Link>
        }
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {schools.map((school: SchoolProfile) => (
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
            <h2 className="text-lg font-semibold mb-2">Schools</h2>
              <div key={school.email} className="mb-3">
                <p>School Name: {school.school_name}</p>
                <p>Address: {school.address}</p>
                <p>Contact Number: {school.contact_number}</p>
              </div>
          </div>
            ))}
            {shops.map((shop: ShopProfile) => (
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
            <h2 className="text-lg font-semibold mb-2">Shops</h2>
              <div key={shop.email} className="mb-3">
                <p>Shop Name: {shop.shop_name}</p>
                <p>Address: {shop.address}</p>
                <p>Contact Number: {shop.contact_number}</p>
              </div>
              </div>
            ))}
          </div>

        </div>
    </AppLayout>
  );
}
