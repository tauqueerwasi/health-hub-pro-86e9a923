import { Clock, Shield, Award, Brain, Calendar, HeartPulse } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '24/7 Doctor Support',
    description: 'Round-the-clock access to medical professionals for consultations and emergencies.',
  },
  {
    icon: Shield,
    title: 'Secure Health Records',
    description: 'Your medical data is encrypted and protected with enterprise-grade security.',
  },
  {
    icon: Award,
    title: 'Certified Doctors',
    description: 'All our physicians are board-certified with verified credentials.',
  },
  {
    icon: Brain,
    title: 'AI-Driven Reports',
    description: 'Smart health analytics and weekly reports powered by artificial intelligence.',
  },
  {
    icon: Calendar,
    title: 'Easy Appointments',
    description: 'Book appointments instantly with real-time availability checking.',
  },
  {
    icon: HeartPulse,
    title: 'Health Tracking',
    description: 'Monitor vital signs and health metrics with intuitive dashboards.',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Healthcare You Can Trust
          </h2>
          <p className="text-muted-foreground">
            Experience the difference with our patient-centered approach and cutting-edge technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group flex gap-4 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
