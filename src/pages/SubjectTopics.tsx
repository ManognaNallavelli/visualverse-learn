import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Box, Play } from "lucide-react";
import logo from "@/assets/logo.png";

const SubjectTopics = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  // Mock topics data
  const topics = [
    { id: "1", title: "Human Circulatory System", description: "Explore the heart and blood vessels in 3D", lessons: 5, quizzes: 3 },
    { id: "2", title: "Solar System", description: "Journey through planets and stars", lessons: 8, quizzes: 4 },
    { id: "3", title: "Atoms and Molecules", description: "Dive into the building blocks of matter", lessons: 6, quizzes: 3 },
    { id: "4", title: "Photosynthesis", description: "How plants make their food", lessons: 4, quizzes: 2 },
    { id: "5", title: "Water Cycle", description: "Follow water's journey on Earth", lessons: 5, quizzes: 2 },
    { id: "6", title: "Forces and Motion", description: "Understand how things move", lessons: 7, quizzes: 4 },
  ];

  const subjectNames: Record<string, string> = {
    math: "Mathematics",
    science: "Science",
    english: "English",
    social: "Social Studies",
    art: "Art & Creativity",
  };

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
                <h1 className="text-xl font-bold">{subjectNames[subjectId || ""] || "Subject"}</h1>
                <p className="text-sm text-muted-foreground">Choose a topic to explore</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Explore Topics</h2>
          <p className="text-muted-foreground">Select a topic to view 3D lessons and take quizzes</p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, idx) => (
            <div
              key={topic.id}
              className="bg-card rounded-3xl p-6 shadow-card hover:shadow-elevated transition-smooth animate-scale-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4">
                <Box className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{topic.description}</p>
              
              <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                <span>📚 {topic.lessons} Lessons</span>
                <span>📝 {topic.quizzes} Quizzes</span>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/lesson/${topic.id}`)}
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Play className="w-4 h-4 mr-2" />
                  View 3D
                </Button>
                <Button
                  onClick={() => navigate(`/quiz/${topic.id}`)}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  Take Quiz
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectTopics;
