"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function ComparisonTable({ clinics }: { clinics: any[] }) {
  const [sortField, setSortField] = useState('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const extractNumber = (val: any) => {
    if (val == null) return -1;
    if (typeof val === 'number') return val;
    const match = String(val).match(/[\d.]+/);
    return match ? parseFloat(match[0]) : -1;
  };

  const sortedClinics = useMemo(() => {
    return [...clinics].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'success_rate' || sortField === 'cost_range' || sortField === 'experience_years' || sortField === 'doctors_count') {
        valA = extractNumber(valA);
        valB = extractNumber(valB);
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [clinics, sortField, sortOrder]);



  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <span className="text-gray-400 opacity-50 ml-1">↕</span>;
    return <span className="text-teal-600 dark:text-teal-400 ml-1 font-bold">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden overflow-x-auto mb-16">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <th className="p-4 font-semibold text-center w-16">Rank</th>
            <th className="p-4 font-semibold w-1/4">Clinic</th>
            <th 
              className="p-4 font-semibold text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => handleSort('rating')}
            >
              <div className="flex items-center justify-center select-none">Rating <SortIcon field="rating" /></div>
            </th>
            <th 
              className="p-4 font-semibold text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => handleSort('success_rate')}
            >
              <div className="flex items-center justify-center select-none">Success Rate <SortIcon field="success_rate" /></div>
            </th>
            <th 
              className="p-4 font-semibold text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => handleSort('cost_range')}
            >
              <div className="flex items-center justify-center select-none">Cost <SortIcon field="cost_range" /></div>
            </th>
            <th className="p-4 font-semibold text-center">Doctors</th>
            <th className="p-4 font-semibold text-center">Experience</th>
            <th className="p-4 font-semibold text-center">View</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedClinics?.map((clinic: any, index: number) => (
              <tr key={clinic.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/80">
                <td className="p-4 text-center">
                  <span className="font-bold text-gray-500 dark:text-gray-400">{index + 1}</span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col items-start justify-center">
                    <Link href={`/${clinic.specialty_slug || 'ivf'}-clinics/${clinic.slug || clinic.id}`} className="text-teal-600 dark:text-teal-400 font-bold hover:underline">
                      {clinic.name}
                    </Link>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-gray-900 dark:text-white mr-1">{clinic.rating || 'N/A'}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </td>
                <td className="p-4 text-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {clinic.success_rate ? `${clinic.success_rate}` : 'N/A'}
                </td>
                <td className="p-4 text-center text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {clinic.cost_range || 'N/A'}
                </td>
                <td className="p-4 text-center text-gray-900 dark:text-white font-medium">
                  {clinic.doctors_count || 'N/A'}
                </td>
                <td className="p-4 text-center text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {clinic.experience_years ? `${clinic.experience_years} yrs` : 'N/A'}
                </td>
                <td className="p-4 text-center">
                  <Link href={`/${clinic.specialty_slug || 'ivf'}-clinics/${clinic.slug || clinic.id}`} className="inline-block bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 font-semibold px-4 py-1.5 rounded-lg text-sm transition-colors border border-teal-100 dark:border-teal-800">
                    View
                  </Link>
                </td>
              </tr>
          ))}
          {(!clinics || clinics.length === 0) && (
            <tr>
              <td colSpan={8} className="p-8 text-center text-gray-500">
                No clinics found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
