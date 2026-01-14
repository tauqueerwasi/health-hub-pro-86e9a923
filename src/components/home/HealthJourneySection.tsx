import { UserPlus, Stethoscope, Activity, FileText, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Sign Up',
    description: 'Create your account in minutes with a simple registration process.',
  },
  {
    icon: Stethoscope,
    step: '02',
    title: 'Choose Doctor',
    description: 'Browse our network of specialists and select the right doctor for you.',
  },
  {
    icon: Activity,
    step: '03',
    title: 'Track Health',
    description: 'Monitor your vitals and health metrics with our intuitive dashboard.',
  },
  {
    icon: FileText,
    step: '04',
    title: 'Get Reports',
    description: 'Receive automated weekly health reports with personalized insights.',
  },
];

import { Link } from 'react-router-dom';

export function HealthJourneySection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <Link to="/how-it-works" className="block text-center max-w-2xl mx-auto mb-16 group">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Your Health Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Get started with MediCare in four simple steps.
          </p>
        </Link>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="medical-card text-center relative z-10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    Step {step.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mt-4 mb-4">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-primary z-20 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
