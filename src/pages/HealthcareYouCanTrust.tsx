import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Shield, Award, Brain, Lock, Heart, Users, 
  CheckCircle2, ArrowRight, FileCheck, Stethoscope,
  Building2, Globe, BadgeCheck
} from 'lucide-react';

const trustFeatures = [
  {
    icon: Award,
    title: 'Certified & Verified Doctors',
    description: 'Every doctor on MediCare is board-certified with verified credentials. We perform rigorous background checks and verify all medical licenses.',
    highlights: ['100% Verified Credentials', 'Board Certified', 'Regular Re-verification'],
  },
  {
    icon: Shield,
    title: 'Secure Medical Data Handling',
    description: 'Your health data is protected with enterprise-grade encryption. We follow HIPAA compliance standards for all patient information.',
    highlights: ['256-bit Encryption', 'HIPAA Compliant', 'Regular Security Audits'],
  },
  {
    icon: Brain,
    title: 'AI-Driven Health Reports',
    description: 'Our advanced AI analyzes your health metrics to provide personalized insights and early warning signs for potential health issues.',
    highlights: ['Weekly Health Reports', 'Trend Analysis', 'Personalized Insights'],
  },
  {
    icon: Heart,
    title: 'Patient-First Care Approach',
    description: 'We prioritize your health and well-being above all else. Our platform is designed to make healthcare accessible and convenient.',
    highlights: ['24/7 Support', 'Easy Appointments', 'Follow-up Care'],
  },
];

const complianceStandards = [
  { icon: Lock, title: 'Data Privacy', description: 'Strict data privacy protocols' },
  { icon: FileCheck, title: 'Medical Standards', description: 'Adherence to medical best practices' },
  { icon: Globe, title: 'Global Standards', description: 'International healthcare standards' },
  { icon: BadgeCheck, title: 'Quality Assurance', description: 'Continuous quality monitoring' },
];

const stats = [
  { value: '10,000+', label: 'Verified Doctors' },
  { value: '99.9%', label: 'Data Security Uptime' },
  { value: '500K+', label: 'Happy Patients' },
  { value: '50+', label: 'Medical Specialties' },
];

export default function HealthcareYouCanTrust() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Why Choose MediCare</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Healthcare You Can <span className="text-primary">Trust</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                At MediCare, we're committed to providing safe, secure, and reliable healthcare 
                services. Your health and trust are our top priorities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/doctors">
                  <Button size="lg" className="gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Find a Doctor
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="gap-2">
                    Learn How It Works
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Features */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Our Commitment to You
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've built MediCare with your safety and trust in mind. Here's what sets us apart.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {trustFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-sm"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Compliance & Safety Standards
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We adhere to the highest standards of medical and data security compliance.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {complianceStandards.map((standard) => (
                <div
                  key={standard.title}
                  className="text-center p-6 rounded-xl bg-background border hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <standard.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{standard.title}</h3>
                  <p className="text-sm text-muted-foreground">{standard.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Experience Trusted Healthcare?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join millions of patients who trust MediCare for their healthcare needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="gap-2">
                    <Users className="w-5 h-5" />
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
