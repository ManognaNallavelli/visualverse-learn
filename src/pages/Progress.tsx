import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Star, Target, TrendingUp, Award, Zap } from "lucide-react";
import logo from "@/assets/logo.png";

const Progress = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "Mathematics", progress: 65, total: 100, color: "from-blue-500 to-blue-600" },
    { name: "Science", progress: 78, total: 100, color: "from-green-500 to-green-600" },
    { name: "English", progress: 54, total: 100, color: "from-purple-500 to-purple-600" },
    { name: "Social Studies", progress: 42, total: 100, color: "from-orange-500 to-orange-600" },
    { name: "Art & Creativity", progress: 88, total: 100, color: "from-pink-500 to-pink-600" },
  ];

  const achievements = [
    { icon: Trophy, title: "First Quiz Master", description: "Scored 100% on your first quiz", color: "text-yellow-500" },
    { icon: Star, title: "7-Day Streak", description: "Learned for 7 days in a row", color: "text-blue-500" },
    { icon: Target, title: "Explorer", description: "Viewed 10 3D lessons", color: "text-green-500" },
    { icon: Zap, title: "Quick Learner", description: "Completed 5 topics in a week", color: "text-purple-500" },
    { icon: Award, title: "Top Performer", description: "Ranked in top 10%", color: "text-orange-500" },
  ];

  const weeklyActivity = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.1 },
    { day: "Fri", hours: 2.8 },
    { day: "Sat", hours: 1.5 },
    { day: "Sun", hours: 2.0 },
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <img src={logo} alt="EduVerse 3D" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">Your Progress</h1>
                <p className="text-sm text-muted-foreground">Track your learning journey</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8 animate-fade-in">
          <div className="bg-card rounded-2xl p-6 shadow-card text-center">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-3xl font-bold mb-1">1,250</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="text-3xl font-bold mb-1">12</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="text-3xl font-bold mb-1">7</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold mb-1">67%</div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subject Progress */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Subject Progress</h2>
            <div className="bg-card rounded-3xl p-6 shadow-card space-y-6">
              {subjects.map((subject, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{subject.name}</span>
                    <span className="text-muted-foreground">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-1000`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Weekly Activity</h2>
            <div className="bg-card rounded-3xl p-6 shadow-card">
              <p className="text-muted-foreground mb-6">Hours spent learning this week</p>
              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyActivity.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-sm text-muted-foreground">{day.hours}h</div>
                    <div
                      className="w-full gradient-primary rounded-t-lg transition-all duration-1000"
                      style={{ height: `${(day.hours / maxHours) * 100}%` }}
                    />
                    <div className="text-sm font-medium">{day.day}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Total this week: <span className="font-bold text-foreground">16.9 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Achievements & Badges</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-smooth"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 ${achievement.color}`}>
                  <achievement.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-primary-foreground mb-3">
            🎉 You're doing amazing!
          </h3>
          <p className="text-primary-foreground/90 text-lg">
            Keep up the great work! You're making excellent progress in your learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Progress;
