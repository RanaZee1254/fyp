import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link,useForm } from '@inertiajs/react';
import { constant } from '@/constant';
import { Button } from '@/components/ui/button';
import { lang } from '@/translation';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { route } from 'ziggy-js';
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
  const [search, setSearch] = useState("");
  // const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const { processing, delete: kill } = useForm();
  const filteredSchools = schools.filter((school) =>
    school.school_name.toLowerCase().includes(search.toLowerCase()) ||
    school.contact_number?.toString().includes(search.toString())
  );
  const filteredShops = shops.filter((shop) =>
    shop.shop_name.toLowerCase().includes(search.toLowerCase()) ||
    shop.contact_number?.toString().includes(search.toString())
  );
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Welcome {user.name}</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search school or shop..."
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {user.SchoolProfile && (
        <Link
              href="details?role=school"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {lang[DefaultLang].add_school}
            </Link>
            
          )}
          {user.ShopProfile && (
            <Link
              href="details?role=shop"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add Shop
            </Link>
          )}
          
        
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4"
            >
              {/* <h2 className="text-lg font-semibold mb-2">School</h2> */}
              <div className="mb-3">
                {school.image ? (
                  <img
                    src={`/storage/${school.image}`}
                    className="h-32 w-full object-cover rounded mb-2"
                    alt={`${school.school_name}`}
                  />
                ) : (
                  <div className="h-32 w-full bg-gray-200 rounded mb-2 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <p>School Name: {school.school_name}</p>
                <p>Address: {school.address}</p>
                <p>Contact Number: {school.contact_number}</p>
                {user.role === constant.SCHOOL && (
          <div className="flex gap-2">
            {user.SchoolProfile && (
              <Link
                href={`details/${school.id}/edit`}
                className="rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
              >
                Edit School
              </Link>
            )}
            <Button
              type="button"
              variant="destructive"
              disabled={processing}
              onClick={() => {
                if (confirm('Are you sure you want to delete this profile?')) {
                  kill(route('details.destroy', school.id));
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {processing ? <LoaderCircle className="animate-spin" /> : 'Delete'}
            </Button>

          </div>
        )}
              </div>
            </div>
          ))}
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4"
            >
              <h2 className="text-lg font-semibold mb-2">Shop</h2>
              <div className="mb-3">
                <img
                  src={`/storage/${shop.image}`}
                  className="h-32 w-full object-cover rounded mb-2"
                  alt={`${shop.shop_name}`}
                />
                <p>Shop Name: {shop.shop_name}</p>
                <p>Address: {shop.address}</p>
                <p>Contact Number: {shop.contact_number}</p>
                {user.role === constant.SHOP && (
                  <div className="flex gap-2">
                    {user.ShopProfile && (
                      <Link
                        href={`details/${user.ShopProfile.id}/edit`}
                        className="rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                      >
                        Edit Shop
                      </Link>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={processing}
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this profile?')) {
                          kill(route('details.destroy', shop.id));
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {processing ? <LoaderCircle className="animate-spin" /> : 'Delete'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

        