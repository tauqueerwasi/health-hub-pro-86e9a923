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
  UserPlus
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { patients, doctors, appointments } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
  { href: '/admin/patients', label: 'Patients', icon: Users },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/reports', label: 'Reports', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

const appointmentsByDay = [
  { day: 'Mon', count: 45 },
  { day: 'Tue', count: 52 },
  { day: 'Wed', count: 38 },
  { day: 'Thu', count: 61 },
  { day: 'Fri', count: 55 },
  { day: 'Sat', count: 32 },
  { day: 'Sun', count: 12 },
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

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const todayAppointments = appointments.filter(a => a.status === 'approved').length;

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
            value={patients.length * 100 + 234}
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
            title="Today's Appointments"
            value={todayAppointments * 10 + 7}
            icon={Calendar}
            change={`${pendingAppointments * 5} pending`}
            changeType="neutral"
            iconBgColor="bg-accent/10"
            iconColor="text-accent"
          />
          <StatCard
            title="Revenue (Monthly)"
            value="$128,450"
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

        {/* Recent Activity & Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="medical-card">
            <h3 className="font-heading font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { icon: UserPlus, text: 'New patient registered', time: '2 min ago', color: 'text-success' },
                { icon: Calendar, text: 'Appointment confirmed', time: '15 min ago', color: 'text-primary' },
                { icon: Activity, text: 'Lab results uploaded', time: '1 hour ago', color: 'text-secondary' },
                { icon: Stethoscope, text: 'Dr. Wilson updated schedule', time: '2 hours ago', color: 'text-accent' },
                { icon: Clock, text: 'Weekly report generated', time: '3 hours ago', color: 'text-warning' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Appointments */}
          <div className="medical-card">
            <h3 className="font-heading font-semibold mb-4">Pending Appointments</h3>
            <div className="space-y-4">
              {appointments.filter(a => a.status === 'pending').map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">{apt.date} • {apt.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium bg-success/10 text-success rounded-lg hover:bg-success/20 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 text-xs font-medium bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
