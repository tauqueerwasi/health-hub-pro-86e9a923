import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Award, Users, Heart, Clock, CheckCircle } from 'lucide-react';

const stats = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '200+', label: 'Expert Doctors' },
  { value: '50,000+', label: 'Happy Patients' },
  { value: '15+', label: 'Specializations' },
];

const values = [
  { icon: Heart, title: 'Compassionate Care', description: 'We treat every patient with empathy, respect, and personalized attention.' },
  { icon: Award, title: 'Excellence', description: 'We maintain the highest standards in medical care and patient safety.' },
  { icon: Users, title: 'Teamwork', description: 'Our multidisciplinary teams collaborate for the best patient outcomes.' },
  { icon: Clock, title: '24/7 Availability', description: 'Round-the-clock emergency services and patient support.' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero-bg text-primary-foreground py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About MediCare</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              For over 25 years, we've been committed to providing world-class healthcare 
              services with compassion, innovation, and excellence.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-heading font-bold gradient-text mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  A Legacy of Healing and Innovation
                </h2>
                <p className="text-muted-foreground mb-6">
                  Founded in 1998, MediCare began with a simple mission: to provide accessible, 
                  high-quality healthcare to our community. What started as a small clinic has 
                  grown into a comprehensive healthcare network.
                </p>
                <p className="text-muted-foreground mb-6">
                  Today, we operate state-of-the-art facilities equipped with the latest 
                  medical technology, staffed by over 200 dedicated healthcare professionals 
                  who share our commitment to patient-centered care.
                </p>
                <ul className="space-y-3">
                  {['NABH Accredited Hospital', 'JCI Quality Certification', 'ISO 9001:2015 Certified'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
                  alt="Hospital building"
                  className="rounded-3xl shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-xl border border-border">
                  <p className="text-3xl font-bold gradient-text">25+</p>
                  <p className="text-sm text-muted-foreground">Years Serving Community</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">What Drives Us</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="medical-card text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
