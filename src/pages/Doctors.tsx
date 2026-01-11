import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doctors } from '@/lib/mock-data';
import { Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Doctors() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero-bg text-primary-foreground py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Doctors</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Meet our team of experienced and compassionate healthcare professionals 
              dedicated to your well-being.
            </p>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="medical-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      {doctor.available && (
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
                          <span className="w-2 h-2 bg-success-foreground rounded-full" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground">{doctor.department}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-border">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="font-bold">{doctor.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-bold">{doctor.experience}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Years Exp.</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="font-bold">{doctor.patients}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Patients</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Available:</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.schedule.map((time) => (
                        <span key={time} className="px-2 py-1 bg-muted rounded-lg text-xs">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" disabled={!doctor.available}>
                    {doctor.available ? 'Book Appointment' : 'Currently Unavailable'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
