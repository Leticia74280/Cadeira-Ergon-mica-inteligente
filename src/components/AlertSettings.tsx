import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Volume2, VolumeX, Bell, X } from 'lucide-react';

interface AlertSettingsProps {
  audioEnabled: boolean;
  onAudioToggle: (enabled: boolean) => void;
  onClose: () => void;
}

export const AlertSettings = ({ audioEnabled, onAudioToggle, onClose }: AlertSettingsProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold flex items-center">
          <Settings className="h-5 w-5 mr-2 text-primary" />
          Configurações de Alertas
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Audio Alert Settings */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            {audioEnabled ? (
              <Volume2 className="h-5 w-5 text-primary" />
            ) : (
              <VolumeX className="h-5 w-5 text-muted-foreground" />
            )}
            <div>
              <Label className="font-medium">Alertas Sonoros</Label>
              <p className="text-sm text-muted-foreground">
                Reproduzir sons quando detectar postura inadequada
              </p>
            </div>
          </div>
          <Switch 
            checked={audioEnabled}
            onCheckedChange={onAudioToggle}
          />
        </div>

        {/* Visual Alert Settings */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <Label className="font-medium">Alertas Visuais</Label>
              <p className="text-sm text-muted-foreground">
                Sempre ativo - notificações na tela
              </p>
            </div>
          </div>
          <Switch checked={true} disabled />
        </div>

        {/* Sensitivity Settings */}
        <div className="space-y-3">
          <Label className="font-medium">Sensibilidade dos Alertas</Label>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" size="sm">
              Baixa
            </Button>
            <Button variant="default" size="sm">
              Média
            </Button>
            <Button variant="outline" size="sm">
              Alta
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Média: Alerta após 30 segundos de postura inadequada
          </p>
        </div>

        {/* Break Reminders */}
        <div className="space-y-3">
          <Label className="font-medium">Lembretes de Pausa</Label>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" size="sm">
              30 min
            </Button>
            <Button variant="default" size="sm">
              45 min
            </Button>
            <Button variant="outline" size="sm">
              60 min
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-success-muted rounded-lg">
        <p className="text-success text-sm font-medium text-center">
          ✅ Configurações salvas automaticamente
        </p>
      </div>
    </Card>
  );
};