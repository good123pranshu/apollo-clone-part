import React from 'react';
import { redirect } from 'next/navigation';

// Redirect to the doctors page as the default landing page
export default function Home() {
  redirect('/find-doctors');
}