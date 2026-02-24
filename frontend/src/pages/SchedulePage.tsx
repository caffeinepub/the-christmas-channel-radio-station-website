import { Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGetProgramSchedule } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProgramDaySlot } from '../backend';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAY_ACCENT: Record<string, { bg: string; border: string; badge: string; dot: string }> = {
  Monday:    { bg: 'from-blue-50 to-white',    border: 'border-blue-200',    badge: 'bg-blue-600 text-white',    dot: 'bg-blue-500' },
  Tuesday:   { bg: 'from-purple-50 to-white',  border: 'border-purple-200',  badge: 'bg-purple-600 text-white',  dot: 'bg-purple-500' },
  Wednesday: { bg: 'from-green-50 to-white',   border: 'border-green-200',   badge: 'bg-green-600 text-white',   dot: 'bg-green-500' },
  Thursday:  { bg: 'from-orange-50 to-white',  border: 'border-orange-200',  badge: 'bg-orange-500 text-white',  dot: 'bg-orange-500' },
  Friday:    { bg: 'from-pink-50 to-white',    border: 'border-pink-200',    badge: 'bg-pink-600 text-white',    dot: 'bg-pink-500' },
  Saturday:  { bg: 'from-yellow-50 to-white',  border: 'border-yellow-200',  badge: 'bg-yellow-500 text-white',  dot: 'bg-yellow-500' },
  Sunday:    { bg: 'from-red-50 to-white',     border: 'border-red-200',     badge: 'bg-christmas-red text-white', dot: 'bg-christmas-red' },
};

const today = (): string => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
};

export default function SchedulePage() {
  const { data: slots, isLoading } = useGetProgramSchedule();

  // Group slots by day
  const slotsByDay: Record<string, ProgramDaySlot[]> = {};
  if (slots) {
    for (const slot of slots) {
      if (!slotsByDay[slot.day]) slotsByDay[slot.day] = [];
      slotsByDay[slot.day].push(slot);
    }
    // Sort within each day by start time
    for (const day of Object.keys(slotsByDay)) {
      slotsByDay[day].sort((a, b) => a.program.startTime.localeCompare(b.program.startTime));
    }
  }

  const orderedDays = ALL_DAYS.filter((d) => slotsByDay[d]);
  const currentDay = today();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-christmas-red mb-4">
            <Calendar className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas">
            Program Schedule
          </h1>
          <p className="text-xl text-gray-600">
            Your weekly dose of festive programming
          </p>
        </div>

        {/* Weekday quick-nav pills */}
        {!isLoading && orderedDays.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {orderedDays.map((day) => {
              const accent = DAY_ACCENT[day] || { badge: 'bg-gray-500 text-white', dot: 'bg-gray-400' };
              const isToday = day === currentDay;
              return (
                <a
                  key={day}
                  href={`#day-${day}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${accent.badge} ${isToday ? 'ring-2 ring-offset-2 ring-christmas-gold shadow-lg scale-105' : 'opacity-80 hover:opacity-100'}`}
                >
                  {isToday ? `📅 ${day} (Today)` : day}
                </a>
              );
            })}
          </div>
        )}

        {/* Schedule grouped by day */}
        <div className="space-y-10">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-8 w-32 rounded-full" />
                  {[1, 2].map((j) => (
                    <Card key={j} className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
                      <div className="p-6">
                        <div className="flex gap-6">
                          <Skeleton className="h-16 w-24" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </>
          ) : orderedDays.length > 0 ? (
            orderedDays.map((day) => {
              const accent = DAY_ACCENT[day] || { bg: 'from-gray-50 to-white', border: 'border-gray-200', badge: 'bg-gray-500 text-white', dot: 'bg-gray-400' };
              const isToday = day === currentDay;
              return (
                <section key={day} id={`day-${day}`}>
                  {/* Day header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-base shadow-sm ${accent.badge}`}>
                      {isToday && <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />}
                      {day}
                      {isToday && <span className="text-xs font-normal opacity-90 ml-1">Today</span>}
                    </div>
                    <div className="flex-1 h-px bg-christmas-gold/30" />
                    <span className="text-xs text-gray-400">
                      {slotsByDay[day].length} show{slotsByDay[day].length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-3 pl-2">
                    {slotsByDay[day].map((slot, index) => (
                      <Card
                        key={`${slot.program.name}-${slot.day}-${index}`}
                        className={`bg-gradient-to-r ${accent.bg} backdrop-blur-sm ${accent.border} border-2 hover:shadow-xl transition-shadow`}
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            {/* Time */}
                            <div className="flex items-center gap-2 md:w-44 shrink-0">
                              <Clock className="h-5 w-5 text-christmas-red shrink-0" />
                              <div className="font-bold text-christmas-dark">
                                <div className="text-base">{slot.program.startTime}</div>
                                <div className="text-sm text-gray-500">to {slot.program.endTime}</div>
                              </div>
                            </div>

                            {/* Program Details */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-christmas-dark mb-1 font-christmas">
                                {slot.program.name}
                              </h3>
                              <div className="max-h-28 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-christmas-gold scrollbar-track-gray-100">
                                <p className="text-gray-600 leading-relaxed text-sm">
                                  {slot.program.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
              <div className="p-12 text-center">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No Programs Scheduled</h3>
                <p className="text-gray-500">Check back soon for our festive programming lineup!</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
