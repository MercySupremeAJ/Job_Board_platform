// ============================================================
// AfriHire — ApplicationsPage
// Full application tracker (candidate) or pipeline (company)
// ============================================================

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/layout/DashboardLayout';
import ApplicationTracker from '../components/applications/ApplicationTracker';
import ApplicationList from '../components/applications/ApplicationList';

const ApplicationsPage = () => {
  const { isCandidate, isCompany } = useAuth();

  return (
    <DashboardLayout>
      {isCandidate && <ApplicationTracker />}
      {isCompany && <ApplicationList />}
    </DashboardLayout>
  );
};

export default ApplicationsPage;
