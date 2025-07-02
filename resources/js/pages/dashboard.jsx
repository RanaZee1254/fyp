import React from 'react';
export default function Dashboard({ user }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="mb-4">Role: {user.role}</p>
      {/* Render role-specific content */}
      {user.role === 'school' && user.schoolProfile && (
        <div>
          <h2 className="text-xl font-semibold mb-2">School Profile</h2>
          <p>Registration No: {user.schoolProfile.reg_no}</p>
          <p>Affiliation: {user.schoolProfile.affiliation || 'N/A'}</p>
          <p>Level: {user.schoolProfile.level || 'N/A'}</p>
          <p>Address: {user.schoolProfile.address || 'N/A'}</p>
        </div>
      )}
      {user.role === 'shopkeeper' && user.shopProfile && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Shop Profile</h2>
          <p>Shop Type: {user.shopProfile.shop_type}</p>
          <p>Address: {user.shopProfile.address || 'N/A'}</p>
        </div>
      )}
      {user.role === 'parent' && user.parentProfile && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Parent Profile</h2>
          <p>Student Name: {user.parentProfile.student_name}</p>
          <p>Student Class: {user.parentProfile.student_class}</p>
          <p>Student Age: {user.parentProfile.student_age}</p>
        </div>
      )}
      {/* Fallback if no role matched */}
      {!['school', 'shopkeeper', 'parent'].includes(user.role) && (
        <p>Your role does not have a dashboard yet.</p>
      )}
    </div>
  );
}
