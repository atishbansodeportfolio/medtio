export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white dark:from-teal-950/20 dark:to-background -z-10" />
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          Find the Best <span className="text-teal-600">Doctors, Clinics & Hospitals</span> in India
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Compare ratings, specialties, and book appointments step by step.
        </p>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-2 md:p-3 rounded-2xl md:rounded-full shadow-lg flex flex-col md:flex-row items-center gap-2 border border-gray-100 dark:border-gray-700">
          <div className="flex-1 w-full flex items-center px-4 py-1 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700">
            <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="City (e.g., Mumbai, Delhi)" 
              className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white outline-none py-2"
            />
          </div>
          <div className="flex-1 w-full flex items-center px-4 py-1">
            <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Specialty, Doctor, or Hospital" 
              className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white outline-none py-2"
            />
          </div>
          <button className="w-full md:w-auto mt-2 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-xl md:rounded-full transition-colors duration-200 shadow-md whitespace-nowrap">
            Search
          </button>
        </div>
      </div>
    </section>
  )
}
