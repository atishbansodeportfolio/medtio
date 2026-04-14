import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import DoctorComparisonTable from '@/components/DoctorComparisonTable';
import DoctorProfileGrid from '@/components/DoctorProfileGrid';

const KNOWN_CITIES = ['mumbai', 'pune', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 'ahmedabad'];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const isCity = KNOWN_CITIES.includes(slug.toLowerCase());

  if (isCity) {
    const displayCity = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
    return {
      title: `Top 10 IVF Doctors in ${displayCity} | Best Fertility Specialists`,
      description: `Find the top 10 best IVF doctors and fertility specialists in ${displayCity}. Compare experience, ratings, and success.`,
    };
  }

  const { data: doctor } = await supabase
    .from('doctors')
    .select('*')
    .eq('slug', slug)
    .eq('specialty_slug', 'ivf')
    .single();

  if (doctor) {
    const displayCity = doctor.city || '';
    return {
      title: `${doctor.name} | Top IVF Specialist in ${displayCity}`,
      description: `Complete profile of ${doctor.name}, IVF specialist in ${displayCity}. Check experience and ratings.`,
    };
  }

  return {
    title: 'Not Found | Medtio',
    description: 'The requested page could not be found.',
  };
}

export default async function IVFDoctorsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Try Fetching as City
  const { data: doctors } = await supabase
    .from('doctors')
    .select('*')
    .eq('specialty_slug', 'ivf')
    .eq('city_slug', slug.toLowerCase())
    .order('rating', { ascending: false })
    .limit(10);

  if (doctors && doctors.length > 0) {
    const displayCity = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
    return (
      <div className="min-h-screen bg-gray-50  pb-20">
        <section className="bg-white  border-b border-gray-200  pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900  tracking-tight mb-6 mt-10">
                Top 10 IVF Doctors in <span className="text-teal-600 ">{displayCity}</span>
              </h1>
              <p className="text-sm text-gray-400 mb-8">Last Updated: 10th April 2026</p>
              <p className="text-lg text-gray-600  leading-relaxed mb-6">
                Find the right fertility specialist for your journey. Compare the top-rated IVF doctors in {displayCity}.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-8 border-l-4 border-teal-500 pl-4">
            Quick Comparison
          </h2>
          <DoctorComparisonTable doctors={doctors} />

          <h2 className="text-2xl font-bold text-gray-900  mb-8 border-l-4 border-blue-500 pl-4">
            Detailed Doctor Profiles
          </h2>
          <DoctorProfileGrid doctors={doctors} />

          <div className="mt-20 border-t border-gray-200  pt-16">
            <h2 className="text-3xl font-bold text-gray-900  mb-8 text-center">
              Why Choose these IVF Doctors in <span className="text-teal-600">{displayCity}</span>?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white  p-8 rounded-2xl shadow-sm border border-gray-100  hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 ">Experienced Specialists</h3>
                <p className="text-gray-600  leading-relaxed">
                  Consult highly documented professionals with decades of clinical experience in advanced reproductive treatments.
                </p>
              </div>
              <div className="bg-white  p-8 rounded-2xl shadow-sm border border-gray-100  hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 ">High Success Rates</h3>
                <p className="text-gray-600  leading-relaxed">
                  Our listed doctors consistently maintain superior clinical pregnancy rates through optimized protocols.
                </p>
              </div>
              <div className="bg-white  p-8 rounded-2xl shadow-sm border border-gray-100  hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 ">Advanced IVF Technology</h3>
                <p className="text-gray-600  leading-relaxed">
                  Partnered with clinics equipped with the latest embryology and genetic screening technologies.
                </p>
              </div>
              <div className="bg-white  p-8 rounded-2xl shadow-sm border border-gray-100  hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 ">Personalized Treatment Plans</h3>
                <p className="text-gray-600  leading-relaxed">
                  Each patient receives a customized ovarian stimulation protocol aligned with their specific diagnosis profile.
                </p>
              </div>
              <div className="bg-white  p-8 rounded-2xl shadow-sm border border-gray-100  hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 ">Multiple Clinic Locations</h3>
                <p className="text-gray-600  leading-relaxed">
                  Convenient access to top-tier fertility specialists through various accessible clinic locations across {displayCity}.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900  mb-10 text-center">Frequently Asked Questions</h2>
            <FAQAccordion 
              faqs={[
                {
                  question: `Who is the best IVF doctor in ${displayCity}?`,
                  answer: `The "best" doctor depends on your individual diagnosis, budget, and specific medical history. The top-rated specialists listed above are renowned for exceptional success rates and specialized care in ${displayCity}. It is highly recommended to consult a few doctors to determine who makes you feel the most comfortable and confident.`
                },
                {
                  question: `What is the average success rate of IVF in ${displayCity}?`,
                  answer: `Success rates in ${displayCity} typically follow global standards, ranging from 40% to 55% for women under 35. However, these rates are highly dependent on individual factors like biological age, egg quality, and underlying medical conditions.`
                },
                {
                  question: `How much does IVF cost in ${displayCity}?`,
                  answer: `The average cost of IVF in ${displayCity} ranges from ₹1.5 Lakh to ₹2.5 Lakh per cycle, including medications and basic procedures. Advanced techniques like ICSI or PGT-A may add to the total cost.`
                },
                {
                  question: `How to choose the right IVF doctor?`,
                  answer: `Look for doctors with extensive experience, transparent success rates, and a specialty that matches your diagnosis (e.g., PCOS, Endometriosis). Also, prioritize specialists who value patient communication and personalized care.`
                },
                {
                  question: `When should I consult an IVF specialist?`,
                  answer: `You should consider consulting a specialist if you haven't conceived after 12 months of regular unprotected intercourse (or 6 months if you are over 35). Earlier consultation is advised if you have known medical issues like irregular periods or history of pelvic surgeries.`
                }
              ]} 
            />
          </div>
        </section>
      </div>
    );
  }

  // 2. Try Fetching as Doctor Detail
  const { data: doctor } = await supabase
    .from('doctors')
    .select('*')
    .eq('slug', slug)
    .eq('specialty_slug', 'ivf')
    .single();

  if (!doctor) {
    notFound();
  }

  // Related Doctors
  const { data: relatedDoctors } = await supabase
    .from('doctors')
    .select('*')
    .eq('city_slug', doctor.city_slug)
    .eq('specialty_slug', 'ivf')
    .neq('id', doctor.id)
    .limit(3);

  const displayCity = doctor.city || '';

  return (
    <div className="min-h-screen bg-gray-50  pb-32 lg:pb-20">
      <section className="bg-white  border-b border-gray-200  pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mt-10">
            <div className="max-w-3xl flex-1 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-full bg-teal-50  overflow-hidden flex items-center justify-center border-4 border-teal-100  shadow-md">
                {doctor.image_url ? (
                  <img src={doctor.image_url} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-teal-200 " fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900  tracking-tight mb-2 break-words">
                  {doctor.name}
                </h1>
                <p className="text-sm text-gray-400 mb-3">Last Updated: 10th April 2026</p>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-xl text-teal-600  font-semibold">
                    {doctor.qualification || 'IVF Specialist'}
                  </p>
                  <div className="flex items-center bg-blue-50  px-2 py-1 rounded text-sm font-bold text-blue-700 ">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {doctor.rating || '4.5'}
                  </div>
                </div>
                <p className="text-gray-600  mb-6 flex items-center flex-wrap gap-2 text-lg">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {doctor.clinic_name ? `${doctor.clinic_name}, ` : ''}{displayCity}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-2">
                   <div className="bg-gray-50  p-4 rounded-xl border border-gray-100 ">
                     <div className="text-xs text-gray-500  uppercase tracking-wide font-semibold mb-1">Experience</div>
                     <div className="text-lg font-bold text-gray-900 ">{doctor.experience_years ? `${doctor.experience_years} Years` : 'N/A'}</div>
                   </div>
                   <div className="bg-gray-50  p-4 rounded-xl border border-gray-100 ">
                     <div className="text-xs text-gray-500  uppercase tracking-wide font-semibold mb-1">Qualification</div>
                     <div className="text-lg font-bold text-gray-900 ">{doctor.qualification || 'N/A'}</div>
                   </div>
                   <div className="bg-gray-50  p-4 rounded-xl border border-gray-100 ">
                     <div className="text-xs text-gray-500  uppercase tracking-wide font-semibold mb-1">Consultation Fee</div>
                     <div className="text-lg font-bold text-gray-900 ">On Request</div>
                   </div>
                   <div className="bg-gray-50  p-4 rounded-xl border border-gray-100 ">
                     <div className="text-xs text-gray-500  uppercase tracking-wide font-semibold mb-1">City</div>
                     <div className="text-lg font-bold text-gray-900 ">{displayCity}</div>
                   </div>
                    <div className="bg-gray-50  p-4 rounded-xl border border-gray-100 ">
                     <div className="text-xs text-gray-500  uppercase tracking-wide font-semibold mb-1">Primary Clinic</div>
                     <div className="text-lg font-bold text-gray-900  line-clamp-1" title={doctor.clinic_name}>{doctor.clinic_name || 'N/A'}</div>
                   </div>
                </div>
              </div>
            </div>
            <div className="lg:w-80 flex-shrink-0 bg-white  p-6 rounded-2xl border border-gray-200  shadow-xl lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-gray-900  mb-6">Contact Doctor</h3>
              <div className="space-y-4">
                <a href="#call" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-sm">
                   <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-50  text-blue-700  hover:bg-blue-100 :bg-blue-900/50 font-bold rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
                <Link href={`/ivf-doctors/${doctor.city_slug}`} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50  text-gray-700  hover:bg-gray-100 :bg-gray-700 font-bold rounded-xl transition-colors border border-gray-200  text-sm">
                  Compare Doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900  mb-4 border-l-4 border-teal-500 pl-4">
              About {doctor.name}
            </h2>
            <div className="bg-white  rounded-2xl p-6 border border-gray-100  shadow-sm text-gray-600  leading-relaxed space-y-4">
              <p>
                <strong>{doctor.name}</strong> is a highly respected reproductive medicine and IVF specialist operating in {displayCity}. Providing empathetic, patient-centered consultations, they have gathered over {doctor.experience_years || '20'} years of extensive clinical expertise driving successful fertility outcomes for hundreds of families.
              </p>
              <p>
                Their professional practice primarily focuses on personalized ovarian stimulation, complex infertility cases, and adopting the latest assisted reproductive technologies securely housed under {doctor.clinic_name || 'top-tier fertility centers'}.
              </p>
            </div>
          </div>

          <div>
             <h2 className="text-2xl font-bold text-gray-900  mb-6 border-l-4 border-blue-500 pl-4">
              Why Choose {doctor.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white  p-6 rounded-2xl border border-gray-100  shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-50  flex items-center justify-center flex-shrink-0 text-teal-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900  mb-1">Experienced IVF Specialist</h3>
                  <p className="text-sm text-gray-500 ">In-depth specialized training with years of dedicated reproductive protocol management.</p>
                </div>
              </div>
              <div className="bg-white  p-6 rounded-2xl border border-gray-100  shadow-sm flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-blue-50  flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900  mb-1">High Success Rates</h3>
                  <p className="text-sm text-gray-500 ">Strives for superior embryo grading and implantation success using targeted medication.</p>
                </div>
              </div>
              <div className="bg-white  p-6 rounded-2xl border border-gray-100  shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50  flex items-center justify-center flex-shrink-0 text-purple-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900  mb-1">Personalized Treatment</h3>
                  <p className="text-sm text-gray-500 ">Approaches infertility compassionately, tailoring every cycle precisely to the patient's biological markers.</p>
                </div>
              </div>
              <div className="bg-white  p-6 rounded-2xl border border-gray-100  shadow-sm flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-orange-50  flex items-center justify-center flex-shrink-0 text-orange-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900  mb-1">Trusted Clinic Association</h3>
                  <p className="text-sm text-gray-500 ">Operating out of {doctor.clinic_name || 'top hospitals'}, heavily audited for ethical standards and technological capabilities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedDoctors && relatedDoctors.length > 0 && (
          <div className="mt-16 border-t border-gray-200  pt-16">
            <h2 className="text-2xl font-bold text-gray-900  mb-8 border-l-4 border-blue-500 pl-4">
              Related Doctors in {displayCity}
            </h2>
            <DoctorProfileGrid doctors={relatedDoctors} />
          </div>
        )}

        <div className="mt-20">
             <h2 className="text-2xl font-bold text-center text-gray-900  mb-10">Frequently Asked Questions</h2>
             <FAQAccordion 
                faqs={[
                  {
                    question: `Who is ${doctor.name.startsWith('Dr.') ? doctor.name : 'Dr. ' + doctor.name}?`,
                    answer: `${doctor.name.startsWith('Dr.') ? doctor.name : 'Dr. ' + doctor.name} is a leading fertility specialist in ${displayCity} with expertise in ${doctor.specialty_slug?.toUpperCase() || 'IVF'} treatments.`
                  },
                  {
                    question: `How many years of experience does the doctor have?`,
                    answer: `The doctor has gathered over ${doctor.experience_years || '20'} years of extensive clinical expertise in reproductive medicine.`
                  },
                  {
                    question: `What is the consultation fee?`,
                    answer: `The consultation fee is currently provided on request. Please contact the associated clinic for the most accurate and up-to-date pricing.`
                  },
                  {
                    question: `Which clinic is this doctor associated with?`,
                    answer: `They practice dominantly out of ${doctor.clinic_name || 'leading medical centers'}, taking complete advantage of its world-class modular embryology and medical facilities.`
                  }
                ]} 
            />
        </div>
      </section>
    </div>
  );
}
