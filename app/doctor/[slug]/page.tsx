import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import DoctorProfileGrid from '@/components/DoctorProfileGrid';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: doctor } = await supabase
    .from('doctors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!doctor) {
    return {
      title: 'Doctor Not Found',
      description: 'The requested doctor could not be found.',
    };
  }

  const displayCity = doctor.city ? doctor.city : '';

  return {
    title: `${doctor.name} – IVF Specialist in ${displayCity}`,
    description: `View profile of ${doctor.name}, IVF specialist in ${displayCity}. Check experience, clinic, rating, and consultation details.`,
  };
}

export default async function DoctorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: doctor } = await supabase
    .from('doctors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!doctor) {
    notFound();
  }

  // Fetch related doctors
  const { data: relatedDoctors } = await supabase
    .from('doctors')
    .select('*')
    .eq('city_slug', doctor.city_slug)
    .eq('specialty_slug', doctor.specialty_slug)
    .neq('id', doctor.id)
    .limit(3);

  const displayCity = doctor.city || '';
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-32 lg:pb-20">
      {/* Doctor Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mt-10">
            <div className="max-w-3xl flex-1 flex flex-col md:flex-row gap-8 items-start">
              
              {/* Doctor Avatar */}
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-full bg-teal-50 dark:bg-gray-700 overflow-hidden flex items-center justify-center border-4 border-teal-100 dark:border-teal-900/50 shadow-md">
                {doctor.image_url ? (
                  <img src={doctor.image_url} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-teal-200 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>

              {/* Doctor Intro Info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3 break-words">
                  {doctor.name}
                </h1>
                <p className="text-xl text-teal-600 dark:text-teal-400 font-semibold mb-4">
                  {doctor.qualification || 'IVF Specialist'}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex items-center flex-wrap gap-2 text-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {doctor.clinic_name ? `${doctor.clinic_name}, ` : ''}{displayCity}
                </p>

                {/* Stats Grid */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 min-w-[120px]">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Experience</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {doctor.experience_years ? `${doctor.experience_years} yrs` : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 min-w-[120px]">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Rating</div>
                    <div className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                      {doctor.rating || 'N/A'}
                      <svg className="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Action Card */}
            <div className="hidden lg:block lg:w-80 flex-shrink-0 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Doctor</h3>
              <div className="space-y-4">
                <a 
                  href="#call" 
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Clinic
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
                  href={`/ivf/${doctor.city_slug}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold rounded-xl transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  View Clinic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Doctor */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-teal-500 pl-4">
                About {doctor.name}
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                  <strong>{doctor.name}</strong> is a highly respected reproductive medicine and IVF specialist operating in {displayCity}. Providing empathetic, patient-centered consultations, they have gathered over {doctor.experience_years ? doctor.experience_years : "a decade"} of extensive clinical expertise driving successful fertility outcomes for hundreds of families.
                </p>
                <p>
                  Their professional practice primarily focuses on personalized ovarian stimulation, complex infertility cases, and adopting the latest assisted reproductive technologies securely housed under {doctor.clinic_name || 'an advanced embryology laboratory'}.
                </p>
              </div>
            </div>

            {/* Key Details Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-blue-500 pl-4">
                Key Details
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                  <div className="p-6 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Experience</span>
                    <span className="font-bold text-gray-900 dark:text-white">{doctor.experience_years ? `${doctor.experience_years} Years` : 'N/A'}</span>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Qualification</span>
                    <span className="font-bold text-gray-900 dark:text-white">{doctor.qualification || 'N/A'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700 border-t border-gray-100 dark:border-gray-700">
                  <div className="p-6 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Consultation Fee</span>
                    <span className="font-bold text-gray-900 dark:text-white">{doctor.consultation_fee ? `₹${doctor.consultation_fee}` : 'On Request'}</span>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">City</span>
                    <span className="font-bold text-gray-900 dark:text-white">{displayCity}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-700 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                   <div className="p-6 flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Primary Clinic</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400 text-right">{doctor.clinic_name || 'N/A'}</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Why Choose This Doctor */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-teal-500 pl-4">
                Why Choose {doctor.name}?
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-teal-600 shadow-sm border border-teal-100 dark:border-teal-800">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Experienced IVF Specialist</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">In-depth specialized training with years of dedicated reproductive protocol management.</p>
                  </div>
                </div>
                
                <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-teal-600 shadow-sm border border-teal-100 dark:border-teal-800">
                     <span className="font-bold text-sm">%</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">High Success Rates</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Strives for superior embryo grading and implantation success using targeted medication.</p>
                  </div>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-teal-600 shadow-sm border border-teal-100 dark:border-teal-800">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Personalized Treatment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Approaches infertility compassionately, tailoring every cycle precisely to the patient's biological markers.</p>
                  </div>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-teal-600 shadow-sm border border-teal-100 dark:border-teal-800">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Trusted Clinic Association</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Operating out of {doctor.clinic_name || 'an elite lab'}, heavily audited for ethical standards and technological capabilities.</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Related Doctors Section */}
        {relatedDoctors && relatedDoctors.length > 0 && (
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-blue-500 pl-4">
              Related Doctors in {displayCity}
            </h2>
            <DoctorProfileGrid doctors={relatedDoctors} />
          </div>
        )}

        {/* FAQs */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center pb-2">
            Frequently Asked Questions
          </h2>
          <FAQAccordion 
            faqs={[
              {
                question: `Who is ${doctor.name}?`,
                answer: `${doctor.name} is a highly reputed medical professional operating in ${displayCity}, specifically specializing in reproductive medicine and IVF pathways for couples encountering fertility challenges.`
              },
              {
                question: `How many years of experience does the doctor have?`,
                answer: `This specialist holds extensively documented clinical exposure amounting to over ${doctor.experience_years ? doctor.experience_years : "a decade"} years of primary focus in their respective field.`
              },
              {
                question: `What is the consultation fee?`,
                answer: `Initial fertility consultations for ${doctor.name} ${doctor.consultation_fee ? `generally start around ₹${doctor.consultation_fee}` : 'are priced on request'}. Please contact the clinic physically to verify current scheduling fees.`
              },
              {
                question: `Which clinic is this doctor associated with?`,
                answer: `They practice dominantly out of ${doctor.clinic_name || 'their associated private fertility group'}, taking complete advantage of its world-class modular embryology environment.`
              }
            ]} 
          />
        </div>
      </section>

      {/* Mobile Sticky Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-safe flex gap-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <a 
          href="#call" 
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
