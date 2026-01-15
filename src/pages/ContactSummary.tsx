import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Calendar, ArrowLeft, MessageCircle, Clock, MapPin, Stethoscope } from 'lucide-react';
import { useDoctorSelection } from '@/lib/doctor-selection-context';
import { useAuth } from '@/lib/auth-context';
import { useAuthIntent } from '@/lib/auth-intent-context';
import { toast } from 'sonner';

const CONTACT_NUMBER = '7667128903';

export default function ContactSummary() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedDoctor } = useDoctorSelection();
  const { saveIntentAndRedirect } = useAuthIntent();

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_NUMBER}`;
  };

  const handleBookAppointment = () => {
    if (user) {
      navigate('/appointments/book');
    } else {
      saveIntentAndRedirect('/appointments/book', {
        doctorId: selectedDoctor?.id,
        sourcePage: '/contact-summary',
      });
      toast.info('Please login to book an appointment');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container max-w-3xl">
          {/* Back Navigation */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Contact Summary</h1>
            <p className="text-muted-foreground">
              Get in touch with our healthcare team
            </p>
          </div>

          {/* Main Contact Card */}
          <Card className="border-2 border-primary/20 mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold mb-2">24/7 Helpline</h2>
                <a 
                  href={`tel:${CONTACT_NUMBER}`}
                  className="text-3xl font-bold text-primary hover:underline"
                >
                  📞 {CONTACT_NUMBER}
                </a>
                <p className="text-muted-foreground mt-2">
                  Available round the clock for medical assistance
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="w-full gap-2"
                  onClick={handleCall}
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleBookAppointment}
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Button>
              </div>

              {/* Contact Reasons */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg mb-4">We can help you with:</h3>
                {[
                  { icon: Calendar, text: 'Appointment Scheduling & Rescheduling' },
                  { icon: Stethoscope, text: 'Doctor Consultation Queries' },
                  { icon: MessageCircle, text: 'Medical Report Assistance' },
                  { icon: Clock, text: 'Emergency Support' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Doctor Section */}
          {selectedDoctor && (
            <Card className="border-2 mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  Selected Doctor
                </h3>
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedDoctor.avatar} 
                    alt={selectedDoctor.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{selectedDoctor.name}</h4>
                    <p className="text-sm text-primary">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.department} Department</p>
                  </div>
                  <Button onClick={handleBookAppointment}>
                    Book with this Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Our Location
              </h3>
              <p className="text-muted-foreground mb-4">
                123 Healthcare Avenue, Medical District, HC 12345
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Weekdays</p>
                  <p className="text-muted-foreground">8:00 AM - 8:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Weekends</p>
                  <p className="text-muted-foreground">9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
