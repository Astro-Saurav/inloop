
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ArrowRight, Calendar, MessageCircle, Users } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Header */}
      <header className="w-full py-4 px-6 bg-background border-b border-border">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Inloop</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your Campus Hub for <span className="text-primary">Everything</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Join Inloop to stay updated with all college events, connect with students across departments, and never miss important updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-muted p-8 flex items-center justify-center">
              <div className="w-full max-w-sm aspect-square rounded-xl bg-background shadow-lg border border-border flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">i</span>
                  </div>
                  <h3 className="text-xl font-bold">Inloop App</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    Your complete campus companion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="container py-12 md:py-24 bg-muted/30 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need in One Place</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Events Calendar</h3>
              <p className="text-muted-foreground">
                Stay updated with all campus events, workshops, seminars, and more.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Discussion Forums</h3>
              <p className="text-muted-foreground">
                Connect with students from different departments, share ideas, and collaborate.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Senior-Junior Space</h3>
              <p className="text-muted-foreground">
                Get advice from seniors and help juniors navigate college life effectively.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Inloop. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
