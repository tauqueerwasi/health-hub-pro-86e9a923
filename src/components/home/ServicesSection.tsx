import { Heart, Brain, Baby, Bone, Stethoscope, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Heart,
    title: 'Emergency Care',
    description: '24/7 emergency medical services with rapid response teams and state-of-the-art facilities.',
    color: 'bg-destructive/10 text-destructive',
  },
  {
    icon: Activity,
    title: 'Cardiology',
    description: 'Comprehensive heart care including diagnostics, treatment, and cardiac rehabilitation.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Expert care for brain and nervous system conditions with advanced diagnostic tools.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents in a child-friendly environment.',
    color: 'bg-warning/10 text-warning',
  },
  {
    icon: Bone,
    title: 'Orthopedics',
    description: 'Treatment for bones, joints, muscles, and spine conditions with minimally invasive techniques.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Stethoscope,
    title: 'General Medicine',
    description: 'Complete primary care services for routine checkups and chronic disease management.',
    color: 'bg-success/10 text-success',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-muted-foreground">
            We offer a wide range of medical services to meet all your healthcare needs 
            with the highest standards of quality and compassion.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="medical-card group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
