import { useEffect, useState } from 'react';
import { Snowflake } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ChristmasCountdown() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Target is December 25th of the current year at midnight
      const christmasThisYear = new Date(currentYear, 11, 25, 0, 0, 0, 0);
      
      const nowTime = now.getTime();
      const christmasTime = christmasThisYear.getTime();
      const difference = christmasTime - nowTime;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        // If Christmas has passed this year, show zeros
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get current year for display
  const currentYear = new Date().getFullYear();

  return (
    <Card className="bg-gradient-to-br from-christmas-red/95 to-christmas-green/95 backdrop-blur-sm border-christmas-gold border-4 shadow-2xl">
      <div className="p-6 md:p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Snowflake className="h-6 w-6 md:h-8 md:w-8 text-white animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold text-white font-christmas">
            Countdown to Christmas {currentYear}
          </h2>
          <Snowflake className="h-6 w-6 md:h-8 md:w-8 text-white animate-pulse" />
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 border-2 border-christmas-gold">
            <div className="text-3xl md:text-5xl font-bold text-white font-christmas">
              {timeRemaining.days}
            </div>
            <div className="text-xs md:text-sm text-christmas-gold font-semibold mt-1 uppercase tracking-wide">
              Days
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 border-2 border-christmas-gold">
            <div className="text-3xl md:text-5xl font-bold text-white font-christmas">
              {timeRemaining.hours}
            </div>
            <div className="text-xs md:text-sm text-christmas-gold font-semibold mt-1 uppercase tracking-wide">
              Hours
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 border-2 border-christmas-gold">
            <div className="text-3xl md:text-5xl font-bold text-white font-christmas">
              {timeRemaining.minutes}
            </div>
            <div className="text-xs md:text-sm text-christmas-gold font-semibold mt-1 uppercase tracking-wide">
              Minutes
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 border-2 border-christmas-gold">
            <div className="text-3xl md:text-5xl font-bold text-white font-christmas">
              {timeRemaining.seconds}
            </div>
            <div className="text-xs md:text-sm text-christmas-gold font-semibold mt-1 uppercase tracking-wide">
              Seconds
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-white text-sm md:text-base font-medium italic">
          ✨ The most wonderful time of the year is coming! ✨
        </p>
      </div>
    </Card>
  );
}
