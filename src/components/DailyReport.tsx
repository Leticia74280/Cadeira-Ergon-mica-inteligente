import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Clock, TrendingUp, AlertTriangle, Coffee, X, Download } from 'lucide-react';

interface DailyReportProps {
  stats: {
    totalHours: number;
    timesStoodUp: number;
    averagePostureScore: number;
    alertCount: number;
    breaksTaken: number;
  };
  onClose: () => void;
}

export const DailyReport = ({ stats, onClose }: DailyReportProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'bg-gradient-health';
    if (score >= 60) return 'bg-gradient-warning';
    return 'bg-gradient-danger';
  };

  const exportReport = () => {
    const reportData = {
      date: new Date().toLocaleDateString('pt-BR'),
      ...stats,
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `relatorio-postura-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Relatório Diário - {new Date().toLocaleDateString('pt-BR')}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Hours */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{stats.totalHours}h</div>
              <div className="text-sm text-muted-foreground">Total de Horas</div>
            </div>
          </div>
        </div>

        {/* Times Stood Up */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{stats.timesStoodUp}</div>
              <div className="text-sm text-muted-foreground">Vezes Levantou</div>
            </div>
          </div>
        </div>

        {/* Posture Score */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full ${getScoreGradient(stats.averagePostureScore)} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">{stats.averagePostureScore}</span>
            </div>
            <div>
              <div className={`text-2xl font-bold ${getScoreColor(stats.averagePostureScore)}`}>
                {stats.averagePostureScore}/100
              </div>
              <div className="text-sm text-muted-foreground">Score da Postura</div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-warning" />
            <div>
              <div className="text-2xl font-bold">{stats.alertCount}</div>
              <div className="text-sm text-muted-foreground">Alertas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4 bg-accent">
          <h4 className="font-semibold mb-3 flex items-center">
            <Coffee className="h-4 w-4 mr-2 text-primary" />
            Pausas e Atividade
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Pausas realizadas:</span>
              <span className="font-medium">{stats.breaksTaken}</span>
            </div>
            <div className="flex justify-between">
              <span>Frequência de pausas:</span>
              <span className="font-medium">
                A cada {Math.round(stats.totalHours * 60 / Math.max(stats.timesStoodUp, 1))} min
              </span>
            </div>
            <div className="flex justify-between">
              <span>Meta diária:</span>
              <span className={`font-medium ${stats.timesStoodUp >= 8 ? 'text-success' : 'text-warning'}`}>
                {stats.timesStoodUp >= 8 ? '✅ Alcançada' : '⚠️ Não alcançada'}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-accent">
          <h4 className="font-semibold mb-3">Recomendações</h4>
          <div className="space-y-2 text-sm">
            {stats.averagePostureScore < 70 && (
              <div className="text-danger">• Foque em manter as costas retas</div>
            )}
            {stats.timesStoodUp < 8 && (
              <div className="text-warning">• Levante-se mais frequentemente</div>
            )}
            {stats.alertCount > 10 && (
              <div className="text-warning">• Ajuste a altura da cadeira</div>
            )}
            {stats.averagePostureScore >= 80 && stats.timesStoodUp >= 8 && (
              <div className="text-success">• Excelente trabalho hoje! 🎉</div>
            )}
          </div>
        </Card>
      </div>

      {/* Summary */}
      <div className="text-center p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          {stats.averagePostureScore >= 80 
            ? "Ótimo desempenho hoje! Continue mantendo uma postura saudável." 
            : stats.averagePostureScore >= 60 
            ? "Bom progresso! Algumas melhorias podem aumentar seu conforto."
            : "Foque em melhorar sua postura amanhã. Pequenos ajustes fazem diferença!"
          }
        </p>
      </div>
    </Card>
  );
};