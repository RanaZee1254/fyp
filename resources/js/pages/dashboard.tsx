import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import { type User, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];
interface UserData {
  auth: {
    user: User;
  };

}
console.log(UserInfo)
export default function Dashboard({ auth }: UserData) {
  const { user } = auth;
  console.log(user);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Dashboard`} />
      <h1>Welcome {user.name}</h1>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                     <h2>School Profile:</h2><h3>{user.SchoolProfile?.affiliation}</h3>
                     {user.SchoolProfile ? (
              <ul>
                <li>School Name:{user.SchoolProfile.name}
                   Image: {typeof user.SchoolProfile.image === 'string'
                   ? user.SchoolProfile.image
                   : user.SchoolProfile.image?.name}
               </li>
                <p>Reg No: {user.SchoolProfile.reg_no}</p>
                <li>Affiliation: {user.SchoolProfile.affiliation}</li>
                <li>Level: {user.SchoolProfile.level}</li>
                <li>Address: {user.SchoolProfile.address}</li>
              </ul>
            ) : (
              <p>Details</p>
            )}</div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                     <h2>Shop Profile:</h2>
            {user.ShopProfile ? (
              <ul>
                 {user.ShopProfile.shop_type}
                <li>Affiliation: {user.ShopProfile.Address}</li>
                <li>Level: {user.ShopProfile.image}</li>
                <li>Address: {user.ShopProfile.Contact_Number}</li>
              </ul>
               ) : (
              <p>Details</p>
               )}</div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                  Image: {typeof user.image === 'string'
                   ? user.image
                   : user.image?.name}
                   {user.email}
                   <img src="https://ninistutor.com/wp-content/uploads/2021/05/school-in-lahore-1.jpg"></img>
                    </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              {user.ShopProfile?.Contact_Number}
              {user.name}
              {user.id}
              </div>
         </div>
      </div>
    </AppLayout>
  );
}