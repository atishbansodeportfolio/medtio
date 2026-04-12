const FEATURES = [
  {
    title: 'Verified Listings',
    description: 'Every doctor, clinic, and hospital is thoroughly vetted for quality and safety.',
    icon: (
      <svg className="w-6 h-6 text-teal-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Compare Ratings',
    description: 'Transparent data to help you make informed decisions about your care.',
    icon: (
      <svg className="w-6 h-6 text-teal-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: 'Multiple Specialties',
    description: 'Connect with India\'s leading medical specialists and practitioners.',
    icon: (
      <svg className="w-6 h-6 text-teal-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: 'Real Patient Reviews',
    description: 'Read genuine experiences and testimonials from fellow patients.',
    icon: (
      <svg className="w-6 h-6 text-teal-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white  border-t border-gray-100 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900  mb-4">Why Choose Medtio</h2>
          <p className="text-gray-600  max-w-2xl mx-auto text-lg">We simplify the process of finding the right healthcare by providing transparency, trusted reviews, and verified data.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto bg-teal-50  group-hover:bg-teal-100 :bg-teal-900/50 transition-colors rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900  mb-3">{feature.title}</h3>
              <p className="text-gray-600  leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
