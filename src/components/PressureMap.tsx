import { Card } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface PressureMapProps {
  pressure: {
    leftSide: number;
    rightSide: number;
    backSupport: number;
    seatCenter: number;
  };
  tiltAngle: number;
}

export const PressureMap = ({ pressure, tiltAngle }: PressureMapProps) => {
  const getPressureColor = (value: number) => {
    if (value < 40) return 'bg-danger text-danger-foreground';
    if (value < 70) return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  const getPressureStatus = (value: number) => {
    if (value < 40) return 'Baixa';
    if (value < 70) return 'Média';
    return 'Alta';
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-6 flex items-center">
        <Activity className="h-5 w-5 mr-2 text-primary" />
        Mapa de Pressão
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Pressure Points */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Lado Esquerdo</span>
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded text-xs font-medium ${getPressureColor(pressure.leftSide)}`}>
                {getPressureStatus(pressure.leftSide)}
              </div>
              <span className="text-xs text-muted-foreground">{Math.round(pressure.leftSide)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Lado Direito</span>
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded text-xs font-medium ${getPressureColor(pressure.rightSide)}`}>
                {getPressureStatus(pressure.rightSide)}
              </div>
              <span className="text-xs text-muted-foreground">{Math.round(pressure.rightSide)}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Apoio das Costas</span>
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded text-xs font-medium ${getPressureColor(pressure.backSupport)}`}>
                {getPressureStatus(pressure.backSupport)}
              </div>
              <span className="text-xs text-muted-foreground">{Math.round(pressure.backSupport)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Centro do Assento</span>
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded text-xs font-medium ${getPressureColor(pressure.seatCenter)}`}>
                {getPressureStatus(pressure.seatCenter)}
              </div>
              <span className="text-xs text-muted-foreground">{Math.round(pressure.seatCenter)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chair Representation */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <svg width="180" height="200" viewBox="0 0 180 200" className="border rounded-lg bg-muted/30">
            {/* Chair Back */}
            <rect 
              x="40" 
              y="20" 
              width="100" 
              height="80" 
              rx="8" 
              className={`${getPressureColor(pressure.backSupport)} opacity-70`}
            />
            
            {/* Seat */}
            <ellipse 
              cx="90" 
              cy="140" 
              rx="60" 
              ry="40" 
              className={`${getPressureColor(pressure.seatCenter)} opacity-70`}
            />
            
            {/* Left Side */}
            <rect 
              x="20" 
              y="110" 
              width="20" 
              height="60" 
              rx="4" 
              className={`${getPressureColor(pressure.leftSide)} opacity-70`}
            />
            
            {/* Right Side */}
            <rect 
              x="140" 
              y="110" 
              width="20" 
              height="60" 
              rx="4" 
              className={`${getPressureColor(pressure.rightSide)} opacity-70`}
            />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          Ângulo de Inclinação: <span className="font-medium">{tiltAngle.toFixed(1)}°</span>
        </div>
      </div>
    </Card>
  );
};