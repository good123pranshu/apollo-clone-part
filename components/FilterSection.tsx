'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { experienceRanges, feeRanges, languageOptions } from '@/lib/constant';

type FilterSectionProps = {
  filters: {
    consultationMode: string[];
    experience: string[];
    fees: string[];
    languages: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    consultationMode: string[];
    experience: string[];
    fees: string[];
    languages: string[];
  }>>;
};

const FilterSection = ({ filters, setFilters }: FilterSectionProps) => {
  const [showMoreLanguages, setShowMoreLanguages] = React.useState(false);

  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const newFilters = [...prev[type]];
      if (newFilters.includes(value)) {
        newFilters.splice(newFilters.indexOf(value), 1); // Remove the value
      } else {
        newFilters.push(value); // Add the value
      }

      return {
        ...prev,
        [type]: newFilters, // Update the respective filter
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      consultationMode: [],
      experience: [],
      fees: [],
      languages: [],
    });
  };

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-lg">Filters</h2>
        <Button
          variant="link"
          className="text-blue-600 p-0 h-auto"
          onClick={clearAllFilters}
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Mode of Consult */}
        <div>
          <h3 className="font-medium mb-3">Mode of Consult</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hospital"
                checked={filters.consultationMode.includes('Hospital')}
                onCheckedChange={() => handleFilterChange('consultationMode', 'Hospital')}
              />
              <label htmlFor="hospital" className="text-sm">Hospital Visit</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="online"
                checked={filters.consultationMode.includes('Online')}
                onCheckedChange={() => handleFilterChange('consultationMode', 'Online')}
              />
              <label htmlFor="online" className="text-sm">Online Consult</label>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="font-medium mb-3">Experience (In Years)</h3>
          <div className="space-y-2">
            {experienceRanges.map((range) => (
              <div key={range.label} className="flex items-center space-x-2">
                <Checkbox
                  id={`exp-${range.label}`}
                  checked={filters.experience.includes(range.label)}
                  onCheckedChange={() => handleFilterChange('experience', range.label)}
                />
                <label htmlFor={`exp-${range.label}`} className="text-sm">{range.label}</label>
              </div>
            ))}
          </div>
          <Button
            variant="link"
            className="text-blue-600 p-0 h-auto mt-2 flex items-center"
            onClick={() => {}}
          >
            +1 More
          </Button>
        </div>

        {/* Fees */}
        <div>
          <h3 className="font-medium mb-3">Fees (In Rupees)</h3>
          <div className="space-y-2">
            {feeRanges.map((range) => (
              <div key={range.label} className="flex items-center space-x-2">
                <Checkbox
                  id={`fee-${range.label}`}
                  checked={filters.fees.includes(range.label)}
                  onCheckedChange={() => handleFilterChange('fees', range.label)}
                />
                <label htmlFor={`fee-${range.label}`} className="text-sm">{range.label}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <h3 className="font-medium mb-3">Language</h3>
          <div className="space-y-2">
            {languageOptions.slice(0, showMoreLanguages ? languageOptions.length : 3).map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${language}`}
                  checked={filters.languages.includes(language)}
                  onCheckedChange={() => handleFilterChange('languages', language)}
                />
                <label htmlFor={`lang-${language}`} className="text-sm">{language}</label>
              </div>
            ))}
          </div>
          {languageOptions.length > 3 && (
            <Button
              variant="link"
              className="text-blue-600 p-0 h-auto mt-2 flex items-center"
              onClick={() => setShowMoreLanguages(!showMoreLanguages)}
            >
              {showMoreLanguages ? (
                <>Show Less <ChevronUp className="ml-1 h-3 w-3" /></>
              ) : (
                <>+{languageOptions.length - 3} More <ChevronDown className="ml-1 h-3 w-3" /></>
              )}
            </Button>
          )}
        </div>

        {/* Facility - UI Only */}
        <div>
          <h3 className="font-medium mb-3">Facility</h3>
          <div className="space-y-2 opacity-70">
            <div className="flex items-center space-x-2">
              <Checkbox id="facility-1" disabled />
              <label htmlFor="facility-1" className="text-sm">Apollo Hospitals</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="facility-2" disabled />
              <label htmlFor="facility-2" className="text-sm">Apollo Clinics</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
