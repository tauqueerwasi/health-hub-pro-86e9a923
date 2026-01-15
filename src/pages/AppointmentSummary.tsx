import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  User,
  Video,
  Building2,
  Edit,
  X,
  ArrowRight
} from 'lucide-react';
import { useAppointment } from '@/lib/appointment-context';
import { useDoctorSelection } from '@/lib/doctor-selection-context';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export default function AppointmentSummary() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { appointmentData, resetAppointment } = useAppointment();
  const { selectedDoctor, clearSelection } = useDoctorSelection();

  const doctor = appointmentData.doctor || selectedDoctor;

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-12">
          <div className="container max-w-2xl text-center py-16">
            <h1 className="text-2xl font-bold mb-4">No Appointment Data</h1>
            <p className="text-muted-foreground mb-6">
              Please start the booking process from the doctors page.
            </p>
            <Link to="/doctors">
              <Button>Find a Doctor</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleProceedToPayment = () => {
    if (!appointmentData.date || !appointmentData.time) {
      toast.error('Please complete appointment details first');
      navigate('/appointments/book');
      return;
    }
    navigate('/appointments/book');
  };

  const handleEditAppointment = () => {
    navigate('/appointments/book');
  };

  const handleCancelAppointment = () => {
    resetAppointment();
    clearSelection();
    toast.info('Appointment cancelled');
    navigate('/doctors');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container max-w-2xl">
          {/* Back Navigation */}
          <Link 
            to="/appointments/book" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Booking
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Appointment Summary</h1>
            <p className="text-muted-foreground">
              Review your appointment details before proceeding
            </p>
          </div>

          {/* Doctor Card */}
          <Card className="border-2 border-primary/20 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{doctor.name}</h2>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground">{doctor.department} Department</p>
                    </div>
                    <Badge variant="secondary">{doctor.experience} yrs exp.</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Appointment Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="font-medium">{appointmentData.city || 'Not selected'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <User className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Specialty</p>
                    <p className="font-medium">{appointmentData.specialty || doctor.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {appointmentData.date 
                        ? new Date(appointmentData.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'Not selected'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <Clock className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{appointmentData.time || 'Not selected'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  {appointmentData.consultationType === 'online' ? (
                    <Video className="w-5 h-5 text-primary" />
                  ) : (
                    <Building2 className="w-5 h-5 text-primary" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Consultation Type</p>
                    <p className="font-medium capitalize">{appointmentData.consultationType}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span>₹{appointmentData.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span>₹0</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-xl font-bold text-primary">₹{appointmentData.fee}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Payment Status: {appointmentData.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                </Badge>
                {appointmentData.transactionId && (
                  <span className="font-mono text-xs">
                    TXN: {appointmentData.transactionId}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="flex-1 gap-2"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2"
              onClick={handleEditAppointment}
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button 
              size="lg" 
              variant="destructive"
              className="gap-2"
              onClick={handleCancelAppointment}
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
