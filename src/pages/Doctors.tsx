import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doctors, Doctor } from '@/lib/mock-data';
import { Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DoctorDetailModal } from '@/components/doctors/DoctorDetailModal';

export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="gradient-hero-bg text-primary-foreground py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Doctors</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Meet our team of experienced healthcare professionals dedicated to your well-being.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {doctors.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="medical-card cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleDoctorClick(doctor)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover" />
                      {doctor.available && <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold">{doctor.name}</h3>
                      <p className="text-primary text-sm">{doctor.specialty}</p>
                      <p className="text-xs text-muted-foreground">{doctor.department}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-border text-center">
                    <div><div className="flex items-center justify-center gap-1"><Star className="w-3 h-3 fill-warning text-warning" /><span className="text-sm font-bold">{doctor.rating}</span></div><p className="text-xs text-muted-foreground">Rating</p></div>
                    <div><div className="flex items-center justify-center gap-1"><Clock className="w-3 h-3 text-primary" /><span className="text-sm font-bold">{doctor.experience}</span></div><p className="text-xs text-muted-foreground">Years</p></div>
                    <div><div className="flex items-center justify-center gap-1"><Users className="w-3 h-3 text-secondary" /><span className="text-sm font-bold">{doctor.patients}</span></div><p className="text-xs text-muted-foreground">Patients</p></div>
                  </div>

                  <Button className="w-full" size="sm" variant={doctor.available ? 'default' : 'outline'} disabled={!doctor.available}>
                    {doctor.available ? 'View Profile' : 'Unavailable'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <DoctorDetailModal doctor={selectedDoctor} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}