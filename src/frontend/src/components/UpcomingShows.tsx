import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGetProgramSchedule } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { Program } from '../backend';

interface ParsedTime {
  day: string;
  hour: number;
  minute: number;
}

function parseTimeString(timeStr: string): ParsedTime | null {
  const cleanedTimeStr = timeStr.replace(/\s+(CST|EST|PST|MST|EDT|CDT|PDT|MDT)/gi, '').trim();
  
  const match = cleanedTimeStr.match(/(\w+(?:-\w+)?)\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) {
    const timeOnlyMatch = cleanedTimeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (timeOnlyMatch) {
      const [, hourStr, minuteStr, period] = timeOnlyMatch;
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      if (period.toUpperCase() === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period.toUpperCase() === 'AM' && hour === 12) {
        hour = 0;
      }

      return { day: 'Any', hour, minute };
    }
    return null;
  }

  const [, day, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (period.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  return { day, hour, minute };
}

function isDayMatch(programDay: string, targetDay: string): boolean {
  if (programDay === 'Any' || programDay.toLowerCase() === 'daily') return true;

  if (programDay.toLowerCase() === 'weekdays') {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return weekdays.includes(targetDay);
  }

  if (programDay.toLowerCase() === 'weekends') {
    const weekends = ['Saturday', 'Sunday'];
    return weekends.includes(targetDay);
  }

  if (programDay.includes('-')) {
    const [startDay, endDay] = programDay.split('-');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDayIndex = days.indexOf(targetDay);
    const startIndex = days.indexOf(startDay);
    const endIndex = days.indexOf(endDay);

    if (startIndex <= endIndex) {
      return targetDayIndex >= startIndex && targetDayIndex <= endIndex;
    } else {
      return targetDayIndex >= startIndex || targetDayIndex <= endIndex;
    }
  }

  const normalizedProgramDay = programDay.replace(/s$/, '');
  const normalizedTargetDay = targetDay.replace(/s$/, '');
  return normalizedProgramDay === normalizedTargetDay;
}

function getUpcomingShows(programs: Program[], maxShows: number = 2): Program[] {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Filter out Auto DJ from upcoming shows
  const livePrograms = programs.filter(p => p.name !== 'Auto DJ');

  const upcomingShows: Array<{ program: Program; minutesUntil: number }> = [];

  // Check today and next 7 days
  for (let dayOffset = 0; dayOffset <= 7; dayOffset++) {
    const checkDate = new Date(now);
    checkDate.setDate(checkDate.getDate() + dayOffset);
    const checkDay = days[checkDate.getDay()];

    for (const program of livePrograms) {
      const startTime = parseTimeString(program.startTime);
      if (!startTime) continue;

      if (!isDayMatch(startTime.day, checkDay)) continue;

      const startTimeInMinutes = startTime.hour * 60 + startTime.minute;
      
      let minutesUntil: number;
      if (dayOffset === 0) {
        // Today
        minutesUntil = startTimeInMinutes - currentTimeInMinutes;
        if (minutesUntil <= 0) continue; // Skip if already started or passed
      } else {
        // Future days
        const minutesInDay = 24 * 60;
        const minutesUntilEndOfToday = minutesInDay - currentTimeInMinutes;
        const minutesInBetweenDays = (dayOffset - 1) * minutesInDay;
        minutesUntil = minutesUntilEndOfToday + minutesInBetweenDays + startTimeInMinutes;
      }

      upcomingShows.push({ program, minutesUntil });
    }
  }

  // Sort by time until start
  upcomingShows.sort((a, b) => a.minutesUntil - b.minutesUntil);

  // Return only the requested number of shows
  return upcomingShows.slice(0, maxShows).map(item => item.program);
}

function formatTimeUntil(program: Program): string {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const startTime = parseTimeString(program.startTime);
  if (!startTime) return '';

  // Check if it's today
  if (isDayMatch(startTime.day, currentDay)) {
    const startTimeInMinutes = startTime.hour * 60 + startTime.minute;
    const minutesUntil = startTimeInMinutes - currentTimeInMinutes;
    
    if (minutesUntil > 0 && minutesUntil < 60) {
      return `Starting in ${minutesUntil} minute${minutesUntil !== 1 ? 's' : ''}`;
    } else if (minutesUntil >= 60) {
      const hours = Math.floor(minutesUntil / 60);
      const minutes = minutesUntil % 60;
      if (minutes === 0) {
        return `Starting in ${hours} hour${hours !== 1 ? 's' : ''}`;
      }
      return `Starting in ${hours}h ${minutes}m`;
    }
  }

  // For future days, show the day
  const programDay = startTime.day;
  if (programDay === 'Any' || programDay.toLowerCase() === 'daily') {
    return 'Coming up soon';
  }
  
  return `Coming up ${programDay}`;
}

export default function UpcomingShows() {
  const { data: programs, isLoading } = useGetProgramSchedule();

  if (isLoading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </Card>
    );
  }

  const upcomingShows = programs ? getUpcomingShows(programs, 2) : [];

  if (upcomingShows.length === 0) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-christmas-gold flex items-center justify-center">
              <Clock className="h-5 w-5 text-christmas-red" />
            </div>
            <h3 className="text-xl font-bold text-christmas-dark font-christmas">
              📅 Upcoming Shows
            </h3>
          </div>
          <p className="text-gray-600">
            No upcoming shows scheduled. Check back soon!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-christmas-gold flex items-center justify-center">
            <Clock className="h-5 w-5 text-christmas-red" />
          </div>
          <h3 className="text-xl font-bold text-christmas-dark font-christmas">
            📅 Upcoming Shows
          </h3>
        </div>
        
        <div className="space-y-4">
          {upcomingShows.map((show, index) => (
            <div
              key={`${show.name}-${index}`}
              className="p-4 rounded-lg bg-gradient-to-r from-christmas-gold/10 to-christmas-red/10 border border-christmas-gold/30 transition-all duration-300 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-lg font-bold text-christmas-dark font-christmas flex-1">
                  {show.name}
                </h4>
                <span className="text-xs font-medium text-christmas-red bg-christmas-gold/20 px-2 py-1 rounded-full whitespace-nowrap">
                  {formatTimeUntil(show)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {show.startTime} - {show.endTime}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {show.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
