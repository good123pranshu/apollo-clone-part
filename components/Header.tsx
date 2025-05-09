'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [location, setLocation] = useState('Select Address');
  
  return (
    <header className="w-full border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <div className="relative flex items-center">
                <span className="text-2xl font-bold text-blue-600">Apollo</span>
                <div className="ml-1 flex h-8 w-12 items-center justify-center rounded bg-orange-500 text-white">
                  <span className="text-sm font-bold">24|7</span>
                </div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1 text-sm">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="mr-1">Select Location</span>
              <div className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
                <span>{location}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div className="relative flex-1 mx-4 hidden md:block max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input 
                type="search"
                placeholder="Search Doctors, Specialities, Conditions etc."
                className="w-full rounded-full border pl-10 pr-4 py-2 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="hidden md:flex items-center rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          </div>
        </div>
        
        <nav className="flex items-center overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-6 text-sm font-medium">
            <Link href="/buy-medicines" className="whitespace-nowrap py-2 text-gray-600 hover:text-blue-600">
              Buy Medicines
            </Link>
            <Link href="/find-doctors" className="whitespace-nowrap border-b-2 border-blue-600 py-2 text-blue-600">
              Find Doctors
            </Link>
            <Link href="/lab-tests" className="whitespace-nowrap py-2 text-gray-600 hover:text-blue-600">
              Lab Tests
            </Link>
            <Link href="/circle-membership" className="whitespace-nowrap py-2 text-gray-600 hover:text-blue-600">
              Circle Membership
            </Link>
            <Link href="/health-records" className="whitespace-nowrap py-2 text-gray-600 hover:text-blue-600">
              Health Records
            </Link>
            <Link href="/diabetes-reversal" className="whitespace-nowrap py-2 text-gray-600 hover:text-blue-600">
              Diabetes Reversal
            </Link>
            <div className="flex items-center whitespace-nowrap py-2 text-gray-600 hover:text-blue-600">
              <span>Buy Insurance</span>
              <span className="ml-1 rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-800">New</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;