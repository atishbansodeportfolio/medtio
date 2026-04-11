import { supabase } from '@/lib/supabase';
import ClinicCard from '@/components/ClinicCard';
import ComparisonTable from '@/components/ComparisonTable';
import ClinicProfileCarousel from '@/components/ClinicProfileCarousel';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const displayCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  
  return {
    title: `Top 10 IVF Clinics in ${displayCity} | Compare Cost, Success Rate`,
    description: `Compare the top 10 best IVF clinics and fertility centers in ${displayCity}. Read reviews, check success rates, compare costs, and find the right fertility doctor for your journey.`,
  };
}

export default async function IVFClinicsCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const displayCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  
  const { data: clinics } = await supabase
    .from('clinics')
    .select('*')
    .eq('specialty_slug', 'ivf')
    .eq('city_slug', city.toLowerCase())
    .order('rating', { ascending: false })
    .limit(10);

  if (!clinics || clinics.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header & Intro Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 mt-10">
              Top 10 IVF Clinics in <span className="text-teal-600 dark:text-teal-400">{displayCity}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Struggling with infertility and looking for the best fertility treatments in {displayCity}? We have compiled a comprehensive comparison of the top-rated IVF clinics to help you make an informed decision. Browse through clinic ratings, contact information, areas, and select the right fertility center for your parenthood journey.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-teal-500 pl-4">
          Quick Comparison
        </h2>
        <ComparisonTable clinics={clinics || []} />

        {/* Detailed Cards Section */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-blue-500 pl-4">
          Detailed Clinic Profiles
        </h2>
        <ClinicProfileCarousel clinics={clinics || []} displayCity={displayCity} />

        {/* Why Choose Section */}
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-8 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose these Clinics in {displayCity}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-teal-600 mb-4 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">High Success Rates</h3>
              <p className="text-gray-600 dark:text-gray-400">Selected clinics boast industry-leading success rates, utilizing advanced ART and specialized custom treatments.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-teal-600 mb-4 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">State-of-the-Art Labs</h3>
              <p className="text-gray-600 dark:text-gray-400">These facilities feature modern embryology labs offering advanced procedures like ICSI, IMSI, and PGS/PGD.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-teal-600 mb-4 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Expert Fertility Specialists</h3>
              <p className="text-gray-600 dark:text-gray-400">Consult with highly experienced IVF specialists and embryologists dedicated to realizing your parenthood dreams.</p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center pb-2">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Which IVF clinic is best in {displayCity}?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                The "best" clinic often depends on your specific medical condition and budget. However, clinics ranked highly on our list have consistent track records of superior success rates, excellent patient reviews, and advanced lab facilities. We recommend consulting with top 2-3 centers before making a decision.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                What is the IVF cost in {displayCity}?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                The cost of a single IVF cycle in {displayCity} typically ranges from ₹1,20,000 to ₹2,50,000. This could vary depending on the clinic's reputation, necessary additional procedures (like ICSI or genetic testing), medication requirements, and your specific diagnosis. Many clinics offer EMI packages to help manage the costs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                What is the overall success rate of IVF treatments?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Success rates vary mainly based on the mother's age and health conditions. Generally, for women under 35, the success rate for a single IVF cycle is around 40-50%. Advanced clinics with highly monitored labs in {displayCity} might exhibit slightly higher success rates compared to national averages due to employing the latest techniques.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
