import React from 'react';
interface SchoolProfile {
  reg_no: string;
  affiliation?: string;
  level?: string;
  address?: string;
}
interface ShopProfile {
  shop_type: string;
  address?: string;
}
interface ParentProfile {
  student_name: string;
  student_class: string;
  student_age: string;
}
interface User {
  name: string;
  role: 'school' | 'shopkeeper' | 'parent';
  schoolProfile?: SchoolProfile;
  shopProfile?: ShopProfile;
  parentProfile?: ParentProfile;
}
interface DashboardProps {
  user: User;
}
export default function Dashboard({ user }: DashboardProps) {
  const { name, role, schoolProfile, shopProfile, parentProfile } = user;
  console.log("Dashboard user prop:", user); // Debug log
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Welcome, {name}</h1>
      <p className="mb-4">Role: {role}</p>
      {role === 'school' && schoolProfile && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">School Profile</h2>
          <p>Registration No: {schoolProfile.reg_no}</p>
          <p>Affiliation: {schoolProfile.affiliation || 'N/A'}</p>
          <p>Level: {schoolProfile.level || 'N/A'}</p>
          <p>Address: {schoolProfile.address || 'N/A'}</p>
        </div>
      )}
      {role === 'shopkeeper' && shopProfile && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Shop Profile</h2>
          <p>Shop Type: {shopProfile.shop_type}</p>
          <p>Address: {shopProfile.address || 'N/A'}</p>
        </div>
      )}
      {role === 'parent' && parentProfile && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Parent Profile</h2>
          <p>Student Name: {parentProfile.student_name}</p>
          <p>Student Class: {parentProfile.student_class}</p>
          <p>Student Age: {parentProfile.student_age}</p>
        </div>
      )}
      {!['school', 'shopkeeper', 'parent'].includes(role) && (
        <p>Your role does not have a dashboard yet.</p>
      )}
    </div>
  );
}
