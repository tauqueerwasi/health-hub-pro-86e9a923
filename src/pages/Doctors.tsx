import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doctors } from '@/lib/mock-data';
import { useDoctorSelection } from '@/lib/doctor-selection-context';
import { useAuth } from '@/lib/auth-context';
import { Star, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Doctors() {
  const { selectedDoctor: globalSelectedDoctor, selectDoctor } = useDoctorSelection();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelectDoctor = (doctor: typeof doctors[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectDoctor(doctor);
    toast.success(`Dr. ${doctor.name.replace('Dr. ', '')} selected!`, {
      description: 'You can now book an appointment with this doctor.',
    });
  };

  const handleBookAppointment = (doctor: typeof doctors[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectDoctor(doctor);
    if (user) {
      navigate('/patient/appointments');
    } else {
      toast.info('Please login to book an appointment', {
        action: {
          label: 'Login',
          onClick: () => navigate('/login'),
        },
      });
    }
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
              {doctors.map((doctor, index) => {
                const isSelected = globalSelectedDoctor?.id === doctor.id;
                return (
                  <Link
                    key={doctor.id}
                    to={`/doctors/${doctor.id}`}
                    className={`medical-card block cursor-pointer relative transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg z-10">
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
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

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        size="sm" 
                        variant={isSelected ? 'secondary' : 'outline'}
                        onClick={(e) => handleSelectDoctor(doctor, e)}
                        disabled={!doctor.available}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </Button>
                      <Button 
                        className="flex-1" 
                        size="sm" 
                        variant="default"
                        onClick={(e) => handleBookAppointment(doctor, e)}
                        disabled={!doctor.available}
                      >
                        Book
                      </Button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}