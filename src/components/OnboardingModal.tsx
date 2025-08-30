import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthForm from "./AuthForm";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRoleQVT = 'salarié' | 'manager' | 'rh' | 'admin';
type UserJourneyQVT = 'physique_only' | 'saas_box';

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRoleQVT | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<UserJourneyQVT | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    {
      id: 'salarié' as UserRoleQVT,
      title: 'Salarié',
      emoji: '👤',
      description: 'Je souhaite prendre soin de mon bien-être au quotidien',
      color: 'primary'
    },
    {
      id: 'manager' as UserRoleQVT,
      title: 'Manager',
      emoji: '👥',
      description: 'Je veux accompagner le bien-être de mon équipe',
      color: 'secondary'
    },
    {
      id: 'rh' as UserRoleQVT,
      title: 'RH',
      emoji: '🤝',
      description: 'Je pilote la stratégie QVT de l\'entreprise',
      color: 'accent'
    },
    {
      id: 'admin' as UserRoleQVT,
      title: 'Admin',
      emoji: '⚙️',
      description: 'Je gère la plateforme et les utilisateurs',
      color: 'muted'
    }
  ];

  const journeys = [
    {
      id: 'physique_only' as UserJourneyQVT,
      title: 'Box Physique Only',
      emoji: '📦',
      description: 'Je préfère recevoir uniquement des box physiques avec des produits sélectionnés',
      benefits: ['Box mensuelles personnalisées', 'Produits artisanaux français', 'Rituels bien-être']
    },
    {
      id: 'saas_box' as UserJourneyQVT,
      title: 'SaaS + Box',
      emoji: '💻📦',
      description: 'Je veux l\'expérience complète : suivi digital + box physiques',
      benefits: ['Dashboard personnel', 'Analyse IA des humeurs', 'Box adaptées aux tendances', 'Insights équipe']
    }
  ];

  const handleRoleSelect = (role: UserRoleQVT) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleJourneySelect = (journey: UserJourneyQVT) => {
    setSelectedJourney(journey);
    setStep(3);
  };

  const handleCompleteOnboarding = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && selectedRole && selectedJourney) {
        const { error } = await supabase
          .from('profiles')
          .update({
            user_role: selectedRole as any,
            user_journey: selectedJourney as any,
            onboarding_completed: true
          })
          .eq('id', user.id);

        if (error) throw error;

        toast({
          title: "Bienvenue dans votre bulle ! 🫧",
          description: "Votre parcours personnalisé est maintenant configuré.",
        });

        onClose();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Erreur",
        description: "Impossible de finaliser votre inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    handleCompleteOnboarding();
  };

  if (showAuth) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-kalam text-2xl">
              🫧 Créer votre bulle
            </DialogTitle>
          </DialogHeader>
          <AuthForm onSuccess={handleAuthSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-kalam text-3xl text-primary">
            ✨ Créons votre bulle personnalisée
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-foreground/70">
                Dites-nous qui vous êtes pour personnaliser votre expérience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-bubble border-2 ${
                    selectedRole === role.id 
                      ? `border-${role.color} bg-${role.color}/5` 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl">{role.emoji}</div>
                    <h3 className="font-kalam text-xl font-semibold">{role.title}</h3>
                    <p className="text-sm text-foreground/70">{role.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Journey Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-foreground/70 mb-2">
                Parfait ! Maintenant, choisissez votre parcours bien-être
              </p>
              <p className="text-sm text-foreground/50">
                Vous êtes <span className="text-primary font-medium">{roles.find(r => r.id === selectedRole)?.title}</span>
              </p>
            </div>

            <div className="grid gap-6">
              {journeys.map((journey) => (
                <Card
                  key={journey.id}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-bubble border-2 ${
                    selectedJourney === journey.id 
                      ? 'border-secondary bg-secondary/5' 
                      : 'border-border hover:border-secondary/30'
                  }`}
                  onClick={() => handleJourneySelect(journey.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{journey.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-kalam text-xl font-semibold mb-2">{journey.title}</h3>
                      <p className="text-foreground/70 mb-3">{journey.description}</p>
                      <div className="space-y-1">
                        {journey.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-foreground/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={() => setStep(1)}
                variant="outline"
                className="btn-soft"
              >
                ← Retour
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-kalam text-2xl font-semibold mb-4">
                Votre bulle est presque prête !
              </h3>
              <p className="text-foreground/70">
                Récapitulatif de votre configuration personnalisée
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Rôle :</span>
                <span className="text-primary font-semibold">
                  {roles.find(r => r.id === selectedRole)?.title}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Parcours :</span>
                <span className="text-secondary font-semibold">
                  {journeys.find(j => j.id === selectedJourney)?.title}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => setStep(2)}
                variant="outline"
                className="btn-soft"
              >
                ← Modifier
              </Button>
              <Button 
                onClick={() => setShowAuth(true)}
                className="btn-bubble"
              >
                🫧 Finaliser ma bulle
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;