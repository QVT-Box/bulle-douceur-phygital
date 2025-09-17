// src/components/BoxEvaluationModal.tsx
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, Settings, Users, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

type IconType = React.ComponentType<{ className?: string }>;

interface BoxEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QuestionOption = { value: string; label: string };
type Question = {
  id: "stress" | "organization" | "team" | "development";
  title: string;
  question: string;
  icon: IconType;
  color: string;
  pillar: string;
  options: QuestionOption[];
};

const BoxEvaluationModal = ({ isOpen, onClose }: BoxEvaluationModalProps) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const L = language === "en"
    ? {
        title: "Assess your QWL needs",
        step: (i: number, n: number) => `Question ${i} of ${n}`,
        next: "Next",
        prev: "Previous",
        seeReco: "See my recommendation",
        yourReco: "🎉 Your Recommended Box",
        seeDashboard: "Go to my dashboard",
        exploreBoxes: "Browse all boxes",
        contentTitle: "🎁 Box content:",
        saved: "Assessment saved",
        savedDesc: "Your results were added to your profile.",
        saveErr: "Save error",
        saveErrDesc: "Unable to save your results. Please try again.",
        mustAnswer: "Please answer all questions to get a recommendation.",
      }
    : {
        title: "Évaluez vos besoins QVT",
        step: (i: number, n: number) => `Question ${i} sur ${n}`,
        next: "Suivant",
        prev: "Précédent",
        seeReco: "Voir ma recommandation",
        yourReco: "🎉 Votre Box Recommandée",
        seeDashboard: "Voir mon tableau de bord",
        exploreBoxes: "Explorer toutes les box",
        contentTitle: "🎁 Contenu de votre box :",
        saved: "Évaluation sauvegardée",
        savedDesc: "Vos résultats ont été ajoutés à votre profil.",
        saveErr: "Erreur de sauvegarde",
        saveErrDesc: "Impossible de sauvegarder vos résultats. Veuillez réessayer.",
        mustAnswer: "Veuillez répondre à toutes les questions pour obtenir une recommandation.",
      };

  // Préfixe de langue pour les liens
  const root = language === "en" ? "/en" : "/fr";
  const withLang = (p: string) => `${root}${p.startsWith("/") ? p : `/${p}`}`;

  const questions: Question[] = useMemo(
    () => [
      {
        id: "stress",
        title: language === "en" ? "Stress management" : "Gestion du stress",
        question:
          language === "en"
            ? "How do you assess your stress level at work?"
            : "Comment évaluez-vous votre niveau de stress au travail ?",
        icon: Heart,
        color: "text-green-600",
        pillar: language === "en" ? "Health & Balance" : "Santé & Équilibre",
        options:
          language === "en"
            ? [
                { value: "low", label: "Low — I feel serene daily" },
                { value: "medium", label: "Moderate — Some tense moments" },
                { value: "high", label: "High — I often feel stressed" },
                { value: "very-high", label: "Very high — Stress impacts me a lot" },
              ]
            : [
                { value: "low", label: "Faible — Je me sens serein(e) au quotidien" },
                { value: "medium", label: "Modéré — Quelques moments de tension" },
                { value: "high", label: "Élevé — Je ressens souvent du stress" },
                { value: "very-high", label: "Très élevé — Le stress m'impacte beaucoup" },
              ],
      },
      {
        id: "organization",
        title: language === "en" ? "Organization & Productivity" : "Organisation & Productivité",
        question:
          language === "en"
            ? "How do you feel about your organization at work?"
            : "Comment vous sentez-vous par rapport à votre organisation au travail ?",
        icon: Settings,
        color: "text-blue-600",
        pillar: language === "en" ? "Organization & Efficiency" : "Organisation & Efficacité",
        options:
          language === "en"
            ? [
                { value: "excellent", label: "Excellent — Perfectly under control" },
                { value: "good", label: "Good — Some improvements possible" },
                { value: "average", label: "Average — I need support" },
                { value: "poor", label: "Difficult — I feel overwhelmed" },
              ]
            : [
                { value: "excellent", label: "Excellente — Je maîtrise parfaitement" },
                { value: "good", label: "Bonne — Quelques améliorations possibles" },
                { value: "average", label: "Moyenne — J'ai besoin d'aide" },
                { value: "poor", label: "Difficile — Je me sens débordé(e)" },
              ],
      },
      {
        id: "team",
        title: language === "en" ? "Team relationships" : "Relations d'équipe",
        question:
          language === "en"
            ? "How would you qualify the relationships with your colleagues?"
            : "Comment qualifiez-vous les relations avec vos collègues ?",
        icon: Users,
        color: "text-amber-600",
        pillar: language === "en" ? "Cohesion & Relationships" : "Cohésion & Relations",
        options:
          language === "en"
            ? [
                { value: "excellent", label: "Excellent — Very positive atmosphere" },
                { value: "good", label: "Good — A few occasional tensions" },
                { value: "average", label: "Fair — Professional relations" },
                { value: "poor", label: "Difficult — Conflicts or isolation" },
              ]
            : [
                { value: "excellent", label: "Excellentes — Ambiance très positive" },
                { value: "good", label: "Bonnes — Quelques tensions ponctuelles" },
                { value: "average", label: "Correctes — Relations professionnelles" },
                { value: "poor", label: "Difficiles — Conflits ou isolement" },
              ],
      },
      {
        id: "development",
        title: language === "en" ? "Personal development" : "Développement personnel",
        question:
          language === "en"
            ? "Where are you in your professional development?"
            : "Où en êtes-vous dans votre développement professionnel ?",
        icon: Star,
        color: "text-purple-600",
        pillar: language === "en" ? "Development & Inspiration" : "Développement & Inspiration",
        options:
          language === "en"
            ? [
                { value: "motivated", label: "Very motivated — Lots of projects" },
                { value: "interested", label: "Interested — Open to opportunities" },
                { value: "neutral", label: "Neutral — Not a priority" },
                { value: "stuck", label: "Stuck — Lack of inspiration" },
              ]
            : [
                { value: "motivated", label: "Très motivé(e) — Plein de projets" },
                { value: "interested", label: "Intéressé(e) — Ouvert(e) aux opportunités" },
                { value: "neutral", label: "Neutre — Pas de priorité particulière" },
                { value: "stuck", label: "Bloqué(e) — Manque d'inspiration" },
              ],
      },
    ],
    [language]
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const allAnswered = questions.every((q) => !!answers[q.id]);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      if (!allAnswered) {
        toast({ title: L.mustAnswer, variant: "destructive" });
        return;
      }
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleComplete = () => setShowResults(true);

  const scoresFromAnswers = () => {
    // 1 (low risk) -> 4 (high risk)
    return {
      stress:
        answers.stress === "very-high"
          ? 4
          : answers.stress === "high"
          ? 3
          : answers.stress === "medium"
          ? 2
          : 1,
      organization:
        answers.organization === "poor"
          ? 4
          : answers.organization === "average"
          ? 3
          : answers.organization === "good"
          ? 2
          : 1,
      team:
        answers.team === "poor"
          ? 4
          : answers.team === "average"
          ? 3
          : answers.team === "good"
          ? 2
          : 1,
      development:
        answers.development === "stuck"
          ? 4
          : answers.development === "neutral"
          ? 3
          : answers.development === "interested"
          ? 2
          : 1,
    };
  };

  const getRecommendedBox = () => {
    const scores = scoresFromAnswers();
    const maxScore = Math.max(...Object.values(scores));
    const maxKey = (Object.keys(scores) as (keyof typeof scores)[]).find(
      (k) => scores[k] === maxScore
    );

    const recommendations = {
      stress: {
        name: language === "en" ? "Focus & Reset Box" : "Box Focus & Reset",
        description:
          language === "en"
            ? "Perfect to regain serenity and daily balance"
            : "Parfaite pour retrouver sérénité et équilibre au quotidien",
        color: "bg-green-500",
        products:
          language === "en"
            ? ["Relax herbal teas", "Essential oils", "Meditation guide", "Wellness accessories"]
            : ["Tisanes relaxantes", "Huiles essentielles", "Guide méditation", "Accessoires bien-être"],
      },
      organization: {
        name: language === "en" ? "Pro Efficiency Box" : "Box Efficacité Pro",
        description:
          language === "en"
            ? "The essentials to optimize your organization"
            : "Les outils indispensables pour optimiser votre organisation",
        color: "bg-blue-500",
        products:
          language === "en"
            ? ["Personalized planner", "Ergonomic tools", "Productivity guide", "Recommended apps"]
            : ["Planner personnalisé", "Outils ergonomiques", "Guide productivité", "Apps recommandées"],
      },
      team: {
        name: language === "en" ? "Cohesion Box" : "Box Cohésion",
        description:
          language === "en"
            ? "Strengthen bonds and improve team communication"
            : "Renforcez les liens et améliorez la communication d'équipe",
        color: "bg-orange-500",
        products:
          language === "en"
            ? ["Team games", "Communication guide", "Collaborative activities", "Shared goodies"]
            : ["Jeux d'équipe", "Guide communication", "Activités collaboratives", "Goodies partagés"],
      },
      development: {
        name: language === "en" ? "Inspiration Box" : "Box Inspiration",
        description:
          language === "en"
            ? "Find motivation and new perspectives to grow"
            : "Trouvez motivation et nouvelles perspectives pour évoluer",
        color: "bg-purple-500",
        products:
          language === "en"
            ? ["Personal growth book", "Reflection notebook", "Inspiring podcasts", "Digital coaching"]
            : ["Livre développement", "Carnet de réflexion", "Podcasts inspirants", "Coaching digital"],
      },
    } as const;

    return recommendations[(maxKey ?? "stress") as keyof typeof recommendations];
  };

  const handleGoToDashboard = async () => {
    const scores = scoresFromAnswers();
    const globalScore = Math.round((Object.values(scores).reduce((a, b) => a + b, 0) * 25) / 4);
    const recommendation = getRecommendedBox();

    try {
      const payload: Record<string, any> = {
        scores_sante: scores.stress * 25,
        scores_orga: scores.organization * 25,
        scores_cohesion: scores.team * 25,
        scores_devperso: scores.development * 25,
        box_recommandee: recommendation.name,
        note_globale: globalScore,
        source: "simulateur_box",
      };
      if (user?.id) payload.user_id = user.id;

      const { error } = await supabase.from("needs_assessments").insert([payload]);
      if (error) throw error;

      toast({ title: L.saved, description: L.savedDesc });
    } catch (err) {
      console.error("Error saving assessment:", err);
      toast({ title: L.saveErr, description: L.saveErrDesc, variant: "destructive" });
      return;
    }

    onClose();
    navigate(withLang("/dashboard"));
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion?.icon;

  if (showResults) {
    const recommendation = getRecommendedBox();
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-kalam text-center">
              {L.yourReco}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <div
                className={`w-20 h-20 ${recommendation.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-kalam font-bold text-foreground mb-2">
                {recommendation.name}
              </h3>
              <p className="text-foreground/70 text-lg">{recommendation.description}</p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-3">{L.contentTitle}</h4>
              <div className="grid grid-cols-2 gap-2">
                {recommendation.products.map((product, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-foreground/80">{product}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleGoToDashboard} className="flex-1">
                {L.seeDashboard}
              </Button>
              <Button variant="outline" onClick={() => navigate(withLang("/box"))} className="flex-1">
                {L.exploreBoxes}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-kalam text-center">{L.title}</DialogTitle>
          <div className="space-y-2" aria-live="polite">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-sm text-center text-foreground/60">
              {L.step(currentStep + 1, questions.length)}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {Icon && <Icon className={`w-8 h-8 ${currentQuestion.color}`} />}
            </div>
            <h3 className="text-xl font-kalam font-bold text-foreground mb-2">{currentQuestion.title}</h3>
            <p className="text-foreground/70">{currentQuestion.question}</p>
          </div>

          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => {
              const inputId = `${currentQuestion.id}-${option.value}`;
              return (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={inputId} />
                  <Label htmlFor={inputId} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              {L.prev}
            </Button>
            <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
              {currentStep === questions.length - 1 ? L.seeReco : L.next}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoxEvaluationModal;
