import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jennifer Martinez',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'The doctors at MediCare genuinely care about their patients. My treatment plan was personalized, and the weekly health reports helped me track my progress effectively.',
  },
  {
    name: 'David Thompson',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Booking appointments is so easy with MediCare. I can see available slots, book instantly, and get reminders. The digital prescriptions are a game-changer!',
  },
  {
    name: 'Sarah Chen',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    text: 'The health analytics dashboard is incredible. I can monitor my blood pressure, sugar levels, and get AI-powered insights. It feels like having a personal health assistant.',
  },
  {
    name: 'Michael Roberts',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 5,
    text: 'As someone managing a chronic condition, the 24/7 doctor support has been invaluable. I can get medical advice anytime, anywhere.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground">
            Real stories from real patients who have experienced the MediCare difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="medical-card relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
