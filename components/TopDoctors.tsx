export default function TopDoctors() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Top Doctors</h2>
            <p className="text-gray-600 dark:text-gray-400">Consult with highly experienced medical professionals</p>
          </div>
          <button className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
            View All &rarr;
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder items */}
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 overflow-hidden flex items-center justify-center">
                 <svg className="w-12 h-12 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                 </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Dr. Expert Name</h3>
              <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-1">Cardiologist (Example)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">15 Years Experience</p>
              <button className="w-full bg-transparent border border-teal-600 outline-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 py-2 rounded-lg text-sm font-semibold transition-colors">
                Book Consult
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
