import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Shield, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, UserRole } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';

const roles: { value: UserRole; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'patient', label: 'Patient', icon: User, description: 'Access your health records and appointments' },
  { value: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'Manage patients and schedules' },
  { value: 'admin', label: 'Admin', icon: Shield, description: 'System administration and analytics' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, selectedRole);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      
      // Navigate based on role
      switch (selectedRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'patient':
          navigate('/patient');
          break;
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid credentials or role mismatch. Try demo credentials below.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold">
              Medi<span className="text-primary">Care</span>
            </span>
          </Link>

          <h1 className="text-3xl font-heading font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access your healthcare dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role selection */}
            <div className="space-y-3">
              <Label>Select your role</Label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      selectedRole === role.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <role.icon className={`w-6 h-6 mx-auto mb-2 ${
                      selectedRole === role.value ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-sm font-medium ${
                      selectedRole === role.value ? 'text-primary' : 'text-foreground'
                    }`}>
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Admin:</strong> admin@medicare.com / admin123</p>
              <p><strong>Doctor:</strong> doctor@medicare.com / doctor123</p>
              <p><strong>Patient:</strong> patient@medicare.com / patient123</p>
            </div>
          </div>

          <p className="text-center mt-6 text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative gradient-hero-bg">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-primary-foreground text-center max-w-md">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Your Health Journey Starts Here
            </h2>
            <p className="text-primary-foreground/80">
              Access your medical records, schedule appointments, and connect 
              with healthcare professionals all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
