import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import {type ShopProfile,type BreadcrumbItem} from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];
interface User {
  name: string;
   Contact_Number:string;
  image:string;
  role: 'school' | 'shopkeeper' | 'parent';
  ShopProfile?: ShopProfile;
}
interface UserData {
  auth: {
    user: User;
  };
}
console.log(UserInfo)
export default function Dashboard({ auth }: UserData) {
  const { user } = auth;
  console.log(user);
  console.log('Loading component:',Dashboard);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Dashboard`} />
      <h1>Welcome {user.name}</h1>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              <div>
              {user.Contact_Number}</div>
              <div>
              <img src={`/storage/${user.image}`} alt="Profile image" /></div>
              </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <p>Shop Type: {user.ShopProfile?.name}</p>
                     </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
               </div>
         </div>
         </div>
    </AppLayout>
  );
}