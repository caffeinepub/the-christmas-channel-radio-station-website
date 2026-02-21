import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

interface TwinkleLight {
  id: number;
  left: number;
  top: number;
  color: string;
  delay: number;
  duration: number;
}

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [lights, setLights] = useState<TwinkleLight[]>([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 80; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20,
        size: 8 + Math.random() * 16,
        delay: Math.random() * 10,
      });
    }
    setSnowflakes(flakes);

    // Generate twinkling lights
    const twinkleLights: TwinkleLight[] = [];
    const colors = [
      'oklch(0.52 0.22 25)', // red
      'oklch(0.78 0.15 85)', // gold
      'oklch(0.48 0.18 155)', // green
      'oklch(0.95 0.05 85)', // white
    ];
    
    for (let i = 0; i < 40; i++) {
      twinkleLights.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        duration: 1.5 + Math.random() * 2,
      });
    }
    setLights(twinkleLights);
  }, []);

  return (
    <>
      {/* Snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake absolute text-white opacity-60"
            style={{
              left: `${flake.left}%`,
              fontSize: `${flake.size}px`,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.delay}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Twinkling Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {lights.map((light) => (
          <div
            key={light.id}
            className="twinkle-light absolute rounded-full"
            style={{
              left: `${light.left}%`,
              top: `${light.top}%`,
              backgroundColor: light.color,
              width: '4px',
              height: '4px',
              boxShadow: `0 0 8px 2px ${light.color}`,
              animationDelay: `${light.delay}s`,
              animationDuration: `${light.duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
