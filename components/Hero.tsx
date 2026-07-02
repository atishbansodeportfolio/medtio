export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Find the Best <span className="text-teal-600">Doctors, Clinics & Hospitals</span> in India
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-xl">
              Compare ratings, specialties, and find top healthcare providers near you.
            </p>
            <div className="w-full bg-white p-2 md:p-3 rounded-2xl md:rounded-full shadow-lg flex flex-col md:flex-row items-center gap-2 border border-gray-100">
              <div className="flex-1 w-full flex items-center px-4 py-1">
                <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search doctors, hospitals, specialties, or cities..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-900 outline-none py-2"
                />
              </div>
              <button className="w-full md:w-auto mt-2 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-xl md:rounded-full transition-colors duration-200 shadow-md whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="hidden lg:block lg:col-span-5 relative w-full h-[450px]">
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/images/hero-medical.png" 
                alt="Medical Services" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
