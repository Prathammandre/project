import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <Link to="/admin/kyc">KYC Review</Link>
      </nav>
      <Outlet />
    </div>
  );
}