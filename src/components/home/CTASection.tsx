import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, CheckCircle } from 'lucide-react';

const benefits = [
  'Expert medical professionals',
  'State-of-the-art facilities',
  'Personalized care plans',
  'Quick appointment scheduling',
];

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-hero-bg p-8 md:p-16">
          {/* Pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-6">
                Schedule an appointment with one of our specialists today and 
                start your journey to better health.
              </p>
              
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-light" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button size="lg" variant="heroOutline">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </Button>
                </Link>
                <a href="tel:1800MEDICARE">
                  <Button size="lg" variant="heroOutline">
                    <Phone className="w-5 h-5" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&h=400&fit=crop"
                alt="Medical consultation"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
