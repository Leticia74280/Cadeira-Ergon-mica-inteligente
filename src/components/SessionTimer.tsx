import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

interface SessionTimerProps {
  sessionTime: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  formatTime: (minutes: number) => string;
}

export const SessionTimer = ({ sessionTime, isRunning, onToggle, onReset, formatTime }: SessionTimerProps) => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-primary" />
        Tempo de Sessão
      </h3>
      
      <div className="text-center mb-6">
        <div className="text-3xl font-mono font-bold text-primary mb-2">
          {formatTime(sessionTime)}
        </div>
        <p className="text-muted-foreground text-sm">
          {sessionTime > 120 ? 'Considere fazer uma pausa' : 'Tempo de trabalho atual'}
        </p>
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={onToggle} 
          variant={isRunning ? "outline" : "default"}
          className="flex-1 transition-smooth"
        >
          {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isRunning ? 'Pausar' : 'Iniciar'}
        </Button>
        
        <Button 
          onClick={onReset} 
          variant="outline"
          size="icon"
          className="transition-smooth"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {sessionTime > 60 && (
        <div className="mt-4 p-3 bg-warning-muted rounded-lg">
          <p className="text-warning text-sm font-medium text-center">
            {sessionTime > 120 ? '⚠️ Pausa recomendada!' : '💡 Considere uma pausa em breve'}
          </p>
        </div>
      )}
    </Card>
  );
};