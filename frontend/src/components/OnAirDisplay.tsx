import { Radio } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetProgramSchedule, useGetOnAirOverride } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProgramDaySlot } from '../backend';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parseTimeToMinutes(timeStr: string): number | null {
  // Remove timezone indicators
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

function isDayMatch(slotDay: string, currentDay: string): boolean {
  if (!slotDay) return false;
  const d = slotDay.trim();

  if (d.toLowerCase() === 'daily' || d.toLowerCase() === 'any') return true;
  if (d.toLowerCase() === 'weekdays') {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(currentDay);
  }
  if (d.toLowerCase() === 'weekends') {
    return ['Saturday', 'Sunday'].includes(currentDay);
  }
  if (d.includes('-')) {
    const [start, end] = d.split('-');
    const ci = DAYS.indexOf(currentDay);
    const si = DAYS.indexOf(start);
    const ei = DAYS.indexOf(end);
    if (si <= ei) return ci >= si && ci <= ei;
    return ci >= si || ci <= ei;
  }
  // Direct match (e.g., "Monday") or plural (e.g., "Mondays")
  return d.replace(/s$/, '') === currentDay.replace(/s$/, '');
}

function getCurrentProgram(slots: ProgramDaySlot[]): ProgramDaySlot | null {
  const now = new Date();
  const currentDay = DAYS[now.getDay()];
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  let autoDJSlot: ProgramDaySlot | null = null;
  const liveSlots: ProgramDaySlot[] = [];

  for (const slot of slots) {
    if (slot.program.name === 'Auto DJ') {
      autoDJSlot = slot;
    } else {
      liveSlots.push(slot);
    }
  }

  // Check live shows first
  for (const slot of liveSlots) {
    if (!isDayMatch(slot.day, currentDay)) continue;

    const startMin = parseTimeToMinutes(slot.program.startTime);
    const endMin = parseTimeToMinutes(slot.program.endTime);
    if (startMin === null || endMin === null) continue;

    // Handle midnight crossover
    if (endMin === 0 || endMin < startMin) {
      if (currentTimeInMinutes >= startMin) return slot;
      if (endMin > 0 && currentTimeInMinutes < endMin) {
        // Check if started yesterday
        const yesterdayIndex = (now.getDay() - 1 + 7) % 7;
        const yesterday = DAYS[yesterdayIndex];
        if (isDayMatch(slot.day, yesterday)) return slot;
      }
    } else {
      if (currentTimeInMinutes >= startMin && currentTimeInMinutes < endMin) return slot;
    }
  }

  // Fall back to Auto DJ
  if (autoDJSlot) {
    const startMin = parseTimeToMinutes(autoDJSlot.program.startTime);
    const endMin = parseTimeToMinutes(autoDJSlot.program.endTime);
    if (startMin !== null && endMin !== null) {
      const crosses = endMin === 0 || endMin < startMin;
      const inRange = crosses
        ? currentTimeInMinutes >= startMin || currentTimeInMinutes < endMin
        : currentTimeInMinutes >= startMin && currentTimeInMinutes < endMin;
      if (inRange) return autoDJSlot;
    }
  }

  return null;
}

export default function OnAirDisplay() {
  const { data: slots, isLoading: slotsLoading } = useGetProgramSchedule();
  const { data: override, isLoading: overrideLoading } = useGetOnAirOverride();

  const isLoading = slotsLoading || overrideLoading;

  if (isLoading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Check for active override
  const now = Date.now() * 1000000;
  const hasActiveOverride = override && Number(override.endTime) > now;

  if (hasActiveOverride && override) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-2xl relative overflow-hidden on-air-highlight">
        <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/10 via-christmas-gold/10 to-christmas-red/10 animate-on-air-glow" />
        <div className="absolute inset-0 border-2 border-christmas-gold rounded-lg animate-on-air-border-pulse" />
        <div className="p-6 relative">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-christmas-red via-christmas-gold to-christmas-red flex items-center justify-center shadow-2xl animate-on-air-icon-pulse relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-christmas-red to-christmas-gold animate-on-air-icon-glow opacity-50 blur-md" />
              <Radio className="h-8 w-8 text-white relative z-10 drop-shadow-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-gradient-to-r from-christmas-red to-christmas-red-dark text-white font-bold uppercase tracking-wide shadow-lg animate-on-air-badge relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-on-air-badge-shimmer" />
                  <span className="relative z-10">🔴 On Air Now</span>
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-christmas-dark font-christmas mb-2 animate-on-air-text-glow">
                {override.overrideProgram}
              </h3>
              <div className="max-h-24 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-christmas-gold scrollbar-track-gray-100">
                <p className="text-gray-700 leading-relaxed">{override.description}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const currentSlot = slots ? getCurrentProgram(slots) : null;

  if (!currentSlot) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-christmas-gold to-christmas-gold-light flex items-center justify-center">
              <Radio className="h-8 w-8 text-christmas-red" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-christmas-dark">
                🎶 Music Mix — No scheduled show right now.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Enjoy our continuous holiday music playlist!
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const isCaseyKasemShow = currentSlot.program.name === "Casey Kasem's American Top 40 Christmas Edition";

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-2xl relative overflow-hidden on-air-highlight">
      <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/10 via-christmas-gold/10 to-christmas-red/10 animate-on-air-glow" />
      <div className="absolute inset-0 border-2 border-christmas-gold rounded-lg animate-on-air-border-pulse" />
      <div className="p-6 relative">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-christmas-red via-christmas-gold to-christmas-red flex items-center justify-center shadow-2xl animate-on-air-icon-pulse relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-christmas-red to-christmas-gold animate-on-air-icon-glow opacity-50 blur-md" />
            <Radio className="h-8 w-8 text-white relative z-10 drop-shadow-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-christmas-red to-christmas-red-dark text-white font-bold uppercase tracking-wide shadow-lg animate-on-air-badge relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-on-air-badge-shimmer" />
                <span className="relative z-10">🔴 On Air Now</span>
              </Badge>
              <span className="text-sm text-gray-600 font-medium">
                {currentSlot.program.startTime} - {currentSlot.program.endTime}
              </span>
            </div>

            {isCaseyKasemShow ? (
              <div className="relative overflow-hidden bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-red rounded-lg p-1 mb-2 shadow-lg">
                <div className="bg-white/95 rounded-md overflow-hidden">
                  <div className="marquee-container">
                    <div className="marquee-content">
                      <span className="marquee-text">{currentSlot.program.name}</span>
                      <span className="marquee-text">{currentSlot.program.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h3 className="text-2xl font-bold text-christmas-dark font-christmas mb-2 animate-on-air-text-glow">
                {currentSlot.program.name}
              </h3>
            )}

            <div className="max-h-24 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-christmas-gold scrollbar-track-gray-100">
              <p className="text-gray-700 leading-relaxed">{currentSlot.program.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
