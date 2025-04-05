
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Calendar, Home, MessageCircle, Search, Settings, User, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

const MobileNavbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-4 z-50">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="mobile-nav-item">
          <Home className={`mobile-nav-icon ${location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className={location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}>Home</span>
        </Link>
        
        <Link to="/events" className="mobile-nav-item">
          <Calendar className={`mobile-nav-icon ${location.pathname === '/events' ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className={location.pathname === '/events' ? 'text-primary' : 'text-muted-foreground'}>Events</span>
        </Link>
            
        <Link to="/senior-junior" className="mobile-nav-item">
          <Users className={`mobile-nav-icon ${location.pathname === '/senior-junior' ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className={location.pathname === '/senior-junior' ? 'text-primary' : 'text-muted-foreground'}>SJS</span>
        </Link>
        
        <Link to="/profile" className="mobile-nav-item">
          <User className={`mobile-nav-icon ${location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className={location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'}>Profile</span>
        </Link>
      </div>
    </div>
  );
};

const Topbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">Inloop</span>
          </Link>
        </div>
        
        {isAuthenticated && (
          <div className="flex-1 flex items-center justify-end space-x-2">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
              </Button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-card border border-border z-50 animate-fade-in">
                  <div className="px-4 py-2 font-medium border-b border-border">Notifications</div>
                  <div className="px-4 py-2 text-sm text-muted-foreground">No new notifications</div>
                </div>
              )}
            </div>
            
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              onClick={logout} 
              className="text-sm"
            >
              Logout
            </Button>
          </div>
        )}
        
        {!isAuthenticated && (
          <div className="flex-1 flex items-center justify-end space-x-2">
            <ThemeToggle />
            
            <Button asChild variant="ghost">
              <Link to="/login">Sign In</Link>
            </Button>
            
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export function Navbar() {
  return (
    <>
      <Topbar />
      <MobileNavbar />
    </>
  );
}
