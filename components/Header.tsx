"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full bg-white/0 md:bg-transparent transition-all">
        <Link href="/" className="text-2xl font-bold text-teal-600 tracking-tight">
          Med<span className="text-gray-900">tio</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/clinics" className="text-gray-600 hover:text-teal-600 transition-colors">Clinics</Link>
          <Link href="/doctors" className="text-gray-600 hover:text-teal-600 transition-colors">Doctors</Link>
          <Link href="/hospitals" className="text-gray-600 hover:text-teal-600 transition-colors">Hospitals</Link>
          <Link href="/about" className="text-gray-600 hover:text-teal-600 transition-colors">About</Link>
        </nav>
        
        <div className="hidden md:block">
          <button className="bg-orange-500 text-white hover:bg-orange-600 shadow-sm px-5 py-2.5 rounded-full font-medium transition-colors text-sm">
            List Your Practice
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 hover:text-teal-600 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute left-0 right-0 top-full">
          <nav className="flex flex-col px-6 py-6 space-y-4">
            <Link 
              href="/clinics" 
              className="text-gray-800 font-medium hover:text-teal-600 transition-colors" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clinics
            </Link>
            <Link 
              href="/doctors" 
              className="text-gray-800 font-medium hover:text-teal-600 transition-colors" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Doctors
            </Link>
            <Link 
              href="/hospitals" 
              className="text-gray-800 font-medium hover:text-teal-600 transition-colors" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hospitals
            </Link>
            <Link 
              href="/about" 
              className="text-gray-800 font-medium hover:text-teal-600 transition-colors" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <button className="bg-orange-500 text-white hover:bg-orange-600 shadow-sm px-4 py-3 rounded-xl font-medium transition-colors w-full mt-4">
              List Your Practice
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
