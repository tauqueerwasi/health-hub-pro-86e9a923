import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, MapPin, Stethoscope, Calendar, CreditCard, 
  Activity, FileText, ArrowRight, CheckCircle2, Play
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign Up / Login',
    description: 'Create your free account in just a few minutes. Provide basic details and set up your health profile for personalized care.',
    details: [
      'Quick registration with email or phone',
      'Secure authentication',
      'Profile customization',
      'Health history setup',
    ],
    color: 'bg-primary',
  },
  {
    number: '02',
    icon: MapPin,
    title: 'Choose City & Specialty',
    description: 'Select your location and the medical specialty you need. Our smart system auto-detects your city for convenience.',
    details: [
      'Auto location detection',
      'Multiple city support',
      '50+ medical specialties',
      'Filtered search options',
    ],
    color: 'bg-secondary',
  },
  {
    number: '03',
    icon: Stethoscope,
    title: 'Select Best Doctor',
    description: 'Browse through verified doctors, check ratings, experience, and availability. Read reviews to make an informed choice.',
    details: [
      'Verified doctor profiles',
      'Patient reviews & ratings',
      'Experience & qualifications',
      'Real-time availability',
    ],
    color: 'bg-accent',
  },
  {
    number: '04',
    icon: Calendar,
    title: 'Book Appointment',
    description: 'Choose your preferred date, time, and consultation type. Get instant confirmation for your appointment.',
    details: [
      'Flexible scheduling',
      'Online & in-clinic options',
      'Instant confirmation',
      'Easy rescheduling',
    ],
    color: 'bg-warning',
  },
  {
    number: '05',
    icon: CreditCard,
    title: 'Make Payment',
    description: 'Complete payment securely using UPI, credit/debit cards, or digital wallets. Transaction is encrypted and safe.',
    details: [
      'Multiple payment options',
      'Secure transactions',
      'Digital receipts',
      'Refund protection',
    ],
    color: 'bg-success',
  },
  {
    number: '06',
    icon: Activity,
    title: 'Track Health',
    description: 'Monitor your vital signs and health metrics through our intuitive dashboard. Set reminders for medications and follow-ups.',
    details: [
      'Health metrics dashboard',
      'Trend visualization',
      'Medication reminders',
      'Goal setting',
    ],
    color: 'bg-primary',
  },
  {
    number: '07',
    icon: FileText,
    title: 'Download Reports',
    description: 'Access and download your weekly health reports, prescriptions, and medical records anytime, anywhere.',
    details: [
      'Weekly PDF reports',
      'Prescription history',
      'Lab result uploads',
      'Shareable documents',
    ],
    color: 'bg-secondary',
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                <Play className="w-5 h-5" />
                <span className="font-medium">Your Health Journey</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                How <span className="text-primary">MediCare</span> Works
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get started with MediCare in simple steps. From sign-up to health tracking, 
                we've made healthcare accessible and easy.
              </p>
              <Link to="/appointments/book">
                <Button size="lg" className="gap-2">
                  Book Your First Appointment
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="relative">
              {/* Vertical Line */}
              <div className="hidden md:block absolute left-[39px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />
              
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className="relative flex flex-col md:flex-row gap-6 md:gap-10 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 flex items-start">
                      <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center text-white relative z-10 group-hover:scale-110 transition-transform shadow-lg`}>
                        <step.icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-8 md:pb-0">
                      <div className="bg-card border rounded-2xl p-6 md:p-8 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl font-bold text-muted-foreground/30">
                            {step.number}
                          </span>
                          <h3 className="text-xl md:text-2xl font-heading font-bold">
                            {step.title}
                          </h3>
                        </div>
                        
                        <p className="text-muted-foreground mb-6">
                          {step.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-3">
                          {step.details.map((detail) => (
                            <div
                              key={detail}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Start Your Health Journey?
              </h2>
              <p className="text-white/80 mb-8">
                Join thousands of patients who are already experiencing better healthcare with MediCare.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <UserPlus className="w-5 h-5" />
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Browse Doctors
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
