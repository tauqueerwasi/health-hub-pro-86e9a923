import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Doctor } from './mock-data';

export interface AppointmentData {
  city: string;
  specialty: string;
  doctor: Doctor | null;
  date: string;
  time: string;
  consultationType: 'online' | 'in-clinic';
  fee: number;
  paymentMethod: 'upi' | 'card' | 'wallet' | null;
  paymentStatus: 'pending' | 'completed' | 'failed';
  transactionId: string | null;
}

interface AppointmentContextType {
  appointmentData: AppointmentData;
  setCity: (city: string) => void;
  setSpecialty: (specialty: string) => void;
  setDoctor: (doctor: Doctor | null) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setConsultationType: (type: 'online' | 'in-clinic') => void;
  setPaymentMethod: (method: 'upi' | 'card' | 'wallet') => void;
  completePayment: () => Promise<boolean>;
  resetAppointment: () => void;
  detectedCity: string;
  setDetectedCity: (city: string) => void;
}

const defaultAppointmentData: AppointmentData = {
  city: '',
  specialty: '',
  doctor: null,
  date: '',
  time: '',
  consultationType: 'in-clinic',
  fee: 500,
  paymentMethod: null,
  paymentStatus: 'pending',
  transactionId: null,
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

const STORAGE_KEY = 'medicare_appointment_data';
const CITY_KEY = 'medicare_detected_city';

// Mock cities for the application
export const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

// Specialty mapping for filtering
export const specialties = [
  { name: 'Cardiology', department: 'Cardiology', specialty: 'Cardiologist' },
  { name: 'Neurology', department: 'Neurology', specialty: 'Neurologist' },
  { name: 'Orthopedics', department: 'Orthopedics', specialty: 'Orthopedic Surgeon' },
  { name: 'Pediatrics', department: 'Pediatrics', specialty: 'Pediatrician' },
  { name: 'Gynecology', department: 'Gynecology', specialty: 'Gynecologist' },
  { name: 'Dermatology', department: 'Dermatology', specialty: 'Dermatologist' },
  { name: 'Diabetology', department: 'Diabetology', specialty: 'Endocrinologist' },
  { name: 'Mental Health', department: 'Mental Health', specialty: 'Psychiatrist' },
  { name: 'General Medicine', department: 'General Medicine', specialty: 'General Physician' },
  { name: 'Physiotherapy', department: 'Physiotherapy', specialty: 'Physiotherapist' },
];

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointmentData, setAppointmentData] = useState<AppointmentData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return { ...defaultAppointmentData, ...JSON.parse(stored) };
        } catch {
          return defaultAppointmentData;
        }
      }
    }
    return defaultAppointmentData;
  });

  const [detectedCity, setDetectedCityState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(CITY_KEY) || 'Mumbai';
    }
    return 'Mumbai';
  });

  // Mock geolocation detection
  useEffect(() => {
    const mockDetectCity = () => {
      // Simulate city detection - in real app, use geolocation API
      const randomCity = cities[Math.floor(Math.random() * 3)]; // Top 3 cities
      if (!localStorage.getItem(CITY_KEY)) {
        setDetectedCityState(randomCity);
        localStorage.setItem(CITY_KEY, randomCity);
      }
    };
    mockDetectCity();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointmentData));
  }, [appointmentData]);

  const setDetectedCity = (city: string) => {
    setDetectedCityState(city);
    localStorage.setItem(CITY_KEY, city);
  };

  const setCity = (city: string) => {
    setAppointmentData(prev => ({ ...prev, city }));
  };

  const setSpecialty = (specialty: string) => {
    setAppointmentData(prev => ({ ...prev, specialty }));
  };

  const setDoctor = (doctor: Doctor | null) => {
    setAppointmentData(prev => ({ 
      ...prev, 
      doctor,
      fee: doctor ? (doctor.experience > 10 ? 800 : 500) : 500
    }));
  };

  const setDate = (date: string) => {
    setAppointmentData(prev => ({ ...prev, date }));
  };

  const setTime = (time: string) => {
    setAppointmentData(prev => ({ ...prev, time }));
  };

  const setConsultationType = (type: 'online' | 'in-clinic') => {
    setAppointmentData(prev => ({ 
      ...prev, 
      consultationType: type,
      fee: type === 'online' ? (prev.fee - 100) : prev.fee
    }));
  };

  const setPaymentMethod = (method: 'upi' | 'card' | 'wallet') => {
    setAppointmentData(prev => ({ ...prev, paymentMethod: method }));
  };

  const completePayment = async (): Promise<boolean> => {
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        const transactionId = success ? `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}` : null;
        
        setAppointmentData(prev => ({
          ...prev,
          paymentStatus: success ? 'completed' : 'failed',
          transactionId,
        }));
        
        resolve(success);
      }, 2000);
    });
  };

  const resetAppointment = () => {
    setAppointmentData(defaultAppointmentData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AppointmentContext.Provider value={{
      appointmentData,
      setCity,
      setSpecialty,
      setDoctor,
      setDate,
      setTime,
      setConsultationType,
      setPaymentMethod,
      completePayment,
      resetAppointment,
      detectedCity,
      setDetectedCity,
    }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
}
