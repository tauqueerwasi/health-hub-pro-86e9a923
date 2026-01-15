import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Doctor } from './mock-data';

export interface BookedAppointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: string;
  city: string;
  date: string;
  time: string;
  consultationType: 'online' | 'in-clinic';
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  fee: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  transactionId: string | null;
  createdAt: string;
}

interface BookedAppointmentsContextType {
  appointments: BookedAppointment[];
  addAppointment: (appointment: Omit<BookedAppointment, 'id' | 'createdAt'>) => void;
  updateAppointmentStatus: (id: string, status: BookedAppointment['status']) => void;
  getPatientAppointments: (patientId: string) => BookedAppointment[];
  getDoctorAppointments: (doctorName: string) => BookedAppointment[];
  getAllAppointments: () => BookedAppointment[];
}

const BookedAppointmentsContext = createContext<BookedAppointmentsContextType | undefined>(undefined);

const STORAGE_KEY = 'medicare_booked_appointments';

// Initial mock appointments for demo
const initialAppointments: BookedAppointment[] = [
  {
    id: 'apt-001',
    patientId: '3',
    patientName: 'John Smith',
    patientEmail: 'patient@medicare.com',
    doctorId: 'dr-1',
    doctorName: 'Dr. Sarah Wilson',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop',
    specialty: 'Cardiology',
    city: 'Mumbai',
    date: '2026-01-20',
    time: '10:00 AM',
    consultationType: 'in-clinic',
    status: 'approved',
    fee: 800,
    paymentStatus: 'completed',
    transactionId: 'TXN1234567890ABC',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'apt-002',
    patientId: '3',
    patientName: 'John Smith',
    patientEmail: 'patient@medicare.com',
    doctorId: 'dr-2',
    doctorName: 'Dr. Michael Chen',
    doctorAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
    specialty: 'Neurology',
    city: 'Delhi',
    date: '2026-01-22',
    time: '02:30 PM',
    consultationType: 'online',
    status: 'pending',
    fee: 700,
    paymentStatus: 'completed',
    transactionId: 'TXN9876543210XYZ',
    createdAt: '2026-01-15T11:00:00Z',
  },
];

export function BookedAppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<BookedAppointment[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return initialAppointments;
        }
      }
    }
    return initialAppointments;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointmentData: Omit<BookedAppointment, 'id' | 'createdAt'>) => {
    const newAppointment: BookedAppointment = {
      ...appointmentData,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointmentStatus = (id: string, status: BookedAppointment['status']) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const getPatientAppointments = (patientId: string) => {
    return appointments.filter(apt => apt.patientId === patientId);
  };

  const getDoctorAppointments = (doctorName: string) => {
    return appointments.filter(apt => apt.doctorName.includes(doctorName) || apt.doctorName === doctorName);
  };

  const getAllAppointments = () => {
    return appointments;
  };

  return (
    <BookedAppointmentsContext.Provider value={{
      appointments,
      addAppointment,
      updateAppointmentStatus,
      getPatientAppointments,
      getDoctorAppointments,
      getAllAppointments,
    }}>
      {children}
    </BookedAppointmentsContext.Provider>
  );
}

export function useBookedAppointments() {
  const context = useContext(BookedAppointmentsContext);
  if (context === undefined) {
    throw new Error('useBookedAppointments must be used within a BookedAppointmentsProvider');
  }
  return context;
}
