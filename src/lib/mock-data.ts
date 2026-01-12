// Mock data for the medical application

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  department: string;
  experience: number;
  avatar: string;
  rating: number;
  patients: number;
  available: boolean;
  schedule: string[];
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  avatar: string;
  bloodType: string;
  assignedDoctor: string;
  lastVisit: string;
  conditions: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  type: string;
  notes?: string;
}

export interface HealthMetric {
  date: string;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  sugarLevel: number;
  bmi: number;
  heartRate: number;
}

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string[];
  notes: string;
  doctorName: string;
}

export const doctors: Doctor[] = [
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
    available: false,
    schedule: ['Mon 9-5', 'Thu 9-5'],
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
  },
];

export const patients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    age: 45,
    gender: 'Male',
    phone: '+1 234-567-8901',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bloodType: 'O+',
    assignedDoctor: 'Dr. Sarah Wilson',
    lastVisit: '2024-01-10',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    age: 32,
    gender: 'Female',
    phone: '+1 234-567-8902',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    bloodType: 'A+',
    assignedDoctor: 'Dr. Emily Roberts',
    lastVisit: '2024-01-08',
    conditions: ['Asthma'],
  },
  {
    id: '3',
    name: 'Robert Davis',
    email: 'robert.davis@email.com',
    age: 58,
    gender: 'Male',
    phone: '+1 234-567-8903',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    bloodType: 'B+',
    assignedDoctor: 'Dr. Michael Chen',
    lastVisit: '2024-01-05',
    conditions: ['Migraine', 'Arthritis'],
  },
  {
    id: '4',
    name: 'Sarah Miller',
    email: 'sarah.miller@email.com',
    age: 28,
    gender: 'Female',
    phone: '+1 234-567-8904',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    bloodType: 'AB+',
    assignedDoctor: 'Dr. Lisa Thompson',
    lastVisit: '2024-01-12',
    conditions: ['Eczema'],
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Smith',
    doctorId: '1',
    doctorName: 'Dr. Sarah Wilson',
    date: '2024-01-15',
    time: '09:00 AM',
    status: 'approved',
    type: 'Follow-up',
    notes: 'Regular checkup for hypertension',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Emma Johnson',
    doctorId: '3',
    doctorName: 'Dr. Emily Roberts',
    date: '2024-01-15',
    time: '10:30 AM',
    status: 'pending',
    type: 'Consultation',
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Robert Davis',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    date: '2024-01-16',
    time: '02:00 PM',
    status: 'approved',
    type: 'Specialist Referral',
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Sarah Miller',
    doctorId: '5',
    doctorName: 'Dr. Lisa Thompson',
    date: '2024-01-14',
    time: '11:00 AM',
    status: 'completed',
    type: 'Treatment',
    notes: 'Skin treatment follow-up',
  },
];

export const healthMetrics: HealthMetric[] = [
  { date: 'Jan 1', bloodPressureSystolic: 125, bloodPressureDiastolic: 82, sugarLevel: 105, bmi: 24.5, heartRate: 72 },
  { date: 'Jan 8', bloodPressureSystolic: 122, bloodPressureDiastolic: 80, sugarLevel: 98, bmi: 24.3, heartRate: 70 },
  { date: 'Jan 15', bloodPressureSystolic: 128, bloodPressureDiastolic: 85, sugarLevel: 110, bmi: 24.4, heartRate: 75 },
  { date: 'Jan 22', bloodPressureSystolic: 120, bloodPressureDiastolic: 78, sugarLevel: 95, bmi: 24.2, heartRate: 68 },
  { date: 'Jan 29', bloodPressureSystolic: 118, bloodPressureDiastolic: 76, sugarLevel: 92, bmi: 24.0, heartRate: 70 },
  { date: 'Feb 5', bloodPressureSystolic: 121, bloodPressureDiastolic: 79, sugarLevel: 100, bmi: 23.9, heartRate: 71 },
  { date: 'Feb 12', bloodPressureSystolic: 119, bloodPressureDiastolic: 77, sugarLevel: 96, bmi: 23.8, heartRate: 69 },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: '1',
    date: '2024-01-10',
    diagnosis: 'Hypertension - Controlled',
    prescription: ['Lisinopril 10mg', 'Aspirin 81mg'],
    notes: 'Blood pressure well controlled. Continue current medication.',
    doctorName: 'Dr. Sarah Wilson',
  },
  {
    id: '2',
    date: '2023-12-15',
    diagnosis: 'Type 2 Diabetes - Monitoring',
    prescription: ['Metformin 500mg', 'Glipizide 5mg'],
    notes: 'Blood sugar levels improving. Diet and exercise plan discussed.',
    doctorName: 'Dr. Sarah Wilson',
  },
  {
    id: '3',
    date: '2023-11-20',
    diagnosis: 'Annual Physical Exam',
    prescription: [],
    notes: 'Overall health good. Recommended increased physical activity.',
    doctorName: 'Dr. Michael Chen',
  },
];

export const services = [
  {
    id: '1',
    title: 'Emergency Care',
    description: '24/7 emergency medical services with rapid response teams',
    icon: 'Heart',
  },
  {
    id: '2',
    title: 'Cardiology',
    description: 'Comprehensive heart care including diagnostics and treatment',
    icon: 'Activity',
  },
  {
    id: '3',
    title: 'Neurology',
    description: 'Expert care for brain and nervous system conditions',
    icon: 'Brain',
  },
  {
    id: '4',
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents',
    icon: 'Baby',
  },
  {
    id: '5',
    title: 'Orthopedics',
    description: 'Treatment for bones, joints, muscles, and spine conditions',
    icon: 'Bone',
  },
  {
    id: '6',
    title: 'Dermatology',
    description: 'Complete skin care including medical and cosmetic treatments',
    icon: 'Stethoscope',
  },
];

export const weeklyReports = [
  {
    id: '1',
    weekStart: '2024-01-08',
    weekEnd: '2024-01-14',
    patientName: 'John Smith',
    generatedDate: '2024-01-15',
    status: 'available',
  },
  {
    id: '2',
    weekStart: '2024-01-01',
    weekEnd: '2024-01-07',
    patientName: 'John Smith',
    generatedDate: '2024-01-08',
    status: 'available',
  },
  {
    id: '3',
    weekStart: '2023-12-25',
    weekEnd: '2023-12-31',
    patientName: 'John Smith',
    generatedDate: '2024-01-01',
    status: 'available',
  },
];

export const detailedServices = [
  {
    id: '1',
    title: 'Online Doctor Consultation',
    description: 'Connect with qualified doctors through video calls, chat, or phone from the comfort of your home.',
    benefits: ['Skip the waiting room', 'Get expert advice quickly', 'Receive digital prescriptions', 'Follow-up support'],
    forWho: 'Patients seeking convenient medical consultations',
    icon: 'Video',
  },
  {
    id: '2',
    title: 'Appointment Booking System',
    description: 'Easy-to-use system for booking, managing, and tracking your medical appointments.',
    benefits: ['Real-time availability', 'Instant confirmations', 'Automated reminders', 'Easy rescheduling'],
    forWho: 'All patients and healthcare providers',
    icon: 'Calendar',
  },
  {
    id: '3',
    title: 'Health Metrics Tracking',
    description: 'Monitor your vital signs and health indicators with intuitive dashboards and trends.',
    benefits: ['Track BP, sugar, BMI', 'Visual health trends', 'Set health goals', 'Share with doctors'],
    forWho: 'Patients managing chronic conditions',
    icon: 'Activity',
  },
  {
    id: '4',
    title: 'Digital Prescriptions',
    description: 'Receive secure digital prescriptions that can be shared directly with pharmacies.',
    benefits: ['No paper needed', 'Secure and verified', 'Easy pharmacy sharing', 'Prescription history'],
    forWho: 'Patients and doctors',
    icon: 'FileText',
  },
  {
    id: '5',
    title: 'Lab Test Uploads',
    description: 'Upload and store your lab test reports for easy access and sharing with healthcare providers.',
    benefits: ['Centralized records', 'Easy sharing', 'Historical comparisons', 'Secure storage'],
    forWho: 'Patients with lab reports',
    icon: 'Upload',
  },
  {
    id: '6',
    title: 'Weekly Health Reports',
    description: 'Automated weekly PDF reports summarizing your health metrics, trends, and doctor recommendations.',
    benefits: ['Auto-generated', 'Visual charts', 'Doctor insights', 'Downloadable PDF'],
    forWho: 'All registered patients',
    icon: 'FileText',
  },
  {
    id: '7',
    title: 'Chronic Disease Management',
    description: 'Specialized programs for managing diabetes, hypertension, heart disease, and other chronic conditions.',
    benefits: ['Personalized plans', 'Regular monitoring', 'Medication tracking', 'Specialist access'],
    forWho: 'Patients with chronic conditions',
    icon: 'Heart',
  },
  {
    id: '8',
    title: 'Emergency Consultation',
    description: '24/7 emergency consultation support for urgent medical situations.',
    benefits: ['Round-the-clock availability', 'Quick response time', 'Expert guidance', 'Referral support'],
    forWho: 'Anyone with urgent medical needs',
    icon: 'AlertCircle',
  },
  {
    id: '9',
    title: 'Corporate Health Programs',
    description: 'Comprehensive health programs designed for organizations and their employees.',
    benefits: ['Employee wellness', 'Health screenings', 'Group consultations', 'Analytics dashboard'],
    forWho: 'Companies and organizations',
    icon: 'Building2',
  },
];
