'use client';

import React, { useState, useEffect } from 'react';
import DoctorCard from '@/components/DoctorCard';
import FilterSection from '@/components/FilterSection';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { DoctorListResponse } from '@/lib/constant';

const DoctorListing = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [doctorData, setDoctorData] = useState<DoctorListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page

  const [filters, setFilters] = useState({
    consultationMode: [] as string[],
    experience: [] as string[],
    fees: [] as string[],
    languages: [] as string[],
  });

  // Update URL when filters or page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Clear existing filter params
    params.delete('consultationMode');
    params.delete('experience');
    params.delete('fees');
    params.delete('languages');
    params.delete('page'); // Ensure page is updated in URL

    // Add new filter params
    filters.consultationMode.forEach((mode) => params.append('consultationMode', mode));
    filters.experience.forEach((exp) => params.append('experience', exp));
    filters.fees.forEach((fee) => params.append('fees', fee));
    filters.languages.forEach((lang) => params.append('languages', lang));

    // Add sort params
    params.append('sortBy', sortBy);
    params.append('page', currentPage.toString()); // Append current page

    // Update URL without refreshing the page
    router.push(`${pathname}?${params.toString()}`);

    // Fetch filtered doctors with pagination
    fetchDoctors();
  }, [filters, sortBy, currentPage]);

  // Initialize filters from URL on component mount
  useEffect(() => {
    const initialFilters = {
      consultationMode: searchParams.getAll('consultationMode'),
      experience: searchParams.getAll('experience'),
      fees: searchParams.getAll('fees'),
      languages: searchParams.getAll('languages'),
    };

    setFilters(initialFilters);
    const page = parseInt(searchParams.get('page') || '1');
    setCurrentPage(page);
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      // Add filter params
      filters.consultationMode.forEach((mode) => params.append('consultationMode', mode));
      filters.experience.forEach((exp) => params.append('experience', exp));
      filters.fees.forEach((fee) => params.append('fees', fee));
      filters.languages.forEach((lang) => params.append('languages', lang));

      // Add sort params
      params.append('sortBy', sortBy);
      params.append('page', currentPage.toString()); // Include current page

      const response = await fetch(`/api/doctors?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch doctors');

      const data = await response.json();
      setDoctorData(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Section - Sidebar */}
        <div className="lg:w-1/4">
          <FilterSection filters={filters} setFilters={setFilters} />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                Consult General Physicians Online - Internal Medicine Specialists
              </h1>
            </div>

            <div className="mt-4 md:mt-0">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    <div className="flex items-center">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      {sortBy === 'relevance'
                        ? 'Relevance'
                        : sortBy === 'rating'
                        ? 'Highest Rating'
                        : sortBy === 'fees_low'
                        ? 'Fees: Low to High'
                        : 'Fees: High to Low'}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="fees_low">Fees: Low to High</SelectItem>
                  <SelectItem value="fees_high">Fees: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="space-y-4">
            {loading ? (
              // Loading state
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-4 animate-pulse">
                    <div className="flex">
                      <div className="h-20 w-20 rounded-md bg-gray-200"></div>
                      <div className="ml-4 flex-1">
                        <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                        <div className="mt-2 h-4 w-1/4 bg-gray-200 rounded"></div>
                        <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>
                        <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-40 h-full bg-gray-100 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {doctorData?.doctors && doctorData.doctors.length > 0 ? (
                  <>
                    {doctorData.doctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}

                    {/* Pagination */}
                    {doctorData.totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <div className="flex space-x-2">
                          {Array.from({ length: doctorData.totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={page === currentPage ? 'default' : 'outline'}
                              size="sm"
                              className={page === currentPage ? 'bg-blue-600' : ''}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No doctors found matching your criteria. Please try different filters.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
