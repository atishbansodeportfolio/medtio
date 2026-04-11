import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import ComparisonTable from '@/components/ComparisonTable';
import ClinicProfileCarousel from '@/components/ClinicProfileCarousel';

// List of known city slugs
const KNOWN_CITIES = ['mumbai', 'pune', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 'ahmedabad'];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const isCity = KNOWN_CITIES.includes(slug.toLowerCase());

  if (isCity) {
    const displayCity = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
    return {
      title: `Top 10 IVF Clinics in ${displayCity} | Compare Cost, Success Rate`,
      description: `Compare the top 10 best IVF clinics and fertility centers in ${displayCity}. Read reviews, check success rates, and find the right fertility center.`,
    };
  }

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('slug', slug)
    .eq('specialty_slug', 'ivf')
    .single();

  if (clinic) {
    const displayCity = clinic.city || '';
    return {
      title: `${clinic.name} in ${displayCity} | Best IVF Clinic Details`,
      description: `Complete details of ${clinic.name} in ${displayCity} including success rate, cost, doctors, and contact info.`,
    };
  }

  return {
    title: 'Not Found | Medtio',
    description: 'The requested page could not be found.',
  };
}

export default async function IVFClinicsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Try Fetching as City
  const { data: clinics } = await supabase
    .from('clinics')
    .select('*')
    .eq('specialty_slug', 'ivf')
    .eq('city_slug', slug.toLowerCase())
    .order('rating', { ascending: false })
    .limit(10);

  if (clinics && clinics.length > 0) {
    const displayCity = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 mt-10">
                Top 10 IVF Clinics in <span className="text-teal-600 dark:text-teal-400">{displayCity}</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Looking for the best fertility treatments in {displayCity}? Compare the top-rated IVF clinics to help you make an informed decision for your parenthood journey.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-teal-500 pl-4">
            Quick Comparison
          </h2>
          <ComparisonTable clinics={clinics} />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-blue-500 pl-4">
            Detailed Clinic Profiles
          </h2>
          <ClinicProfileCarousel clinics={clinics} displayCity={displayCity} />

          <div className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Choose these Clinics in <span className="text-teal-600">{displayCity}</span>?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">High Success Rates</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Selected clinics boast industry-leading success rates, utilizing advanced ART and specialized custom treatments.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">State-of-the-Art Labs</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  These facilities feature modern embryology labs offering advanced procedures like ICSI, IMSI, and PGS/PGD.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Expert Fertility Specialists</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Consult with highly experienced IVF specialists and embryologists dedicated to realizing your parenthood dreams.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Frequently Asked Questions</h2>
            <FAQAccordion 
              faqs={[
                {
                  question: `Which IVF clinic is best in ${displayCity}?`,
                  answer: `The "best" clinic often depends on your specific medical condition and budget. However, clinics ranked highly on our list in ${displayCity} have consistent track records of superior success rates, excellent patient reviews, and advanced lab facilities. We recommend consulting with top 2-3 centers before making a decision.`
                },
                {
                  question: `What is the IVF cost in ${displayCity}?`,
                  answer: `The cost of a single IVF cycle in ${displayCity} typically ranges from ₹1,20,000 to ₹2,50,000. This could vary depending on the clinic's reputation, necessary additional procedures (like ICSI or genetic testing), medication requirements, and your specific diagnosis. Many clinics offer EMI packages to help manage the costs.`
                },
                {
                  question: `What is the overall success rate of IVF treatments?`,
                  answer: `Success rates vary mainly based on the mother's age and health conditions. Generally, for women under 35, the success rate for a single IVF cycle is around 40-50%. Advanced clinics with highly monitored labs in ${displayCity} might exhibit slightly higher success rates compared to national averages due to employing the latest techniques.`
                }
              ]} 
            />
          </div>
        </section>
      </div>
    );
  }

  // 2. Try Fetching as Clinic Detail
  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('slug', slug)
    .eq('specialty_slug', 'ivf')
    .single();

  if (!clinic) {
    notFound();
  }

  const displayCity = clinic.city || '';
  const displayArea = clinic.address || '';
  const hasPhone = !!clinic.phone;
  const phoneHref = hasPhone ? `tel:${clinic.phone}` : '#';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-32 lg:pb-20">
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
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{clinic.cost_range || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Success</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{clinic.success_rate || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Doctors</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{clinic.doctors_count || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Experience</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{clinic.experience_years ? `${clinic.experience_years} yrs` : 'N/A'}</div>
                </div>
              </div>
            </div>

            <div className="lg:w-80 flex-shrink-0 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Clinic</h3>
              <div className="space-y-4">
                <a href={phoneHref} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-sm">
                  <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-bold rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
                <Link href={`/ivf-clinics/${clinic.city_slug}`} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold rounded-xl transition-colors border border-gray-200 dark:border-gray-600 text-sm">
                   Compare Clinics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-teal-500 pl-4">
              About {clinic.name}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
              <p>
                Established as a center of excellence in reproductive medicine, <strong>{clinic.name}</strong> provides comprehensive patient-centric care using evidence-based protocols. Located centrally in {displayCity}, the clinic brings together advanced embryology technologies underneath expert fertility specialists with over {clinic.experience_years || '10'} years of clinical experience.
              </p>
              <p>
                They understand that the parenthood journey can be challenging, offering personalized infertility treatment plans encompassing IUI, IVF, ICSI, and genetic screening options. Their team ensures ethical transparent pricing and maintains highly audited laboratories contributing to their reputed success rates.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-blue-500 pl-4">
              Key Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 text-teal-600">
                  %
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">High Success Rate</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Maintaining a robust clinical pregnancy rate of {clinic.success_rate || '70-75%'} across all age groups.</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Transparent Pricing</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cost range generally between {clinic.cost_range || 'N/A'} with customized financial packages available.</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 text-purple-600">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Experienced Doctors</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Led by a team of {clinic.doctors_count || 'several'} expert specialists dedicated to reproductive medicine.</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 text-orange-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Location Advantage</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Centrally situated in {displayCity}, ensuring highly accessible follow-up consultation visits.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-teal-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-3xl font-extrabold mb-4">Still deciding?</h3>
               <p className="text-teal-50 text-xl mb-8 opacity-90">See how {clinic.name} stacks up against other top-rated fertility centers in {displayCity}.</p>
               <Link href={`/ivf-clinics/${clinic.city_slug}`} className="inline-block bg-white text-teal-600 font-bold py-4 px-8 rounded-2xl hover:bg-teal-50 transition-colors shadow-lg">
                 Compare with other IVF clinics in {displayCity}
               </Link>
             </div>
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-teal-500 rounded-full opacity-20 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-teal-400 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">Frequently Asked Questions about {clinic.name}</h2>
            <FAQAccordion 
                faqs={[
                  {
                    question: `What is the success rate at ${clinic.name}?`,
                    answer: `${clinic.name} maintains a robust clinical pregnancy rate of ${clinic.success_rate || 'high percentage'} across various age groups, utilizing optimized protocols and advanced lab monitoring.`
                  },
                  {
                    question: `What does IVF treatment cost at ${clinic.name}?`,
                    answer: `The treatment cost generally ranges from ${clinic.cost_range || 'a competitive range'}, depending on specific medical diagnosis and additional laboratory procedures required.`
                  },
                  {
                    question: `Where is the clinic located?`,
                    answer: `The clinic is centrally located in ${clinic.address ? clinic.address + ', ' : ''}${displayCity}, making it highly accessible for patients across the city.`
                  },
                  {
                    question: `Who is this clinic best for?`,
                    answer: `This fertility center is best tailored for couples facing prolonged conception difficulties wanting comprehensive diagnostics alongside established specialist attention. With experienced specialists continuously consulting, it caters effectively to complex IVF and tailored diagnostic necessities.`
                  }
                ]} 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
