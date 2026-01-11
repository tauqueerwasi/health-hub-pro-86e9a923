import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Award, Clock } from 'lucide-react';

const stats = [
  { icon: Users, value: '50,000+', label: 'Patients Served' },
  { icon: Award, value: '200+', label: 'Expert Doctors' },
  { icon: Clock, value: '24/7', label: 'Emergency Care' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero-bg opacity-95" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 text-sm font-medium mb-6 animate-fade-in">
              🏥 Trusted Healthcare Partner
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Your Health Is Our
              <span className="block">Top Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Experience world-class healthcare with compassionate doctors, 
              cutting-edge technology, and personalized treatment plans tailored just for you.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/signup">
                <Button variant="heroOutline" size="xl">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="heroOutline" size="xl">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-secondary-light" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block animate-float">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=700&fit=crop"
              alt="Medical professionals"
              className="relative rounded-3xl shadow-2xl w-full max-w-md mx-auto"
            />
            
            {/* Floating card */}
            <div className="absolute -left-8 bottom-20 glass-effect rounded-2xl p-4 shadow-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-success flex items-center justify-center">
                  <Award className="w-6 h-6 text-success-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Top Rated</p>
                  <p className="text-sm text-muted-foreground">4.9/5 Patient Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background"/>
        </svg>
      </div>
    </section>
  );
}
