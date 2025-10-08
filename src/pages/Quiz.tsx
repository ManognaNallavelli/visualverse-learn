import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trophy, Star } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

const Quiz = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Mock quiz data
  const quiz = {
    title: "Human Circulatory System Quiz",
    questions: [
      {
        question: "How many chambers does the human heart have?",
        options: ["2", "3", "4", "5"],
        correct: 2
      },
      {
        question: "Which blood vessels carry blood away from the heart?",
        options: ["Veins", "Arteries", "Capillaries", "Lymph vessels"],
        correct: 1
      },
      {
        question: "What color is oxygen-rich blood?",
        options: ["Blue", "Purple", "Bright red", "Dark red"],
        correct: 2
      },
      {
        question: "What is the main function of red blood cells?",
        options: ["Fight infections", "Carry oxygen", "Clot blood", "Produce hormones"],
        correct: 1
      },
      {
        question: "Which chamber of the heart pumps blood to the lungs?",
        options: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
        correct: 3
      }
    ]
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! 🎉");
    } else {
      toast.error("Oops! That's not quite right");
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80) return { emoji: "🏆", message: "Excellent! You're a star!" };
    if (percentage >= 60) return { emoji: "⭐", message: "Great job! Keep it up!" };
    if (percentage >= 40) return { emoji: "👍", message: "Good effort! Practice more!" };
    return { emoji: "💪", message: "Keep learning, you'll get better!" };
  };

  if (showResult) {
    const result = getScoreMessage();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-card rounded-3xl p-8 shadow-elevated text-center animate-scale-in">
          <div className="text-8xl mb-6 animate-bounce-gentle">{result.emoji}</div>
          <h2 className="text-4xl font-bold mb-4">{result.message}</h2>
          
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 mb-6">
            <div className="text-6xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
              {score}/{quiz.questions.length}
            </div>
            <p className="text-xl text-muted-foreground">Questions Correct</p>
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="h-4 rounded-full gradient-primary transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{percentage}% Score</p>
            </div>
          </div>

          <div className="bg-accent/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 text-accent font-semibold">
              <Star className="w-5 h-5 fill-accent" />
              <span>+{score * 10} Points Earned!</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
                setSelectedAnswer(null);
              }}
              variant="outline"
              className="flex-1 h-12 rounded-xl"
            >
              Try Again
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                <h1 className="text-xl font-bold">{quiz.title}</h1>
                <p className="text-sm text-muted-foreground">Test your knowledge</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="h-3 rounded-full gradient-primary transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card rounded-3xl p-8 shadow-elevated animate-scale-in">
            <h2 className="text-2xl font-bold mb-8">
              {quiz.questions[currentQuestion].question}
            </h2>

            <div className="space-y-4 mb-8">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-smooth ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedAnswer === index
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full h-14 rounded-2xl text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
