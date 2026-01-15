import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doctors } from '@/lib/mock-data';
import { useDoctorSelection } from '@/lib/doctor-selection-context';
import { useAuth } from '@/lib/auth-context';
import { useAuthIntent } from '@/lib/auth-intent-context';
import { 
  Star, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowLeft, 
  Calendar,
  Award,
  MapPin,
  Phone,
  Mail,
  BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedDoctor: globalSelectedDoctor, selectDoctor } = useDoctorSelection();
  const { user } = useAuth();
  const { saveIntentAndRedirect } = useAuthIntent();

  const doctor = doctors.find((d) => d.id === id);
  const isSelected = globalSelectedDoctor?.id === doctor?.id;

  if (!doctor) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Doctor Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The doctor you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/doctors">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Doctors
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSelectDoctor = () => {
    selectDoctor(doctor);
    toast.success(`Dr. ${doctor.name.replace('Dr. ', '')} selected!`, {
      description: 'You can now book an appointment with this doctor.',
    });
  };

  const handleBookAppointment = () => {
    selectDoctor(doctor);
    if (user) {
      // Navigate to appointment booking page, NOT back to doctor page
      navigate('/appointments/book');
    } else {
      // Save intent and redirect to login
      saveIntentAndRedirect('/appointments/book', {
        doctorId: doctor.id,
        specialty: doctor.specialty,
        sourcePage: `/doctors/${doctor.id}`,
      });
      toast.info('Please login to book an appointment');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gradient-hero-bg text-primary-foreground py-12">
          <div className="container">
            <Link 
              to="/doctors" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Doctors
            </Link>
            <h1 className="text-3xl md:text-4xl font-heading font-bold">Doctor Profile</h1>
          </div>
        </section>

        {/* Doctor Profile Card */}
        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Profile Card */}
              <div className="lg:col-span-2">
                <div className="medical-card">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Section */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-primary/10 shadow-lg"
                      />
                      {doctor.available ? (
                        <span className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full shadow-md">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Available
                        </span>
                      ) : (
                        <span className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full shadow-md">
                          <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                          Unavailable
                        </span>
                      )}
                      {isSelected && (
                        <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-5 h-5 text-primary-foreground" />
                        </span>
                      )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-1">
                            {doctor.name}
                          </h2>
                          <p className="text-primary font-medium text-lg">{doctor.specialty}</p>
                          <p className="text-muted-foreground">{doctor.department} Department</p>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          <BadgeCheck className="w-4 h-4 mr-1" />
                          Verified
                        </Badge>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl mb-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="w-5 h-5 fill-warning text-warning" />
                            <span className="text-xl font-bold">{doctor.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center border-x border-border">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="text-xl font-bold">{doctor.experience}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Years Exp.</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="w-5 h-5 text-secondary" />
                            <span className="text-xl font-bold">{doctor.patients}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Patients</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          size="lg"
                          variant={isSelected ? 'secondary' : 'outline'}
                          onClick={handleSelectDoctor}
                          disabled={!doctor.available}
                          className="flex-1 min-w-[140px]"
                        >
                          {isSelected ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Selected
                            </>
                          ) : (
                            'Select Doctor'
                          )}
                        </Button>
                        <Button
                          size="lg"
                          onClick={handleBookAppointment}
                          disabled={!doctor.available}
                          className="flex-1 min-w-[140px]"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="medical-card mt-6">
                  <h3 className="text-xl font-heading font-semibold mb-4">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {doctor.name} is a highly skilled {doctor.specialty.toLowerCase()} with {doctor.experience} years of experience 
                    in the {doctor.department} department. Known for providing exceptional patient care and utilizing 
                    the latest medical advancements, {doctor.name.split(' ')[0]} has successfully treated over {doctor.patients} patients. 
                    Committed to continuous learning and patient-centered care, making healthcare accessible and effective for all.
                  </p>
                </div>

                {/* Qualifications */}
                <div className="medical-card mt-6">
                  <h3 className="text-xl font-heading font-semibold mb-4">Qualifications & Expertise</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Medical Degree</p>
                        <p className="text-sm text-muted-foreground">MBBS, MD - {doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Board Certified</p>
                        <p className="text-sm text-muted-foreground">{doctor.department} Specialist</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Experience</p>
                        <p className="text-sm text-muted-foreground">{doctor.experience}+ years in practice</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Patients Treated</p>
                        <p className="text-sm text-muted-foreground">{doctor.patients}+ successful cases</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Availability Card */}
                <div className="medical-card">
                  <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Available Slots
                  </h3>
                  <div className="space-y-2">
                    {doctor.schedule.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="medical-card">
                  <h3 className="text-lg font-heading font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{doctor.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">+1 (555) 000-0000</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">MediCare Hospital, Building A</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="medical-card bg-primary/5 border-primary/20">
                  <h3 className="text-lg font-heading font-semibold mb-3">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have questions about booking or treatments? Our support team is here to help.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
