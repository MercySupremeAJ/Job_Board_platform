// ============================================================
// AfriHire — ProfilePage
// ============================================================

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/layout/DashboardLayout';
import CandidateProfile from '../components/profile/CandidateProfile';
import CompanyProfile from '../components/profile/CompanyProfile';

const ProfilePage = () => {
  const { isCandidate, isCompany } = useAuth();

  return (
    <DashboardLayout>
      {isCandidate && <CandidateProfile />}
      {isCompany && <CompanyProfile />}
    </DashboardLayout>
  );
};

export default ProfilePage;
