import { useState, useEffect, useCallback } from 'react';

export interface PostureData {
  score: number; // 0-100
  status: 'good' | 'warning' | 'danger';
  pressure: {
    leftSide: number;
    rightSide: number;
    backSupport: number;
    seatCenter: number;
  };
  tiltAngle: number;
  sessionTime: number; // minutes
  breaksSuggested: number;
  alertsTriggered: number;
}

export interface DailyStats {
  totalHours: number;
  timesStoodUp: number;
  averagePostureScore: number;
  alertCount: number;
  breaksTaken: number;
}

//CONFIGURAÇÕES DO MODELO DE POSTURA

/**
 * Define os pesos de cada componente na pontuação final.
 * A soma deve ser 1.0
 * 35% Equilíbrio (esquerda/direita)
 * 40% Apoio nas costas (mais importante)
 * 25% Centralização no assento
 */
const WEIGHTS = {
  balance: 0.35,
  backSuport: 0.40,
  center: 0.25,
};

/**
 * Define as faixas ideais e os limites para os sensores.
 * Usado para normalizar as pontuações de 0 a 100.
 */
const IDEAL_RANGES = {
  /**Centralização no assento
   * Mínimo: pressão mínima central para estar "bem sentado"
   * Máximo: acima disso, talvez esteja curvado/sentado muito atrás
   */
  centerMin: 40,
  centerMax: 70, 

  // Equilíbrio (Diferença L/R): A diferença máxima L/R antes da pontuação de equilíbrio zerar
  maxImbalance: 30,

  // Apoio nas costas: Pressão mínima nas costas para ser considerado "apoiado"
  BackSupportMin: 50,
};


export const usePostureSimulation = () => {
  const [postureData, setPostureData] = useState<PostureData>({
    score: 85,
    status: 'good',
    pressure: {
      leftSide: 45,
      rightSide: 42,
      backSupport: 65,
      seatCenter: 58,
    },
    tiltAngle: 2,
    sessionTime: 0,
    breaksSuggested: 0,
    alertsTriggered: 0,
  });

  const [dailyStats, setDailyStats] = useState<DailyStats>({
    totalHours: 6.5,
    timesStoodUp: 12,
    averagePostureScore: 78,
    alertCount: 5,
    breaksTaken: 8,
  });

  const [isRunning, setIsRunning] = useState(true);

  // Simula mudanças realistas nos dados dos sensores
  const updateSimulation = useCallback(() => {
    setPostureData(prev => {
      const randomVariation = (base: number, variance: number) =>
        Math.max(0, Math.min(100, base + (Math.random() - 0.5) * variance));

      const newPressure = {
        leftSide: randomVariation(prev.pressure.leftSide, 8),
        rightSide: randomVariation(prev.pressure.rightSide, 8),
        backSupport: randomVariation(prev.pressure.backSupport, 10),
        seatCenter: randomVariation(prev.pressure.seatCenter, 6),
      };

      //CÁLCULO DE SCORE

      /** Balance Score (Equilíbrio L/R) [0-100]
       *  Pontuação 100 se a diferença for 0.
       *  Pontuação 0 se a diferença for >= MAX_IMBALANCE.
       */
      const imbalance = Math.abs(newPressure.leftSide - newPressure.rightSide);
      const balanceScore = Math.max(0, 100 - (imbalance / IDEAL_RANGES.maxImbalance) * 100);

      /** Back Support Score (Apoio nas Costas) [0-100]
       *  Pontuação 100 se for >= MIN. Penaliza linearmente abaixo disso.
       */
      let backSupportScore;
      if (newPressure.backSupport >= IDEAL_RANGES.BackSupportMin) {
        backSupportScore = 100; // Bom apoio
      } else {
        // Rampa linear de 0 (pressão 0) até 100 (pressão MIN)
        backSupportScore = (newPressure.backSupport / IDEAL_RANGES.BackSupportMin) * 100;
      }
      backSupportScore = Math.max(0, Math.min(100, backSupportScore)); // Garante 0-100

      /** Center Score (Centralização) [0-100]
       *  Pontuação 100 se estiver na faixa ideal. Penaliza fora da faixa.
       */
      let centerScore;
      if (newPressure.seatCenter < IDEAL_RANGES.centerMin) {
        // Sentando na borda (penalidade)
        centerScore = (newPressure.seatCenter / IDEAL_RANGES.centerMin) * 100;
      } else if (newPressure.seatCenter > IDEAL_RANGES.centerMax) {
        // Muito para trás/curvado (penalidade)
        const overflow = newPressure.seatCenter - IDEAL_RANGES.centerMax;
        const maxOverflow = 100 - IDEAL_RANGES.centerMax; // (ex: 100 - 70 = 30)
        centerScore = 100 - (overflow / maxOverflow) * 100;
      } else {
        // Dentro da faixa ideal
        centerScore = 100;
      }
      centerScore = Math.max(0, Math.min(100, centerScore)); // Garante 0-100

      //Cálculo Final Ponderado
      const newScore = Math.round(
        (balanceScore * WEIGHTS.balance) +
        (backSupportScore * WEIGHTS.backSuport) +
        (centerScore * WEIGHTS.center)
      );



      let newStatus: 'good' | 'warning' | 'danger' = 'good';
      if (newScore < 40) newStatus = 'danger';
      else if (newScore < 70) newStatus = 'warning';

      const newTiltAngle = randomVariation(prev.tiltAngle, 3);

      return {
        ...prev,
        score: newScore,
        status: newStatus,
        pressure: newPressure,
        tiltAngle: newTiltAngle,
        sessionTime: prev.sessionTime + 0.5, // incrementa 30 segundos
        breaksSuggested: prev.sessionTime > 0 && prev.sessionTime % 30 === 0 ? prev.breaksSuggested + 1 : prev.breaksSuggested,
        alertsTriggered: newStatus !== 'good' && prev.status === 'good' ? prev.alertsTriggered + 1 : prev.alertsTriggered,
      };
    });
  }, []); // O useCallback agora está correto, pois as constantes estão fora

  const resetSession = () => {
    setPostureData(prev => ({
      ...prev,
      sessionTime: 0,
      breaksSuggested: 0,
      alertsTriggered: 0,
    }));
  };

  const simulateBreak = () => {
    setPostureData(prev => ({
      ...prev,
      score: Math.min(100, prev.score + 10), // Simula melhora
      status: 'good',
    }));
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(updateSimulation, 2000); // Atualiza a cada 2 segundos
    return () => clearInterval(interval);
  }, [isRunning, updateSimulation]);

  return {
    postureData,
    dailyStats,
    isRunning,
    setIsRunning,
    resetSession,
    simulateBreak,
  };
};