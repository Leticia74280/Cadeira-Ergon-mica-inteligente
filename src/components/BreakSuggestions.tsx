import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, Move, Eye, CheckCircle2 } from 'lucide-react';

interface BreakSuggestionsProps {
  sessionTime: number;
  postureStatus: 'good' | 'warning' | 'danger';
  onBreakTaken: () => void;
}

export const BreakSuggestions = ({ sessionTime, postureStatus, onBreakTaken }: BreakSuggestionsProps) => {
  const getBreakSuggestions = () => {
    if (sessionTime < 30) {
      return [
        { icon: Eye, title: 'Piscar frequentemente', description: 'Mantenha os olhos hidratados', duration: '30s' },
        { icon: Move, title: 'Ajustar posição', description: 'Verifique se está bem apoiado', duration: '1 min' },
      ];
    }
    
    if (sessionTime < 60) {
      return [
        { icon: Move, title: 'Alongar pescoço', description: 'Movimento suave para os lados', duration: '2 min' },
        { icon: Eye, title: 'Exercício dos olhos', description: 'Olhe para pontos distantes', duration: '1 min' },
      ];
    }

    return [
      { icon: Coffee, title: 'Pausa ativa', description: 'Levante-se e caminhe um pouco', duration: '5 min' },
      { icon: Move, title: 'Alongamento completo', description: 'Exercícios para coluna e ombros', duration: '3 min' },
      { icon: Eye, title: 'Descanso visual', description: 'Olhe pela janela ou feche os olhos', duration: '2 min' },
    ];
  };

  const suggestions = getBreakSuggestions();
  const isPriorityBreak = sessionTime > 120 || postureStatus === 'danger';

  return (
    <Card className={`p-6 ${isPriorityBreak ? 'border-warning shadow-warning' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <Coffee className="h-5 w-5 mr-2 text-primary" />
          Sugestões de Pausa
        </h3>
        {isPriorityBreak && (
          <span className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            Pausa Recomendada!
          </span>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {suggestions.map((suggestion, index) => {
          const SuggestionIcon = suggestion.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <SuggestionIcon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{suggestion.title}</h4>
                <p className="text-muted-foreground text-xs">{suggestion.description}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {suggestion.duration}
              </div>
            </div>
          );
        })}
      </div>

      <Button 
        onClick={onBreakTaken} 
        className={`w-full transition-spring ${isPriorityBreak ? 'bg-gradient-warning hover:shadow-warning' : ''}`}
        variant={isPriorityBreak ? "default" : "outline"}
      >
        <CheckCircle2 className="h-4 w-4 mr-2" />
        Marcar Pausa Realizada
      </Button>

      <div className="mt-4 text-center">
        <div className="text-xs text-muted-foreground">
          {sessionTime > 90 ? 
            'Pausa necessária para sua saúde!' : 
            sessionTime > 45 ? 
            'Considere uma pausa em breve' : 
            'Continue com o bom trabalho!'
          }
        </div>
      </div>
    </Card>
  );
};