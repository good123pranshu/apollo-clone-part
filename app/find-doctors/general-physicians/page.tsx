import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import DoctorListing from '@/components/DoctorListing';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Consult General Physicians Online | Apollo Health',
  description: 'Find and book appointments with experienced general physicians and internal medicine specialists online or in-person.',
  keywords: 'general physicians, internal medicine specialists, online doctor consultation, book doctor appointment',
};

const GeneralPhysiciansPage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Doctors', href: '/find-doctors' },
            { label: 'General Physicians', href: '/find-doctors/general-physicians' },
          ]}
        />
      </div>
      <DoctorListing />
    </>
  );
};

export default GeneralPhysiciansPage;