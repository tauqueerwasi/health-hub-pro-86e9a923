import { Doctor } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, Calendar, GraduationCap, Building2, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DoctorDetailModal({ doctor, open, onOpenChange }: DoctorDetailModalProps) {
  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Doctor Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-32 h-32 rounded-xl object-cover mx-auto sm:mx-0"
              />
              {doctor.available && (
                <span className="absolute bottom-2 right-2 px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded-full">
                  Available
                </span>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-heading font-bold mb-1">{doctor.name}</h2>
              <p className="text-primary font-medium mb-2">{doctor.specialty}</p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground mb-4">
                <Building2 className="w-4 h-4" />
                <span>{doctor.department} Department</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-semibold">{doctor.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.experience} years</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{doctor.patients}+ patients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Experience</p>
              <p className="font-semibold">{doctor.experience} Years</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground">Patients</p>
              <p className="font-semibold">{doctor.patients}+</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-warning" />
              </div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="font-semibold">{doctor.rating}/5</p>
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Qualifications
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>MBBS - All India Institute of Medical Sciences</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>MD - {doctor.specialty}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Fellowship in Advanced {doctor.department}</span>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-secondary" />
              Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{doctor.specialty}</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Preventive Care</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Chronic Disease</span>
              <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm">Diagnostics</span>
            </div>
          </div>

          {/* Available Slots */}
          <div>
            <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Available Slots
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.schedule.map((slot) => (
                <span key={slot} className="px-3 py-2 bg-muted rounded-lg text-sm">
                  {slot}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Link to="/signup" className="flex-1">
              <Button className="w-full" size="lg" disabled={!doctor.available}>
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
