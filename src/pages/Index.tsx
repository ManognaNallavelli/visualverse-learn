import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, GraduationCap } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 animate-fade-in">
          <div className="flex items-center gap-3">
            <img src={logo} alt="EduVerse 3D" className="w-12 h-12 animate-float" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EduVerse 3D
            </h1>
          </div>
        </header>

        {/* Hero Section */}
        <main className="text-center max-w-5xl mx-auto">
          <div className="mb-8 animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated mb-8">
              <img 
                src={heroBanner} 
                alt="Educational Universe" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end justify-center pb-12">
                <div className="text-center px-4">
                  <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
                    The Visual Learning Universe
                  </h2>
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    Learn Visually. Understand Deeply.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-smooth">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3D Visualizations</h3>
              <p className="text-muted-foreground">
                Explore complex concepts through interactive 3D models
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-smooth">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-muted-foreground">
                Get instant help from our friendly AI tutor anytime
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-smooth">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fun Quizzes</h3>
              <p className="text-muted-foreground">
                Test your knowledge and earn rewards while learning
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated"
              onClick={() => navigate("/login")}
            >
              Login to Start Learning
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => navigate("/register")}
            >
              Create New Account
            </Button>
          </div>

          <p className="mt-8 text-muted-foreground text-sm">
            Perfect for students in Classes 1-10 • Fun • Interactive • Educational
          </p>
        </main>
      </div>
    </div>
  );
};

export default Index;
