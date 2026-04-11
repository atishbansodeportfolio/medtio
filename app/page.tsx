import Hero from '@/components/Hero';
import PopularSpecialties from '@/components/PopularSpecialties';
import PopularCities from '@/components/PopularCities';
import TopHospitals from '@/components/TopHospitals';
import TopDoctors from '@/components/TopDoctors';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function Home() {
  return (
    <>
      <Hero />
      <PopularSpecialties />
      <PopularCities />
      <TopHospitals />
      <TopDoctors />
      <WhyChooseUs />
    </>
  );
}