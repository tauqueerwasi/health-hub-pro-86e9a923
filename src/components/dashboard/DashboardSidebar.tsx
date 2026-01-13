import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, LogOut, LucideIcon, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  navItems: NavItem[];
  title: string;
}

export function DashboardSidebar({ navItems, title }: DashboardSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mobile-menu-btn"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isOpen && isMobile && (
        <div 
          className="sidebar-overlay animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          'dashboard-sidebar',
          isOpen && 'open'
        )}
      >
        {/* Close button (mobile) */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <span className="text-lg font-heading font-bold block truncate">MediCare</span>
              <p className="text-xs text-muted-foreground truncate">{title}</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="dashboard-sidebar-content p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== navItems[0].href && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:translate-x-1'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-sidebar-border mt-auto shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent mb-2">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0891b2&color=fff`}
              alt={user?.name || 'User avatar'}
              className="w-10 h-10 rounded-full shrink-0 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <Link to="/">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-destructive hover:bg-destructive/10 transition-all duration-200 hover:translate-x-1"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
}
