export interface Doctor {
  id: number;
  created_at: string;
  name: string;
  city: string;
  city_slug: string;
  specialty_slug: string;
  rating: number | null;
  slug: string;
  image_url: string | null;
  
  clinic_name: string | null;
  experience_years: number | null;
  qualification: string | null;
  consultation_fee: string | null;
}

export const gynecologydoctors: Doctor[] = [
  {
    "id": 25,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Anjali Kumar",
    "clinic_name": "Lilavati Hospital",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 20,
    "rating": 4.5,
    "qualification": "MD",
    "slug": "anjali-kumar-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 26,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Mohit Saraogi",
    "clinic_name": "Saraogi Hospital",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 18,
    "rating": 4.4,
    "qualification": "MD",
    "slug": "mohit-saraogi-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 27,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Snehalata Deshmukh",
    "clinic_name": "Breach Candy Hospital",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 35,
    "rating": 4.7,
    "qualification": "MD",
    "slug": "snehalata-deshmukh-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 28,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Sharmila Majumdar",
    "clinic_name": "Nanavati Hospital",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 17,
    "rating": 4.3,
    "qualification": "MD",
    "slug": "sharmila-majumdar-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 29,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Sunita Tandulwadkar",
    "clinic_name": "Cloudnine Hospital",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 24,
    "rating": 4.6,
    "qualification": "MD",
    "slug": "sunita-tandulwadkar-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 30,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Vaishali Chaudhary",
    "clinic_name": "Wockhardt Hospital",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 16,
    "rating": 4.3,
    "qualification": "MS",
    "slug": "vaishali-chaudhary-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 21,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Rishma Pai",
    "clinic_name": "Lilavati Hospital",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 22,
    "rating": 4.7,
    "qualification": "MD",
    "slug": "rishma-pai-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 22,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Nandita Palshetkar",
    "clinic_name": "Bloom IVF",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 25,
    "rating": 4.8,
    "qualification": "MD, DGO",
    "slug": "nandita-palshetkar-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 23,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Firuza Parikh",
    "clinic_name": "Jaslok Hospital",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 30,
    "rating": 4.9,
    "qualification": "MD",
    "slug": "firuza-parikh-mumbai",
    "image_url": null,
    "consultation_fee": null
  },
  {
    "id": 24,
    "created_at": "2026-04-11T13:58:41.914825+00:00",
    "name": "Dr. Hrishikesh Pai",
    "clinic_name": "Bloom IVF",
    "city": "Mumbai",
    "city_slug": "mumbai",
    "specialty_slug": "gynecology",
    "experience_years": 28,
    "rating": 4.6,
    "qualification": "MD, FRCOG",
    "slug": "hrishikesh-pai-mumbai",
    "image_url": null,
    "consultation_fee": null
  }
];
