import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 md:gap-12 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="text-2xl font-bold text-teal-400 tracking-tight mb-4 inline-block">Med<span className="text-white">tio</span></Link>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            India's trusted directory for finding top doctors, clinics, and hospitals.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 lg:mb-6">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 lg:mb-6">Top Cities</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/ivf/mumbai" className="hover:text-teal-400 transition-colors">Mumbai</Link></li>
            <li><Link href="/ivf/delhi" className="hover:text-teal-400 transition-colors">Delhi</Link></li>
            <li><Link href="/ivf/bangalore" className="hover:text-teal-400 transition-colors">Bangalore</Link></li>
            <li><Link href="/ivf/pune" className="hover:text-teal-400 transition-colors">Pune</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 lg:mb-6">Are you a medical practice?</h4>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">Join our platform to reach more patients and showcase your expertise.</p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors w-full md:w-auto">
            List Your Practice
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Medtio. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 shadow-sm">
          {/* Social icons if needed can go here */}
        </div>
      </div>
    </footer>
  )
}
