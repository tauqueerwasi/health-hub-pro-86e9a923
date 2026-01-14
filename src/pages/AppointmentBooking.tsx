import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, Check, CreditCard, Smartphone, Wallet,
  Video, Building2, Clock, Star, Users, ArrowLeft, ArrowRight,
  CheckCircle2, XCircle, Loader2, Calendar as CalendarIcon
} from 'lucide-react';
import { useAppointment, cities, specialties } from '@/lib/appointment-context';
import { useDoctorSelection } from '@/lib/doctor-selection-context';
import { getDoctorsBySpecialtyAndCity, ExtendedDoctor } from '@/lib/extended-mock-data';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const steps = [
  { id: 1, title: 'Location & Specialty', icon: MapPin },
  { id: 2, title: 'Select Doctor', icon: Users },
  { id: 3, title: 'Date & Time', icon: CalendarIcon },
  { id: 4, title: 'Payment', icon: CreditCard },
  { id: 5, title: 'Confirmation', icon: CheckCircle2 },
];

export default function AppointmentBooking() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { selectedDoctor: preSelectedDoctor, selectDoctor: setGlobalDoctor } = useDoctorSelection();
  const {
    appointmentData,
    setCity,
    setSpecialty,
    setDoctor,
    setDate,
    setTime,
    setConsultationType,
    setPaymentMethod,
    completePayment,
    resetAppointment,
    detectedCity,
  } = useAppointment();

  const [currentStep, setCurrentStep] = useState(1);
  const [doctors, setDoctors] = useState<ExtendedDoctor[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null);

  // Initialize with pre-selected doctor if available
  useEffect(() => {
    if (preSelectedDoctor) {
      setDoctor(preSelectedDoctor);
      setCity(appointmentData.city || detectedCity);
      setSpecialty(preSelectedDoctor.department);
      setCurrentStep(3); // Skip to date selection
    } else {
      setCity(detectedCity);
    }
  }, []);

  // Fetch doctors when city/specialty changes
  useEffect(() => {
    if (appointmentData.city && appointmentData.specialty) {
      const filtered = getDoctorsBySpecialtyAndCity(
        appointmentData.specialty.toLowerCase().replace(/\s+/g, '-'),
        appointmentData.city
      );
      setDoctors(filtered);
    }
  }, [appointmentData.city, appointmentData.specialty]);

  const handleNext = () => {
    if (currentStep === 1 && (!appointmentData.city || !appointmentData.specialty)) {
      toast({ title: 'Please select city and specialty', variant: 'destructive' });
      return;
    }
    if (currentStep === 2 && !appointmentData.doctor) {
      toast({ title: 'Please select a doctor', variant: 'destructive' });
      return;
    }
    if (currentStep === 3 && (!appointmentData.date || !appointmentData.time)) {
      toast({ title: 'Please select date and time', variant: 'destructive' });
      return;
    }
    if (currentStep === 4 && !appointmentData.paymentMethod) {
      toast({ title: 'Please select payment method', variant: 'destructive' });
      return;
    }

    if (currentStep === 4) {
      handlePayment();
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    const success = await completePayment();
    setIsProcessing(false);
    setPaymentResult(success ? 'success' : 'failed');
    
    if (success) {
      setCurrentStep(5);
      toast({ title: 'Payment successful!', description: 'Your appointment has been booked.' });
    } else {
      toast({ title: 'Payment failed', description: 'Please try again.', variant: 'destructive' });
    }
  };

  const handleSelectDoctor = (doctor: ExtendedDoctor) => {
    setDoctor(doctor);
    setGlobalDoctor(doctor);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setDate(date.toISOString().split('T')[0]);
    }
  };

  const handleFinish = () => {
    resetAppointment();
    if (user) {
      navigate('/patient');
    } else {
      navigate('/');
    }
  };

  const progressPercent = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container max-w-4xl">
          {/* Progress Header */}
          <div className="py-8">
            <h1 className="text-3xl font-heading font-bold mb-2 text-center">Book Appointment</h1>
            <p className="text-muted-foreground text-center mb-8">
              Complete the steps below to book your appointment
            </p>
            
            <Progress value={progressPercent} className="h-2 mb-6" />
            
            <div className="hidden md:flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : currentStep === step.id 
                        ? 'bg-primary/20 text-primary border-2 border-primary' 
                        : 'bg-muted'
                  }`}>
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className="text-sm font-medium hidden lg:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="border-2">
            <CardContent className="p-6 md:p-8">
              
              {/* Step 1: Location & Specialty */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Select Location & Specialty
                    </CardTitle>
                  </CardHeader>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Select value={appointmentData.city} onValueChange={setCity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Auto-detected: {detectedCity}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Specialty</Label>
                      <Select value={appointmentData.specialty} onValueChange={setSpecialty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map(spec => (
                            <SelectItem key={spec.name} value={spec.name}>{spec.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Doctor */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Select Doctor
                    </CardTitle>
                  </CardHeader>
                  
                  {doctors.length === 0 ? (
                    <div className="text-center py-8 bg-muted/30 rounded-xl">
                      <p className="text-muted-foreground">No doctors found. Try a different specialty or city.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 max-h-96 overflow-y-auto">
                      {doctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          onClick={() => handleSelectDoctor(doctor)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            appointmentData.doctor?.id === doctor.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={doctor.avatar}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{doctor.name}</h3>
                                  <p className="text-sm text-primary">{doctor.specialty}</p>
                                </div>
                                {appointmentData.doctor?.id === doctor.id && (
                                  <CheckCircle2 className="w-5 h-5 text-primary" />
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-warning fill-warning" />
                                  {doctor.rating}
                                </span>
                                <span>{doctor.experience} years exp.</span>
                                <span className="font-semibold text-primary">₹{doctor.consultationFee}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Date & Time */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      Select Date & Time
                    </CardTitle>
                  </CardHeader>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label className="mb-3 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-xl border"
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="mb-3 block">Consultation Type</Label>
                        <RadioGroup
                          value={appointmentData.consultationType}
                          onValueChange={(v) => setConsultationType(v as 'online' | 'in-clinic')}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online" className="flex items-center gap-1 cursor-pointer">
                              <Video className="w-4 h-4" /> Online
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-clinic" id="in-clinic" />
                            <Label htmlFor="in-clinic" className="flex items-center gap-1 cursor-pointer">
                              <Building2 className="w-4 h-4" /> In-Clinic
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label className="mb-3 block">Select Time Slot</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot}
                              variant={appointmentData.time === slot ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setTime(slot)}
                              className="text-xs"
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment
                    </CardTitle>
                  </CardHeader>
                  
                  {/* Summary */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Appointment Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Doctor:</span>
                      <span className="font-medium">{appointmentData.doctor?.name}</span>
                      <span className="text-muted-foreground">Specialty:</span>
                      <span>{appointmentData.specialty}</span>
                      <span className="text-muted-foreground">Date:</span>
                      <span>{appointmentData.date}</span>
                      <span className="text-muted-foreground">Time:</span>
                      <span>{appointmentData.time}</span>
                      <span className="text-muted-foreground">Type:</span>
                      <span className="capitalize">{appointmentData.consultationType}</span>
                    </div>
                    <div className="border-t mt-3 pt-3 flex justify-between items-center">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-2xl font-bold text-primary">₹{appointmentData.fee}</span>
                    </div>
                  </div>
                  
                  {/* Payment Methods */}
                  <div>
                    <Label className="mb-3 block">Select Payment Method</Label>
                    <RadioGroup
                      value={appointmentData.paymentMethod || ''}
                      onValueChange={(v) => setPaymentMethod(v as 'upi' | 'card' | 'wallet')}
                      className="grid gap-3"
                    >
                      {[
                        { value: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
                        { value: 'card', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                        { value: 'wallet', label: 'Wallet', icon: Wallet, desc: 'MediCare Wallet Balance' },
                      ].map((method) => (
                        <div
                          key={method.value}
                          className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            appointmentData.paymentMethod === method.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setPaymentMethod(method.value as 'upi' | 'card' | 'wallet')}
                        >
                          <RadioGroupItem value={method.value} id={method.value} />
                          <method.icon className="w-6 h-6 text-primary" />
                          <div className="flex-1">
                            <Label htmlFor={method.value} className="font-medium cursor-pointer">
                              {method.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">{method.desc}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {paymentResult === 'failed' && (
                    <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-xl">
                      <XCircle className="w-5 h-5" />
                      <span>Payment failed. Please try again.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 5 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Appointment Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your appointment has been successfully booked.
                  </p>
                  
                  <div className="bg-muted/50 rounded-xl p-6 text-left max-w-md mx-auto mb-8">
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                      <img
                        src={appointmentData.doctor?.avatar}
                        alt={appointmentData.doctor?.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{appointmentData.doctor?.name}</h3>
                        <p className="text-sm text-primary">{appointmentData.specialty}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{appointmentData.date}</span>
                      <span className="text-muted-foreground">Time:</span>
                      <span>{appointmentData.time}</span>
                      <span className="text-muted-foreground">Type:</span>
                      <span className="capitalize">{appointmentData.consultationType}</span>
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-mono text-xs">{appointmentData.transactionId}</span>
                      <span className="text-muted-foreground">Amount Paid:</span>
                      <span className="font-bold text-primary">₹{appointmentData.fee}</span>
                    </div>
                  </div>
                  
                  <Badge variant="default" className="bg-success mb-8">
                    <Check className="w-3 h-3 mr-1" /> Payment Successful
                  </Badge>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 && currentStep < 5 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                
                {currentStep < 5 ? (
                  <Button onClick={handleNext} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : currentStep === 4 ? (
                      <>
                        Pay ₹{appointmentData.fee}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button onClick={handleFinish}>
                    {user ? 'Go to Dashboard' : 'Back to Home'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
