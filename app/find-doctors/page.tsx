import React from 'react';
import { redirect } from 'next/navigation';

// Redirect to the general physicians page as the default
export default function DoctorsPage() {
  redirect('/find-doctors/general-physicians');
}