import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

// Define your schools data here with slug/route info for navigation
const schools = [
  {
    name: 'Allied School',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvCFZzASji8pKQ5YGzVUCe0cojjDwuRAV4JQ&s',
    route: '/schools/allied',
    campuses: ['Boys Campus', 'Girls Campus'],
  },
  {
    name: 'Govt Islamia School',
    image: 'https://thumbs.dreamstime.com/b/school-building-vector-illustration-83905184.jpg',
    route: '/schools/govt-islamia',
    campuses: ['Boys Campus', 'Girls Campus'],
  },
  {
    name: 'The Smart School',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQN4-Z-CGaf4RuQ__D1FYgwsu7Y5f2lfd8Xg&s',
    route: '/schools/the-smart',
    campuses: ['Boys Campus', 'Girls Campus'],
  },
  {
    name: 'The Educators',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE9ks0pkxhN6fIPGnWvtYqhtIorcwJL2x6A&s',
    route: '/schools/the-educators',
    campuses: ['Boys Campus', 'Girls Campus'],
  },
  {
    name: 'Shaheen Public School',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvCFZzASji8pKQ5YGzVUCe0cojjDwuRAV4JQ&s',
    route: '/schools/shaheen-public',
    campuses: ['Boys Campus', 'Girls Campus'],
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          {schools.map(({ name, image, route, campuses }) => (
            <div
              key={name}
              className="flex h-fit w-full flex-col md:flex-row items-center gap-4 p-4 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
            >
              <img
                src={image}
                alt={name}
                className="w-40 h-auto rounded-md object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{name}</h2>
                <ol className="list-decimal list-inside">
                    {campuses.map((campus) => (
                    <li key={campus}>{campus}</li>
                        ))}
                </ol>
                <button
                  onClick={() => router.visit(route)}
                  className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
