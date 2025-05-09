'use client';

import React from 'react';
import Image from 'next/image';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Doctor } from '@/lib/constant';

type DoctorCardProps = {
  doctor: Doctor;
};

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row">
        {/* Doctor Info */}
        <div className="p-4 flex flex-1">
          <div className="mr-4 flex-shrink-0">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-md relative overflow-hidden">
              <Image
                src={doctor?.image || 'https://via.placeholder.com/100x100.png?text=Doctor'}
                alt={doctor?.name || 'Doctor'}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <h3 className="text-lg font-medium">{doctor.name}</h3>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs text-blue-600">
                Pro
              </span>
            </div>
            <p className="text-gray-600 text-sm">{doctor.specialty}</p>

            <div className="mt-1 flex items-center space-x-2 text-xs font-medium uppercase text-gray-500">
              <span>{doctor.experience} YEARS</span>
              <span>•</span>
              <span>{doctor.qualification}</span>
            </div>

            <p className="mt-1 text-sm text-gray-500">{doctor.location}</p>

            {/* Languages */}
            {doctor.languages && doctor.languages.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                <span className="font-medium text-gray-700">Languages:</span>{' '}
                {doctor.languages.join(', ')}
              </p>
            )}

            {/* Hospital Info */}
            <div className="mt-2 text-sm">
              <div>
                {doctor.hospital ? (
                  <p className="text-gray-600">
                    {doctor.hospital} - {doctor.state}, {doctor.location}
                  </p>
                ) : (
                  <p className="text-gray-600">Virtual Clinic - {doctor.state}</p>
                )}
              </div>
              <div className="mt-1 flex items-center">
                <ThumbsUp className="h-4 w-4 text-green-600" />
                <span className="ml-1 text-green-600 font-medium">
                  {doctor.rating ? Math.floor(doctor.rating * 10) : 94}%
                </span>
                <span className="ml-1 text-gray-500">
                  ({doctor.totalRatings || Math.floor(Math.random() * 100) + 50}+ Patients)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="p-4 md:w-60 bg-gray-50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold">₹{doctor.consultationFee}</span>
            </div>
            <div className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-xs text-orange-600">₹</span>
              </div>
              <span className="ml-1 text-xs text-orange-600">
                {Math.floor(doctor.consultationFee * 0.15)} Cashback
              </span>
            </div>
          </div>

          <Button className="mt-4 w-full" variant="outline">
            Show Doctors Near Me
          </Button>

          <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white">
            Consult Online
            <span className="ml-1 text-[0.6rem] opacity-80">
              Available in {Math.floor(Math.random() * 2) + 1} minutes
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
