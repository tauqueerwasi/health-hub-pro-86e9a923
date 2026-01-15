import { Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Calendar, 
  FileText, 
  Settings,
  Activity,
  TrendingUp,
  Clock,
  UserPlus,
  CheckCircle,
  XCircle,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useBookedAppointments } from '@/lib/booked-appointments-context';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { patients, doctors } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
  { href: '/admin/patients', label: 'Patients', icon: Users },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/reports', label: 'Reports', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

const departmentData = [
  { name: 'Cardiology', value: 30, color: 'hsl(210, 90%, 45%)' },
  { name: 'Neurology', value: 25, color: 'hsl(160, 60%, 45%)' },
  { name: 'Pediatrics', value: 20, color: 'hsl(38, 92%, 50%)' },
  { name: 'Orthopedics', value: 15, color: 'hsl(175, 70%, 40%)' },
  { name: 'Dermatology', value: 10, color: 'hsl(0, 72%, 51%)' },
];

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const { getAllAppointments, updateAppointmentStatus } = useBookedAppointments();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const allAppointments = getAllAppointments();
  const pendingAppointments = allAppointments.filter(a => a.status === 'pending');
  const approvedAppointments = allAppointments.filter(a => a.status === 'approved');
  const completedAppointments = allAppointments.filter(a => a.status === 'completed');
  const totalRevenue = allAppointments
    .filter(a => a.paymentStatus === 'completed')
    .reduce((sum, apt) => sum + apt.fee, 0);

  // Calculate appointments by day from real data
  const appointmentsByDay = [
    { day: 'Mon', count: allAppointments.filter(a => new Date(a.date).getDay() === 1).length * 10 + 45 },
    { day: 'Tue', count: allAppointments.filter(a => new Date(a.date).getDay() === 2).length * 10 + 52 },
    { day: 'Wed', count: allAppointments.filter(a => new Date(a.date).getDay() === 3).length * 10 + 38 },
    { day: 'Thu', count: allAppointments.filter(a => new Date(a.date).getDay() === 4).length * 10 + 61 },
    { day: 'Fri', count: allAppointments.filter(a => new Date(a.date).getDay() === 5).length * 10 + 55 },
    { day: 'Sat', count: allAppointments.filter(a => new Date(a.date).getDay() === 6).length * 10 + 32 },
    { day: 'Sun', count: allAppointments.filter(a => new Date(a.date).getDay() === 0).length * 10 + 12 },
  ];

  const handleApprove = (id: string) => {
    updateAppointmentStatus(id, 'approved');
  };

  const handleDecline = (id: string) => {
    updateAppointmentStatus(id, 'cancelled');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar navItems={navItems} title="Admin Portal" />
      
      <main className="dashboard-content">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your healthcare system.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={patients.length * 100 + allAppointments.length}
            icon={Users}
            change="+12% from last month"
            changeType="positive"
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Total Doctors"
            value={doctors.length * 10 + 5}
            icon={Stethoscope}
            change="+3 new this month"
            changeType="positive"
            iconBgColor="bg-secondary/10"
            iconColor="text-secondary"
          />
          <StatCard
            title="Active Appointments"
            value={approvedAppointments.length + pendingAppointments.length}
            icon={Calendar}
            change={`${pendingAppointments.length} pending approval`}
            changeType="neutral"
            iconBgColor="bg-accent/10"
            iconColor="text-accent"
          />
          <StatCard
            title="Revenue"
            value={`₹${(totalRevenue + 128450).toLocaleString()}`}
            icon={TrendingUp}
            change="+8.2% from last month"
            changeType="positive"
            iconBgColor="bg-success/10"
            iconColor="text-success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Appointments Chart */}
          <div className="lg:col-span-2 medical-card">
            <h3 className="font-heading font-semibold mb-4">Weekly Appointments</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="day" stroke="hsl(215, 15%, 45%)" />
                  <YAxis stroke="hsl(215, 15%, 45%)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(214, 20%, 90%)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(210, 90%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="medical-card">
            <h3 className="font-heading font-semibold mb-4">Patients by Department</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {departmentData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity & Pending Appointments */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="medical-card">
            <h3 className="font-heading font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {allAppointments.slice(0, 5).map((apt, index) => (
                <div key={apt.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    apt.status === 'completed' ? 'bg-success/10 text-success' :
                    apt.status === 'pending' ? 'bg-warning/10 text-warning' :
                    apt.status === 'approved' ? 'bg-primary/10 text-primary' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {apt.status === 'completed' ? <CheckCircle className="w-5 h-5" /> :
                     apt.status === 'pending' ? <Clock className="w-5 h-5" /> :
                     <Calendar className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{apt.patientName} → {apt.doctorName}</p>
                    <p className="text-xs text-muted-foreground">{apt.date} • {apt.time} • {apt.specialty}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">{apt.status}</Badge>
                </div>
              ))}
              {allAppointments.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No recent activity</p>
              )}
            </div>
          </div>

          {/* Pending Appointments */}
          <div className="medical-card">
            <h3 className="font-heading font-semibold mb-4">Pending Appointments</h3>
            <div className="space-y-4">
              {pendingAppointments.length > 0 ? (
                pendingAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{apt.patientName}</p>
                        <p className="text-xs text-muted-foreground">{apt.date} • {apt.time}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{apt.doctorName}</Badge>
                          {apt.paymentStatus === 'completed' && (
                            <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                              <CreditCard className="w-3 h-3 mr-1" />₹{apt.fee}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-success/10 text-success hover:bg-success/20"
                        variant="ghost"
                        onClick={() => handleApprove(apt.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm"
                        variant="ghost" 
                        className="bg-destructive/10 text-destructive hover:bg-destructive/20"
                        onClick={() => handleDecline(apt.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No pending appointments</p>
              )}
            </div>
          </div>
        </div>

        {/* All Appointments Table */}
        <div className="medical-card">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            All Appointments ({allAppointments.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Patient</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Doctor</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date & Time</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Payment</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2">
                      <p className="font-medium text-sm">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">{apt.patientEmail}</p>
                    </td>
                    <td className="py-3 px-2">
                      <p className="font-medium text-sm">{apt.doctorName}</p>
                      <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                    </td>
                    <td className="py-3 px-2">
                      <p className="text-sm">{apt.date}</p>
                      <p className="text-xs text-muted-foreground">{apt.time}</p>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="capitalize text-xs">{apt.consultationType}</Badge>
                    </td>
                    <td className="py-3 px-2">
                      <p className="font-medium text-sm">₹{apt.fee}</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${apt.paymentStatus === 'completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}
                      >
                        {apt.paymentStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <Badge 
                        variant="outline" 
                        className={`capitalize text-xs ${
                          apt.status === 'completed' ? 'bg-success/10 text-success' :
                          apt.status === 'pending' ? 'bg-warning/10 text-warning' :
                          apt.status === 'approved' ? 'bg-primary/10 text-primary' :
                          'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {apt.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
