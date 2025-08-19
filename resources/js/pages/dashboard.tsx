 
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { constant } from '@/constant';
import { lang } from '@/translation';
const DefaultLang = 'en';
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];
interface ShopProfile {
  id: number;
  email: string;
  shop_name: string;
  address: string;
  shop_type: string;
  contact_number?: number;
  image: string | File;
}
interface SchoolProfile {
  id: number;
  reg_no: string;
  email: string;
  affiliation?: string;
  level: string;
  address: string;
  image: string | File;
  contact_number?: number;
  school_name: string;
}
interface User {
  name: string;
  address: string;
  contact_number: number;
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
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Welcome {user.name}</h1>
       {user.role === constant.SCHOOL && (
  <div className="flex gap-2">
    {user.SchoolProfile ? (
      <>
        <Link
          href={`details/${user.SchoolProfile.id}/edit`}
          className="rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
        >
          Edit School
        </Link>
      </>
    ) : null}
    <Link
      href="details?role=school"
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      {lang[DefaultLang].add_school}
    </Link>
  </div>
)}
{user.role === constant.SHOP && (
  <div className="flex gap-2">
    {user.ShopProfile ? (
      <>
        <Link
          href={`details/${user.ShopProfile.id}/edit`}
          className="rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
        >
          Edit Shop
        </Link>
        <Link
          method="delete"
          href={`details/${user.ShopProfile.id}`}
          as="button"
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Remove Shop
        </Link>
      </>
    ) : null}
    <Link
      href="details?role=shop"
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Add Shop
    </Link>
  </div>
)}
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          {schools.map((school: SchoolProfile) => {
            console.log('Image path:', school.image);
            console.log(`School ${school.id} image:`, school.image);

           return( <div
              key={school.id}
              className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4"
            >
              <h2 className="text-lg font-semibold mb-2">School</h2>
              <div className="mb-3">
                {school.image ? (
              <img src={`/storage/${school.image}`}
                className="h-32 w-full object-cover rounded mb-2"
                alt={`${school.school_name} `}
  />
) : (
  <div className="h-32 w-full bg-gray-200 rounded mb-2 flex items-center justify-center">
    No Image
  </div>
)}
                <p>School Name: {school.school_name}</p>
                <p>Address: {school.address}</p>
                <p>Contact Number: {school.contact_number}</p>
              </div>
            </div>);
})}
          {shops.map((shop: ShopProfile) => (
            <div
              key={shop.id}
              className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4"
            >
              <h2 className="text-lg font-semibold mb-2">Shop</h2>
              <div className="mb-3">
                <img
                  src={`/storage/${shop.image}`}
                  className="h-32 w-full object-cover rounded mb-2"
                />
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
