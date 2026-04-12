import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function TopDoctors() {
  const { data: doctors } = await supabase
    .from('doctors')
    .select('*')
    .limit(4);

  return (
    <section className="py-20 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900  mb-2">Top Doctors</h2>
            <p className="text-gray-600 ">Consult with highly experienced medical professionals</p>
          </div>
          <Link href="/ivf-doctors/mumbai" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
            View All &rarr;
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors?.map((doctor: any) => (
            <div key={doctor.id} className="bg-white  rounded-2xl p-6 border border-gray-100  text-center flex flex-col items-center hover:shadow-md transition-shadow group">
              <div className="w-24 h-24 rounded-full bg-teal-50  mb-4 overflow-hidden flex items-center justify-center border-2 border-transparent group-hover:border-teal-200 transition-colors">
                 {doctor.image_url ? (
                   <img src={doctor.image_url} alt={doctor.name} className="w-full h-full object-cover" />
                 ) : (
                   <svg className="w-12 h-12 text-teal-200 " fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                   </svg>
                 )}
              </div>
              <h3 className="text-lg font-bold text-gray-900  line-clamp-1">{doctor.name}</h3>
              <p className="text-sm text-teal-600  font-medium mb-1">
                {doctor.specialty_slug?.toUpperCase() || 'IVF'} Specialist
              </p>
              <p className="text-xs text-gray-500  mb-4">
                {doctor.experience_years ? `${doctor.experience_years} Years Experience` : 'Experienced'}
              </p>
              <Link 
                href={`/${doctor.specialty_slug || 'ivf'}-doctors/${doctor.slug}`}
                className="w-full bg-transparent border border-teal-600 text-teal-600 hover:bg-teal-50 :bg-teal-900/30 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
              >
                View Profile
              </Link>
            </div>
          ))}
          {(!doctors || doctors.length === 0) && (
            <div className="col-span-full py-12 text-center bg-white  rounded-2xl border border-gray-100 ">
              <p className="text-gray-500  font-medium">No doctors available to display.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
