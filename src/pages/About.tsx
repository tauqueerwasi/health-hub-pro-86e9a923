import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Target, Eye, Heart, Shield, Lightbulb, Users, Cloud, Brain, FileText, CheckCircle, Award } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Trust', description: 'Building lasting relationships through transparent healthcare practices.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Embracing cutting-edge technology for better patient outcomes.' },
  { icon: Users, title: 'Patient-First', description: 'Every decision centered around patient well-being.' },
  { icon: Shield, title: 'Data Security', description: 'Enterprise-grade protection for your health information.' },
];

const techStack = [
  { icon: Brain, title: 'AI-Based Analytics', description: 'Advanced algorithms for predictive health insights.' },
  { icon: Cloud, title: 'Secure Cloud Records', description: 'Encrypted cloud infrastructure accessible anywhere.' },
  { icon: FileText, title: 'Smart Reporting', description: 'Automated weekly reports with visual analytics.' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="gradient-hero-bg text-primary-foreground py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About MediCare</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Transforming healthcare through technology and compassion.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Who We Are</span>
                <h2 className="text-3xl font-heading font-bold mb-6">A Digital Healthcare Platform</h2>
                <p className="text-muted-foreground mb-4">MediCare bridges the gap between patients and healthcare providers with technology that makes healthcare accessible and personalized.</p>
                <div className="grid grid-cols-2 gap-3">
                  {['24/7 Support', 'Certified Doctors', 'Secure Records', 'Easy Booking'].map(item => (
                    <div key={item} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /><span className="text-sm">{item}</span></div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=500&fit=crop" alt="Hospital" className="rounded-2xl shadow-xl" />
                <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-lg border">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-bold text-xl">10+</p>
                      <p className="text-xs text-muted-foreground">Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container grid md:grid-cols-2 gap-8">
            <div className="medical-card">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">Make quality healthcare accessible, affordable, and data-driven for everyone.</p>
            </div>
            <div className="medical-card">
              <Eye className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">Become a globally trusted healthcare ecosystem transforming how people experience healthcare.</p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {values.map(v => (
                <div key={v.title} className="medical-card text-center">
                  <v.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Healthcare Technology</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {techStack.map(t => (
                <div key={t.title} className="medical-card">
                  <t.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 gradient-hero-bg text-primary-foreground">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><p className="text-4xl font-bold">10,000+</p><p className="text-primary-foreground/70">Patients</p></div>
            <div><p className="text-4xl font-bold">300+</p><p className="text-primary-foreground/70">Doctors</p></div>
            <div><p className="text-4xl font-bold">50+</p><p className="text-primary-foreground/70">Departments</p></div>
            <div><p className="text-4xl font-bold">99%</p><p className="text-primary-foreground/70">Satisfaction</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}