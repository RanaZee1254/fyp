import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];
interface ShopProfile {
  email: string;
  name: string;
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
  name: string;
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
export default function Dashboard({ auth, schools, shops }: UserData) {
  const { user } = auth;
  const addDetailsLink =
    user.role === 'school'
      ? { href: '/details?role=school', label: 'Add School' }
      : { href: '/details?role=shopkeeper', label: 'Add Shop' };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Welcome {user?.name}</h1>
        <Link
          href={addDetailsLink.href}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {addDetailsLink.label}
        </Link>
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
            <h2 className="text-lg font-semibold mb-2">Schools</h2>
            {schools.map((school: SchoolProfile) => (
              <div key={school.email} className="mb-3">
                <p>School Name: {school.name}</p>
                <p>Address: {school.address}</p>
                <p>Contact Number: {school.contact_number}</p>
              </div>
            ))}
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
            <h2 className="text-lg font-semibold mb-2">Shops</h2>
            {shops.map((shop: ShopProfile) => (
              <div key={shop.email} className="mb-3">
                <p>Shop Name: {shop.name}</p>
                <p>Address: {shop.address}</p>
                <p>Contact Number: {shop.contact_number}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
