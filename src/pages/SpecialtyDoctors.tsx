import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Star, Clock, Users, ChevronRight, Filter, 
  Stethoscope, Video, Building2
} from 'lucide-react';
import { useAppointment, cities } from '@/lib/appointment-context';
import { useDoctorSelection } from '@/lib/doctor-selection-context';
import { getDoctorsBySpecialtyAndCity, ExtendedDoctor } from '@/lib/extended-mock-data';

export default function SpecialtyDoctors() {
  const { specialtyName, city: urlCity } = useParams();
  const navigate = useNavigate();
  const { detectedCity, setCity, setSpecialty } = useAppointment();
  const { selectDoctor } = useDoctorSelection();
  
  const [selectedCity, setSelectedCity] = useState(urlCity || detectedCity || 'Mumbai');
  const [doctors, setDoctors] = useState<ExtendedDoctor[]>([]);
  const [filterAvailable, setFilterAvailable] = useState(false);

  const formattedSpecialty = specialtyName
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Specialty';

  useEffect(() => {
    const filteredDoctors = getDoctorsBySpecialtyAndCity(specialtyName || '', selectedCity);
    setDoctors(filterAvailable ? filteredDoctors.filter(d => d.available) : filteredDoctors);
  }, [specialtyName, selectedCity, filterAvailable]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setCity(city);
    navigate(`/specialties/${specialtyName}/${city.toLowerCase()}`, { replace: true });
  };

  const handleViewProfile = (doctor: ExtendedDoctor) => {
    navigate(`/doctors/${doctor.id}`);
  };

  const handleBookAppointment = (doctor: ExtendedDoctor) => {
    selectDoctor(doctor);
    setSpecialty(formattedSpecialty);
    setCity(selectedCity);
    navigate('/appointments/book');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/doctors" className="hover:text-primary transition-colors">Doctors</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">{formattedSpecialty}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope className="w-6 h-6 text-primary" />
                  <Badge variant="secondary">{selectedCity}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                  Best {formattedSpecialty} Doctors
                </h1>
                <p className="text-muted-foreground">
                  Find top-rated {formattedSpecialty.toLowerCase()} specialists in {selectedCity}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedCity} onValueChange={handleCityChange}>
                  <SelectTrigger className="w-full sm:w-48 bg-background">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant={filterAvailable ? "default" : "outline"}
                  onClick={() => setFilterAvailable(!filterAvailable)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Available Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Count */}
        <div className="container py-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{doctors.length}</span> doctors
          </p>
        </div>

        {/* Doctors Grid */}
        <section className="container pb-20">
          {doctors.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-2xl">
              <Stethoscope className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-6">
                Try selecting a different city or specialty
              </p>
              <Button onClick={() => navigate('/doctors')}>
                View All Doctors
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={doctor.avatar}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        {doctor.available && (
                          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">
                          {doctor.name}
                        </h3>
                        <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
                        <p className="text-muted-foreground text-sm">{doctor.department}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-warning mb-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-semibold">{doctor.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Rating</span>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{doctor.experience}y</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Exp.</span>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="w-4 h-4 text-secondary" />
                          <span className="font-semibold">{doctor.patients}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Patients</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="w-3 h-3" />
                        {doctor.city}
                      </Badge>
                      {doctor.available ? (
                        <Badge variant="default" className="bg-success/10 text-success border-success/20">
                          <Video className="w-3 h-3 mr-1" />
                          Online
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Building2 className="w-3 h-3 mr-1" />
                          In-Clinic Only
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-primary">₹{doctor.consultationFee}</span>
                        <span className="text-muted-foreground text-sm"> / visit</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProfile(doctor)}
                        >
                          View Profile
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBookAppointment(doctor)}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
