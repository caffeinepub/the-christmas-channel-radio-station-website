import { Radio } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetProgramSchedule, useGetOnAirOverride } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { Program } from '../backend';

function parseTimeString(timeStr: string): { day: string; hour: number; minute: number } | null {
  // Parse format like "Sundays 3:00 PM", "7:00 PM CST", "Weekdays 2:00 PM", "Weekends 6:00 AM", "Daily 2:00 PM", or "Monday-Friday 6:00 AM"
  // Remove timezone indicators like CST, EST, etc.
  const cleanedTimeStr = timeStr.replace(/\s+(CST|EST|PST|MST|EDT|CDT|PDT|MDT)/gi, '').trim();
  
  const match = cleanedTimeStr.match(/(\w+(?:-\w+)?)\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) {
    // Try parsing without day (e.g., "7:00 PM")
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

  // Convert to 24-hour format
  if (period.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  return { day, hour, minute };
}

function isDayMatch(programDay: string, currentDay: string): boolean {
  // If program day is "Any", it matches all days
  if (programDay === 'Any') return true;

  // Handle "Daily" as matching all days
  if (programDay.toLowerCase() === 'daily') return true;

  // Handle "Weekdays" as Monday-Friday
  if (programDay.toLowerCase() === 'weekdays') {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return weekdays.includes(currentDay);
  }

  // Handle "Weekends" as Saturday-Sunday
  if (programDay.toLowerCase() === 'weekends') {
    const weekends = ['Saturday', 'Sunday'];
    return weekends.includes(currentDay);
  }

  // Handle ranges like "Monday-Friday"
  if (programDay.includes('-')) {
    const [startDay, endDay] = programDay.split('-');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = days.indexOf(currentDay);
    const startIndex = days.indexOf(startDay);
    const endIndex = days.indexOf(endDay);

    if (startIndex <= endIndex) {
      return currentDayIndex >= startIndex && currentDayIndex <= endIndex;
    } else {
      // Wraps around week (e.g., Saturday-Monday)
      return currentDayIndex >= startIndex || currentDayIndex <= endIndex;
    }
  }

  // Handle plural forms (e.g., "Sundays" matches "Sunday")
  const normalizedProgramDay = programDay.replace(/s$/, '');
  const normalizedCurrentDay = currentDay.replace(/s$/, '');
  return normalizedProgramDay === normalizedCurrentDay;
}

function isTimeInRange(currentTimeInMinutes: number, startTimeInMinutes: number, endTimeInMinutes: number): boolean {
  // Handle midnight crossover (e.g., 7:00 PM to 12:00 AM)
  if (endTimeInMinutes === 0 || endTimeInMinutes < startTimeInMinutes) {
    // Program crosses midnight
    return currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes < endTimeInMinutes;
  } else {
    // Normal case: program doesn't cross midnight
    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
  }
}

function getCurrentProgram(programs: Program[]): Program | null {
  const now = new Date();
  const currentDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Separate Auto DJ from other programs
  let autoDJProgram: Program | null = null;
  const livePrograms: Program[] = [];

  for (const program of programs) {
    if (program.name === 'Auto DJ') {
      autoDJProgram = program;
    } else {
      livePrograms.push(program);
    }
  }

  // First, check for live shows
  for (const program of livePrograms) {
    const startTime = parseTimeString(program.startTime);
    const endTime = parseTimeString(program.endTime);

    if (!startTime || !endTime) continue;

    // Check if the day matches
    if (!isDayMatch(startTime.day, currentDay)) continue;

    const startTimeInMinutes = startTime.hour * 60 + startTime.minute;
    let endTimeInMinutes = endTime.hour * 60 + endTime.minute;

    // Handle midnight crossover
    if (endTimeInMinutes === 0 || endTimeInMinutes < startTimeInMinutes) {
      // Program crosses midnight
      if (currentTimeInMinutes >= startTimeInMinutes) {
        // We're in the same day, after the start time
        return program;
      } else if (endTimeInMinutes > 0 && currentTimeInMinutes < endTimeInMinutes) {
        // We're past midnight but before the end time
        // Check if this program started yesterday
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const yesterdayIndex = (now.getDay() - 1 + 7) % 7;
        const yesterday = days[yesterdayIndex];
        
        if (isDayMatch(startTime.day, yesterday)) {
          return program;
        }
      }
    } else {
      // Normal case: program doesn't cross midnight
      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
        return program;
      }
    }
  }

  // No live show found, check if we're in Auto DJ time slot
  if (autoDJProgram) {
    const startTime = parseTimeString(autoDJProgram.startTime);
    const endTime = parseTimeString(autoDJProgram.endTime);

    if (startTime && endTime) {
      // Auto DJ is daily, so day always matches
      const startTimeInMinutes = startTime.hour * 60 + startTime.minute;
      const endTimeInMinutes = endTime.hour * 60 + endTime.minute;

      if (isTimeInRange(currentTimeInMinutes, startTimeInMinutes, endTimeInMinutes)) {
        return autoDJProgram;
      }
    }
  }

  return null;
}

export default function OnAirDisplay() {
  const { data: programs, isLoading: programsLoading } = useGetProgramSchedule();
  const { data: override, isLoading: overrideLoading } = useGetOnAirOverride();

  const isLoading = programsLoading || overrideLoading;

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

  // Check if there's an active override
  const now = Date.now() * 1000000; // Convert to nanoseconds
  const hasActiveOverride = override && Number(override.endTime) > now;

  if (hasActiveOverride && override) {
    // Display the override
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-2xl relative overflow-hidden on-air-highlight">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/10 via-christmas-gold/10 to-christmas-red/10 animate-on-air-glow" />
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 border-2 border-christmas-gold rounded-lg animate-on-air-border-pulse" />
        
        <div className="p-6 relative">
          <div className="flex items-start gap-4">
            {/* Animated radio icon with enhanced glow */}
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-christmas-red via-christmas-gold to-christmas-red flex items-center justify-center shadow-2xl animate-on-air-icon-pulse relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-christmas-red to-christmas-gold animate-on-air-icon-glow opacity-50 blur-md" />
              <Radio className="h-8 w-8 text-white relative z-10 drop-shadow-lg" />
            </div>
            
            <div className="flex-1">
              {/* Enhanced "On Air" badge with animation */}
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-gradient-to-r from-christmas-red to-christmas-red-dark text-white font-bold uppercase tracking-wide shadow-lg animate-on-air-badge relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-on-air-badge-shimmer" />
                  <span className="relative z-10">🔴 On Air Now</span>
                </Badge>
              </div>
              
              {/* Program name */}
              <h3 className="text-2xl font-bold text-christmas-dark font-christmas mb-2 animate-on-air-text-glow">
                {override.overrideProgram}
              </h3>
              
              {/* Program description */}
              <p className="text-gray-700 leading-relaxed">
                {override.description}
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // No override, use schedule-based logic
  const currentProgram = programs ? getCurrentProgram(programs) : null;

  if (!currentProgram) {
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

  const isCaseyKasemShow = currentProgram.name === "Casey Kasem's American Top 40 Christmas Edition";

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-2xl relative overflow-hidden on-air-highlight">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/10 via-christmas-gold/10 to-christmas-red/10 animate-on-air-glow" />
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 border-2 border-christmas-gold rounded-lg animate-on-air-border-pulse" />
      
      <div className="p-6 relative">
        <div className="flex items-start gap-4">
          {/* Animated radio icon with enhanced glow */}
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-christmas-red via-christmas-gold to-christmas-red flex items-center justify-center shadow-2xl animate-on-air-icon-pulse relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-christmas-red to-christmas-gold animate-on-air-icon-glow opacity-50 blur-md" />
            <Radio className="h-8 w-8 text-white relative z-10 drop-shadow-lg" />
          </div>
          
          <div className="flex-1">
            {/* Enhanced "On Air" badge with animation */}
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-christmas-red to-christmas-red-dark text-white font-bold uppercase tracking-wide shadow-lg animate-on-air-badge relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-on-air-badge-shimmer" />
                <span className="relative z-10">🔴 On Air Now</span>
              </Badge>
              <span className="text-sm text-gray-600 font-medium">
                {currentProgram.startTime} - {currentProgram.endTime}
              </span>
            </div>
            
            {/* Program name with special treatment for Casey Kasem */}
            {isCaseyKasemShow ? (
              <div className="relative overflow-hidden bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-red rounded-lg p-1 mb-2 shadow-lg">
                <div className="bg-white/95 rounded-md overflow-hidden">
                  <div className="marquee-container">
                    <div className="marquee-content">
                      <span className="marquee-text">
                        {currentProgram.name}
                      </span>
                      <span className="marquee-text">
                        {currentProgram.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h3 className="text-2xl font-bold text-christmas-dark font-christmas mb-2 animate-on-air-text-glow">
                {currentProgram.name}
              </h3>
            )}
            
            {/* Program description */}
            <p className="text-gray-700 leading-relaxed">
              {currentProgram.description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
