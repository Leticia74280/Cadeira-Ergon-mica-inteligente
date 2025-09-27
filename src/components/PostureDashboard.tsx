import { useState } from 'react';
import { Activity, Clock, AlertCircle, Volume2, VolumeX, Users, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePostureSimulation } from '@/hooks/usePostureSimulation';
import { PostureStatusCard } from '@/components/PostureStatusCard';
import { SessionTimer } from '@/components/SessionTimer';
import { PressureMap } from '@/components/PressureMap';
import { BreakSuggestions } from '@/components/BreakSuggestions';
import { AlertSettings } from '@/components/AlertSettings';
import { DailyReport } from '@/components/DailyReport';

export const PostureDashboard = () => {
  const { postureData, dailyStats, isRunning, setIsRunning, resetSession, simulateBreak } = usePostureSimulation();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cadeira Ergonômica Inteligente</h1>
            <p className="text-muted-foreground mt-2">Monitor em tempo real da sua postura e saúde</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant={audioEnabled ? "default" : "outline"}
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="transition-spring"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              Som {audioEnabled ? 'Ativo' : 'Inativo'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(!showSettings)}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setShowReport(!showReport)}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatório
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6">
            <AlertSettings 
              audioEnabled={audioEnabled}
              onAudioToggle={setAudioEnabled}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}

        {/* Daily Report */}
        {showReport && (
          <div className="mb-6">
            <DailyReport 
              stats={dailyStats}
              onClose={() => setShowReport(false)}
            />
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Posture Status - Large Card */}
          <div className="lg:col-span-2">
            <PostureStatusCard 
              score={postureData.score}
              status={postureData.status}
              alertsTriggered={postureData.alertsTriggered}
              isRunning={isRunning}
            />
          </div>

          {/* Session Controls */}
          <div className="space-y-4">
            <SessionTimer 
              sessionTime={postureData.sessionTime}
              isRunning={isRunning}
              onToggle={() => setIsRunning(!isRunning)}
              onReset={resetSession}
              formatTime={formatTime}
            />

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Controles da Sessão
              </h3>
              <div className="space-y-3">
                <Button 
                  onClick={simulateBreak} 
                  variant="outline" 
                  className="w-full"
                >
                  Simular Pausa
                </Button>
                <div className="text-sm text-muted-foreground">
                  <p>Pausas sugeridas: {postureData.breaksSuggested}</p>
                  <p>Alertas hoje: {postureData.alertsTriggered}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pressure Map */}
          <PressureMap 
            pressure={postureData.pressure}
            tiltAngle={postureData.tiltAngle}
          />

          {/* Break Suggestions */}
          <BreakSuggestions 
            sessionTime={postureData.sessionTime}
            postureStatus={postureData.status}
            onBreakTaken={simulateBreak}
          />
        </div>
      </div>
    </div>
  );
};