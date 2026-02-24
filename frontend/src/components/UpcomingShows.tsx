import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGetProgramSchedule } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProgramDaySlot } from '../backend';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parseTimeToMinutes(timeStr: string): number | null {
  const cleaned = timeStr.replace(/\s+(CST|EST|PST|MST|EDT|CDT|PDT|MDT)/gi, '').trim();
  const match = cleaned.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;

  const [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  else if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;

  return hour * 60 + minute;
}

function isDayMatch(slotDay: string, targetDay: string): boolean {
  if (!slotDay) return false;
  const d = slotDay.trim();

  if (d.toLowerCase() === 'daily' || d.toLowerCase() === 'any') return true;
  if (d.toLowerCase() === 'weekdays') {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(targetDay);
  }
  if (d.toLowerCase() === 'weekends') {
    return ['Saturday', 'Sunday'].includes(targetDay);
  }
  if (d.includes('-')) {
    const [start, end] = d.split('-');
    const ti = DAYS.indexOf(targetDay);
    const si = DAYS.indexOf(start);
    const ei = DAYS.indexOf(end);
    if (si <= ei) return ti >= si && ti <= ei;
    return ti >= si || ti <= ei;
  }
  return d.replace(/s$/, '') === targetDay.replace(/s$/, '');
}

function getUpcomingShows(slots: ProgramDaySlot[], maxShows: number = 2): ProgramDaySlot[] {
  const now = new Date();
  const currentDay = DAYS[now.getDay()];
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  // Exclude Auto DJ from upcoming shows
  const liveSlots = slots.filter((s) => s.program.name !== 'Auto DJ');

  const upcoming: Array<{ slot: ProgramDaySlot; minutesUntil: number }> = [];

  for (let dayOffset = 0; dayOffset <= 7; dayOffset++) {
    const checkDate = new Date(now);
    checkDate.setDate(checkDate.getDate() + dayOffset);
    const checkDay = DAYS[checkDate.getDay()];

    for (const slot of liveSlots) {
      if (!isDayMatch(slot.day, checkDay)) continue;

      const startMin = parseTimeToMinutes(slot.program.startTime);
      if (startMin === null) continue;

      let minutesUntil: number;
      if (dayOffset === 0) {
        minutesUntil = startMin - currentTimeInMinutes;
        if (minutesUntil <= 0) continue;
      } else {
        const minutesInDay = 24 * 60;
        const minutesUntilEndOfToday = minutesInDay - currentTimeInMinutes;
        minutesUntil = minutesUntilEndOfToday + (dayOffset - 1) * minutesInDay + startMin;
      }

      upcoming.push({ slot, minutesUntil });
    }
  }

  upcoming.sort((a, b) => a.minutesUntil - b.minutesUntil);
  return upcoming.slice(0, maxShows).map((item) => item.slot);
}

function formatTimeUntil(slot: ProgramDaySlot): string {
  const now = new Date();
  const currentDay = DAYS[now.getDay()];
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  const startMin = parseTimeToMinutes(slot.program.startTime);
  if (startMin === null) return '';

  if (isDayMatch(slot.day, currentDay)) {
    const minutesUntil = startMin - currentTimeInMinutes;
    if (minutesUntil > 0 && minutesUntil < 60) {
      return `Starting in ${minutesUntil} minute${minutesUntil !== 1 ? 's' : ''}`;
    } else if (minutesUntil >= 60) {
      const hours = Math.floor(minutesUntil / 60);
      const minutes = minutesUntil % 60;
      if (minutes === 0) return `Starting in ${hours} hour${hours !== 1 ? 's' : ''}`;
      return `Starting in ${hours}h ${minutes}m`;
    }
  }

  const d = slot.day.trim();
  if (d.toLowerCase() === 'daily' || d.toLowerCase() === 'any') return 'Coming up soon';
  return `Coming up ${d}`;
}

export default function UpcomingShows() {
  const { data: slots, isLoading } = useGetProgramSchedule();

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

  const upcomingShows = slots ? getUpcomingShows(slots, 2) : [];

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
          <p className="text-gray-600">No upcoming shows scheduled. Check back soon!</p>
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
          {upcomingShows.map((slot, index) => (
            <div
              key={`${slot.program.name}-${slot.day}-${index}`}
              className="p-4 rounded-lg bg-gradient-to-r from-christmas-gold/10 to-christmas-red/10 border border-christmas-gold/30 transition-all duration-300 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <h4 className="text-lg font-bold text-christmas-dark font-christmas flex-1">
                  {slot.program.name}
                </h4>
                <span className="text-xs font-medium text-christmas-red bg-christmas-gold/20 px-2 py-1 rounded-full whitespace-nowrap">
                  {formatTimeUntil(slot)}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-500 mb-1">{slot.day}</p>
              <p className="text-sm text-gray-600 mb-2">
                {slot.program.startTime} - {slot.program.endTime}
              </p>
              <div className="max-h-20 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-christmas-gold scrollbar-track-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">{slot.program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
