import { Navigate, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Pill,
  Activity,
  Settings,
  Heart,
  Droplets,
  Scale,
  Download,
  Stethoscope,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useDoctorSelection } from '@/lib/doctor-selection-context';
import { useBookedAppointments } from '@/lib/booked-appointments-context';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { HealthChart } from '@/components/dashboard/HealthChart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { medicalRecords, weeklyReports, healthMetrics } from '@/lib/mock-data';

const navItems = [
  { href: '/patient', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patient/appointments', label: 'Appointments', icon: Calendar },
  { href: '/patient/records', label: 'Medical Records', icon: FileText },
  { href: '/patient/medications', label: 'Medications', icon: Pill },
  { href: '/patient/reports', label: 'Health Reports', icon: Activity },
  { href: '/patient/settings', label: 'Settings', icon: Settings },
];

export default function PatientDashboard() {
  const { user, isLoading } = useAuth();
  const { selectedDoctor } = useDoctorSelection();
  const { getPatientAppointments } = useBookedAppointments();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== 'patient') {
    return <Navigate to="/login" replace />;
  }

  const latestMetrics = healthMetrics[healthMetrics.length - 1];
  const patientAppointments = getPatientAppointments(user.id);
  const upcomingAppointments = patientAppointments.filter(a => a.status === 'approved' || a.status === 'pending');
  const completedAppointments = patientAppointments.filter(a => a.status === 'completed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success/10 text-success hover:bg-success/20"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'completed':
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar navItems={navItems} title="Patient Portal" />
      
      <main className="dashboard-content">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Track your health metrics and manage your appointments.</p>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Blood Pressure"
            value={`${latestMetrics.bloodPressureSystolic}/${latestMetrics.bloodPressureDiastolic}`}
            icon={Heart}
            change="Normal range"
            changeType="positive"
            iconBgColor="bg-destructive/10"
            iconColor="text-destructive"
          />
          <StatCard
            title="Sugar Level"
            value={`${latestMetrics.sugarLevel} mg/dL`}
            icon={Droplets}
            change="Good control"
            changeType="positive"
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="BMI"
            value={latestMetrics.bmi.toFixed(1)}
            icon={Scale}
            change="Healthy weight"
            changeType="positive"
            iconBgColor="bg-secondary/10"
            iconColor="text-secondary"
          />
          <StatCard
            title="Heart Rate"
            value={`${latestMetrics.heartRate} bpm`}
            icon={Activity}
            change="Resting rate"
            changeType="neutral"
            iconBgColor="bg-accent/10"
            iconColor="text-accent"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Health Charts */}
          <div className="lg:col-span-2 space-y-6">
            <HealthChart dataKey="bloodPressure" title="Blood Pressure Trend" />
            <div className="grid md:grid-cols-2 gap-6">
              <HealthChart dataKey="sugarLevel" title="Sugar Level" color="hsl(160, 60%, 45%)" />
              <HealthChart dataKey="heartRate" title="Heart Rate" color="hsl(0, 72%, 51%)" />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Assigned Doctor */}
            {selectedDoctor && (
              <div className="medical-card border-2 border-primary/20">
                <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  Assigned Doctor
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={selectedDoctor.avatar} 
                    alt={selectedDoctor.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold">{selectedDoctor.name}</p>
                    <p className="text-sm text-primary">{selectedDoctor.specialty}</p>
                    <p className="text-xs text-muted-foreground">{selectedDoctor.department}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/appointments/book')}
                >
                  Book Appointment
                </Button>
              </div>
            )}

            {/* Upcoming Appointments */}
            <div className="medical-card">
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Appointments
              </h3>
              <div className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.slice(0, 3).map((apt) => (
                    <div key={apt.id} className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={apt.doctorAvatar} 
                          alt={apt.doctorName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{apt.doctorName}</p>
                          <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                        </div>
                        {getStatusBadge(apt.status)}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{apt.date}</span>
                        <span className="font-medium text-primary">{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <Badge variant="outline" className="capitalize">{apt.consultationType}</Badge>
                        {apt.paymentStatus === 'completed' && (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">Paid ₹{apt.fee}</Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No upcoming appointments</p>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/appointments/book')}
                >
                  Book New Appointment
                </Button>
              </div>
            </div>

            {/* Medications */}
            <div className="medical-card">
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <Pill className="w-5 h-5 text-secondary" />
                Current Medications
              </h3>
              <div className="space-y-3">
                {medicalRecords[0].prescription.map((med, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-sm font-medium">{med}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Daily</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Reports */}
        <div className="medical-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Weekly Health Reports
            </h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {weeklyReports.map((report) => (
              <div key={report.id} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                    Available
                  </span>
                  <span className="text-xs text-muted-foreground">{report.generatedDate}</span>
                </div>
                <p className="font-medium text-sm mb-1">Week Report</p>
                <p className="text-xs text-muted-foreground mb-4">
                  {report.weekStart} - {report.weekEnd}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
