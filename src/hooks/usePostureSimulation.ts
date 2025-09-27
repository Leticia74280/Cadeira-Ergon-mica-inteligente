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

  // Simulate realistic sensor data changes
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

      // Calculate posture score based on pressure balance and back support
      const balanceScore = 100 - Math.abs(newPressure.leftSide - newPressure.rightSide) * 2;
      const backSupportScore = newPressure.backSupport;
      const centerScore = newPressure.seatCenter > 30 ? 100 : newPressure.seatCenter * 3;
      
      const newScore = Math.round((balanceScore + backSupportScore + centerScore) / 3);

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
        sessionTime: prev.sessionTime + 0.5, // increment by 30 seconds
        breaksSuggested: prev.sessionTime > 0 && prev.sessionTime % 30 === 0 ? prev.breaksSuggested + 1 : prev.breaksSuggested,
        alertsTriggered: newStatus !== 'good' && prev.status === 'good' ? prev.alertsTriggered + 1 : prev.alertsTriggered,
      };
    });
  }, []);

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
      score: Math.min(100, prev.score + 10),
      status: 'good',
    }));
  };

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(updateSimulation, 2000); // Update every 2 seconds
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