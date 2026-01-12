import { Users, UserCheck, Building2, ThumbsUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Patients', description: 'Trusted us with their health' },
  { icon: UserCheck, value: '300+', label: 'Doctors', description: 'Expert medical professionals' },
  { icon: Building2, value: '50+', label: 'Departments', description: 'Specialized care units' },
  { icon: ThumbsUp, value: '99%', label: 'Satisfaction', description: 'Patient satisfaction rate' },
];

export function StatsSection() {
  return (
    <section className="py-16 gradient-hero-bg">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center text-primary-foreground animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7" />
              </div>
              <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
              <p className="font-medium mb-1">{stat.label}</p>
              <p className="text-sm text-primary-foreground/70">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
