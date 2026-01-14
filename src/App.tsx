import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { DoctorSelectionProvider } from "@/lib/doctor-selection-context";
import { AppointmentProvider } from "@/lib/appointment-context";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import DoctorDetail from "./pages/DoctorDetail";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import SpecialtyDoctors from "./pages/SpecialtyDoctors";
import AppointmentBooking from "./pages/AppointmentBooking";
import HealthcareYouCanTrust from "./pages/HealthcareYouCanTrust";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DoctorSelectionProvider>
        <AppointmentProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:id" element={<DoctorDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* New feature routes */}
                <Route path="/specialties/:specialtyName/:city" element={<SpecialtyDoctors />} />
                <Route path="/specialties/:specialtyName" element={<SpecialtyDoctors />} />
                <Route path="/appointments/book" element={<AppointmentBooking />} />
                <Route path="/healthcare-you-can-trust" element={<HealthcareYouCanTrust />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                
                {/* Doctor routes */}
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/doctor/*" element={<DoctorDashboard />} />
                
                {/* Patient routes */}
                <Route path="/patient" element={<PatientDashboard />} />
                <Route path="/patient/*" element={<PatientDashboard />} />
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AppointmentProvider>
      </DoctorSelectionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
