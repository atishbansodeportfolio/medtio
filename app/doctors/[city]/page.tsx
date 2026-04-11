import { supabase } from '@/lib/supabase';
import DoctorComparisonTable from '@/components/DoctorComparisonTable';
import DoctorProfileGrid from '@/components/DoctorProfileGrid';
import FAQAccordion from '@/components/FAQAccordion';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const displayCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  
  return {
    title: `Top 10 IVF Doctors in ${displayCity} | Best Fertility Specialists`,
    description: `Find the top 10 best IVF doctors and fertility specialists in ${displayCity}. Compare experience, ratings, qualifications, and clinics to make an informed decision for your parenthood journey.`,
  };
}

export default async function IVFDoctorsCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const displayCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  
  const { data: doctors } = await supabase
    .from('doctors')
    .select('*')
    .eq('specialty_slug', 'ivf')
    .eq('city_slug', city.toLowerCase())
    .order('rating', { ascending: false })
    .limit(10);

  if (!doctors || doctors.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 mt-10">
              Top 10 IVF Doctors in <span className="text-teal-600 dark:text-teal-400">{displayCity}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Finding the right fertility specialist is one of the most important steps in your parenthood journey. We have carefully curated a list of the top-rated IVF doctors in {displayCity} with proven success, extensive experience, and outstanding patient reviews. Compare their qualifications, associated clinics, and expertise to find the right partner for your treatment.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Comparison Table Section */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-teal-500 pl-4">
          Quick Comparison
        </h2>
        <DoctorComparisonTable doctors={doctors || []} />

        {/* Detailed Profiles Section */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-blue-500 pl-4">
          Detailed Doctor Profiles
        </h2>
        <DoctorProfileGrid doctors={doctors || []} />

        {/* Why Choose Section */}
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-8 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose these IVF Doctors in {displayCity}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-teal-600 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Experienced Specialists</h3>
              <p className="text-gray-600 dark:text-gray-400">Consult highly documented professionals with decades of clinical experience in advanced reproductive treatments.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-teal-600 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">High Success Rates</h3>
              <p className="text-gray-600 dark:text-gray-400">Our listed doctors consistently maintain superior clinical pregnancy rates through optimized protocols.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-teal-600 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Advanced IVF Technology</h3>
              <p className="text-gray-600 dark:text-gray-400">Partnered with clinics equipped with the latest embryology and genetic screening technologies.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-teal-600 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Personalized Treatment Plans</h3>
              <p className="text-gray-600 dark:text-gray-400">Each patient receives a customized ovarian stimulation protocol aligned with their specific diagnosis profile.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-teal-600 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Multiple Clinic Locations</h3>
              <p className="text-gray-600 dark:text-gray-400">Convenient access to top-tier fertility specialists through various accessible clinic locations across {displayCity}.</p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center pb-2">
            Frequently Asked Questions
          </h2>
          <FAQAccordion 
            faqs={[
              {
                question: `Who is the best IVF doctor in ${displayCity}?`,
                answer: `The "best" doctor depends on your individual diagnosis, budget, and specific medical history. The top-rated specialists listed above are renowned for exceptional success rates and specialized care in ${displayCity}. It is highly recommended to consult a few doctors to determine who makes you feel the most comfortable and confident.`
              },
              {
                question: `What is the average success rate of IVF in ${displayCity}?`,
                answer: `Success rates for IVF in ${displayCity} vary based on maternal age and underlying health factors. While global averages sit around 40-50% for standard cycles in women under 35, the expert specialists referenced here often exceed these figures by applying personalized and advanced clinical protocols.`
              },
              {
                question: `How much does IVF cost in ${displayCity}?`,
                answer: `Depending on the clinic and required medication, a standard IVF cycle ranges between ₹1,20,000 and ₹2,50,000. Some cases may additionally necessitate ICSI, laser-assisted hatching, or genomic screenings which could increment the overall expense.`
              },
              {
                question: `How to choose the right IVF doctor?`,
                answer: `Look for board certification, extensive clinical experience (preferably 10+ years), a high transparency profile regarding success rates and potential costs, supportive clinic infrastructure (advanced embryology lab), and most importantly, an empathetic communication style during consultation.`
              },
              {
                question: `When should I consult an IVF specialist?`,
                answer: `It's recommended to consult a specialist if you haven't conceived after one year of regular unprotected intercourse if you are under 35, or after 6 months if you are over 35. You should also consult earlier if there are known fertility risk factors like PCOS, severe endometriosis, or male factor infertility.`
              }
            ]} 
          />
        </div>
      </section>
    </div>
  );
}
