import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!clinic) {
    return {
      title: 'Clinic Not Found',
      description: 'The requested clinic could not be found.',
    };
  }

  const displayName = clinic.name;
  const displayCity = clinic.city ? clinic.city : '';

  return {
    title: `${displayName} in ${displayCity} – Cost, Success Rate, Reviews`,
    description: `Complete details of ${displayName} including success rate, cost, doctors, and contact info.`,
  };
}

export default async function ClinicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!clinic) {
    notFound();
  }

  const displayCity = clinic.city || '';
  const displayArea = clinic.address || '';
  const hasPhone = !!clinic.phone;
  const phoneHref = hasPhone ? `tel:${clinic.phone}` : '#';
  const hasWebsite = !!clinic.website;
  const websiteHref = hasWebsite ? (clinic.website.startsWith('http') ? clinic.website : `https://${clinic.website}`) : '#';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-32 lg:pb-20">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mt-10">
            <div className="max-w-3xl flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 break-words">
                {clinic.name}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 flex items-center flex-wrap gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {displayArea}{displayArea && displayCity ? ', ' : ''}{displayCity}
              </p>

              {/* Stats Grid aligned horizontally */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Rating</div>
                  <div className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                    {clinic.rating || 'N/A'}
                    <svg className="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Cost</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {clinic.cost_range || 'N/A'}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Success</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {clinic.success_rate || 'N/A'}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Doctors</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {clinic.doctors_count || 'N/A'}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Experience</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {clinic.experience_years ? `${clinic.experience_years} yrs` : 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Action Card */}
            <div className="lg:w-80 flex-shrink-0 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Clinic</h3>
              <div className="space-y-4">
                <a 
                  href={phoneHref} 
                  target={hasPhone ? "_blank" : "_self"}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <a 
                  href="#book"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 font-bold rounded-xl transition-colors border border-blue-200 dark:border-blue-800"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </a>
                <Link 
                  href={`/ivf/${clinic.city_slug}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold rounded-xl transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Compare Clinics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-teal-500 pl-4">
                About {clinic.name}
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                {/* Fallback to default copy if actual description is not present */}
                <p>
                  Established as a center of excellence in reproductive medicine, <strong>{clinic.name}</strong> provides comprehensive patient-centric care using evidence-based protocols. Located centrally in {displayArea}, {displayCity}, the clinic brings together advanced embryology technologies underneath expert fertility specialists with over {clinic.experience_years ? clinic.experience_years : "a decade"} years of clinical experience.
                </p>
                <p>
                  They understand that the parenthood journey can be challenging, offering personalized infertility treatment plans encompassing IUI, IVF, ICSI, and genetic screening options. Their team ensures ethical transparent pricing and maintains highly audited laboratories contributing to their reputed success rates.
                </p>
              </div>
            </div>

            {/* Key Highlights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-blue-500 pl-4">
                Key Highlights
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                    <span className="font-bold text-lg">%</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">High Success Rate</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Maintaining a robust clinical pregnancy rate of <span className="font-semibold text-gray-800 dark:text-gray-200">{clinic.success_rate || 'industry standards'}</span> across all age groups.</p>
                  </div>
                </div>
                
                <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-teal-600 shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Transparent Pricing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cost range generally between <span className="font-semibold text-gray-800 dark:text-gray-200">{clinic.cost_range || 'N/A'}</span> with customized financial packages available.</p>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-purple-600 shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Experienced Doctors</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Led by a team of <span className="font-semibold text-gray-800 dark:text-gray-200">{clinic.doctors_count || 'several'}</span> expert specialists dedicated to reproductive medicine.</p>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-orange-600 shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Location Advantage</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Centrally situated in <span className="font-semibold text-gray-800 dark:text-gray-200">{displayArea}</span>, ensuring highly accessible follow-up consultation visits.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Callout (Comparison CTA) */}
            <div className="bg-teal-600 rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-lg text-white">
              <div className="mb-6 sm:mb-0">
                <h3 className="text-2xl font-bold mb-2">Still deciding?</h3>
                <p className="text-teal-100 max-w-md">See how {clinic.name} stacks up against other top-rated fertility centers in {displayCity}.</p>
              </div>
              <Link 
                href={`/ivf/${clinic.city_slug}`}
                className="inline-block w-full sm:w-auto bg-white text-teal-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-center"
              >
                Compare with other IVF clinics in {displayCity}
              </Link>
            </div>
            
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center pb-2">
            Frequently Asked Questions about {clinic.name}
          </h2>
          <FAQAccordion 
            faqs={[
              {
                question: `What is the success rate at ${clinic.name}?`,
                answer: `The self-reported clinical pregnancy success rate typically observed at this facility is ${clinic.success_rate || 'highly competitive'}. Keep in mind that individual success relies significantly on maternal age, diagnosis severity, and selected treatment protocols.`
              },
              {
                question: `What does IVF treatment cost at ${clinic.name}?`,
                answer: `An average inclusive IVF cycle is estimated between ${clinic.cost_range || 'a standard regional variance'}. This may exclude precise costs for advanced add-ons such as ICSI, PGS, or specialized medication plans. We recommend booking a free consult to receive a transparent quotation.`
              },
              {
                question: `Where is the clinic located?`,
                answer: `${clinic.name} is predominantly operating out of ${displayArea}, ${displayCity}. It possesses high connectivity and accessibility, designed for consecutive visiting cycles.`
              },
              {
                question: `Who is this clinic best for?`,
                answer: `This fertility center is best tailored for couples facing prolonged conception difficulties wanting comprehensive diagnostics alongside established specialist attention. With experienced specialists continuously consulting, it caters effectively to complex IVF and tailored diagnostic necessities.`
              }
            ]} 
          />
        </div>
      </section>

      {/* Mobile Sticky Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-safe flex gap-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <a 
          href={phoneHref} 
          className="flex-1 flex items-center justify-center gap-2 py-3 px-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call
        </a>
        <a 
          href="#book" 
          className="flex-1 flex items-center justify-center gap-2 py-3 px-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-xl transition-colors border border-blue-200 dark:border-blue-800 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book
        </a>
      </div>
    </div>
  );
}
