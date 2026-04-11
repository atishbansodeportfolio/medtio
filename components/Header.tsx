import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
      <Link href="/" className="text-2xl font-bold text-teal-600 tracking-tight">Med<span className="text-gray-900 dark:text-white">tio</span></Link>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link href="/ivf/mumbai" className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors">All Clinics</Link>
        <Link href="/about" className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors">About Us</Link>
      </nav>
      <div>
        <button className="hidden md:block bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50 px-4 py-2 rounded-full font-medium transition-colors text-sm">
          For Clinics
        </button>
      </div>
    </header>
  )
}
