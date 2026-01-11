import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { doctors } from '@/lib/mock-data';

export function DoctorsSection() {
  const featuredDoctors = doctors.slice(0, 4);

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Meet Our Experts
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Our Skilled Doctors
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Our team of experienced physicians is dedicated to providing you 
              with the best possible care.
            </p>
          </div>
          <Link to="/doctors">
            <Button variant="outline">
              View All Doctors <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Doctors grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="medical-card text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative inline-block mb-4">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-background shadow-lg group-hover:ring-primary/20 transition-all"
                />
                {doctor.available && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                )}
              </div>
              <h3 className="font-heading font-semibold mb-1">{doctor.name}</h3>
              <p className="text-primary text-sm mb-2">{doctor.specialty}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="font-medium">{doctor.rating}</span>
                <span>• {doctor.experience} years exp.</span>
              </div>
              <Link to={`/doctors/${doctor.id}`}>
                <Button variant="ghost" size="sm" className="w-full">
                  View Profile
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
