import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Brain, Baby, Bone, Stethoscope, Activity, Eye, Syringe, Microscope, Ambulance, BedDouble, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  { icon: Heart, title: 'Cardiology', description: 'Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation.', color: 'bg-destructive/10 text-destructive' },
  { icon: Brain, title: 'Neurology', description: 'Expert diagnosis and treatment of brain, spine, and nervous system disorders.', color: 'bg-primary/10 text-primary' },
  { icon: Baby, title: 'Pediatrics', description: 'Specialized healthcare for children from birth through adolescence.', color: 'bg-warning/10 text-warning' },
  { icon: Bone, title: 'Orthopedics', description: 'Treatment for bones, joints, ligaments, tendons, and muscles.', color: 'bg-secondary/10 text-secondary' },
  { icon: Stethoscope, title: 'General Medicine', description: 'Primary care for routine checkups, preventive care, and chronic disease management.', color: 'bg-accent/10 text-accent' },
  { icon: Activity, title: 'Emergency Care', description: '24/7 emergency services with rapid response and trauma care.', color: 'bg-destructive/10 text-destructive' },
  { icon: Eye, title: 'Ophthalmology', description: 'Complete eye care including vision correction and surgical procedures.', color: 'bg-primary/10 text-primary' },
  { icon: Syringe, title: 'Oncology', description: 'Advanced cancer treatment with chemotherapy, radiation, and immunotherapy.', color: 'bg-secondary/10 text-secondary' },
  { icon: Microscope, title: 'Pathology', description: 'Comprehensive diagnostic lab services with quick turnaround times.', color: 'bg-accent/10 text-accent' },
  { icon: Ambulance, title: 'Ambulance Services', description: 'Round-the-clock ambulance services with trained paramedics.', color: 'bg-warning/10 text-warning' },
  { icon: BedDouble, title: 'In-Patient Care', description: 'Comfortable rooms with attentive nursing staff and modern amenities.', color: 'bg-success/10 text-success' },
  { icon: Pill, title: 'Pharmacy', description: '24/7 pharmacy with complete range of medications and healthcare products.', color: 'bg-primary/10 text-primary' },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero-bg text-primary-foreground py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Services</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Comprehensive healthcare services delivered by expert medical professionals 
              using state-of-the-art technology.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="medical-card group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Need Medical Assistance?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our team of specialists is ready to provide you with the best care. 
              Book an appointment today or contact us for more information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg">Book Appointment</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
