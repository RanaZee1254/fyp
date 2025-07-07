import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
type SchoolProfile = {
  reg_no: string;
  affiliation?: string;
  level?: string;
  address?: string;
};
type ShopProfile = {
  shop_type: string;
  address?: string;
};
type DashboardProps = {
  schools: SchoolProfile[];
  shops: ShopProfile[];
};
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];
export default function Dashboard({ schools, shops }: DashboardProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* Render School Cards */}
          {schools.map((school, index) => (
            <div key={`school-${index}`} className="rounded border p-4 shadow">
              <h3 className="font-bold">School</h3>
              <p><strong>Reg No:</strong> {school.reg_no}</p>
              {school.affiliation && <p><strong>Affiliation:</strong> {school.affiliation}</p>}
              {school.level && <p><strong>Level:</strong> {school.level}</p>}
              {school.address && <p><strong>Address:</strong> {school.address}</p>}
            </div>
          ))}

          {/* Render Shop Cards */}
          {shops.map((shop, index) => (
            <div key={`shop-${index}`} className="rounded border p-4 shadow">
              <h3 className="font-bold">Shop</h3>
              <p><strong>Type:</strong> {shop.shop_type}</p>
              {shop.address && <p><strong>Address:</strong> {shop.address}</p>}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
