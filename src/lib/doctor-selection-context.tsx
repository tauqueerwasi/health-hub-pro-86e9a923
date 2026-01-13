import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Doctor } from './mock-data';

interface DoctorSelectionContextType {
  selectedDoctor: Doctor | null;
  selectDoctor: (doctor: Doctor) => void;
  clearSelection: () => void;
}

const DoctorSelectionContext = createContext<DoctorSelectionContextType | undefined>(undefined);

const STORAGE_KEY = 'medicare_selected_doctor';

export function DoctorSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  // Persist to localStorage whenever selection changes
  useEffect(() => {
    if (selectedDoctor) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDoctor));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [selectedDoctor]);

  const selectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const clearSelection = () => {
    setSelectedDoctor(null);
  };

  return (
    <DoctorSelectionContext.Provider value={{ selectedDoctor, selectDoctor, clearSelection }}>
      {children}
    </DoctorSelectionContext.Provider>
  );
}

export function useDoctorSelection() {
  const context = useContext(DoctorSelectionContext);
  if (context === undefined) {
    throw new Error('useDoctorSelection must be used within a DoctorSelectionProvider');
  }
  return context;
}
