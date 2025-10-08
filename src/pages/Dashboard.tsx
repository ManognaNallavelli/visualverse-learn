import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Beaker, Languages, Calculator, Globe, Palette, MessageCircle, TrendingUp, Trophy, Star, Menu } from "lucide-react";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const studentName = "Alex"; // Mock student name

  const subjects = [
    { id: "math", name: "Mathematics", icon: Calculator, color: "from-blue-500 to-blue-600", progress: 65 },
    { id: "science", name: "Science", icon: Beaker, color: "from-green-500 to-green-600", progress: 78 },
    { id: "english", name: "English", icon: Languages, color: "from-purple-500 to-purple-600", progress: 54 },
    { id: "social", name: "Social Studies", icon: Globe, color: "from-orange-500 to-orange-600", progress: 42 },
    { id: "art", name: "Art & Creativity", icon: Palette, color: "from-pink-500 to-pink-600", progress: 88 },
  ];

  const stats = [
    { label: "Points", value: "1,250", icon: Star },
    { label: "Badges", value: "12", icon: Trophy },
    { label: "Streak", value: "7 days", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EduVerse 3D" className="w-10 h-10" />
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                EduVerse 3D
              </h1>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <nav className="hidden md:flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button variant="ghost" onClick={() => navigate("/progress")}>Progress</Button>
              <Button variant="ghost" onClick={() => navigate("/chatbot")}>
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Tutor
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {studentName}! 👋</h2>
          <p className="text-muted-foreground text-lg">Ready to explore and learn something new today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-card rounded-2xl p-4 shadow-card text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 animate-fade-in">
          <Button 
            onClick={() => navigate("/chatbot")}
            className="h-20 rounded-2xl gradient-primary text-primary-foreground hover:opacity-90"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Ask AI Tutor
          </Button>
          <Button 
            onClick={() => navigate("/progress")}
            className="h-20 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <TrendingUp className="w-6 h-6 mr-2" />
            View Progress
          </Button>
          <Button 
            onClick={() => navigate("/quiz/random")}
            className="h-20 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Trophy className="w-6 h-6 mr-2" />
            Take a Quiz
          </Button>
        </div>

        {/* Subjects Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Your Subjects</h3>
            <BookOpen className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, idx) => (
              <div
                key={subject.id}
                className="bg-card rounded-3xl p-6 shadow-card hover:shadow-elevated transition-smooth cursor-pointer animate-scale-in"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => navigate(`/subject/${subject.id}`)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-4`}>
                  <subject.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{subject.name}</h4>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${subject.color}`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-2 rounded-xl">
                  Continue Learning →
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Chatbot Button */}
        <Button
          onClick={() => navigate("/chatbot")}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-elevated gradient-secondary text-secondary-foreground hover:opacity-90 animate-bounce-gentle"
          size="icon"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
