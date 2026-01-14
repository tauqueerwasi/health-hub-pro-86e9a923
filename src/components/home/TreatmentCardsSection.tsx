import { 
  Heart, 
  Brain, 
  Bone, 
  Baby, 
  Stethoscope,
  Activity,
  Smile,
  Eye,
  Pill,
  Dumbbell
} from 'lucide-react';
import { Link } from 'react-router-dom';

const treatments = [
  { icon: Heart, title: 'Cardiology', description: 'Heart & cardiovascular care', color: 'bg-destructive/10 text-destructive' },
  { icon: Brain, title: 'Neurology', description: 'Brain & nervous system', color: 'bg-primary/10 text-primary' },
  { icon: Bone, title: 'Orthopedics', description: 'Bone & joint treatment', color: 'bg-secondary/10 text-secondary' },
  { icon: Baby, title: 'Pediatrics', description: 'Child healthcare', color: 'bg-warning/10 text-warning' },
  { icon: Stethoscope, title: 'Gynecology', description: "Women's health", color: 'bg-accent/10 text-accent' },
  { icon: Smile, title: 'Dermatology', description: 'Skin care & treatment', color: 'bg-success/10 text-success' },
  { icon: Activity, title: 'Diabetology', description: 'Diabetes management', color: 'bg-primary/10 text-primary' },
  { icon: Brain, title: 'Mental Health', description: 'Psychological wellness', color: 'bg-secondary/10 text-secondary' },
  { icon: Pill, title: 'General Medicine', description: 'Primary healthcare', color: 'bg-accent/10 text-accent' },
  { icon: Dumbbell, title: 'Physiotherapy', description: 'Physical rehabilitation', color: 'bg-warning/10 text-warning' },
];

export function TreatmentCardsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Treatment & Care
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Comprehensive Medical Specialties
          </h2>
          <p className="text-muted-foreground">
            From routine check-ups to specialized treatments, we offer complete healthcare solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {treatments.map((treatment, index) => (
            <Link
              key={treatment.title}
              to={`/specialties/${treatment.title.toLowerCase().replace(/\s+/g, '-')}/mumbai`}
              className="medical-card text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${treatment.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <treatment.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-semibold text-sm mb-1">{treatment.title}</h3>
              <p className="text-xs text-muted-foreground">{treatment.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
