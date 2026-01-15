import { Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  ClipboardList,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Pill,
  Video,
  Building2
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useBookedAppointments } from '@/lib/booked-appointments-context';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { HealthChart } from '@/components/dashboard/HealthChart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { patients } from '@/lib/mock-data';

const navItems = [
  { href: '/doctor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/doctor/patients', label: 'My Patients', icon: Users },
  { href: '/doctor/appointments', label: 'Appointments', icon: Calendar },
  { href: '/doctor/prescriptions', label: 'Prescriptions', icon: Pill },
  { href: '/doctor/reports', label: 'Reports', icon: FileText },
  { href: '/doctor/settings', label: 'Settings', icon: Settings },
];

export default function DoctorDashboard() {
  const { user, isLoading } = useAuth();
  const { getDoctorAppointments, updateAppointmentStatus, getAllAppointments } = useBookedAppointments();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== 'doctor') {
    return <Navigate to="/login" replace />;
  }

  // Get appointments for this doctor (using name matching for demo)
  const doctorAppointments = getAllAppointments().filter(apt => 
    apt.doctorName.toLowerCase().includes('sarah') || apt.doctorName.toLowerCase().includes('wilson')
  );
  
  const pendingAppointments = doctorAppointments.filter(a => a.status === 'pending');
  const approvedAppointments = doctorAppointments.filter(a => a.status === 'approved');
  const completedAppointments = doctorAppointments.filter(a => a.status === 'completed');

  const handleApprove = (id: string) => {
    updateAppointmentStatus(id, 'approved');
  };

  const handleComplete = (id: string) => {
    updateAppointmentStatus(id, 'completed');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar navItems={navItems} title="Doctor Portal" />
      
      <main className="dashboard-content">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Here's your schedule and patient updates for today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="My Patients"
            value={patients.length + doctorAppointments.length}
            icon={Users}
            change="Active patients"
            changeType="positive"
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Today's Appointments"
            value={approvedAppointments.length}
            icon={Calendar}
            change={`${pendingAppointments.length} pending`}
            changeType="neutral"
            iconBgColor="bg-secondary/10"
            iconColor="text-secondary"
          />
          <StatCard
            title="Completed"
            value={completedAppointments.length}
            icon={CheckCircle}
            change="This week"
            changeType="positive"
            iconBgColor="bg-success/10"
            iconColor="text-success"
          />
          <StatCard
            title="Pending Approval"
            value={pendingAppointments.length}
            icon={Clock}
            change="Need attention"
            changeType={pendingAppointments.length > 0 ? "negative" : "positive"}
            iconBgColor="bg-warning/10"
            iconColor="text-warning"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 medical-card">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Today's Schedule
            </h3>
            <div className="space-y-4">
              {doctorAppointments.length > 0 ? (
                doctorAppointments.map((apt) => (
                  <div 
                    key={apt.id} 
                    className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                      apt.status === 'completed' 
                        ? 'border-success/30 bg-success/5' 
                        : apt.status === 'pending'
                        ? 'border-warning/30 bg-warning/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <p className="font-bold text-lg">{apt.time.split(' ')[0]}</p>
                        <p className="text-xs text-muted-foreground">{apt.time.split(' ')[1]}</p>
                      </div>
                      <div className="w-px h-12 bg-border" />
                      <div>
                        <p className="font-medium">{apt.patientName}</p>
                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {apt.consultationType === 'online' ? (
                            <Badge variant="outline" className="text-xs"><Video className="w-3 h-3 mr-1" />Online</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs"><Building2 className="w-3 h-3 mr-1" />In-Clinic</Badge>
                          )}
                          {apt.paymentStatus === 'completed' && (
                            <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">₹{apt.fee} Paid</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'completed' 
                          ? 'bg-success/10 text-success' 
                          : apt.status === 'pending'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                      {apt.status === 'pending' && (
                        <Button 
                          size="sm"
                          onClick={() => handleApprove(apt.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {apt.status === 'approved' && (
                        <Button 
                          size="sm"
                          onClick={() => handleComplete(apt.id)}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No appointments scheduled</p>
              )}
            </div>
          </div>

          {/* Quick Actions & Recent Patients */}
          <div className="space-y-6">
            <div className="medical-card">
              <h3 className="font-heading font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: ClipboardList, label: 'Add Diagnosis', color: 'bg-primary/10 text-primary' },
                  { icon: Pill, label: 'Write Prescription', color: 'bg-secondary/10 text-secondary' },
                  { icon: FileText, label: 'Generate Report', color: 'bg-accent/10 text-accent' },
                  { icon: AlertCircle, label: 'Flag Patient', color: 'bg-warning/10 text-warning' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Patients from Appointments */}
            <div className="medical-card">
              <h3 className="font-heading font-semibold mb-4">Recent Patients</h3>
              <div className="space-y-3">
                {doctorAppointments.slice(0, 4).map((apt) => (
                  <div key={apt.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">{apt.date} • {apt.specialty}</p>
                    </div>
                  </div>
                ))}
                {doctorAppointments.length === 0 && patients.slice(0, 4).map((patient) => (
                  <div key={patient.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">Last: {patient.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <HealthChart dataKey="bloodPressure" title="Patient BP Trends (Avg)" />
          <HealthChart dataKey="sugarLevel" title="Patient Sugar Levels (Avg)" color="hsl(160, 60%, 45%)" />
        </div>
      </main>
    </div>
  );
}
