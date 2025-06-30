import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
interface School {
  name: string;
  campuses: string[];
  fees: Record<string, string>;
  address: string;
  contact: {
    phone: string;
    email: string;
  };
  established: number;
}
export default function SchoolDetail() {
  const { school } = usePage<{ school: School }>().props;
  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: school?.name ?? 'School Details', href: '#' },
  ];
  if (!school) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="School Not Found" />
        <div className="p-4 text-center text-red-600">School not found.</div>
      </AppLayout>
    );
  }
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={school.name} />
      <div className="p-4 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
        <h1 className="text-2xl font-bold mb-4">{school.name}</h1>
        <p className="mb-2"><strong>Established:</strong> {school.established}</p>
        <p className="mb-2"><strong>Address:</strong> {school.address}</p>
        <p className="mb-4">
          <strong>Contact:</strong> Phone: {school.contact.phone}, Email: {school.contact.email}
        </p>
        <h2 className="text-lg font-semibold mb-2">Campuses & Fees:</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          {school.campuses.map((campus, index) => (
            <li key={index}>
              {campus} — <span className="font-semibold">{school.fees[campus] || 'N/A'}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
