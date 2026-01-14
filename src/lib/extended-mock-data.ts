import { Doctor } from './mock-data';

// Extended doctors data with city information
export interface ExtendedDoctor extends Doctor {
  city: string;
  consultationFee: number;
  bio: string;
  qualifications: string[];
  languages: string[];
}

export const extendedDoctors: ExtendedDoctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@medicare.com',
    specialty: 'Cardiologist',
    department: 'Cardiology',
    experience: 15,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop',
    rating: 4.9,
    patients: 1200,
    available: true,
    schedule: ['Mon 9-5', 'Wed 9-5', 'Fri 9-3'],
    city: 'Mumbai',
    consultationFee: 800,
    bio: 'Dr. Sarah Wilson is a renowned cardiologist with expertise in interventional cardiology and heart failure management.',
    qualifications: ['MBBS', 'MD Cardiology', 'DM Interventional Cardiology'],
    languages: ['English', 'Hindi'],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@medicare.com',
    specialty: 'Neurologist',
    department: 'Neurology',
    experience: 12,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
    rating: 4.8,
    patients: 980,
    available: true,
    schedule: ['Tue 10-6', 'Thu 10-6', 'Sat 9-1'],
    city: 'Delhi',
    consultationFee: 700,
    bio: 'Dr. Michael Chen specializes in movement disorders and neurodegenerative diseases with international fellowship training.',
    qualifications: ['MBBS', 'MD Neurology', 'Fellowship Movement Disorders'],
    languages: ['English', 'Hindi', 'Mandarin'],
  },
  {
    id: '3',
    name: 'Dr. Emily Roberts',
    email: 'emily.roberts@medicare.com',
    specialty: 'Pediatrician',
    department: 'Pediatrics',
    experience: 10,
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop',
    rating: 4.9,
    patients: 1500,
    available: true,
    schedule: ['Mon 8-4', 'Tue 8-4', 'Wed 8-4', 'Thu 8-4', 'Fri 8-2'],
    city: 'Bangalore',
    consultationFee: 600,
    bio: 'Dr. Emily Roberts is a compassionate pediatrician known for her expertise in childhood development and preventive care.',
    qualifications: ['MBBS', 'MD Pediatrics', 'DCH'],
    languages: ['English', 'Kannada', 'Hindi'],
  },
  {
    id: '4',
    name: 'Dr. James Anderson',
    email: 'james.anderson@medicare.com',
    specialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    experience: 18,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop',
    rating: 4.7,
    patients: 850,
    available: true,
    schedule: ['Mon 9-5', 'Thu 9-5'],
    city: 'Mumbai',
    consultationFee: 900,
    bio: 'Dr. James Anderson is a leading orthopedic surgeon specializing in joint replacement and sports medicine.',
    qualifications: ['MBBS', 'MS Orthopedics', 'Fellowship Joint Replacement'],
    languages: ['English', 'Hindi', 'Marathi'],
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    email: 'lisa.thompson@medicare.com',
    specialty: 'Dermatologist',
    department: 'Dermatology',
    experience: 8,
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop',
    rating: 4.8,
    patients: 720,
    available: true,
    schedule: ['Tue 9-5', 'Wed 9-5', 'Fri 9-5'],
    city: 'Chennai',
    consultationFee: 500,
    bio: 'Dr. Lisa Thompson specializes in cosmetic dermatology and advanced skin treatments.',
    qualifications: ['MBBS', 'MD Dermatology', 'Fellowship Cosmetic Dermatology'],
    languages: ['English', 'Tamil', 'Hindi'],
  },
  {
    id: '6',
    name: 'Dr. Robert Martinez',
    email: 'robert.martinez@medicare.com',
    specialty: 'Gynecologist',
    department: 'Gynecology',
    experience: 14,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop',
    rating: 4.9,
    patients: 1100,
    available: true,
    schedule: ['Mon 9-6', 'Wed 9-6', 'Fri 9-4'],
    city: 'Hyderabad',
    consultationFee: 700,
    bio: 'Dr. Robert Martinez is an expert in high-risk pregnancies and minimally invasive gynecological surgeries.',
    qualifications: ['MBBS', 'MD OB-GYN', 'Fellowship Laparoscopy'],
    languages: ['English', 'Telugu', 'Hindi'],
  },
  {
    id: '7',
    name: 'Dr. Amanda Foster',
    email: 'amanda.foster@medicare.com',
    specialty: 'Psychiatrist',
    department: 'Mental Health',
    experience: 11,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop',
    rating: 4.8,
    patients: 650,
    available: true,
    schedule: ['Mon 10-6', 'Tue 10-6', 'Thu 10-6'],
    city: 'Pune',
    consultationFee: 800,
    bio: 'Dr. Amanda Foster specializes in anxiety disorders, depression, and cognitive behavioral therapy.',
    qualifications: ['MBBS', 'MD Psychiatry', 'DNB Psychiatry'],
    languages: ['English', 'Hindi', 'Marathi'],
  },
  {
    id: '8',
    name: 'Dr. David Kim',
    email: 'david.kim@medicare.com',
    specialty: 'Endocrinologist',
    department: 'Diabetology',
    experience: 9,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
    rating: 4.7,
    patients: 890,
    available: true,
    schedule: ['Tue 9-5', 'Thu 9-5', 'Sat 10-2'],
    city: 'Kolkata',
    consultationFee: 600,
    bio: 'Dr. David Kim is an expert in diabetes management and thyroid disorders with a patient-centric approach.',
    qualifications: ['MBBS', 'MD Medicine', 'DM Endocrinology'],
    languages: ['English', 'Bengali', 'Hindi'],
  },
  // Additional doctors for other cities
  {
    id: '9',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@medicare.com',
    specialty: 'Cardiologist',
    department: 'Cardiology',
    experience: 12,
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop',
    rating: 4.8,
    patients: 950,
    available: true,
    schedule: ['Mon 10-6', 'Wed 10-6', 'Fri 10-4'],
    city: 'Delhi',
    consultationFee: 750,
    bio: 'Dr. Priya Sharma is a distinguished cardiologist with expertise in preventive cardiology and echocardiography.',
    qualifications: ['MBBS', 'MD Cardiology', 'DNB Cardiology'],
    languages: ['English', 'Hindi', 'Punjabi'],
  },
  {
    id: '10',
    name: 'Dr. Rahul Verma',
    email: 'rahul.verma@medicare.com',
    specialty: 'Neurologist',
    department: 'Neurology',
    experience: 14,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop',
    rating: 4.9,
    patients: 1100,
    available: true,
    schedule: ['Tue 9-5', 'Thu 9-5', 'Sat 9-1'],
    city: 'Mumbai',
    consultationFee: 850,
    bio: 'Dr. Rahul Verma is a renowned neurologist specializing in stroke management and epilepsy treatment.',
    qualifications: ['MBBS', 'DM Neurology', 'Fellowship Stroke Medicine'],
    languages: ['English', 'Hindi', 'Marathi'],
  },
  {
    id: '11',
    name: 'Dr. Anjali Gupta',
    email: 'anjali.gupta@medicare.com',
    specialty: 'Pediatrician',
    department: 'Pediatrics',
    experience: 8,
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop',
    rating: 4.7,
    patients: 780,
    available: true,
    schedule: ['Mon 9-5', 'Wed 9-5', 'Fri 9-3'],
    city: 'Delhi',
    consultationFee: 550,
    bio: 'Dr. Anjali Gupta is a caring pediatrician with special interest in pediatric nutrition and vaccinations.',
    qualifications: ['MBBS', 'MD Pediatrics'],
    languages: ['English', 'Hindi'],
  },
  {
    id: '12',
    name: 'Dr. Vikram Singh',
    email: 'vikram.singh@medicare.com',
    specialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    experience: 16,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
    rating: 4.8,
    patients: 920,
    available: true,
    schedule: ['Mon 10-6', 'Thu 10-6'],
    city: 'Bangalore',
    consultationFee: 850,
    bio: 'Dr. Vikram Singh is a senior orthopedic surgeon with expertise in spine surgery and trauma management.',
    qualifications: ['MBBS', 'MS Orthopedics', 'MCh Spine Surgery'],
    languages: ['English', 'Hindi', 'Kannada'],
  },
];

// Get doctors filtered by specialty and city
export function getDoctorsBySpecialtyAndCity(specialty: string, city: string): ExtendedDoctor[] {
  const specialtyMap: Record<string, string[]> = {
    'cardiology': ['Cardiologist'],
    'neurology': ['Neurologist'],
    'orthopedics': ['Orthopedic Surgeon'],
    'pediatrics': ['Pediatrician'],
    'gynecology': ['Gynecologist'],
    'dermatology': ['Dermatologist'],
    'diabetology': ['Endocrinologist'],
    'mental-health': ['Psychiatrist'],
    'general-medicine': ['General Physician'],
    'physiotherapy': ['Physiotherapist'],
  };

  const normalizedSpecialty = specialty.toLowerCase().replace(/\s+/g, '-');
  const matchingSpecialties = specialtyMap[normalizedSpecialty] || [];

  return extendedDoctors
    .filter(doctor => {
      const cityMatch = city.toLowerCase() === 'all' || doctor.city.toLowerCase() === city.toLowerCase();
      const specialtyMatch = matchingSpecialties.length === 0 || 
        matchingSpecialties.some(s => doctor.specialty.toLowerCase().includes(s.toLowerCase()));
      return cityMatch && (matchingSpecialties.length === 0 || specialtyMatch);
    })
    .sort((a, b) => {
      // Sort by rating first, then experience
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.experience - a.experience;
    });
}

// Get all doctors for a city
export function getDoctorsByCity(city: string): ExtendedDoctor[] {
  if (city.toLowerCase() === 'all') return extendedDoctors;
  return extendedDoctors.filter(doctor => 
    doctor.city.toLowerCase() === city.toLowerCase()
  );
}

// Get unique specialties
export function getUniqueSpecialties(): string[] {
  return [...new Set(extendedDoctors.map(d => d.department))];
}

// Get unique cities
export function getUniqueCities(): string[] {
  return [...new Set(extendedDoctors.map(d => d.city))];
}
