import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, RotateCw, ZoomIn, ZoomOut, Play, Pause, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

const LessonViewer = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock lesson data
  const lesson = {
    title: "Human Circulatory System",
    description: "The circulatory system is responsible for transporting nutrients, oxygen, and hormones to cells throughout the body. It also removes waste products like carbon dioxide.",
    keyPoints: [
      "The heart pumps blood throughout the body",
      "Blood vessels include arteries, veins, and capillaries",
      "The heart has four chambers",
      "Blood carries oxygen and nutrients to all body parts",
      "The circulatory system works with the respiratory system"
    ]
  };

  const handleAskDoubt = () => {
    toast.success("Opening AI Tutor...");
    navigate("/chatbot");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <img src={logo} alt="EduVerse 3D" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">{lesson.title}</h1>
                <p className="text-sm text-muted-foreground">3D Interactive Lesson</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Viewer (Placeholder) */}
          <div className="animate-fade-in">
            <div className="bg-card rounded-3xl p-8 shadow-elevated">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center animate-float">
                    <span className="text-6xl">❤️</span>
                  </div>
                  <p className="text-lg font-medium">3D Model Placeholder</p>
                  <p className="text-sm text-muted-foreground mt-2">Interactive 3D model will appear here</p>
                </div>
              </div>

              {/* 3D Controls */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="rounded-xl" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Animation
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play Animation
                    </>
                  )}
                </Button>
                <Button variant="outline" className="rounded-xl">
                  <RotateCw className="w-4 h-4 mr-2" />
                  Rotate
                </Button>
                <Button variant="outline" className="rounded-xl">
                  <ZoomIn className="w-4 h-4 mr-2" />
                  Zoom In
                </Button>
                <Button variant="outline" className="rounded-xl">
                  <ZoomOut className="w-4 h-4 mr-2" />
                  Zoom Out
                </Button>
                <Button 
                  onClick={handleAskDoubt}
                  className="rounded-xl gradient-secondary text-secondary-foreground hover:opacity-90"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Doubt
                </Button>
              </div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="animate-fade-in">
            <div className="bg-card rounded-3xl p-8 shadow-card">
              <h2 className="text-2xl font-bold mb-4">Lesson Explanation</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {lesson.description}
              </p>

              <h3 className="text-xl font-semibold mb-4">Key Points to Remember</h3>
              <ul className="space-y-3 mb-6">
                {lesson.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate(`/quiz/${lessonId}`)}
                  className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Take Quiz on This Topic
                </Button>
              </div>
            </div>

            {/* Fun Fact Card */}
            <div className="mt-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl p-6 border-2 border-accent/20">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Fun Fact!</h4>
                  <p className="text-sm text-muted-foreground">
                    Your heart beats about 100,000 times per day, pumping around 2,000 gallons of blood!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
