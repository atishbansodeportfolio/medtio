import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // IVF Redirects
      { source: '/ivf', destination: '/ivf-clinics', permanent: true },
      { source: '/ivf/:city', destination: '/ivf-clinics/:city', permanent: true },
      
      // Gynecology Redirects
      { source: '/gynecology', destination: '/gynecology-clinics', permanent: true },
      { source: '/gynecology/:city', destination: '/gynecology-clinics/:city', permanent: true },
      
      // Legacy Clinic/Doctor Slug Redirects (Defaulting to IVF as primary)
      { source: '/clinic/:slug', destination: '/ivf-clinics/:slug', permanent: true },
      { source: '/doctor/:slug', destination: '/ivf-doctors/:slug', permanent: true },
      
      // Doctors List Redirects
      { source: '/doctors', destination: '/ivf-doctors', permanent: true },
      { source: '/doctors/:city', destination: '/ivf-doctors/:city', permanent: true },
    ];
  },
};

export default nextConfig;
