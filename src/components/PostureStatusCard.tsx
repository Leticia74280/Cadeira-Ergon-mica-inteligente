import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface PostureStatusCardProps {
  score: number;
  status: 'good' | 'warning' | 'danger';
  alertsTriggered: number;
  isRunning: boolean;
}

export const PostureStatusCard = ({ score, status, alertsTriggered, isRunning }: PostureStatusCardProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'good':
        return {
          color: 'bg-gradient-health',
          icon: CheckCircle,
          text: 'Postura Excelente',
          description: 'Sua postura está adequada. Continue assim!',
          shadow: 'shadow-health',
        };
      case 'warning':
        return {
          color: 'bg-gradient-warning',
          icon: AlertTriangle,
          text: 'Atenção à Postura',
          description: 'Ajuste sua posição para melhorar o conforto.',
          shadow: 'shadow-warning',
        };
      case 'danger':
        return {
          color: 'bg-gradient-danger',
          icon: XCircle,
          text: 'Postura Inadequada',
          description: 'Corrija sua postura imediatamente!',
          shadow: 'shadow-danger',
        };
      default:
        return {
          color: 'bg-gradient-primary',
          icon: Activity,
          text: 'Monitorando...',
          description: 'Sistema inicializando.',
          shadow: 'shadow-medium',
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <Card className={`p-8 ${config.color} text-white ${config.shadow} transition-spring`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            <StatusIcon className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{config.text}</h2>
            <p className="text-white/90 text-lg">{config.description}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-4xl font-bold">{score}</div>
          <div className="text-white/90 text-sm">Score de Postura</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-6">
          <div>
            <div className="text-2xl font-semibold">{alertsTriggered}</div>
            <div className="text-white/80 text-sm">Alertas Hoje</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
            <span className="text-white/90 text-sm">
              {isRunning ? 'Monitorando' : 'Pausado'}
            </span>
          </div>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-full">
          <span className="text-white/90 text-sm font-medium">
            Status: {status === 'good' ? 'Ótimo' : status === 'warning' ? 'Atenção' : 'Crítico'}
          </span>
        </div>
      </div>
    </Card>
  );
};