// ============================================================
// AfriHire — Dashboard Layout Component
// Wrapper with sidebar + main content area
// ============================================================

import React, { useState } from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: 'calc(100vh - var(--navbar-height))',
        paddingTop: 'var(--navbar-height)',
        position: 'relative',
      }}
      className={sidebarOpen ? 'dashboard-layout sidebar-open' : 'dashboard-layout'}
    >
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <main
        style={{
          flex: 1,
          padding: 'var(--space-8)',
          maxWidth: 'calc(100% - var(--sidebar-width))',
          overflowX: 'hidden',
        }}
        className="dashboard-main"
      >
        <button
          type="button"
          className="dashboard-menu-toggle"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-expanded={sidebarOpen}
          aria-controls="dashboard-sidebar"
        >
          {sidebarOpen ? '✕ Close' : '☰ Menu'}
        </button>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
