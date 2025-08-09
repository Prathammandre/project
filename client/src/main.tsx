import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AdminLayout } from './pages/admin/AdminLayout';
import { KycPage } from './pages/admin/KycPage';
import { HomePage } from './pages/HomePage';

function isAuthenticatedAdmin(): boolean {
  return localStorage.getItem('admin_token') === 'ok';
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticatedAdmin()) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'kyc', element: <KycPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);